import { View, Text, StyleSheet } from "react-native";
import { MessageProps } from "@/types/types";
import { useColorScheme } from "nativewind";

export function MessageItem({ message }: { message: MessageProps }) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const isUser = message.is_user === 1;

  // Cores dinâmicas baseadas no tema
  const userBg = isDark ? '#005C4B' : '#DCF8C6';
  const otherBg = isDark ? '#202C33' : '#FFFFFF';
  const textColor = isDark ? '#FFF' : '#000';
  const timeColor = isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.4)';

  return (
    <View style={[styles.container, isUser ? styles.userContainer : styles.otherContainer]}>
      <View
        style={[
          styles.bubble,
          { backgroundColor: isUser ? userBg : otherBg },
          isUser ? styles.userBubble : styles.otherBubble
        ]}
      >
        <Text style={[styles.text, { color: textColor }]}>
          {message.text}
        </Text>
        <View style={styles.footer}>
          <Text style={[styles.time, { color: timeColor }]}>12:45</Text>
          {isUser && <Text style={styles.check}>✓✓</Text>}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    flexDirection: 'row',
  },
  userContainer: {
    justifyContent: 'flex-end',
  },
  otherContainer: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '85%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 15,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  userBubble: {
    borderTopRightRadius: 2,
  },
  otherBubble: {
    borderTopLeftRadius: 2,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 2,
  },
  time: {
    fontSize: 11,
    marginRight: 4,
  },
  check: {
    fontSize: 14,
    color: '#53BDEB',
  }
});
