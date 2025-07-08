import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Icon from "react-native-vector-icons/MaterialIcons";

const menuItems = [
  {
    label: "Role Management",
    value: "role-management",
    icon: "manage-accounts",
  },
  { label: "Remove User", value: "remove-user", icon: "delete" },
];

const MenuButton = ({
  onRoleManagement,
  onRemoveUser,
  isModerator,
}: {
  onRoleManagement: () => void;
  onRemoveUser: () => void;
  isModerator: boolean;
}) => {
  const [value, setValue] = useState(null);

  const handleSelect = (item: any) => {
    setValue(item.value);

    switch (item.value) {
      case "role-management":
        onRoleManagement();
        break;
      case "remove-user":
        onRemoveUser();
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Dropdown
        style={styles.dropdown}
        data={
          !isModerator
            ? menuItems
            : menuItems.filter((item) => item.value !== "role-management")
        }
        renderRightIcon={() => (
          <Icon
            name="more-vert"
            style={{ position: "absolute", right: 0 }}
            size={20}
            color="#000"
          />
        )}
        labelField="label"
        valueField=""
        placeholder="Select"
        itemContainerStyle={styles.dropdownItem}
        containerStyle={styles.dropdownContainer}
        value={null}
        onChange={handleSelect}
        selectedTextStyle={{ display: "none" }}
      />
    </View>
  );
};

export default MenuButton;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 0,
    top: 7,
  },
  dropdown: {
    width: 175,
    height: 40,
  },
  dropdownContainer: {
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#f0f0f0",
    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
  },
  dropdownItem: {
    height: 53,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 5,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  dropdownItemText: {
    fontSize: 14,
    fontWeight: "400",
  },
});
