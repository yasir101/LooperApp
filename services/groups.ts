import database from '@react-native-firebase/database';

const createGroup = async (groupDetails: any, userId: string) => {
  const groupRef = database().ref(`groups/`);
  const groupId = groupRef.push().key;
  await groupRef.child(groupId!).set({
    ...groupDetails,
    id: groupId,
    admin: userId,
  });
};

const getMyGroups = async (userId: string) => {
  const groupRef = database().ref(`groups/`);
  let groups: any[] = [];

  // Initial fetch
  const snapshot = await groupRef
    .orderByChild('admin')
    .equalTo(userId)
    .once('value');
  if (snapshot.val()) {
    groups = Object.values(snapshot.val());
  }

  return new Promise(resolve => {
    // Real-time listeners
    groupRef.on('child_added', snapshot => {
      if (snapshot.val()?.admin === userId) {
        groups.push(snapshot.val());
        resolve(groups);
      }
    });

    groupRef.on('child_changed', snapshot => {
      if (snapshot.val()?.admin === userId) {
        const index = groups.findIndex(group => group.id === snapshot.val().id);
        if (index !== -1) {
          groups[index] = snapshot.val();
          resolve(groups);
        }
      }
    });

    groupRef.on('child_removed', snapshot => {
      if (snapshot.val()?.admin === userId) {
        const index = groups.findIndex(group => group.id === snapshot.val().id);
        if (index !== -1) {
          groups.splice(index, 1);
          resolve(groups);
        }
      }
    });

    // Resolve immediately with initial data
    resolve(groups);
  });
};

const subscribeToMyGroups = (
  userId: string,
  onUpdate: (groups: any[]) => void,
) => {
  const groupRef = database().ref('groups/');
  let groups: any[] = [];

  const updateGroups = () => onUpdate([...groups]); // fresh copy on every change

  // Initial fetch
  groupRef
    .orderByChild('admin')
    .equalTo(userId)
    .once('value')
    .then(snapshot => {
      if (snapshot.val()) {
        groups = Object.values(snapshot.val());
        updateGroups();
      }
    });

  // Real-time listeners
  const onChildAdded = groupRef.on('child_added', snapshot => {
    const group = snapshot.val();
    if (group?.admin === userId && !groups.find(g => g.id === group.id)) {
      groups.push(group);
      updateGroups();
    }
  });

  const onChildChanged = groupRef.on('child_changed', snapshot => {
    const updatedGroup = snapshot.val();
    if (updatedGroup?.admin === userId) {
      const index = groups.findIndex(g => g.id === updatedGroup.id);
      if (index !== -1) {
        groups[index] = updatedGroup;
        updateGroups();
      }
    }
  });

  const onChildRemoved = groupRef.on('child_removed', snapshot => {
    const removedGroup = snapshot.val();
    if (removedGroup?.admin === userId) {
      groups = groups.filter(g => g.id !== removedGroup.id);
      updateGroups();
    }
  });

  // Return unsubscribe function to clean up
  return () => {
    groupRef.off('child_added', onChildAdded);
    groupRef.off('child_changed', onChildChanged);
    groupRef.off('child_removed', onChildRemoved);
  };
};

const getGroups = async (_userId: string) => {
  const groupRef = database().ref(`groups/`);
  let groups: any[] = [];

  // Initial fetch
  const snapshot = await groupRef
    .orderByChild('type')
    .equalTo('public')
    .once('value');
  if (snapshot.val()) {
    groups = Object.values(snapshot.val());
  }

  return new Promise(resolve => {
    // Real-time listeners
    groupRef.on('child_added', snapshot => {
      if (snapshot.val()?.type === 'public') {
        groups.push(snapshot.val());
        resolve(groups);
      }
    });

    groupRef.on('child_changed', snapshot => {
      if (snapshot.val()?.type === 'public') {
        const index = groups.findIndex(group => group.id === snapshot.val().id);
        if (index !== -1) {
          groups[index] = snapshot.val();
          resolve(groups);
        }
      }
    });

    groupRef.on('child_removed', snapshot => {
      if (snapshot.val()?.type === 'public') {
        const index = groups.findIndex(group => group.id === snapshot.val().id);
        if (index !== -1) {
          groups.splice(index, 1);
          resolve(groups);
        }
      }
    });

    // Resolve immediately with initial data
    resolve(groups);
  });
};

const subscribeToGroups = (
  _userId: string,
  onUpdate: (groups: any[]) => void,
) => {
  const groupRef = database().ref('groups/');
  let groups: any[] = [];

  const updateGroups = () => onUpdate([...groups]); // always return a copy

  // Initial fetch
  groupRef
    .orderByChild('type')
    .equalTo('public')
    .once('value')
    .then(snapshot => {
      if (snapshot.val()) {
        groups = Object.values(snapshot.val());
        updateGroups();
      }
    });

  // Real-time listeners
  const onChildAdded = groupRef.on('child_added', snapshot => {
    const newGroup = snapshot.val();
    if (
      newGroup?.type === 'public' &&
      !groups.find(g => g.id === newGroup.id)
    ) {
      groups.push(newGroup);
      updateGroups();
    }
  });

  const onChildChanged = groupRef.on('child_changed', snapshot => {
    const updatedGroup = snapshot.val();
    if (updatedGroup?.type === 'public') {
      const index = groups.findIndex(g => g.id === updatedGroup.id);
      if (index !== -1) {
        groups[index] = updatedGroup;
        updateGroups();
      }
    }
  });

  const onChildRemoved = groupRef.on('child_removed', snapshot => {
    const removedGroup = snapshot.val();
    if (removedGroup?.type === 'public') {
      groups = groups.filter(g => g.id !== removedGroup.id);
      updateGroups();
    }
  });

  // Return unsubscribe function
  return () => {
    groupRef.off('child_added', onChildAdded);
    groupRef.off('child_changed', onChildChanged);
    groupRef.off('child_removed', onChildRemoved);
  };
};

const joinGroup = async (groupId: string, userId: string) => {
  try {
    const groupRef = database().ref(`groups/${groupId}`);

    // Fetch the current data of the group
    const snapshot = await groupRef.once('value');
    const groupData = snapshot.val();

    if (groupData) {
      // Prepare the new values for joinedBy and members arrays
      const joinedBy = groupData.joinedBy
        ? [...groupData.joinedBy, userId]
        : [userId];

      // Update the group data
      await groupRef.update({
        joinedBy,
      });
      console.log('Group joined successfully');
    } else {
      console.log('Group not found');
    }
  } catch (error) {
    console.error('Error joining group:', error);
  }
};

const leaveGroup = async (groupId: string, userId: string) => {
  try {
    const groupRef = database().ref(`groups/${groupId}`);

    // Fetch the current data of the group
    const snapshot = await groupRef.once('value');
    const groupData = snapshot.val();

    if (groupData && groupData.joinedBy) {
      // Remove the user from joinedBy array
      const joinedBy = groupData.joinedBy.filter((id: string) => id !== userId);

      // Update the group data
      await groupRef.update({
        joinedBy,
      });
      console.log('Left group successfully');
    } else {
      console.log('Group not found or user not in group');
    }
  } catch (error) {
    console.error('Error leaving group:', error);
  }
};

export {
  createGroup,
  getMyGroups,
  getGroups,
  joinGroup,
  subscribeToGroups,
  leaveGroup,
  subscribeToMyGroups,
};
