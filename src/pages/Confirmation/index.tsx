import { useNavigation, useRoute } from "@react-navigation/core";
import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { Button } from "../../components/Button";
import { ConfirmationProps } from "../../types";
import { styles } from "./style";

const emojis = {
  smile: "😄",
  hug: "🤗",
};

export const Confirmation = () => {
  const navegation = useNavigation();
  const routes = useRoute();

  const {
    title,
    subtitle,
    buttonTitle,
    icon,
    nextScreen,
  } = routes.params as ConfirmationProps;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}> {emojis[icon]} </Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <View style={styles.footer}>
          <Button
            title={buttonTitle}
            onPress={() => navegation.navigate(nextScreen)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
