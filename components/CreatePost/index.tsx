import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { styles } from "./styles";

type CreatePostProps = {
  onSubmit: (content: string) => void;
  groupId?: string;
};

const CreatePost: React.FC<CreatePostProps> = ({ onSubmit, groupId }) => {
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content.trim());
      setContent("");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={setContent}
        placeholder="What's on your mind?"
        multiline
        maxLength={500}
      />
      <View style={styles.footer}>
        <Text style={styles.counter}>{content.length}/500</Text>
        <TouchableOpacity
          style={[
            styles.submitButton,
            !content.trim() && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={!content.trim()}
        >
          <Icon
            name="send"
            size={24}
            color={content.trim() ? "#fff" : "#999"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreatePost;
