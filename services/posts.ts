import database from "@react-native-firebase/database";
import { getUser } from "./users";

export type Post = {
  id: string;
  userId: string;
  content?: string; // Made optional since posts can be image-only
  imageUrl?: string; // Added optional image URL field
  timestamp: number;
  groupId?: string;
  likes: { [key: string]: boolean };
  comments: {
    [key: string]: {
      userId: string;
      content: string;
      timestamp: number;
    };
  };
  userDetails?: any;
};

// Create a new post
export const createPost = async (
  postData: Omit<Post, "id" | "timestamp" | "likes" | "comments">
) => {
  try {
    const postsRef = database().ref("posts");
    const postId = postsRef.push().key;

    const newPost: Post = {
      id: postId!,
      ...postData,
      timestamp: Date.now(),
      likes: {},
      comments: {},
    };

    await postsRef.child(postId!).set(newPost);
    return newPost;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

// Fetch posts with pagination
export const fetchPosts = async (
  groupId?: string,
  lastPostTimestamp?: number,
  limit: number = 10
): Promise<Post[]> => {
  const postsRef = database().ref("posts");
  const snapshot = await postsRef.orderByChild("timestamp").once("value");
  let posts: Post[] = [];
  Object.keys(snapshot.val()).forEach(async (key: any) => {
    const post: Post = snapshot.val()[key];
    // Filter by groupId
    if (
      groupId &&
      (!post.groupId || String(post.groupId) !== String(groupId))
    ) {
      return true;
    }

    posts.push(post);
    return true;
  });

  posts.sort((a: Post, b: Post) => b.timestamp - a.timestamp);
  return posts.slice(0, limit);
};

// Subscribe to posts real-time updates

/**
 * Subscribe to real-time updates of posts with optional group filtering and pagination.
 */
export const subscribeToPosts = (
  onUpdate: (posts: Post[]) => void,
  groupId?: string,
  limit: number = 10,
  lastPostTimestamp?: number
): (() => void) => {
  const postsRef = database().ref("posts");
  const query = postsRef.orderByChild("timestamp");

  const listener = query.on("value", (snapshot) => {
    let posts: Post[] = [];

    snapshot.forEach((childSnapshot) => {
      const post: Post = childSnapshot.val();

      // Filter by groupId
      if (
        groupId &&
        (!post.groupId || String(post.groupId) !== String(groupId))
      ) {
        return true;
      }

      // Filter by timestamp (pagination)
      if (lastPostTimestamp && post.timestamp >= lastPostTimestamp) {
        return true;
      }

      posts.push(post);
      return true;
    });

    // Sort and limit
    posts.sort((a, b) => b.timestamp - a.timestamp);
    onUpdate(posts.slice(0, limit));
  });

  // Return cleanup/unsubscribe function
  return () => postsRef.off("value", listener);
};

// Toggle like on a post
export const toggleLike = async (postId: string, userId: string) => {
  const postRef = database().ref(`posts/${postId}/likes/${userId}`);
  const snapshot = await postRef.once("value");
  await postRef.set(!snapshot.val());
};

// Add comment to a post
export const addComment = async (
  postId: string,
  userId: string,
  content: string
) => {
  const commentsRef = database().ref(`posts/${postId}/comments`);
  const commentId = commentsRef.push().key;

  await commentsRef.child(commentId!).set({
    userId,
    content,
    timestamp: Date.now(),
  });
};

// Delete a post
export const deletePost = async (postId: string) => {
  try {
    const postRef = database().ref(`posts/${postId}`);
    await postRef.remove();
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

// Update a post
export const updatePost = async (
  postId: string,
  updates: Partial<Pick<Post, "content">>
) => {
  const postRef = database().ref(`posts/${postId}`);
  await postRef.update(updates);
};
