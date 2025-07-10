import database from "@react-native-firebase/database";

type User = {
  id: string;
  name: string; // adjust fields based on your schema
  // any other fields...
};

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
    .orderByChild("admin")
    .equalTo(userId)
    .once("value");
  if (snapshot.val()) {
    groups = Object.values(snapshot.val());
  }

  return new Promise((resolve) => {
    // Real-time listeners
    groupRef.on("child_added", (snapshot) => {
      if (snapshot.val()?.admin === userId) {
        groups.push(snapshot.val());
        resolve(groups);
      }
    });

    groupRef.on("child_changed", (snapshot) => {
      if (snapshot.val()?.admin === userId) {
        const index = groups.findIndex(
          (group) => group.id === snapshot.val().id
        );
        if (index !== -1) {
          groups[index] = snapshot.val();
          resolve(groups);
        }
      }
    });

    groupRef.on("child_removed", (snapshot) => {
      if (snapshot.val()?.admin === userId) {
        const index = groups.findIndex(
          (group) => group.id === snapshot.val().id
        );
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
  type: string,
  onUpdate: (groups: any[]) => void
) => {
  const groupRef = database().ref("groups/");
  let groups: any[] = [];

  const updateGroups = () => onUpdate([...groups]); // fresh copy on every change

  // Initial fetch
  groupRef
    .orderByChild("admin")
    .equalTo(userId)
    .once("value")
    .then((snapshot) => {
      if (snapshot.val()) {
        const filteredGroups = Object.values(snapshot.val()).filter(
          (group: any) => group.category === type
        );
        groups = filteredGroups;
        updateGroups();
      }
    });

  // Real-time listeners
  const onChildAdded = groupRef.on("child_added", (snapshot) => {
    const group = snapshot.val();
    if (
      group?.admin === userId &&
      !groups.find((g) => g.id === group.id) &&
      group.category === type
    ) {
      groups.push(group);
      updateGroups();
    }
  });

  const onChildChanged = groupRef.on("child_changed", (snapshot) => {
    const updatedGroup = snapshot.val();
    if (updatedGroup?.admin === userId && updatedGroup.category === type) {
      const index = groups.findIndex((g) => g.id === updatedGroup.id);
      if (index !== -1) {
        groups[index] = updatedGroup;
        updateGroups();
      }
    }
  });

  const onChildRemoved = groupRef.on("child_removed", (snapshot) => {
    const removedGroup = snapshot.val();
    if (removedGroup?.admin === userId) {
      groups = groups.filter((g) => g.id !== removedGroup.id);
      updateGroups();
    }
  });

  // Return unsubscribe function to clean up
  return () => {
    groupRef.off("child_added", onChildAdded);
    groupRef.off("child_changed", onChildChanged);
    groupRef.off("child_removed", onChildRemoved);
  };
};

const getGroups = async (_userId: string) => {
  const groupRef = database().ref(`groups/`);
  let groups: any[] = [];

  // Initial fetch
  const snapshot = await groupRef
    .orderByChild("type")
    .equalTo("public")
    .once("value");
  if (snapshot.val()) {
    groups = Object.values(snapshot.val());
  }

  return new Promise((resolve) => {
    // Real-time listeners
    groupRef.on("child_added", (snapshot) => {
      if (snapshot.val()?.type === "public") {
        groups.push(snapshot.val());
        resolve(groups);
      }
    });

    groupRef.on("child_changed", (snapshot) => {
      if (snapshot.val()?.type === "public") {
        const index = groups.findIndex(
          (group) => group.id === snapshot.val().id
        );
        if (index !== -1) {
          groups[index] = snapshot.val();
          resolve(groups);
        }
      }
    });

    groupRef.on("child_removed", (snapshot) => {
      if (snapshot.val()?.type === "public") {
        const index = groups.findIndex(
          (group) => group.id === snapshot.val().id
        );
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
  type: string,
  onUpdate: (groups: any[]) => void
) => {
  const groupRef = database().ref("groups/");
  let groups: any[] = [];

  const updateGroups = () => onUpdate([...groups]); // always return a copy

  // Initial fetch
  groupRef
    .orderByChild("type")
    .equalTo("public")
    .once("value")
    .then((snapshot) => {
      if (snapshot.val()) {
        const filteredGroups = Object.values(snapshot.val()).filter(
          (group: any) => group.category === type
        );
        groups = filteredGroups;
        updateGroups();
      }
    });

  // Real-time listeners
  const onChildAdded = groupRef.on("child_added", (snapshot) => {
    const newGroup = snapshot.val();
    if (
      newGroup?.type === "public" &&
      !groups.find((g) => g.id === newGroup.id) &&
      newGroup.category === type
    ) {
      groups.push(newGroup);
      updateGroups();
    }
  });

  const onChildChanged = groupRef.on("child_changed", (snapshot) => {
    const updatedGroup = snapshot.val();
    if (updatedGroup?.type === "public") {
      const index = groups.findIndex(
        (g) => g.id === updatedGroup.id && updatedGroup.category === type
      );
      if (index !== -1) {
        groups[index] = updatedGroup;
        updateGroups();
      }
    }
  });

  const onChildRemoved = groupRef.on("child_removed", (snapshot) => {
    const removedGroup = snapshot.val();
    if (removedGroup?.type === "public") {
      groups = groups.filter((g) => g.id !== removedGroup.id);
      updateGroups();
    }
  });

  // Return unsubscribe function
  return () => {
    groupRef.off("child_added", onChildAdded);
    groupRef.off("child_changed", onChildChanged);
    groupRef.off("child_removed", onChildRemoved);
  };
};

const joinGroup = async (groupId: string, userId: string) => {
  try {
    const groupRef = database().ref(`groups/${groupId}`);

    // Fetch the current data of the group
    const snapshot = await groupRef.once("value");
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
      console.log("Group joined successfully");
    } else {
      console.log("Group not found");
    }
  } catch (error) {
    console.error("Error joining group:", error);
  }
};

const leaveGroup = async (groupId: string, userId: string) => {
  try {
    const groupRef = database().ref(`groups/${groupId}`);

    // Fetch the current data of the group
    const snapshot = await groupRef.once("value");
    const groupData = snapshot.val();

    if (groupData && groupData.joinedBy) {
      // Remove the user from joinedBy array
      const joinedBy = groupData.joinedBy.filter((id: string) => id !== userId);

      // Update the group data
      await groupRef.update({
        joinedBy,
      });
      console.log("Left group successfully");
    } else {
      console.log("Group not found or user not in group");
    }
  } catch (error) {
    console.error("Error leaving group:", error);
  }
};

const subscribeToGroup = (groupId: string, onUpdate: (group: any) => void) => {
  const groupRef = database().ref(`groups/${groupId}`);

  // Listen for real-time updates
  groupRef.on("value", (snapshot) => {
    onUpdate(snapshot.val());
  });

  // Return unsubscribe function to clean up listener
  return () => {
    groupRef.off("value");
  };
};

const listenToGroupJoinedUsers = (
  groupId: string,
  onUpdate: (users: User[]) => void
): (() => void) => {
  const groupRef = database().ref(`groups/${groupId}`);

  const listener = groupRef.on("value", async (groupSnapshot) => {
    const groupData = groupSnapshot.val();
    if (!groupData?.joinedBy) {
      onUpdate([]);
      return;
    }

    const usersRef = database().ref("users/");

    const userPromises = groupData.joinedBy.map(async (userId: string) => {
      const userSnapshot = await usersRef.child(userId).once("value");
      const userData = userSnapshot.val();
      return userData ? { ...userData, id: userId } : null;
    });

    const users = (await Promise.all(userPromises)).filter((u) => u !== null);
    onUpdate(users as User[]);
  });

  // 🔁 Return a cleanup function to stop listening
  return () => groupRef.off("value", listener);
};

const listenToGroupJoinedUsersId = (
  groupId: string,
  onUpdate: (users: User[]) => void
): (() => void) => {
  const groupRef = database().ref(`groups/${groupId}`);

  const listener = groupRef.on("value", async (groupSnapshot) => {
    const groupData = groupSnapshot.val();
    if (!groupData?.joinedBy) {
      onUpdate([]);
      return;
    }

    onUpdate(groupData.joinedBy);
  });

  // 🔁 Return a cleanup function to stop listening
  return () => groupRef.off("value", listener);
};

const updateGroup = async (groupDetails: any, groupId: string) => {
  const groupRef = database().ref(`groups/${groupId}`);
  await groupRef.update(groupDetails);
};

const deleteGroup = async (groupId: string) => {
  const groupRef = database().ref(`groups/${groupId}`);
  await groupRef.remove();
};

const removeUserFromGroup = async (groupId: string, userId: string) => {
  const groupRef = database().ref(`groups/${groupId}`);
  const snapshot = await groupRef.once("value");
  const groupData = snapshot.val();
  const joinedBy = groupData.joinedBy.filter((id: string) => id !== userId);
  await groupRef.update({
    joinedBy,
  });
};

const updateUserRole = async (
  groupId: string,
  userId: string,
  role: boolean
) => {
  const groupRef = database().ref(`groups/${groupId}`);
  const userRef = database().ref(`users/${userId}`);

  const [groupSnapshot, userSnapshot] = await Promise.all([
    groupRef.once("value"),
    userRef.once("value"),
  ]);

  const groupData = groupSnapshot.val();
  const userData = userSnapshot.val();

  // Initialize arrays if they don't exist
  const moderatedGroups = userData.moderatedGroups || [];
  const moderators = groupData.moderators || [];

  if (role) {
    // Add user as moderator to group
    if (!moderators.includes(userId)) {
      moderators.push(userId);
    }
    // Add group to user's moderated groups
    if (!moderatedGroups.includes(groupId)) {
      moderatedGroups.push(groupId);
    }
  } else {
    // Remove user as moderator from group
    const groupIndex = moderators.indexOf(userId);
    if (groupIndex > -1) {
      moderators.splice(groupIndex, 1);
    }
    // Remove group from user's moderated groups
    const userIndex = moderatedGroups.indexOf(groupId);
    if (userIndex > -1) {
      moderatedGroups.splice(userIndex, 1);
    }
  }

  // Update both references atomically
  await Promise.all([
    groupRef.update({ moderators }),
    userRef.update({ moderatedGroups }),
  ]);
};

export {
  createGroup,
  getMyGroups,
  getGroups,
  joinGroup,
  subscribeToGroups,
  leaveGroup,
  subscribeToMyGroups,
  subscribeToGroup,
  updateGroup,
  deleteGroup,
  listenToGroupJoinedUsers,
  removeUserFromGroup,
  updateUserRole,
  listenToGroupJoinedUsersId,
};
