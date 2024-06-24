import {  View, Text } from 'react-native';
import { useColorScheme } from "nativewind";

export default function TabTwoScreen() {
  const { colorScheme, setColorScheme } = useColorScheme();
  
  return (
    <View>
      <Text>Tab Two</Text>
      <Text
        className='dark:text-white'
        
        onPress={() =>
          setColorScheme(colorScheme === "light" ? "dark" : "light")
        }
      >
        {`The color scheme is ${colorScheme}`}
      </Text>
    </View>
  );
}
