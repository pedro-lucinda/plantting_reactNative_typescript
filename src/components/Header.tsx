import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
//iphone
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import pedro from "../assets/pedro.png";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Header = () => {
  const [userName, setUserName] = useState<string>("");
  useEffect(() => {
    async function loadStorageUserName() {
      const user = await AsyncStorage.getItem("@plantting:user");
      setUserName(user || "");
    }
    loadStorageUserName();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.userName}>{userName}</Text>
      </View>
      <Image source={pedro} style={styles.profileImg} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    marginTop: getStatusBarHeight(),
  },
  profileImg: {
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  greeting: {
    fontSize: 32,
    lineHeight: 40,
    color: colors.heading,
    fontFamily: fonts.text,
  },
  userName: {
    fontSize: 32,
    lineHeight: 36,
    fontWeight: "600",
    color: colors.heading,
    fontFamily: fonts.heading,
  },
});
