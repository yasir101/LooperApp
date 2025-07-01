import { TouchableOpacity, Image, Text } from 'react-native';

interface AuthButtonProps {
  onPress: () => void;
  icon: any;
  text: string;
  style: object;
  textStyle: object;
  iconStyle: object;
}

export const AuthButton: React.FC<AuthButtonProps> = ({
  onPress,
  icon,
  text,
  style,
  textStyle,
  iconStyle,
}) => (
  <TouchableOpacity onPress={onPress} style={style}>
    <Image source={icon} style={iconStyle} />
    <Text style={textStyle}>{text}</Text>
  </TouchableOpacity>
);
