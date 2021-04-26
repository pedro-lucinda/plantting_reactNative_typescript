import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { Button } from "../../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./style";
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Alert,
} from "react-native";
import colors from "../../styles/colors";

export function UserIdentification() {
  const navegation = useNavigation();
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [name, setName] = useState<string>();

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!name);
  }
  function handleInputFocus() {
    setIsFocused(true);
  }
  function handleInputChange(value: string) {
    setIsFilled(!!value);
    setName(value);
  }

  async function handleConfirmation() {
    if (!name || name.trim() === "") {
      return Alert.alert("Me diz como chamar você 😅");
    }

    if (name.split("").length > 20 || name.split("").length < 2) {
      return Alert.alert("Numero de caracteres invalido.");
    }

    try {
      await AsyncStorage.setItem("@plantting:user", name);
      navegation.navigate("Confirmation", {
        title: "Prontinho",
        subtitle:
          "Agora vamos comecar a cuidar das suas plantinhas com muito cuidado.",
        buttonTitle: "Comecar",
        icon: "smile",
        nextScreen: "PlantSelect",
      });
    } catch {
      return Alert.alert("Nao foi possivel salvar seu nome :/.");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.form}>
              <View style={styles.header}>
                <Text style={styles.emoji}> {isFilled ? "😎" : "🙂"} </Text>
                <Text style={styles.title}>
                  Como podemos {"\n"} chamar você?
                </Text>
              </View>

              <TextInput
                style={[
                  styles.input,
                  (isFocused || isFilled) && { borderColor: colors.green_700 },
                ]}
                placeholder="Digite o nome"
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                onChangeText={handleInputChange}
              />
              <View style={styles.footer}>
                <Button title="Confirmar" onPress={handleConfirmation} />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
