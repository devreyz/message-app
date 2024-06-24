import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import Colors from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        
      }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: true,
          title: '',
          headerLeft: () => <Text className='dark:text-white text-3xl'>MessageApp</Text>,
          tabBarIcon: ({ color }) => (<View className='items-center'>
            <TabBarIcon name="address-book" color={color} />
            
          </View>) ,
          headerRight: () => (
            <Feather name='more-vertical' />
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </Tabs>
  );
}
