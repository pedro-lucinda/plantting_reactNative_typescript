import React, { useState } from "react";
import { View, Text, Image, Platform, Alert } from "react-native";
import { Button } from "../../components/Button";
import { SvgFromUri } from "react-native-svg";
import waterDrop from "../../assets/waterdrop.png";
import { useRoute } from "@react-navigation/core";
import DateTimePicker, { Event } from "@react-native-community/datetimepicker";
import { format, isBefore } from "date-fns";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Params } from "../../types";
import { styles } from "./style";
import { loadPlant, savePlant } from "../../libs/storage";
import { useNavigation } from "@react-navigation/native";

export default function PlantSave() {
  const navigation = useNavigation();
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showDateTimePicker, setShowDateTimePicker] = useState(
    Platform.OS === "ios"
  );
  const route = useRoute();
  const { plant } = route.params as Params;
  function handleChangeDateTime(event: Event, dateTime: Date | undefined) {
    if (Platform.OS === "android") {
      setShowDateTimePicker((oldState) => !oldState);
    }
    if (dateTime && isBefore(dateTime, new Date())) {
      setSelectedDateTime(new Date());
      return Alert.alert("Escolha uma hora no futuro! 🕛");
    }

    if (dateTime) {
      setSelectedDateTime(dateTime);
    }
  }

  function handleOpenDateTimePickerAndroid() {
    setShowDateTimePicker((oldState) => !oldState);
  }

  async function handleSavePlant() {
    try {
      await savePlant({ ...plant, dataTimeNotification: selectedDateTime });
      navigation.navigate("Confirmation", {
        title: "Tudo certo",
        subtitle:
          "Fique tranquilo que sempre vamos lembrar voce de cuidar da sua plantinha com muito cuidado.",
        buttonTitle: "Muito Obrigado :D",
        icon: "hug",
        nextScreen: "MyPlants",
      });
    } catch {
      return Alert.alert("Não foi possível salvar 😢 ");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.plantInfo}>
        <SvgFromUri uri={plant.photo} height={150} width={150} />
        <Text style={styles.plantName}>{plant.name}</Text>
        <Text style={styles.plantAbout}>{plant.about}</Text>
      </View>

      <View style={styles.tipController}>
        <View style={styles.tipContainer}>
          <Image source={waterDrop} style={styles.tipImage} />
          <Text style={styles.tipText}>{plant.water_tips}</Text>
        </View>
      </View>

      <Text style={styles.alertLabel}>
        Ecolha o melhor horário para ser lembrado:
      </Text>
      {showDateTimePicker && (
        <DateTimePicker
          value={selectedDateTime}
          mode="time"
          display="spinner"
          onChange={handleChangeDateTime}
        />
      )}
      {Platform.OS === "android" && (
        <TouchableOpacity
          onPress={handleOpenDateTimePickerAndroid}
          style={styles.dataTimePikerContainer}
        >
          <Text style={styles.dataTimePickerText}>
            {`Mudar ${format(selectedDateTime, "HH:MM")}`}
          </Text>
        </TouchableOpacity>
      )}

      <Button title="Cadastrar Planta" onPress={handleSavePlant} />
    </View>
  );
}
