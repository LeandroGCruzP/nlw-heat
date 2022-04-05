import { StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { colors } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    width: '110%',
    height: 184,
    backgroundColor: colors.black_tertiary,
    paddingBottom: getBottomSpace() + 16,
    paddingTop: 16,
    paddingHorizontal: 24,
  },

  input: {
    width: '100%',
    height: 88,
    textAlignVertical: 'top',
    color: colors.white
  },
})
