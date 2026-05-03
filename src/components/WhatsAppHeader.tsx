import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Feather } from "@expo/vector-icons";
import { useRouter, useNavigation } from 'expo-router';
import { useColorScheme } from "nativewind";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface WhatsAppHeaderProps {
  title: string;
  avatar?: string;
  isChat?: boolean;
}

export const WhatsAppHeader = ({ title, avatar, isChat }: WhatsAppHeaderProps) => {
  const router = useRouter();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      router.push("/welcome");
    }
  };

  const bgColor = isDark ? '#000' : '#FFF';
  const borderColor = isDark ? '#222' : '#EEE';
  const textColor = isDark ? '#FFF' : '#000';

  return (
    <View style={[
      styles.container, 
      { 
        backgroundColor: bgColor, 
        borderBottomColor: borderColor,
        paddingTop: insets.top,
        height: Platform.OS === 'ios' ? insets.top + 60 : 70
      }
    ]}>
      <View style={styles.leftSection}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Feather name="chevron-left" size={32} color="#D4AF37" />
          {isChat && (
            <Image 
              source={avatar ? { uri: avatar } : require("@/assets/images/user.png")} 
              style={styles.avatar} 
            />
          )}
        </TouchableOpacity>
        
        <View style={styles.titleContainer}>
          <Text style={[styles.titleText, { color: textColor }]} numberOfLines={1}>{title}</Text>
          {isChat && <Text style={styles.statusText}>toque para dados do contato</Text>}
        </View>
      </View>

      <View style={styles.rightSection}>
        {isChat ? (
          <>
            <TouchableOpacity style={styles.icon}><Feather name="video" size={22} color="#D4AF37" /></TouchableOpacity>
            <TouchableOpacity style={styles.icon}><Feather name="phone" size={22} color="#D4AF37" /></TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity style={styles.icon}><Feather name="camera" size={24} color="#D4AF37" /></TouchableOpacity>
            <TouchableOpacity style={styles.icon}><Feather name="search" size={24} color="#D4AF37" /></TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    marginLeft: -5,
  },
  titleContainer: {
    marginLeft: 8,
    flex: 1,
    justifyContent: 'center',
    marginTop: -2,
  },
  titleText: {
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 20, // Trava o texto
  },
  statusText: {
    color: '#888',
    fontSize: 12,
    lineHeight: 14, // Trava o status logo abaixo
    marginTop: 0,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  icon: {
    padding: 5,
  }
});
