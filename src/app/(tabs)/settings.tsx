import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, Dimensions, SafeAreaView, Platform } from "react-native";
import { useColorScheme } from "nativewind";
import { Feather, MaterialIcons, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { WhatsAppHeader } from "@/components/WhatsAppHeader";
import { useSettingsDatabase } from "@/database/useSettingsDatabase";
import { useEffect, useState } from "react";

export default function SettingsScreen() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const { getSettings, updateTheme } = useSettingsDatabase();
  const [userName, setUserName] = useState("Moisés");

  useEffect(() => {
    getSettings().then(s => {
      if (s?.user_name) setUserName(s.user_name);
      if (s?.theme) setColorScheme(s.theme as any);
    });
  }, []);

  const handleToggleTheme = async () => {
    const newTheme = colorScheme === 'dark' ? 'light' : 'dark';
    setColorScheme(newTheme);
    await updateTheme(newTheme);
  };

  const SettingItem = ({ icon, label }: any) => (
    <TouchableOpacity style={styles.item} activeOpacity={0.7}>
      <View style={styles.itemLeft}>
        <View style={styles.iconContainer}>{icon}</View>
        <Text style={[styles.itemText, { color: colorScheme === 'dark' ? '#FFF' : '#000' }]}>{label}</Text>
      </View>
      <Feather name="chevron-right" size={18} color="#666" />
    </TouchableOpacity>
  );

  const isDark = colorScheme === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#FFF' }]}>
      <WhatsAppHeader title="Você" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={[styles.statusBubble, { backgroundColor: isDark ? '#222' : '#F0F0F0' }]}>
               <Text style={[styles.statusText, { color: isDark ? '#AAA' : '#666' }]}>O silêncio não comete erros</Text>
               <View style={[styles.triangle, { borderTopColor: isDark ? '#222' : '#F0F0F0' }]} />
            </View>
            
            <Image 
              source={require("@/assets/images/user.png")}
              style={styles.avatar}
            />
            
            <View style={styles.plusContainer}>
              <View style={styles.plusCircle}>
                <Feather name="plus" size={14} color="black" />
              </View>
            </View>
          </View>
          
          <View style={styles.nameRow}>
            <Text style={[styles.nameText, { color: isDark ? '#FFF' : '#000' }]}>{userName}</Text>
            <MaterialIcons name="check-circle" size={20} color="#D4AF37" />
          </View>
        </View>

        {/* Lists Group */}
        <View style={styles.content}>
          <View style={[styles.group, { backgroundColor: isDark ? '#121212' : '#F5F5F5' }]}>
            <SettingItem label="Conta" icon={<Feather name="key" size={22} color="#D4AF37" />} />
            <View style={styles.separator} />
            <SettingItem label="Privacidade" icon={<Feather name="lock" size={22} color="#D4AF37" />} />
            <View style={styles.separator} />
            <SettingItem label="Conversas" icon={<Ionicons name="chatbubble-outline" size={22} color="#D4AF37" />} />
          </View>

          <TouchableOpacity 
            style={styles.themeButton}
            onPress={handleToggleTheme}
          >
             <Text style={styles.themeButtonText}>Alternar para Modo {isDark ? 'Claro' : 'Escuro'}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  profileSection: {
    alignItems: 'center',
    marginVertical: 30,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    position: 'relative',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  statusBubble: {
    position: 'absolute',
    top: -50,
    alignSelf: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    zIndex: 10,
  },
  statusText: {
    fontSize: 12,
  },
  triangle: {
    position: 'absolute',
    bottom: -8,
    alignSelf: 'center',
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  plusContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#000',
    borderRadius: 15,
    padding: 3,
  },
  plusCircle: {
    backgroundColor: '#4CAF50',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#000',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  nameText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginRight: 8,
  },
  content: {
    paddingHorizontal: 16,
  },
  group: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 30,
    alignItems: 'center',
    marginRight: 10,
  },
  itemText: {
    fontSize: 17,
  },
  separator: {
    height: 0.5,
    backgroundColor: 'rgba(128,128,128,0.2)',
    marginLeft: 55,
  },
  themeButton: {
    marginTop: 20,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    padding: 18,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
  },
  themeButtonText: {
    color: '#D4AF37',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
