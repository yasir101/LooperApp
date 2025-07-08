import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import styles from "./styles";

const SegmentedTabs = ({
  tabs,
  onTabChange,
}: {
  tabs: string[];
  onTabChange: (tab: string) => void;
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableWithoutFeedback
            key={tab}
            onPress={() => {
              setActiveTab(tab);
              onTabChange(tab);
            }}
          >
            <View style={[styles.tab, activeTab === tab && styles.activeTab]}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    </View>
  );
};

export default SegmentedTabs;
