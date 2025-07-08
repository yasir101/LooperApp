import React, { useState } from "react";
import { View, Text, Modal, Pressable, TextInput } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import styles from "./styles";
import Icon from "react-native-vector-icons/MaterialIcons";

function RoleManagementModal({
  visible,
  onRequestClose,
  onConfirm,
  onCancel,
  height,
  isModerator,
}: {
  visible: boolean;
  onRequestClose: () => void;
  onConfirm: (params: any) => void;
  onCancel: () => void;
  height?: number;
  isModerator: boolean;
}) {
  const [selectedRole, setSelectedRole] = useState<boolean>(isModerator);
  return (
    <Modal
      visible={visible}
      onRequestClose={onRequestClose}
      transparent={true}
      animationType="slide"
      statusBarTranslucent={true}
    >
      <Pressable style={styles.modalContainer} onPress={onRequestClose}>
        <View style={[styles.modalContent, { height: height }]}>
          <Text style={styles.modalTitle}>Role Management</Text>
          <View style={styles.roleContainer}>
            <Pressable
              style={styles.roleOption}
              onPress={() => setSelectedRole(!selectedRole)}
            >
              <LinearGradient
                colors={
                  selectedRole ? ["#f6b300", "#f69400"] : ["#fff", "#fff"]
                }
                style={[
                  styles.checkbox,
                  selectedRole && styles.checkboxSelected,
                ]}
              >
                {selectedRole && (
                  <Icon
                    name="check"
                    size={16}
                    style={{ marginBottom: 3, marginRight: 2 }}
                    color="#fff"
                  />
                )}
              </LinearGradient>
              <Text style={styles.roleText}>Moderator</Text>
            </Pressable>
          </View>

          <View style={styles.modalButtonContainer}>
            <Pressable
              style={styles.modalButton}
              onPress={() => {
                onConfirm(selectedRole);
                onRequestClose();
              }}
            >
              <LinearGradient
                colors={["#f6b300", "#f69400"]}
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonText}>Confirm</Text>
              </LinearGradient>
            </Pressable>
            <Pressable
              style={styles.modalButtonCancel}
              onPress={() => {
                onCancel();
                onRequestClose();
              }}
            >
              <Text style={styles.modalButtonCancelText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

export default RoleManagementModal;
