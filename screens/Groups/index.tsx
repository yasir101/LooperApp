import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Share,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./styles";
import Icon from "react-native-vector-icons/MaterialIcons";
import AddGroupModal from "../../components/AddGroupModal";
import {
  joinGroup,
  leaveGroup,
  subscribeToGroups,
  subscribeToMyGroups,
} from "../../services/groups";
import GroupCard from "../../components/GroupCard";
import LinearGradient from "react-native-linear-gradient";
import CustomHeader from "../../components/CustomHeader";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TopTabNavigator from "../../navigation/TopTabNavigator";

type RootStackParamList = {
  Groups: undefined;
  GroupDetail: { groupId: string };
};

function Groups() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [user, setUser] = useState<any>({});
  const [allGroups, setAllGroups] = useState([]);
  const [isAddGroupModalVisible, setIsAddGroupModalVisible] = useState(false);
  const [groups, setGroups] = useState([]);
  const { height } = Dimensions.get("window");

  useEffect(() => {
    const loadUser = async () => {
      const userData = await AsyncStorage.getItem("user");
      setUser(JSON.parse(userData || "{}"));
    };
    loadUser();
  }, []);

  const headerLeft = (
    <View style={styles.headerLeft}>
      <Image source={{ uri: user?.photoURL }} style={styles.headerImage} />
      <Text style={styles.headerText}>{user?.displayName}</Text>
    </View>
  );

  useEffect(() => {
    const unsubscribe = subscribeToMyGroups(
      user?.uid || "",
      "all",
      (updated) => {
        setGroups(updated as any);
      }
    );

    return () => unsubscribe(); // clean up listeners
  }, [user?.uid]);

  useEffect(() => {
    const unsubscribe = subscribeToGroups(user?.uid, (updatedGroups) => {
      const filteredGroups = updatedGroups?.filter((item: any) => {
        return !item?.admin?.includes(user?.uid);
      });
      setAllGroups(filteredGroups as any);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [user?.uid]);

  const renderGroups = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("GroupDetail", { groupId: item?.id })
        }
      >
        <GroupCard
          name={`${item?.name} (${item?.type})`}
          imageUrl={item?.imageUrl}
          description={item?.description}
        />
      </TouchableOpacity>
    );
  };

  const renderAllGroups = ({ item }: { item: any }) => {
    const isJoined = item?.joinedBy?.includes(user?.uid);
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("GroupDetail", { groupId: item?.id })
        }
      >
        <GroupCard
          name={`${item?.name} (${item?.type})`}
          imageUrl={item?.imageUrl}
          description={item?.description}
          isJoined={isJoined}
          type="join"
          onLeave={() => handleLeaveGroup(item?.id)}
          onJoin={() => handleJoinGroup(item?.id)}
          onExplore={() => {}}
          onShare={() => handleShare(item?.id)}
        />
      </TouchableOpacity>
    );
  };

  const handleJoinGroup = async (groupId: string) => {
    await joinGroup(groupId, user?.uid);
  };

  const handleLeaveGroup = async (groupId: string) => {
    await leaveGroup(groupId, user?.uid);
  };

  const handleShare = async (groupId: string) => {
    try {
      const result = await Share.share({
        message: "Check out this awesome group on our app!",
        title: "Share Group",
        url: `https://your-app-url.com/group/${groupId}`, // Replace with your app's URL
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          console.log("Shared with activity type:", result.activityType);
        } else {
          // shared
          console.log("Shared successfully");
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        console.log("Share dismissed");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader headerLeft={headerLeft} />
      <TopTabNavigator />
      <TouchableOpacity
        style={styles.addGroupButton}
        onPress={() => setIsAddGroupModalVisible(true)}
      >
        <LinearGradient
          colors={["#f6b300", "#f69400"]}
          style={styles.addGroupButton}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
        >
          <Icon name="add" size={24} color="#000" />
        </LinearGradient>
      </TouchableOpacity>
      {isAddGroupModalVisible && (
        <AddGroupModal
          height={height * 1.58}
          visible={isAddGroupModalVisible}
          userId={user?.uid}
          onRequestClose={() => setIsAddGroupModalVisible(false)}
        />
      )}
      {/* <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={[styles.content, { paddingBottom: 80 }]}>
          <View style={styles.groupsContainer}>
            <Text style={styles.groupsTitle}>My Groups</Text>
          </View>
          <View
            style={[
              styles.groupsList,
              {
                height: groups.length > 0 ? 250 : 40,
                opacity: groups.length > 0 ? 1 : 0.5,
              },
            ]}
          >
            <FlatList
              data={groups}
              renderItem={renderGroups}
              keyExtractor={(item) => item?.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>No groups found</Text>
                </View>
              }
              ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
            />
          </View>
          {allGroups.length > 0 && (
            <>
              <View style={styles.groupsContainer}>
                <Text style={styles.groupsTitle}>Explore Groups</Text>
              </View>
              <View
                style={[
                  styles.groupsList,
                  {
                    height: allGroups.length > 0 ? 300 : 40,
                    opacity: allGroups.length > 0 ? 1 : 0.5,
                  },
                ]}
              >
                <FlatList
                  data={allGroups}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  renderItem={renderAllGroups}
                  keyExtractor={(item) => item?.id}
                  ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                      <Text style={styles.emptyText}>No groups found</Text>
                    </View>
                  }
                  ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                />
              </View>
            </>
          )}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.addGroupButton}
        onPress={() => setIsAddGroupModalVisible(true)}
      >
        <LinearGradient
          colors={["#f6b300", "#f69400"]}
          style={styles.addGroupButton}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
        >
          <Icon name="add" size={24} color="#000" />
        </LinearGradient>
      </TouchableOpacity>
      {isAddGroupModalVisible && (
        <AddGroupModal
          visible={isAddGroupModalVisible}
          userId={user?.uid}
          onRequestClose={() => setIsAddGroupModalVisible(false)}
        />
      )} */}
    </SafeAreaView>
  );
}

export default Groups;
