import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Share,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AddGroupModal from '../../components/AddGroupModal';
import {
  joinGroup,
  leaveGroup,
  subscribeToGroups,
  subscribeToMyGroups,
} from '../../services/groups';
import GroupCard from '../../components/GroupCard';
import LinearGradient from 'react-native-linear-gradient';
import CustomHeader from '../../components/CustomHeader';
import CustomSearch from '../../components/CustomSearch';

function Home({ route }: { route: any }) {
  const { user } = route.params || {};
  const [search, setSearch] = useState('');
  const [allGroups, setAllGroups] = useState([]);
  const [isAddGroupModalVisible, setIsAddGroupModalVisible] = useState(false);
  const [groups, setGroups] = useState([]);
  // const allGroups = useGetAllGroups(user?.uid);
  const headerLeft = (
    <View style={styles.headerLeft}>
      <Image source={{ uri: user?.photoURL }} style={styles.headerImage} />
      <Text style={styles.headerText}>{user?.displayName}</Text>
    </View>
  );

  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerShown: true,
  //     headerTitle: '',
  //     headerStyle: [styles.headerStyle],
  //     headerTitleStyle: styles.headerTitleStyle,
  //     headerLeft: headerLeft,
  //     headerRight: null,
  //     headerSearchBarOptions: {
  //       placeholder: 'Search',
  //       placeholderTextColor: '#000',
  //       searchBarStyle: styles.searchInput,
  //       containerStyle: styles.searchContainer,
  //       onChangeText: (event: any) => {
  //         // Handle search text changes here
  //         console.log('Search text:', event?.nativeEvent?.text);
  //       },
  //     },
  //   });
  // }, [navigation, user, headerLeft]);

  useEffect(() => {
    const unsubscribe = subscribeToMyGroups(user?.uid, updated => {
      if (search?.length > 0) {
        const filteredGroups = updated?.filter((item: any) => {
          return item?.name?.toLowerCase().includes(search?.toLowerCase());
        });
        setGroups(filteredGroups as any);
      } else {
        setGroups(updated as any);
      }
    });

    return () => unsubscribe(); // clean up listeners
  }, [user?.uid, search]);

  useEffect(() => {
    const unsubscribe = subscribeToGroups(user?.uid, updatedGroups => {
      const filteredGroups = updatedGroups?.filter((item: any) => {
        if (search) {
          return (
            item?.name?.toLowerCase().includes(search?.toLowerCase()) &&
            !item?.admin?.includes(user?.uid)
          );
        }
        return !item?.admin?.includes(user?.uid);
      });
      setAllGroups(filteredGroups as any);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [user?.uid, search]);

  const renderGroups = ({ item }: { item: any }) => {
    return (
      <GroupCard
        name={`${item?.name} (${item?.type})`}
        imageUrl={item?.imageUrl}
        description={item?.description}
      />
    );
  };

  const renderAllGroups = ({ item }: { item: any }) => {
    const isJoined = item?.joinedBy?.includes(user?.uid);
    return (
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
        message: 'Check out this awesome group on our app!',
        title: 'Share Group',
        url: `https://your-app-url.com/group/${groupId}`, // Replace with your app's URL
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          console.log('Shared with activity type:', result.activityType);
        } else {
          // shared
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader headerLeft={headerLeft} />
      <CustomSearch
        placeholder="Search"
        onChangeText={text => {
          setSearch(text);
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, marginBottom: 60 }}
      >
        <View style={styles.content}>
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
              keyExtractor={item => item?.id}
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
                  keyExtractor={item => item?.id}
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
          colors={['#f6b300', '#f69400']}
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
      )}
    </SafeAreaView>
  );
}

export default Home;
