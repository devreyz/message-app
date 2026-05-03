import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { WhatsAppHeader } from "@/components/WhatsAppHeader";
import { useColorScheme } from "nativewind";

export default function UpdatesScreen() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const bgColor = isDark ? '#000' : '#FFF';
  const textColor = isDark ? '#FFF' : '#000';

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <WhatsAppHeader title="Atualizações" />
      
      <View style={styles.content}>
        <MaterialCommunityIcons name="circle-slice-8" size={64} color="#D4AF37" style={{ opacity: 0.3 }} />
        <Text style={[styles.contentTitle, { color: '#D4AF37' }]}>Atualizações</Text>
        <Text style={[styles.contentText, { color: isDark ? '#888' : '#666' }]}>
          Veja os status e novidades dos seus contatos aqui.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  contentTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  contentText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
  }
});
