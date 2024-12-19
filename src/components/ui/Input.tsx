import {TextInput, TextInputProps} from 'react-native';
import React from 'react';

export default function Input({style, ...props}: TextInputProps) {
  return (
    <TextInput
      {...props}
      style={[
        {
          backgroundColor: '#111111',
          height: 40,
          paddingHorizontal: 12,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 9999,
        },
        style,
      ]}
    />
  );
}
