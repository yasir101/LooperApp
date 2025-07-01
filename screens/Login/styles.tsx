import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFEF9',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 25,
  },
  logo: {
    width: 300,
    height: 300,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: 240,
    borderWidth: 1,
    borderColor: '#d9d9d9',
  },
  googleText: {
    color: '#444',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '500',
  },
  googleIcon: {
    width: 20,
    height: 20,
  },
  appleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: 240,
  },
  appleText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '500',
  },
  appleIcon: {
    width: 20,
    height: 20,
  },
});
export default styles;
