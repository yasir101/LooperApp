import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Post } from "../../services/posts";
import { styles } from "./styles";

type PostCardProps = {
  post: Post;
  currentUserId: string;
  onLike: (postId: string) => void;
  onComment: (postId: string, content: string) => void;
  onDelete?: (postId: string) => void;
};

const PostCard: React.FC<PostCardProps> = ({
  post,
  currentUserId,
  onLike,
  onComment,
  onDelete,
}) => {
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);

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
  console.log("post card", post);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.author}>{`${post.userDetails?.name}`}</Text>
        <Text style={styles.timestamp}>
          {new Date(post.timestamp).toLocaleDateString()}
        </Text>
        {isAuthor && onDelete && (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => onDelete(post.id)}
          >
            <Icon name="delete" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.content}>{post.content}</Text>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onLike(post.id)}
        >
          <Icon
            name={isLiked ? "favorite" : "favorite-border"}
            size={24}
            color={isLiked ? "#e91e63" : "#666"}
          />
          <Text style={styles.actionText}>{likesCount} Likes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => setShowComments(!showComments)}
        >
          <Icon name="comment" size={24} color="#666" />
          <Text style={styles.actionText}>{commentsCount} Comments</Text>
        </TouchableOpacity>
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

          {Object.entries(post.comments || {}).map(([commentId, comment]) => (
            <View key={commentId} style={styles.comment}>
              <Text style={styles.commentAuthor}>
                {(comment as any)?.userDetails?.name}
              </Text>
              <Text style={styles.commentContent}>{comment.content}</Text>
              <Text style={styles.commentTimestamp}>
                {new Date(comment.timestamp).toLocaleDateString()}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default PostCard;
