import AsyncStorage from "@react-native-async-storage/async-storage";
import { Plant, StoragePlants } from "../types/index";
import { format } from "date-fns";

export async function savePlant(plant: Plant): Promise<void> {
  try {
    const data = await AsyncStorage.getItem("@plantting:plants");
    const oldPlants = data ? (JSON.parse(data) as StoragePlants) : {};

    const newPlant = {
      [plant.id]: {
        data: plant,
      },
    };

    await AsyncStorage.setItem(
      "@plantting:plants",
      JSON.stringify({ ...newPlant, ...oldPlants })
    );
  } catch (error) {
    throw error;
  }
}

export async function loadPlant(): Promise<Plant[]> {
  try {
    const data = await AsyncStorage.getItem("@plantting:plants");
    const plants = data ? (JSON.parse(data) as StoragePlants) : {};

    const plantSorted = Object.keys(plants)
      .map((plant) => {
        return {
          ...plants[plant].data,
          hour: format(
            new Date(plants[plant].data.dataTimeNotification),
            "HH:mm"
          ),
        };
      })
      .sort((a, b) =>
        Math.floor(
          new Date(a.dataTimeNotification).getTime() / 1000 -
            Math.floor(new Date(b.dataTimeNotification).getTime() / 1000)
        )
      );

    return plantSorted;
  } catch {}
}
