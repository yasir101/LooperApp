import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // Feather provides the search icon

const CustomSearch = ({
  placeholder = 'Search',
  onChangeText,
}: {
  placeholder: string;
  onChangeText: (text: string) => void;
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#d9d9d9"
        onChangeText={onChangeText}
        style={styles.input}
      />
      <Icon name="search" size={22} color="#d9d9d9" style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#f5aa2f',
    borderRadius: 50,
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 45,
    backgroundColor: '#fff',
    margin: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#5C3B00',
  },
  icon: {
    marginLeft: 8,
  },
});

export default CustomSearch;
