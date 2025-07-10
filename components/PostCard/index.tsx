import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Post } from "../../services/posts";
import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

import DeleteAlert from "../DeleteAlert";

type PostCardProps = {
  post: Post;
  currentUserId: string;
  onLike: (postId: string) => void;
  onComment: (postId: string, content: string) => void;
  onDelete?: (postId: string) => void;
  onEdit?: (postId: string) => void;
};

const PostCard: React.FC<PostCardProps> = ({
  post,
  currentUserId,
  onLike,
  onComment,
  onDelete,
  onEdit,
}) => {
  const [user, setUser] = useState<any>(null);
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const isLiked = post.likes?.[currentUserId] || false;
  const likesCount = Object.keys(post.likes || {}).length;
  const commentsCount = Object.keys(post.comments || {}).length;
  const isAuthor = post.userId === currentUserId;

  const handleSubmitComment = () => {
    if (commentText.trim()) {
      onComment(post.id, commentText.trim());
      setCommentText("");
    }
  };

  useEffect(() => {
    const getCurrentUser = async () => {
      const loginUser = await AsyncStorage.getItem("user");
      setUser(JSON.parse(loginUser as string));
    };
    getCurrentUser();
  }, []);

  console.log("RIZWAN", post.userDetails);

  const getTimeAgo = (timestamp: number) => {
    const now = new Date();
    const postDate = new Date(timestamp);
    const diffTime = Math.abs(now.getTime() - postDate.getTime());

    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30);

    if (diffMinutes < 60) {
      return `${diffMinutes}m`;
    } else if (diffHours < 24) {
      return `${diffHours}h`;
    } else if (diffDays < 30) {
      return `${diffDays}d`;
    } else {
      return `${diffMonths}mon`;
    }
  };

  return (
    // <View style={styles.container}>
    //   <View style={styles.header}>
    //     <Text style={styles.author}>{`${
    //       user?.uid === post.userId ? "You" : post.userDetails?.name
    //     }`}</Text>
    //     <Text style={styles.timestamp}>
    //       {new Date(post.timestamp).toLocaleDateString()}
    //     </Text>
    //   </View>

    //   {post.imageUrl && (
    //     <Image source={{ uri: post.imageUrl }} style={styles.image} />
    //   )}

    //   <Text style={styles.content}>{post.content}</Text>

    //   <View style={styles.actions}>
    //     <View style={styles.iconCommentsContainer}>
    //       <TouchableOpacity
    //         style={styles.actionButton}
    //         onPress={() => onLike(post.id)}
    //       >
    //         <Icon
    //           name={isLiked ? "favorite" : "favorite-border"}
    //           size={24}
    //           color={isLiked ? "#e91e63" : "#666"}
    //         />
    //         <Text style={styles.actionText}>{likesCount} Likes</Text>
    //       </TouchableOpacity>

    //       <TouchableOpacity
    //         style={styles.actionButton}
    //         onPress={() => setShowComments(!showComments)}
    //       >
    //         <Icon name="comment" size={24} color="#666" />
    //         <Text style={styles.actionText}>{commentsCount} Comments</Text>
    //       </TouchableOpacity>
    //     </View>
    //     <View style={styles.iconActionsContainer}>
    //       {isAuthor && onDelete && (
    //         <View style={styles.iconContainer}>
    //           <TouchableOpacity
    //             style={styles.deleteButton}
    //             onPress={() => onEdit?.(post.id)}
    //           >
    //             <Icon name="edit" size={20} color="#666" />
    //           </TouchableOpacity>
    //           <TouchableOpacity
    //             style={styles.deleteButton}
    //             onPress={() => setIsDeleting(true)}
    //           >
    //             <Icon name="delete" size={20} color="#666" />
    //           </TouchableOpacity>
    //         </View>
    //       )}
    //     </View>
    //   </View>

    //   {showComments && (
    //     <View style={styles.commentsSection}>
    //       <View style={styles.commentInput}>
    //         <TextInput
    //           style={styles.input}
    //           value={commentText}
    //           onChangeText={setCommentText}
    //           placeholder="Write a comment..."
    //           multiline
    //         />
    //         <TouchableOpacity
    //           style={styles.sendButton}
    //           onPress={handleSubmitComment}
    //         >
    //           <Icon name="send" size={24} color="#007AFF" />
    //         </TouchableOpacity>
    //       </View>

    //       {Object.entries(post.comments || {}).map(
    //         ([commentId, comment], index) => (
    //           <View
    //             key={commentId}
    //             style={[
    //               styles.comment,
    //               {
    //                 borderBottomWidth:
    //                   index === Object.entries(post.comments || {}).length - 1
    //                     ? 0
    //                     : 1,
    //               },
    //             ]}
    //           >
    //             <View
    //               style={{
    //                 flexDirection: "row",
    //                 justifyContent: "space-between",
    //                 alignItems: "center",
    //                 marginBottom: 4,
    //               }}
    //             >
    //               <Text style={styles.commentAuthor}>
    //                 {user?.uid === (comment as any)?.userId
    //                   ? "You"
    //                   : (comment as any)?.userDetails?.name}
    //               </Text>
    //               <Text style={styles.commentTimestamp}>
    //                 {new Date(comment.timestamp).toLocaleDateString()}
    //               </Text>
    //             </View>
    //             <Text style={styles.commentContent}>{comment.content}</Text>
    //           </View>
    //         )
    //       )}
    //     </View>
    //   )}
    //   {isDeleting && (
    //     <DeleteAlert
    //       visible={isDeleting}
    //       onRequestClose={() => setIsDeleting(false)}
    //       title="Delete Post"
    //       onConfirm={() => onDelete?.(post.id)}
    //       onCancel={() => setIsDeleting(false)}
    //       description="Are you sure you want to delete this post?"
    //       height={200}
    //     />
    //   )}
    // </View>
    <View style={styles.card}>
      {/* User Info */}
      <View style={styles.header}>
        <Image
          source={{
            uri: post.userDetails?.photoURL,
          }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.name}>{post.userDetails?.name}</Text>
          <Text style={styles.time}>{getTimeAgo(post.timestamp)}</Text>
        </View>
      </View>

      {/* Post Content */}
      <Text style={styles.postText}>{post.content}</Text>

      {/* Meta Preview */}
      {post.imageUrl && (
        <View style={styles.metaPreview}>
          <Image source={{ uri: post.imageUrl }} style={styles.metaImage} />
        </View>
      )}

      {/* Actions */}
      <View style={styles.actions}>
        <View style={styles.actionLeft}>
          <TouchableOpacity onPress={() => onLike(post.id)}>
            <Icon
              name={isLiked ? "favorite" : "favorite-border"}
              size={18}
              color={isLiked ? "#e91e63" : "#666"}
            />
          </TouchableOpacity>
          <Text style={styles.actionText}>{likesCount}</Text>
          <TouchableOpacity onPress={() => setShowComments(!showComments)}>
            <Icon name="comment" size={18} color="#666" />
          </TouchableOpacity>
          <Text style={styles.actionText}>{likesCount}</Text>
        </View>
      </View>
      {showComments && (
        <View style={styles.commentsSection}>
          <View style={styles.commentInput}>
            <TextInput
              style={styles.input}
              value={commentText}
              onChangeText={setCommentText}
              placeholder="Write a comment..."
              multiline
            />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={handleSubmitComment}
            >
              <Icon name="send" size={24} color="#007AFF" />
            </TouchableOpacity>
          </View>

          {Object.entries(post.comments || {}).map(
            ([commentId, comment], index) => (
              <View
                key={commentId}
                style={[
                  styles.comment,
                  {
                    borderBottomWidth:
                      index === Object.entries(post.comments || {}).length - 1
                        ? 0
                        : 1,
                  },
                ]}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 4,
                  }}
                >
                  <Text style={styles.commentAuthor}>
                    {user?.uid === (comment as any)?.userId
                      ? "You"
                      : (comment as any)?.userDetails?.name}
                  </Text>
                  <Text style={styles.commentTimestamp}>
                    {new Date(comment.timestamp).toLocaleDateString()}
                  </Text>
                </View>
                <Text style={styles.commentContent}>{comment.content}</Text>
              </View>
            )
          )}
        </View>
      )}
      {isDeleting && (
        <DeleteAlert
          visible={isDeleting}
          onRequestClose={() => setIsDeleting(false)}
          title="Delete Post"
          onConfirm={() => onDelete?.(post.id)}
          onCancel={() => setIsDeleting(false)}
          description="Are you sure you want to delete this post?"
          height={200}
        />
      )}
    </View>
  );
};

export default PostCard;
