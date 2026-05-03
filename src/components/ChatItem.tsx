import { forwardRef } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { useColorScheme } from "nativewind";
import { ContactDatabaseProps } from "@/database/useContactDatabase";

type ChatItemProps = TouchableOpacityProps & {
  chat: ContactDatabaseProps;
};

export const ChatItem = forwardRef<View, ChatItemProps>(
  ({ chat, ...props }, ref) => {
    const { colorScheme } = useColorScheme();
    const { width: screenWidth } = useWindowDimensions();
    const isDark = colorScheme === 'dark';

    // Lógica de escala baseada nas medidas (360px Android básico até 412px Android grande)
    const avatarSize = screenWidth >= 412 ? 64 : screenWidth >= 390 ? 60 : 56;
    const nameFontSize = screenWidth >= 412 ? 18 : 17;

    return (
      <TouchableOpacity
        ref={ref}
        activeOpacity={0.7}
        style={styles.container}
        {...props}
      >
        <View style={styles.avatarWrapper}>
          <Image
            source={typeof chat.avatar === 'string' ? { uri: chat.avatar } : require("@/assets/images/user.png")}
            style={[
              styles.avatar, 
              { 
                width: avatarSize, 
                height: avatarSize, 
                borderRadius: avatarSize / 2,
                borderColor: isDark ? '#D4AF37' : '#D4AF37' 
              }
            ]}
          />
          <View style={[styles.onlineBadge, { width: avatarSize/4.5, height: avatarSize/4.5 }]} />
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={[styles.name, { color: isDark ? '#FFF' : '#000', fontSize: nameFontSize }]} numberOfLines={1}>
              {chat.name}
            </Text>
            <Text style={styles.time}>12:45</Text>
          </View>
          <Text style={styles.phone} numberOfLines={1}>
             {chat.phone ? `+55 ${chat.phone}` : "Clique para iniciar conversa"}
          </Text>
        </View>

        {chat.unread > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{chat.unread}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    borderWidth: 1.5,
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
  },
  content: {
    flex: 1,
    marginLeft: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontWeight: 'bold',
  },
  time: {
    fontSize: 12,
    color: '#888',
  },
  phone: {
    fontSize: 14,
    color: '#888',
  },
  unreadBadge: {
    backgroundColor: '#D4AF37',
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    marginLeft: 10,
  },
  unreadText: {
    color: '#000',
    fontSize: 11,
    fontWeight: 'bold',
  }
});
