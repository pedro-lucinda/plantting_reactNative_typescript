import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import EnviromentButton from "../components/EnviromentButton";
import { Header } from "../components/Header";
import { PlantCardPrimary } from "../components/PlantCardPrimary";
import api from "../services/api";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface Envirolment {
  key: string;
  title: string;
}
interface Plant {
  id: number;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: [string];
  frequency: {
    times: number;
    repeat_every: string;
  };
}

export const PlantSelect = () => {
  const [environmentList, setEnvironmentList] = useState<Envirolment[]>([]);
  const [plantsList, setPlantsList] = useState<Plant[]>([]);
  const [selectedEnvironment, setSelectedEnvironment] = useState("all");
  const [filteredPlants, setFilteredPlants] = useState<Plant[]>([]);

  useEffect(() => {
    const getEnvironmentList = async () => {
      const response = await api.get(
        "plants_environments?_sort=title&order=asc"
      );
      setEnvironmentList([{ key: "all", title: "Todos" }, ...response.data]);
    };
    getEnvironmentList();
    setFilteredPlants(plantsList);
  }, []);

  useEffect(() => {
    const getEnvironmentList = async () => {
      const response = await api.get("plants?_sort=name&_order=asc");
      setPlantsList(response.data);
    };
    getEnvironmentList();
  }, []);

  function handleEnvironmentChange(environment: string) {
    setSelectedEnvironment(environment);
    if (environment === "all") {
      return setFilteredPlants(plantsList);
    }

    const filtered = plantsList.filter((plant) =>
      plant.environments.includes(environment)
    );

    setFilteredPlants(filtered);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />

        <Text style={styles.title}>Em qual ambiente </Text>
        <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
      </View>
      <View>
        <FlatList
          data={environmentList}
          renderItem={({ item }) => (
            <EnviromentButton
              title={item.title}
              active={item.key === selectedEnvironment}
              onPress={() => handleEnvironmentChange(item.key)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.environmentList}
        />
      </View>

      <View style={styles.plantsList}>
        <FlatList
          data={filteredPlants}
          renderItem={({ item }) => <PlantCardPrimary data={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.plantsList}
          numColumns={2}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    justifyContent: "center",
  },
});
