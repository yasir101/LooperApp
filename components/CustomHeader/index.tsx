import { View } from 'react-native';
import { styles } from './styles';

function CustomHeader({
  headerLeft,
  headerRight,
}: {
  headerLeft: any;
  headerRight?: any;
}) {
  return (
    <View style={styles.container}>
      {headerLeft}
      {headerRight}
    </View>
  );
}

export default CustomHeader;
