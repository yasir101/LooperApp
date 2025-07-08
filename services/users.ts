import database from "@react-native-firebase/database";

const setUser = async (userId: string, userData: any) => {
  const userRef = database()?.ref(`users/`);
  const userSnapshot = await userRef?.child(userId!)?.once("value");

  if (!userSnapshot?.exists()) {
    await userRef?.child(userId!)?.set({
      name: userData?._user?.displayName,
      email: userData?._user?.email,
      photoURL: userData?._user?.photoURL,
      id: userId,
    });
  }
};

const getUser = async (userId: string) => {
  const userRef = database()?.ref(`users/`);
  const userSnapshot = await userRef?.child(userId!)?.once("value");
  return JSON.stringify(userSnapshot?.val());
};

export { setUser, getUser };
