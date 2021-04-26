import { Dimensions, StyleSheet } from "react-native";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.heading,
    fontFamily: fonts.heading,
    marginTop: 20,
  },
  subTitle: {
    textAlign: "center",
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading,
    fontFamily: fonts.text,
  },

  image: {
    height: Dimensions.get("window").width * 0.7,
  },
  button: {
    backgroundColor: colors.green_800,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    width: 56,
    height: 56,
  },
  btnIcon: {
    color: colors.white,
    fontSize: 32,
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});
