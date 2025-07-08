import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  TextInput,
  Image,
  ActivityIndicator,
} from "react-native";
import styles from "./styles";
import { createGroup } from "../../services/groups";
import LinearGradient from "react-native-linear-gradient";
import { Dropdown } from "react-native-element-dropdown";
import * as ImagePicker from "react-native-image-picker";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/MaterialIcons";
import { uploadImageToB2 } from "../../services/backblaze";

function AddGroupModal({
  visible,
  onRequestClose,
  userId,
  height,
}: {
  visible: boolean;
  onRequestClose: () => void;
  userId: string;
  height?: number;
}) {
  const [groupType, setGroupType] = useState<"private" | "public">("private");
  const [groupDetails, setGroupDetails] = useState({
    name: "",
    description: "",
    type: "private",
    category: "",
    image: "",
  });
  const [isImageLoading, setIsImageLoading] = useState(false);

  const categoryData = [
    { label: "Active", value: "active" },
    { label: "Challenge", value: "challenge" },
    { label: "Club", value: "club" },
  ];

  const selectImage = async () => {
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      mediaType: "photo" as const,
    };

    ImagePicker.launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        return;
      }
      if (response.assets && response.assets[0].uri) {
        setIsImageLoading(true);
        const image = await uploadImageToB2(
          response.assets[0],
          response?.assets[0]?.fileName || "group.jpg"
        );
        if (image.success) {
          setGroupDetails({ ...groupDetails, image: image.fileUrl! });
        } else {
          setIsImageLoading(false);
          Toast.show({
            text1: "Error",
            text2: "Failed to upload image",
            type: "error",
          });
        }
      }
    });
  };

  const onHandleCreateGroup = () => {
    createGroup(groupDetails, userId).then(() => {
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
      <Pressable
        style={[styles.modalContainer, { height: height }]}
        onPress={onRequestClose}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add Group</Text>

          <Pressable style={styles.imagePickerContainer} onPress={selectImage}>
            {groupDetails.image ? (
              <Image
                source={{ uri: groupDetails.image }}
                style={styles.groupImage}
                onLoadStart={() => console.log("Image loading started")}
                onLoadEnd={() => console.log("Image loading finished")}
              />
            ) : isImageLoading ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Icon name="add-a-photo" size={24} color="#999" />
                <Text style={styles.imagePlaceholderText}>Add Group Photo</Text>
              </View>
            )}
          </Pressable>

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
          <View style={styles.modalInputContainer}>
            <Text style={styles.modalInputLabel}>Group Category</Text>
            <Dropdown
              style={styles.modalInput}
              data={categoryData}
              labelField="label"
              placeholderStyle={styles.placeholderStyle}
              valueField="value"
              placeholder="Select Category"
              containerStyle={styles.modalDropdown}
              itemContainerStyle={styles.dropdownItem}
              value={groupDetails.category}
              onChange={(item) => {
                setGroupDetails({ ...groupDetails, category: item.value });
              }}
            />
          </View>
          <View style={styles.modalInputContainer}>
            <Text style={styles.modalInputLabel}>Group Type</Text>
            <View style={styles.radioContainer}>
              <Pressable
                style={styles.radioButton}
                onPress={() => {
                  setGroupType("private");
                  setGroupDetails({ ...groupDetails, type: "private" });
                }}
              >
                <View style={styles.radioItem}>
                  <View
                    style={[
                      styles.radioItemIcon,
                      groupType === "private" && styles.radioItemSelected,
                    ]}
                  />
                </View>
                <Text>Private</Text>
              </Pressable>

              <Pressable
                style={styles.radioButton}
                onPress={() => {
                  setGroupType("public");
                  setGroupDetails({ ...groupDetails, type: "public" });
                }}
              >
                <View style={styles.radioItem}>
                  <View
                    style={[
                      styles.radioItemIcon,
                      groupType === "public" && styles.radioItemSelected,
                    ]}
                  />
                </View>
                <Text style={styles.radioItemText}>Public</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.modalButtonContainer}>
            <Pressable
              style={styles.modalButton}
              onPress={() => {
                onHandleCreateGroup();
              }}
            >
              <LinearGradient
                colors={["#f6b300", "#f69400"]}
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonText}>Create Group</Text>
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

export default AddGroupModal;
