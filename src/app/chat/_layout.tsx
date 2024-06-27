
import {  Slot } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChatLayout() {


  return (
    <SafeAreaView className="flex-1">
    <Slot/>
    </SafeAreaView>
  );
}
