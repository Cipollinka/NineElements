import React from 'react';
import {Text, StyleSheet, TextStyle, StyleProp} from 'react-native';

const CustomText = ({
  style,
  fw = 'regular',
  fs = 16,
  ...props
}: {
  style?: StyleProp<TextStyle>;
  fw?: TextStyle['fontWeight'];
  fs?: number;
  children: React.ReactNode;
}) => {
  return (
    <Text
      style={[styles.text, style, {fontWeight: fw, fontSize: fs || 16}]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#fff',
  },
});

export default CustomText;
