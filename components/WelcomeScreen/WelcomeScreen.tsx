import { ThemedText } from '@/components/ThemedText';
import { Audio } from 'expo-av';
import React, { useEffect, useRef } from 'react';
import { Animated, ImageBackground, TouchableOpacity } from 'react-native';
import styles from './styles';

const BG_IMAGE = require('@/assets/images/welcome.png'); // Tasarladığım arka planı koy!

export default function WelcomeScreen({ onStart }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const soundRef = useRef(null);

  // Arkaplan müziği otomatik başlat
  useEffect(() => {
    let isMounted = true;
    (async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('@/assets/sounds/welcome-screen-background.mp3'), // Önerdiğim müziği ekle!
        { isLooping: true, volume: 1 }
      );
      soundRef.current = sound;
      if (isMounted) await sound.playAsync();
    })();
    return () => {
      isMounted = false;
      if (soundRef.current) soundRef.current.stopAsync();
    };
  }, []);

  // Fade-in animasyonu
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1400,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  // Butona basınca zıplat
  const handlePress = () => {
    Animated.sequence([
      Animated.spring(buttonScale, { toValue: 1.08, useNativeDriver: true }),
      Animated.spring(buttonScale, { toValue: 1, friction: 4, useNativeDriver: true }),
    ]).start(() => onStart());
  };

  return (
    <ImageBackground source={BG_IMAGE} style={styles.background}>
      <Animated.View style={[styles.logoContainer, { opacity: fadeAnim, transform: [{ translateY: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [40, 0] }) }] }]}>
        <ThemedText type="title" style={styles.logoText}>EŞLE BAKALIM</ThemedText>
        <ThemedText style={styles.slogan}>Eğlen, öğren, hafızanı geliştir!</ThemedText>
      </Animated.View>

      <Animated.View style={[
        styles.buttonWrapper,
        { opacity: fadeAnim, transform: [{ scale: buttonScale }] }
      ]}>
        <TouchableOpacity
          style={styles.button}
          onPress={handlePress}
          activeOpacity={0.9}
        >
          <ThemedText style={styles.buttonText}>OYUNA BAŞLA</ThemedText>
        </TouchableOpacity>
      </Animated.View>
    </ImageBackground>
  );
}
