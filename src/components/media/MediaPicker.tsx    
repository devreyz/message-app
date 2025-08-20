import React from 'react';
import { Button, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

type MediaPickerProps = {
  onMediaSelected: (uri: string) => void;
};

export const MediaPicker: React.FC<MediaPickerProps> = ({ onMediaSelected }) => {
  const pickMedia = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      onMediaSelected(result.assets[0].uri);
    }
  };

  return (
    <View>
      <Button title="Escolher Mídia" onPress={pickMedia} />
    </View>
  );
};
