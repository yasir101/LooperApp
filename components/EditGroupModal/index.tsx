import React, { useEffect, useState } from "react";
import { View, Text, Modal, Pressable, TextInput } from "react-native";
import styles from "./styles";
import { updateGroup } from "../../services/groups";
import LinearGradient from "react-native-linear-gradient";

function EditGroupModal({
  visible,
  onRequestClose,
  groupId,
  group,
}: {
  visible: boolean;
  onRequestClose: () => void;
  groupId: string;
  group: any;
}) {
  const [groupDetails, setGroupDetails] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    setGroupDetails({
      name: group?.name,
      description: group?.description,
    });
  }, [group]);

  const onHandleUpdateGroup = () => {
    updateGroup(
      {
        name: groupDetails.name || group?.name,
        description: groupDetails.description || group?.description,
      },
      groupId
    ).then(() => {
      onRequestClose();
    });
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={onRequestClose}
      transparent={true}
      animationType="slide"
      statusBarTranslucent={true}
    >
      <Pressable style={styles.modalContainer} onPress={onRequestClose}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Edit Group</Text>
          <View style={styles.modalInputContainer}>
            <Text style={styles.modalInputLabel}>Group Name</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter Group Name"
              value={groupDetails.name}
              onChangeText={(text) =>
                setGroupDetails({ ...groupDetails, name: text })
              }
            />
          </View>
          <View style={styles.modalInputContainer}>
            <Text style={styles.modalInputLabel}>Group Description</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter Group Description"
              value={groupDetails.description}
              onChangeText={(text) =>
                setGroupDetails({ ...groupDetails, description: text })
              }
            />
          </View>
          <View style={styles.modalButtonContainer}>
            <Pressable
              style={styles.modalButton}
              onPress={() => {
                onHandleUpdateGroup();
              }}
            >
              <LinearGradient
                colors={["#f6b300", "#f69400"]}
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonText}>Update Group</Text>
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

export default EditGroupModal;
