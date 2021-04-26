import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { Text, View, FlatList, ActivityIndicator } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import EnviromentButton from "../../components/EnviromentButton";
import { Header } from "../../components/Header";
import { Load } from "../../components/Load";
import { PlantCardPrimary } from "../../components/PlantCardPrimary";
import api from "../../services/api";
import colors from "../../styles/colors";
import { Envirolment, Plant } from "../../types";
import { styles } from "./style";

export const PlantSelect = () => {
  const [environmentList, setEnvironmentList] = useState<Envirolment[]>([]);
  const [plantsList, setPlantsList] = useState<Plant[]>([]);
  const [selectedEnvironment, setSelectedEnvironment] = useState("all");
  const [filteredPlants, setFilteredPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  //pagination
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(true);
  const [loadedAll, setLoadedAll] = useState(false);

  const navigate = useNavigation();

  useEffect(() => {
    const getEnvironmentList = async () => {
      const response = await api.get(
        "plants_environments?_sort=title&order=asc"
      );
      setEnvironmentList([{ key: "all", title: "Todos" }, ...response.data]);
    };
    getEnvironmentList();
  }, []);

  useEffect(() => {
    getPlantList();
  }, []);

  async function getPlantList() {
    const { data } = await api.get(
      `plants?_sort=name&_order=asc_page=${page}&_limit=8`
    );
    if (!data) {
      return setLoading(true);
    }

    if (page > 1) {
      setPlantsList((oldValue) => [...oldValue, ...data]);
      setFilteredPlants((oldValue) => [...oldValue, ...data]);
    } else {
      setPlantsList(data);
      setFilteredPlants(data);
    }

    setLoading(false);
    setLoadMore(false);
  }

  function handleFetchMore(distance: number) {
    if (distance < 1) {
      return;
    }
    setLoadMore(true);
    setPage((oldValue) => oldValue + 1);
    getPlantList();
  }

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

  function handlePlantSelect(plant: Plant) {
    navigate.navigate("PlantSave", { plant });
  }

  if (loading) {
    return <Load />;
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

      <View>
          <FlatList
            data={filteredPlants}
            renderItem={({ item }) => (
              <PlantCardPrimary
                data={item}
                onPress={() => handlePlantSelect(item)}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.plantsList}
            numColumns={2}
            onEndReachedThreshold={0.1}
            onEndReached={({ distanceFromEnd }) => {
              handleFetchMore(distanceFromEnd);
            }}
            ListFooterComponent={
              loadMore ? <ActivityIndicator color={colors.green_50} /> : <></>
            }
          />
      </View>
    </View>
  );
};
