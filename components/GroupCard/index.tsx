import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon2 from 'react-native-vector-icons/Feather';
import { styles } from './styles';
import LinearGradient from 'react-native-linear-gradient';

const GroupCard = ({
  name,
  imageUrl,
  description,
  onJoin,
  onExplore,
  type,
  isJoined,
  onLeave,
  onShare,
}: {
  name: string;
  imageUrl: string;
  description: string;
  onJoin?: () => void;
  onExplore?: () => void;
  type?: string;
  isJoined?: boolean;
  onLeave?: () => void;
  onShare?: () => void;
}) => {
  return (
    <View style={[styles.card]}>
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }} // Replace with your actual image URI
          style={styles.image}
        />
      ) : (
        <View style={styles.imagePlaceholder}>
          <View style={styles.imagePlaceholderIcon}>
            <Icon2 name="users" size={24} color="#898989" />
          </View>
        </View>
      )}
      <Text style={styles.heading}>{name}</Text>
      <Text style={styles.subheading}>{description}</Text>
      {type === 'join' && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={isJoined ? onLeave : onJoin}>
            <LinearGradient
              colors={['#f6b300', '#f69400']}
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={styles.joinButton}
            >
              {isJoined ? (
                <Text style={styles.joinButtonText}>Leave</Text>
              ) : (
                <Text style={styles.joinButtonText}>Join</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.exploreButton}
            onPress={isJoined ? onShare : onExplore}
          >
            <Text style={styles.exploreButtonText}>
              {isJoined ? 'Share' : 'Explore'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default GroupCard;
