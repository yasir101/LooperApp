import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  groupImage: {
    width: "100%",
    height: 200,
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  groupNameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  editIconContainer: {
    alignSelf: "flex-end",
    paddingBottom: 2,
    marginLeft: 10,
    flexDirection: "row",
    gap: 10,
  },
  groupTypeText: {
    fontSize: 16,
    color: "#888",
    fontWeight: "bold",
  },
  groupName: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 16,
  },
  groupDescription: {
    fontSize: 16,
    marginTop: 16,
  },
  membersContainer: {
    marginTop: 24,
  },
  membersTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: width - 32,
    height: height - 510,
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
  },
  groupType: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
  groupImageIcon: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgray",
    borderRadius: 30,
  },
  membersList: {
    marginTop: 0,
  },
  memberItem: {
    width: "100%",
    marginBottom: 10,
  },
  memberItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: width - 32,
  },
  memberItemImage: {
    width: 35,
    height: 35,
    borderRadius: 20,
  },
  memberItemName: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 10,
  },
  memberItemNameContainer: {
    gap: 5,
  },
  memberItemRole: {
    fontSize: 12,
    color: "#888",
    marginLeft: 10,
  },
  memberItemImageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  memberImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  memberName: {
    fontSize: 14,
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "40%",
    marginTop: 10,
    marginLeft: 20,
    backgroundColor: "#F07321",
  },
  tab: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
  },
  activeTab: {
    backgroundColor: "#F07321",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
  },
  activeTabText: {
    color: "#000",
  },
  tabRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: width - 32,
  },
  animatedIndicator: {
    height: 2,
    backgroundColor: "#000",
    position: "absolute",
    bottom: 0,
  },
  customTabBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
  },
  postsContainer: {
    height: height - 510,
    marginTop: 24,
  },
});

export default styles;
