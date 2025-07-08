import React, { useState } from "react";
import { View, Text, Modal, Pressable, TextInput } from "react-native";
import styles from "./styles";
import { updateGroup } from "../../services/groups";
import LinearGradient from "react-native-linear-gradient";

function EditGroupModal({
  visible,
  onRequestClose,
  title,
  onConfirm,
  onCancel,
  description,
  height,
}: {
  visible: boolean;
  onRequestClose: () => void;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  description: string;
  height?: number;
}) {
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
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalDescription}>{description}</Text>
          <View style={styles.modalButtonContainer}>
            <Pressable
              style={styles.modalButton}
              onPress={() => {
                onConfirm();
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

export default EditGroupModal;
