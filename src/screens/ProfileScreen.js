import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSequence } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileScreen = ({ navigation }) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  useEffect(() => {
    opacity.value = withSequence(
      withTiming(0, { duration: 0 }),
      withTiming(1, { duration: 500, delay: 200 })
    );
    translateY.value = withSequence(
      withTiming(50, { duration: 0 }),
      withTiming(0, { duration: 500, delay: 200 })
    );
  }, []);

  return (
    <LinearGradient
      colors={['#4A90E2', '#9013FE']}
      style={styles.container}
    >
      <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-back" size={20} color="#fff" />
          <Text style={styles.backText}> Kembali</Text>
        </TouchableOpacity>
      <Animated.View style={[styles.content, animatedStyle]}>
        

        <Text style={styles.name}>Agustinus</Text>
        <Text style={styles.bio}>React Native Developer | Tech Enthusiast</Text>
        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => Linking.openURL('https://github.com/vbagustinus')}
        >
          <Icon name="logo-github" size={20} color="#fff" />
          <Text style={styles.linkText}> github.com/vbagustinus</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => Linking.openURL('https://agustinus.vercel.app')}
        >
          <Icon name="globe" size={20} color="#fff" />
          <Text style={styles.linkText}> Portfolio</Text>
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 5,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginVertical: 10,
  },
  bio: {
    fontSize: 18,
    color: '#E0E0E0',
    textAlign: 'center',
    marginVertical: 10,
  },
  linkButton: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  linkText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 5,
  },
});

export default ProfileScreen;
