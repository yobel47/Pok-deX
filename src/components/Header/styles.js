import { StyleSheet } from 'react-native';
import { HEADER_HEIGHT } from '../../constant';

const styles = StyleSheet.create({
  title: {
    height: HEADER_HEIGHT,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default styles;
