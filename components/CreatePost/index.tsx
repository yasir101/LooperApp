import React, { JSX, useEffect, useState } from "react";
import { View, TextInput, TouchableOpacity, Text, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { styles } from "./styles";
import { uploadImageToB2 } from "../../services/backblaze";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import * as ImagePicker from "react-native-image-picker";
import LinearGradient from "react-native-linear-gradient";

type CreatePostProps = {
  onSubmit: (content: string, image: string) => void;
  groupId?: string;
  isEdit?: boolean;
  post?: any;
  onCancel?: () => void;
};

const CreatePost: React.FC<CreatePostProps> = ({
  onSubmit,
  groupId,
  isEdit,
  post,
  onCancel,
}) => {
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<ImagePicker.Asset | null>(
    null
  );
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const chooseImage = async () => {
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
        setSelectedImage(response.assets[0]);
      }
    });
  };

  useEffect(() => {
    if (!content.trim() && !selectedImage) {
      onCancel?.();
    }
  }, [content, selectedImage]);

  const createPost = async () => {
    if (selectedImage === null) {
      return;
    }
    setIsLoading(true);
    const image = await uploadImageToB2(
      selectedImage,
      selectedImage.fileName || "post.jpg"
    );
    if (image.success) {
      setImageUri(image.fileUrl!);
      onSubmit(content.trim(), image.fileUrl!);
      setSelectedImage(null);
      setImageUri(null);
      setContent("");
    } else {
      setIsLoading(false);
      Toast.show({
        text1: "Error",
        text2: "Failed to upload image",
        type: "error",
      });
    }
  };

  const updatePost = async () => {
    setIsLoading(true);
    if (selectedImage && selectedImage.uri !== post.imageUrl) {
      setImageUri(null);
      const image = await uploadImageToB2(
        selectedImage!,
        selectedImage!.fileName || "post.jpg"
      );
      if (image.success) {
        setImageUri(image.fileUrl!);
        if (image.fileUrl) {
          onSubmit(content.trim(), image.fileUrl!);
          setSelectedImage(null);
          setImageUri(null);
          setContent("");
        } else {
          setIsLoading(false);
          Toast.show({
            text1: "Error",
            text2: "Failed to upload image",
            type: "error",
          });
        }
      }
    } else {
      onSubmit(content.trim(), post.imageUrl!);
      setSelectedImage(null);
      setImageUri(null);
      setContent("");
    }
  };

  useEffect(() => {
    if (post && isEdit) {
      setContent(post.content);
      setImageUri(post.imageUrl);
      setSelectedImage({
        uri: post.imageUrl,
        fileName: post.imageUrl.split("/").pop(),
      });
    }
  }, [post, isEdit]);

  return (
    <View style={styles.container}>
      {selectedImage && (
        <View style={styles.imagePreview}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: selectedImage.uri }}
              style={styles.previewImage}
            />
            <TouchableOpacity
              style={styles.removeImage}
              onPress={() => setSelectedImage(null)}
            >
              <Icon name="close" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      )}
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={setContent}
        placeholder="What's on your mind?"
        multiline
        maxLength={500}
      />
      <View style={styles.footer}>
        <TouchableOpacity onPress={chooseImage}>
          <LinearGradient
            colors={["rgba(246, 179, 0, 1)", "rgba(246, 148, 0, 0.5)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.imageButton}
          >
            <Icon name="image" size={24} color="#666" />
          </LinearGradient>
        </TouchableOpacity>
        <Text style={styles.counter}>{content.length}/500</Text>
        <TouchableOpacity
          style={[
            styles.submitButton,
            !content.trim() && !selectedImage && styles.submitButtonDisabled,
          ]}
          onPress={isEdit ? updatePost : createPost}
          disabled={!content.trim() && !selectedImage}
        >
          <Icon
            name="send"
            size={24}
            color={content.trim() || selectedImage ? "#fff" : "#999"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreatePost;
