import React from "react";
import { Tabs } from "expo-router";
import { Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

const colors = require("@/constants/colors.json");

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Feather>["name"];
  color: string;
}) {
  return <Feather size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { colorScheme } = useColorScheme();
  return (
    <Tabs screenOptions={{}}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: true,
          tabBarShowLabel: false,
          title: "",
          headerLeft: () => (
            <View className="flex-row items-center">
              <Text className="dark:text-white text-2xl">MessageApp</Text>
              <Feather name="message-circle" size={28} color={colors[colorScheme ?? "light"].primaryDark}/>
            </View>
          ),
          headerLeftContainerStyle: { paddingLeft: 10 },
          headerRightContainerStyle: { paddingRight: 10 },

          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name="message-square"
              color={
                focused
                  ? colors[colorScheme ?? "light"].primary
                  : colors[colorScheme ?? "light"].textDisabled
              }
            />
          ),
          headerRight: () => <Feather name="more-vertical" size={24} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "settings",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name="settings"
              color={
                focused
                  ? colors[colorScheme ?? "light"].primary
                  : colors[colorScheme ?? "light"].textDisabled
              }
            />
          ),
          tabBarShowLabel: false,
        }}
      />
    </Tabs>
  );
}
