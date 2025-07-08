import React, { useEffect, useState } from "react";
import { View, FlatList, RefreshControl } from "react-native";
import auth from "@react-native-firebase/auth";
import CreatePost from "../../components/CreatePost";
import PostCard from "../../components/PostCard";
import {
  Post,
  createPost,
  fetchPosts,
  toggleLike,
  addComment,
  deletePost,
  subscribeToPosts,
} from "../../services/posts";
import { styles } from "./styles";
import { getUser } from "../../services/users";

type PostsScreenProps = {
  groupId?: string;
};

const PostsScreen: React.FC<PostsScreenProps> = ({ groupId }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const currentUser = auth().currentUser;

  const loadPosts = async () => {
    try {
      const fetchedPosts = await fetchPosts(groupId);
      const postsWithUserDetails = await Promise.all(
        fetchedPosts.map(async (post) => {
          const userDetails = await getUser(post.userId);
          // If post has comments, get user details for each comment
          if (post.comments) {
            const commentsWithUserDetails = await Promise.all(
              Object.entries(post.comments).map(
                async ([commentId, comment]) => {
                  const commentUserDetails = await getUser(comment.userId);
                  return {
                    ...comment,
                    userDetails: JSON.parse(commentUserDetails),
                  };
                }
              )
            );

            // Convert array back to object with comment IDs as keys
            const commentsObject = commentsWithUserDetails.reduce<
              Record<string, any>
            >((obj, comment, index) => {
              const commentId = Object.keys(post.comments)[index];
              obj[commentId] = comment;
              return obj;
            }, {});

            post.comments = commentsObject;
          }
          return { ...post, userDetails: JSON.parse(userDetails) };
        })
      );
      setPosts(postsWithUserDetails);
    } catch (error) {
      console.error("Error loading posts:", error);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadPosts();
    setRefreshing(false);
  };

  const handleCreatePost = async (content: string) => {
    try {
      if (!currentUser) return;

      const postData = {
        userId: currentUser.uid,
        content,
        ...(groupId && { groupId }),
      };

      await createPost(postData);
      await loadPosts(); // Refresh the posts list
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleLike = async (postId: string) => {
    try {
      if (!currentUser) return;
      await toggleLike(postId, currentUser.uid);
      await loadPosts(); // Refresh to get updated likes
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleComment = async (postId: string, content: string) => {
    try {
      if (!currentUser) return;
      await addComment(postId, currentUser.uid, content);
      await loadPosts(); // Refresh to get updated comments
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDeletePost = async (postId: string) => {
    try {
      await deletePost(postId);
      await loadPosts(); // Refresh the posts list
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [groupId]);

  if (!currentUser) return null;

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            currentUserId={currentUser.uid}
            onLike={handleLike}
            onComment={handleComment}
            onDelete={
              item.userId === currentUser.uid ? handleDeletePost : undefined
            }
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        // ListFooterComponent={
        //   <CreatePost onSubmit={handleCreatePost} groupId={groupId} />
        // }
      />
      <CreatePost onSubmit={handleCreatePost} groupId={groupId} />
    </View>
  );
};

export default PostsScreen;
