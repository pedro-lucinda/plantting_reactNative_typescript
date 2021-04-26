import { StyleSheet } from "react-native";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: "100%",
  },
  header: {
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: fonts.heading,
    fontWeight: "500",
    fontSize: 17,
    lineHeight: 23,
    color: colors.heading,
    marginTop: 15,
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 23,
    color: colors.heading,
  },
  environmentList: {
    height: 40,
    justifyContent: "center",
    padding: 5,
    marginLeft: 32,
    marginVertical: 32,
  },
  plantsList: {
    paddingHorizontal: 10,
    height: "100%",
  },
});
