import { StyleSheet } from "react-native";
import { colors, fonts } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  logOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logOutText: {
    fontSize: 15,
    fontFamily: fonts.regular,
    color: colors.white,
    marginRight: 20,
  }
})