import { useState } from "react";
import { TextInput, TouchableOpacity, View, StyleSheet, Platform, Keyboard } from "react-native";
import { Feather, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type MessageInputProps = {
  onSend: (message: string) => void;
};

export function MessageInput({ onSend }: MessageInputProps) {
  const [message, setMessage] = useState("");
  const insets = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  const bgColor = isDark ? '#000' : '#F0F0F0';
  const bubbleBg = isDark ? '#1C1C1E' : '#FFF';
  const textColor = isDark ? '#FFF' : '#000';
  const borderColor = isDark ? '#333' : '#DDD';
  const iconColor = isDark ? '#FFF' : '#666';

  return (
    <View style={[
      styles.container, 
      { 
        backgroundColor: bgColor,
        // Quando o teclado sobe, o insets.bottom deve ser ignorado para não criar buracos
        paddingBottom: insets.bottom > 0 ? insets.bottom : 2
      }
    ]}>
      <View style={styles.contentRow}>
        <TouchableOpacity style={styles.plusBtn}>
          <Feather name="plus" size={28} color={iconColor} />
        </TouchableOpacity>

        <View style={[styles.inputWrapper, { backgroundColor: bubbleBg, borderColor: borderColor }]}>
          <TextInput
            placeholder="Mensagem..."
            placeholderTextColor="#888"
            style={[styles.input, { color: textColor }]}
            multiline
            value={message}
            onChangeText={setMessage}
          />
          <TouchableOpacity style={styles.emojiBtn}>
            <MaterialCommunityIcons name="sticker-emoji" size={24} color="#888" />
          </TouchableOpacity>
        </View>

        <View style={styles.rightActions}>
          {message.trim().length > 0 ? (
            <TouchableOpacity onPress={handleSend} style={styles.sendBtn}>
              <Ionicons name="send" size={22} color="#000" />
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity style={styles.actionBtn}>
                <Feather name="camera" size={24} color={iconColor} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn}>
                <Feather name="mic" size={24} color={iconColor} />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingTop: 8,
    justifyContent: 'center',
    // Altura flexível para evitar "travamento" no iOS quando o teclado sobe
    minHeight: Platform.OS === 'ios' ? 60 : 65, 
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  plusBtn: {
    padding: 5,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 22,
    marginHorizontal: 8,
    paddingHorizontal: 12,
    minHeight: 40,
    borderWidth: 0.5,
  },
  input: {
    flex: 1,
    fontSize: 17,
    paddingVertical: 8,
    maxHeight: 100,
  },
  emojiBtn: {
    marginLeft: 5,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionBtn: {
    padding: 4,
  },
  sendBtn: {
    backgroundColor: '#D4AF37',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  }
});
