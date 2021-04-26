import React from "react";
import wateringImg from "../../assets/watering.png";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import {
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  View,
} from "react-native";
import { styles } from "./style";

export function Welcome() {
  const navegation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Gerencie {"\n"}
          suas plantas de {"\n"}
          forma fácil
        </Text>
        <Image source={wateringImg} style={styles.image} resizeMode="contain" />
        <Text style={styles.subTitle}>
          Não esqueça mais de regar suas plantas.{"\n"}
          Nós cuidamos de lembrar você {"\n"}
          sempre que precisar.
        </Text>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={() => navegation.navigate("UserIdentification")}
        >
          <Feather name="chevron-right" style={styles.btnIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
