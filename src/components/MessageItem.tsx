import React, { useRef } from 'react';
import { FlatList, View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from './colors'; // Supondo que você tenha um arquivo de cores
import { clsx } from 'nativewind';

const MessageItem = ({ message }) => (
  <View
    className={clsx('flex-row items-start mb-4', {
      'justify-end': message.isUser,
    })}
  >
    <View className="px-1">
      <View
        className={clsx('max-w-xs p-2 rounded-2xl', {
          'bg-light-userBg dark:bg-dark-userBg': message.isUser,
          'bg-light-notUserBg dark:bg-dark-notUserBg': !message.isUser,
        })}
      >
        <Text
          className={clsx('font-medium', {
            'text-light-userText dark:text-dark-userText': message.isUser,
            'text-light-notUserText dark:text-dark-notUserText': !message.isUser,
          })}
        >
          {message.text}
        </Text>
      </View>

      <View className={clsx('flex-row mt-1 px-2', { 'justify-end': message.isUser })}>
        <Text className="text-xs text-light-textSecondary mr-1">
          {new Date(message.timestamp).toLocaleTimeString().slice(0, 5)}
        </Text>
        {message.isUser && (
          <Feather
            name={
              message.status === 'READ'
                ? 'check-circle'
                : message.status === 'DELIVERED'
                ? 'check-circle'
                : message.status === 'SENT'
                ? 'check'
                : 'clock'
            }
            size={14}
            color={
              message.status === 'READ'
                ? colors.blue['600']
                : message.status === 'DELIVERED'
                ? colors.gray['300']
                : message.status === 'SENT'
                ? colors.gray['700']
                : colors.gray['700']
            }
          />
        )}
      </View>
    </View>
  </View>
);

const ChatScreen = ({ chat }) => {
  const flatListRef = useRef(null);

  return (
    <FlatList
      ref={flatListRef}
      data={chat.messages}
      renderItem={({ item }) => <MessageItem message={item} />}
      keyExtractor={(item) => item.id}
      onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      initialNumToRender={20}
      maxToRenderPerBatch={10}
      windowSize={5}
      contentContainerStyle={{ padding: 16 }}
    />
  );
};

export default ChatScreen;