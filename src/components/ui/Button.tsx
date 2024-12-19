import {
  View,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Animated,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import CustomText from './Text';

interface Props {
  title?: string;
  onPress: () => void;
  variant?: 'blue';
  style?: StyleProp<ViewStyle>;
  isFullWidth?: boolean;
  fs?: number;
  icon?: React.ReactNode;
  iconAfter?: React.ReactNode;
  isActive?: boolean;
  disabled?: boolean;
}

export default function Button({
  title,
  onPress,
  variant = 'blue',
  style,
  fs,
  icon,
  iconAfter,
  isFullWidth,
  isActive,
  disabled,
}: Props) {
  const pulseAnim = useRef(new Animated.Value(1)).current; // Initial scale value of 1

  useEffect(() => {
    if (!isActive) return;

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1, // Scale up to 1.2 times the original size
          duration: 800, // Duration for the scale up
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1, // Scale back to the original size
          duration: 800, // Duration for the scale down
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [pulseAnim, isActive]);

  return (
    <TouchableOpacity disabled={isActive || disabled} onPress={onPress}>
      <Animated.View
        style={
          isActive
            ? [
                styles.pulseContainer,
                {
                  transform: [{scale: pulseAnim}],
                  shadowOpacity: pulseAnim.interpolate({
                    inputRange: [1, 1.2],
                    outputRange: [0.5, 1], // Increasing shadow intensity with the pulse
                  }),
                },
              ]
            : null
        }>
        <View
          style={[
            styles.default,
            styles[variant],
            {
              width: isFullWidth ? '100%' : 'auto',
              opacity: disabled && !isActive ? 0.5 : 1,
            },
            style,
          ]}>
          {icon && icon}
          {title && (
            <CustomText fw="bold" style={{fontSize: fs || 16}}>
              {title}
            </CustomText>
          )}
          {iconAfter && iconAfter}
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  pulseContainer: {
    borderRadius: 50,
    backgroundColor: '#ffeb3b',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#ffeb3b',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 10,
  },
  default: {
    paddingHorizontal: 16,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 9999,
    gap: 4,
  },
  blue: {
    backgroundColor: '#FFA600',
  },
});
