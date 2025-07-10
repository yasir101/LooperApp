import { StyleSheet } from "react-native";

// export const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     padding: 16,
//     marginVertical: 8,
//     borderWidth: 1,
//     borderColor: "#f0f0f0",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 12,
//   },
//   author: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#333",
//     flex: 1,
//   },
//   timestamp: {
//     fontSize: 14,
//     color: "#666",
//     marginRight: 8,
//   },
//   iconContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 4,
//   },
//   deleteButton: {
//     padding: 4,
//   },
//   image: {
//     width: "100%",
//     height: 200,
//     borderRadius: 12,
//     marginBottom: 12,
//   },
//   content: {
//     fontSize: 16,
//     color: "#333",
//     marginBottom: 16,
//     lineHeight: 24,
//   },
//   actions: {
//     flexDirection: "row",
//     borderTopWidth: 1,
//     borderTopColor: "#f0f0f0",
//     paddingTop: 12,
//     justifyContent: "space-between",
//   },
//   iconCommentsContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//   },
//   iconActionsContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//   },
//   actionButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginRight: 24,
//   },
//   actionText: {
//     marginLeft: 8,
//     fontSize: 14,
//     color: "#666",
//   },
//   commentInput: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   input: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 20,
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     marginRight: 8,
//     fontSize: 16,
//     maxHeight: 100,
//   },
//   sendButton: {
//     padding: 8,
//   },
//   comment: {
//     marginBottom: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: "#f0f0f0",
//     paddingBottom: 12,
//   },
//   commentAuthor: {
//     fontSize: 14,
//     fontWeight: "bold",
//     color: "#333",
//     marginBottom: 4,
//   },
//   commentContent: {
//     fontSize: 14,
//     color: "#333",
//     marginBottom: 4,
//   },
//   commentTimestamp: {
//     fontSize: 12,
//     color: "#666",
//   },
// });

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 15,
  },
  time: {
    fontSize: 12,
    color: "#666",
  },
  postText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 6,
  },
  moreText: {
    color: "#6b46c1",
  },
  link: {
    color: "#4a90e2",
    fontSize: 13,
    marginBottom: 10,
  },
  metaPreview: {
    position: "relative",
    overflow: "hidden",
    borderRadius: 12,
    marginBottom: 12,
  },
  metaImage: {
    width: "100%",
    height: 180,
    borderRadius: 12,
  },
  metaOverlay: {
    position: "absolute",
    bottom: 12,
    left: 12,
  },
  metaText: {
    color: "#fff",
    fontWeight: "600",
  },
  metaDomain: {
    color: "#fff",
    fontSize: 12,
  },
  closeBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 6,
    borderRadius: 20,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionLeft: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  actionText: {
    marginHorizontal: 3,
  },
  replyText: {
    fontWeight: "600",
    color: "#333",
  },
  commentsSection: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingTop: 16,
  },
  commentInput: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    padding: 8,
  },
  comment: {
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    paddingBottom: 12,
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  commentTimestamp: {
    fontSize: 12,
    color: "#666",
  },
  commentContent: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 24,
  },
});

export default styles;
