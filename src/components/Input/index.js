import { View } from 'react-native';
import React from 'react';
import { TextInput } from 'react-native-paper';

function Input({
  onChangeText, value, placeholder, icon,
}) {
  return (
    <View style={{ marginBottom: 8 }}>
      <TextInput
        placeholder={placeholder}
        mode="outlined"
        label={placeholder}
        theme={{ roundness: 20 }}
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={placeholder === 'Password'}
        left={(
          <TextInput.Icon name={icon} />
        )}
      />
    </View>
  );
}

export default React.memo(Input);
