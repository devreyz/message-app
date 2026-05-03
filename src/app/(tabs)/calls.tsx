import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { WhatsAppHeader } from "@/components/WhatsAppHeader";
import { useColorScheme } from "nativewind";

export default function CallsScreen() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const bgColor = isDark ? '#000' : '#FFF';

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <WhatsAppHeader title="Ligações" />

      <View style={styles.content}>
        <Feather name="phone" size={64} color="#D4AF37" style={{ opacity: 0.3 }} />
        <Text style={[styles.contentTitle, { color: '#D4AF37' }]}>Ligações</Text>
        <Text style={[styles.contentText, { color: isDark ? '#888' : '#666' }]}>
          Seu histórico de chamadas aparecerá aqui.
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
