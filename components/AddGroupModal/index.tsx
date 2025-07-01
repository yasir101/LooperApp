import React, { useState } from 'react';
import { View, Text, Modal, Pressable, TextInput } from 'react-native';
import styles from './styles';
import { createGroup } from '../../services/groups';
import LinearGradient from 'react-native-linear-gradient';

function AddGroupModal({
  visible,
  onRequestClose,
  userId,
}: {
  visible: boolean;
  onRequestClose: () => void;
  userId: string;
}) {
  const [groupType, setGroupType] = useState<'private' | 'public'>('private');
  const [groupDetails, setGroupDetails] = useState({
    name: '',
    description: '',
    type: 'private',
  });

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
      <Pressable style={styles.modalContainer} onPress={onRequestClose}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add Group</Text>
          <View style={styles.modalInputContainer}>
            <Text style={styles.modalInputLabel}>Group Name</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter Group Name"
              value={groupDetails.name}
              onChangeText={text =>
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
              onChangeText={text =>
                setGroupDetails({ ...groupDetails, description: text })
              }
            />
          </View>
          <View style={styles.modalInputContainer}>
            <Text style={styles.modalInputLabel}>Group Type</Text>
            <View style={styles.radioContainer}>
              <Pressable
                style={styles.radioButton}
                onPress={() => {
                  setGroupType('private');
                  setGroupDetails({ ...groupDetails, type: 'private' });
                }}
              >
                <View style={styles.radioItem}>
                  <View
                    style={[
                      styles.radioItemIcon,
                      groupType === 'private' && styles.radioItemSelected,
                    ]}
                  />
                </View>
                <Text>Private</Text>
              </Pressable>

              <Pressable
                style={styles.radioButton}
                onPress={() => {
                  setGroupType('public');
                  setGroupDetails({ ...groupDetails, type: 'public' });
                }}
              >
                <View style={styles.radioItem}>
                  <View
                    style={[
                      styles.radioItemIcon,
                      groupType === 'public' && styles.radioItemSelected,
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
                colors={['#f6b300', '#f69400']}
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
