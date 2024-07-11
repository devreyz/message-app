import { View, Text, TouchableOpacity } from "react-native";
import { useColorScheme } from "nativewind";
import { Feather } from "@expo/vector-icons";

export default function TabTwoScreen() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const colors = require("@/constants/colors.json")

  return (
    <View>
      <Text className="font-semibold text-2xl mb-10 px-4 py-3 text-light-textPrimary dark:text-dark-textPrimary">Configurações</Text>
      <TouchableOpacity
        className="dark:text-white flex-row justify-between py-2 px-4 border-y border-y-light-onSurface/10 dark:border-y-dark-onSurface/10"
        onPress={() =>
          setColorScheme(colorScheme === "light" ? "dark" : "light")
        }
      >
        <Text className="text-lg text-light-textPrimary dark:text-dark-textPrimary">
          Alternar tema {`${colorScheme}`}
        </Text>
        <Feather
          name={`${colorScheme === "light" ? "moon" : "sun"}`}
          size={24}
          color={`${colors[colorScheme].textPrimary}`}
        />
      </TouchableOpacity>
    </View>
  );
}
