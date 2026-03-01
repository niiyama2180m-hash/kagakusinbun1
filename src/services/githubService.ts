import { Octokit } from 'octokit';
import { Post } from '../types';

// GitHubの設定
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const OWNER = import.meta.env.VITE_GITHUB_OWNER;
const REPO = import.meta.env.VITE_GITHUB_REPO;
const BRANCH = 'main';
const DATA_FILE_PATH = 'data/posts.json';

// 環境変数のバリデーション
function validateConfig() {
  if (!GITHUB_TOKEN || !OWNER || !REPO) {
    const missing = [];
    if (!GITHUB_TOKEN) missing.push('VITE_GITHUB_TOKEN');
    if (!OWNER) missing.push('VITE_GITHUB_OWNER');
    if (!REPO) missing.push('VITE_GITHUB_REPO');
    throw new Error(`GitHubの設定が不足しています: ${missing.join(', ')}。環境変数を確認してください。`);
  }
}

// Octokitの初期化 (遅延初期化)
let _octokit: Octokit | null = null;
function getOctokit() {
  validateConfig();
  if (!_octokit) {
    _octokit = new Octokit({
      auth: GITHUB_TOKEN,
    });
  }
  return _octokit;
}

// UTF-8文字列をBase64に変換
function utf8ToBase64(str: string): string {
  return btoa(unescape(encodeURIComponent(str)));
}

// Base64をUTF-8文字列に変換
function base64ToUtf8(str: string): string {
  return decodeURIComponent(escape(atob(str)));
}

// データ取得
export async function fetchPosts(): Promise<Post[]> {
  try {
    const octokit = getOctokit();
    const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
      owner: OWNER,
      repo: REPO,
      path: DATA_FILE_PATH,
      ref: BRANCH,
    });

    // @ts-ignore
    const content = response.data.content.replace(/\n/g, '');
    const jsonString = base64ToUtf8(content);
    return JSON.parse(jsonString);
  } catch (error: any) {
    if (error.status === 404) {
      return [];
    }
    console.error('GitHub fetch error details:', error);
    if (error.message === 'Failed to fetch') {
      throw new Error('GitHubへの接続に失敗しました。ネットワーク接続またはGitHubトークンの有効性を確認してください。');
    }
    throw error;
  }
}

// データ保存 (画像のアップロード含む)
export async function savePost(post: Post, isUpdate: boolean = false): Promise<void> {
  try {
    const octokit = getOctokit();
    
    // 1. 現在のデータを取得
    let currentPosts: Post[] = [];
    let sha: string | undefined;

    try {
      const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner: OWNER,
        repo: REPO,
        path: DATA_FILE_PATH,
        ref: BRANCH,
      });
      // @ts-ignore
      sha = response.data.sha;
      // @ts-ignore
      const content = response.data.content.replace(/\n/g, '');
      const jsonString = base64ToUtf8(content);
      currentPosts = JSON.parse(jsonString);
    } catch (error: any) {
      if (error.status !== 404) throw error;
    }

    // 2. 画像のアップロード (Base64の場合)
    let imageUrl = post.image;
    if (post.image.startsWith('data:image')) {
      const imagePath = `images/${post.id}.jpg`;
      const base64Data = post.image.split(',')[1];
      
      try {
        await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
          owner: OWNER,
          repo: REPO,
          path: imagePath,
          message: `Upload image for post ${post.id}`,
          content: base64Data,
          branch: BRANCH,
        });
        imageUrl = `https://raw.githubusercontent.com/${OWNER}/${REPO}/${BRANCH}/${imagePath}`;
      } catch (imgError: any) {
        console.error('Image upload failed:', imgError);
        // 画像アップロードに失敗しても、元のデータURLのまま続行するか、エラーを投げる
        // ここではエラーを投げてユーザーに知らせる
        throw new Error('画像のアップロードに失敗しました。サイズが大きすぎる可能性があります。');
      }
    }

    // 3. データの更新
    const updatedPost = { ...post, image: imageUrl };
    let newPosts: Post[];

    if (isUpdate) {
      newPosts = currentPosts.map(p => p.id === post.id ? updatedPost : p);
    } else {
      newPosts = [updatedPost, ...currentPosts];
    }

    // 4. JSONファイルの保存
    const jsonContent = JSON.stringify(newPosts, null, 2);
    const encodedContent = utf8ToBase64(jsonContent);

    await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
      owner: OWNER,
      repo: REPO,
      path: DATA_FILE_PATH,
      message: isUpdate ? `Update post ${post.title}` : `Add post ${post.title}`,
      content: encodedContent,
      sha: sha,
      branch: BRANCH,
    });

  } catch (error: any) {
    console.error('GitHub save error details:', error);
    if (error.message === 'Failed to fetch') {
      throw new Error('GitHubへの保存に失敗しました。ネットワーク接続またはGitHubトークンの権限を確認してください。');
    }
    throw error;
  }
}

// 記事削除
export async function deletePost(id: string): Promise<void> {
  try {
    const octokit = getOctokit();
    
    // 1. 現在のデータを取得
    const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
      owner: OWNER,
      repo: REPO,
      path: DATA_FILE_PATH,
      ref: BRANCH,
    });

    // @ts-ignore
    const sha = response.data.sha;
    // @ts-ignore
    const content = response.data.content.replace(/\n/g, '');
    const jsonString = base64ToUtf8(content);
    const currentPosts: Post[] = JSON.parse(jsonString);

    // 2. 削除対象を除外
    const newPosts = currentPosts.filter(p => p.id !== id);

    // 3. 保存
    const jsonContent = JSON.stringify(newPosts, null, 2);
    const encodedContent = utf8ToBase64(jsonContent);

    await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
      owner: OWNER,
      repo: REPO,
      path: DATA_FILE_PATH,
      message: `Delete post ${id}`,
      content: encodedContent,
      sha: sha,
      branch: BRANCH,
    });

  } catch (error: any) {
    console.error('GitHub delete error details:', error);
    if (error.message === 'Failed to fetch') {
      throw new Error('GitHubからの削除に失敗しました。');
    }
    throw error;
  }
}
