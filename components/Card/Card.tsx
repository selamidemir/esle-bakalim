import { Audio } from 'expo-av';
import React, { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withSpring,
    withTiming,
} from "react-native-reanimated";
import styles from "./styles";

type CardProps = {
  icon: string;
  isFlipped: boolean;
  isMatched: boolean;
  onPress: () => void;
  isWrong?: boolean;
  disabled?: boolean;
};

const Card: React.FC<CardProps> = ({
  icon,
  isFlipped,
  isMatched,
  isWrong = false,
  onPress,
  disabled = false,
}) => {
  // Flip değerleri
  const rotateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const shakeX = useSharedValue(0);

  // Ses dosyaları (kısa path örneği, projenize göre ayarlayın)
  const playSound = async (type: 'flip' | 'matched' | 'wrong') => {
    let sound;
    switch (type) {
      case 'flip':
        sound = require('../../assets/sounds/flip.mp3');
        break;
      case 'matched':
        sound = require('../../assets/sounds/match.mp3');
        break;
      case 'wrong':
        sound = require('../../assets/sounds/wrong.mp3');
        break;
    }
    const { sound: soundObj } = await Audio.Sound.createAsync(sound);
    await soundObj.playAsync();
    setTimeout(() => soundObj.unloadAsync(), 1000);
  };

  // Flip animasyonu ve ses
  useEffect(() => {
    if (isFlipped) {
      rotateY.value = withTiming(180, { duration: 300 }, () => {
        runOnJS(playSound)('flip');
        // Matched veya yanlış durumunda farklı efekt
        if (isMatched) {
          scale.value = withSequence(
            withSpring(1.15),
            withSpring(1, { damping: 6 }),
          );
          runOnJS(playSound)('matched');
        } else if (isWrong) {
          shakeX.value = withSequence(
            withTiming(-8, { duration: 50 }),
            withTiming(8, { duration: 50 }),
            withTiming(-8, { duration: 50 }),
            withTiming(0, { duration: 50 }),
          );
          runOnJS(playSound)('wrong');
        }
      });
    } else {
      rotateY.value = withTiming(0, { duration: 300 });
    }
  }, [isFlipped, isMatched, isWrong]);

  // Animasyonlu stiller
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 800 },
      { rotateY: `${rotateY.value}deg` },
      { scale: scale.value },
      { translateX: shakeX.value },
    ],
  }));

  return (
    <Pressable
      style={styles.card}
      onPress={onPress}
      disabled={disabled || isFlipped || isMatched}
    >
      <Animated.View style={[styles.inner, animatedStyle]}>
        {(isFlipped || isMatched) ? (
          <Text style={styles.icon}>{icon}</Text>
        ) : (
          <View style={styles.cover} />
        )}
      </Animated.View>
    </Pressable>
  );
};

export default Card;
