import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { SvgUri } from "react-native-svg";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface PlantsProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
    hour: string;
  };
}

export function PlantCardSecondary({ data, ...rest }: PlantsProps) {
  return (
    <RectButton style={styles.container} {...rest}>
      <SvgUri width={70} height={70} uri={data?.photo} />
      <Text style={styles.title}>{data?.name}</Text>
      <View style={styles.details}>
        <Text style={styles.timeLabel}>Regas às</Text>
        <Text style={styles.time}>{data.hour}</Text>
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 25,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.shape,
    marginVertical: 5,
  },
  title: {
    flex: 1,
    marginLeft: 10,
    color: colors.green_700,
    fontFamily: fonts.heading,
    fontSize: 17,
  },
  details: {
    alignItems: "flex-end",
  },
  timeLabel: {
    fontSize: 16,
    fontFamily: fonts.text,
    color: colors.body_light,
  },
  time: {
    marginTop: 5,
    fontSize: 16,
    fontFamily: fonts.heading,
    color: colors.green_800,
  },
});
