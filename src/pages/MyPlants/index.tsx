import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Header } from "../../components/Header";
import { styles } from "./style";
import waterdrop from "../../assets/waterdrop.png";
import { Plant } from "../../types";
import { loadPlant } from "../../libs/storage";
import { formatDistance } from "date-fns/esm";
import { pt } from "date-fns/locale";
import { PlantCardSecondary } from "../../components/PlantCardSecondary";
import { Load } from "../../components/Load";

export default function index() {
  const [myPlants, setMyPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWaterd, setNextWaterd] = useState<string>();

  useEffect(() => {
    async function loadStoraged() {
      const plantStorage = await loadPlant();

      const nextTime = formatDistance(
        new Date(plantStorage[0].dataTimeNotification).getTime(),
        new Date().getTime(),
        { locale: pt }
      );

      setNextWaterd(
        `Não esqueça de regar a ${plantStorage[0].name} às ${nextTime} horas.`
      );
      setMyPlants(plantStorage);
      setLoading(false);
    }

    loadStoraged();
  }, []);

  if (loading) {
    return <Load />;
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.spotLight}>
        <Image source={waterdrop} style={styles.spotLightImage} />

        <Text style={styles.spotLightText}>{nextWaterd}</Text>
      </View>
      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>Proximas regadas</Text>

        <FlatList
          data={myPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <PlantCardSecondary data={item} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
