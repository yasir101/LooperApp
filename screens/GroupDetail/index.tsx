import React, { useEffect, useState } from "react";
import styles from "./styles";
import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import {
  deleteGroup,
  listenToGroupJoinedUsers,
  removeUserFromGroup,
  subscribeToGroup,
  updateUserRole,
} from "../../services/groups";
import Icon from "react-native-vector-icons/MaterialIcons";
import EditGroupModal from "../../components/EditGroupModal";
import DeleteAlert from "../../components/DeleteAlert";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import MenuButton from "../../components/MenuButton";
import RoleManagementModal from "../../components/RoleManagementModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomTabs from "../../components/CustomTabs";
import PostsScreen from "../Posts";

type NavigationProp = StackNavigationProp<any>;

const GroupDetail = ({ route }: { route: any }) => {
  const { groupId } = route.params;
  const navigation = useNavigation<NavigationProp>();
  const [userData, setUserData] = useState<any>(null);
  const [group, setGroup] = useState<any>(null);
  const [groupJoinedUsers, setGroupJoinedUsers] = useState<any>([]);
  const [isRoleManagementModalVisible, setIsRoleManagementModalVisible] =
    useState(false);
  const [
    isRemoveUserFromGroupModalVisible,
    setIsRemoveUserFromGroupModalVisible,
  ] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isEditGroupModalVisible, setIsEditGroupModalVisible] = useState(false);
  const [isDeleteGroupModalVisible, setIsDeleteGroupModalVisible] =
    useState(false);
  const [activeTab, setActiveTab] = useState("Followers");

  useEffect(() => {
    const unsubscribe = subscribeToGroup(groupId, (updatedGroup) => {
      setGroup(updatedGroup);
    });

    return () => unsubscribe();
  }, [groupId]);

  useEffect(() => {
    const loadUser = async () => {
      const userStr = await AsyncStorage.getItem("user");
      if (userStr) {
        setUserData(JSON.parse(userStr));
      }
    };
    loadUser();
  }, []);
  console.log("activeTab", activeTab);
  console.log("groupId", groupId);

  useEffect(() => {
    const unsubscribe = listenToGroupJoinedUsers(groupId, setGroupJoinedUsers);

    return () => {
      unsubscribe();
    };
  }, [groupId]);

  console.log("groupJoinedUsers", groupJoinedUsers);

  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
      <View style={styles.content}>
        {group?.image ? (
          <Image
            source={{ uri: group?.image }}
            style={styles.groupImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.groupImage}>
            <View style={styles.groupImageIcon}>
              <Icon name="group" size={25} color="#000" />
            </View>
          </View>
        )}

        <View style={styles.groupNameContainer}>
          <Text style={styles.groupName}>
            {group?.name}
            <Text style={styles.groupTypeText}>({group?.type})</Text>
          </Text>
          <View style={styles.editIconContainer}>
            {(group?.admin === userData?.uid ||
              group?.moderators?.includes(userData?.uid)) && (
              <Pressable onPress={() => setIsEditGroupModalVisible(true)}>
                <Icon name="edit" size={20} color="#000" />
              </Pressable>
            )}
            {group?.admin === userData?.uid && (
              <Pressable onPress={() => setIsDeleteGroupModalVisible(true)}>
                <Icon name="delete" size={20} color="#000" />
              </Pressable>
            )}
          </View>
        </View>

        <Text style={styles.groupDescription}>{group?.description}</Text>

        <View style={styles.membersContainer}>
          <CustomTabs
            onTabChange={(tab) => setActiveTab(tab)}
            tabs={["Followers", "Posts"]}
          />

          {activeTab === "Followers" ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.membersList}
            >
              {groupJoinedUsers?.length > 0 ? (
                groupJoinedUsers.map((member: any, index: number) => {
                  return (
                    <View key={index} style={styles.memberItemContainer}>
                      <View style={styles.memberItemImageContainer}>
                        <Image
                          source={{ uri: member.photoURL }}
                          style={styles.memberItemImage}
                        />
                        <View style={styles.memberItemNameContainer}>
                          <Text style={styles.memberItemName}>
                            {member?.id === userData?.uid ? "You" : member.name}
                          </Text>
                          {member?.moderatedGroups?.includes(groupId) && (
                            <Text style={styles.memberItemRole}>Moderator</Text>
                          )}
                        </View>
                      </View>
                      {(group?.admin === userData?.uid ||
                        !group?.moderators?.includes(userData?.uid)) && (
                        <MenuButton
                          isModerator={group?.moderators?.includes(
                            userData?.uid
                          )}
                          onRoleManagement={() => {
                            setIsRoleManagementModalVisible(true);
                            setSelectedUser(member);
                          }}
                          onRemoveUser={() => {
                            setSelectedUser(member);
                            setIsRemoveUserFromGroupModalVisible(true);
                          }}
                        />
                      )}
                    </View>
                  );
                })
              ) : (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>No members found</Text>
                </View>
              )}
            </ScrollView>
          ) : (
            <View style={styles.postsContainer}>
              <PostsScreen groupId={groupId} />
            </View>
          )}
        </View>
      </View>
      {/* </ScrollView> */}
      {isEditGroupModalVisible && (
        <EditGroupModal
          visible={isEditGroupModalVisible}
          onRequestClose={() => setIsEditGroupModalVisible(false)}
          groupId={groupId}
          group={group}
        />
      )}
      {isDeleteGroupModalVisible && (
        <DeleteAlert
          visible={isDeleteGroupModalVisible}
          onRequestClose={() => setIsDeleteGroupModalVisible(false)}
          title="Delete Group"
          onConfirm={() => {
            deleteGroup(groupId);
            navigation.navigate("Groups", { screen: "Groups" });
          }}
          onCancel={() => setIsDeleteGroupModalVisible(false)}
          description="Are you sure you want to delete this group?"
        />
      )}
      {isRemoveUserFromGroupModalVisible && (
        <DeleteAlert
          height={240}
          visible={isRemoveUserFromGroupModalVisible}
          onRequestClose={() => setIsRemoveUserFromGroupModalVisible(false)}
          title="Remove User from Group"
          onConfirm={() => {
            removeUserFromGroup(groupId, selectedUser?.id);
            setIsRemoveUserFromGroupModalVisible(false);
          }}
          onCancel={() => setIsRemoveUserFromGroupModalVisible(false)}
          description="Are you sure you want to remove this user from the group?"
        />
      )}
      {isRoleManagementModalVisible && (
        <RoleManagementModal
          visible={isRoleManagementModalVisible}
          isModerator={selectedUser?.moderatedGroups?.includes(groupId)}
          onRequestClose={() => setIsRoleManagementModalVisible(false)}
          onConfirm={(value) => {
            updateUserRole(groupId, selectedUser?.id, value);
            setIsRoleManagementModalVisible(false);
          }}
          onCancel={() => {
            setIsRoleManagementModalVisible(false);
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default GroupDetail;
