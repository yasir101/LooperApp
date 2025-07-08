import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerStyle: {
    backgroundColor: "#fff",
    elevation: 0, // for Android
    shadowOpacity: 0.2, // for iOS
    shadowRadius: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0.5 },
  },
  headerTitleStyle: {
    color: "#000",
    fontSize: 18,
    fontWeight: "600",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    gap: 10,
  },
  headerText: {
    fontSize: 14,
  },
  headerImage: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginRight: 10,
  },
  content: {
    flex: 1,
    padding: 10,
  },
  contentText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  addGroupButton: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    bottom: 40,
    right: 10,
    // backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchInput: {
    width: 180,
    height: 35,
    backgroundColor: "#f0f0f0",
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  groupItem: {
    padding: 10,
    height: 55,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  groupItemText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#454545",
    marginBottom: 3,
  },
  groupItemDescription: {
    fontSize: 12,
    color: "#454545",
  },
  groupItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  groupItemIcon: {
    width: 34,
    height: 34,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
  },
  groupsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  groupsTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#454545",
  },
  groupsList: {
    marginBottom: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#454545",
  },
  joinGroupButton: {
    backgroundColor: "#F07321",
    padding: 10,
    borderRadius: 10,
  },
  joinGroupButtonText: {
    color: "#F07321",
  },
});

export default styles;
