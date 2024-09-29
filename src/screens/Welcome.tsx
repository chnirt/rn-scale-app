import React, {useCallback} from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {ChnirtStyleSheet} from '../utils';
import {useNavigation} from '@react-navigation/native';

const styles = ChnirtStyleSheet.create({
  flex1: {flex: 1},
  image: {
    width: 375,
    height: 812,
  },
  formContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  contentContainer: {
    gap: 44,
    marginHorizontal: 22,
  },
  brandingContainer: {alignItems: 'center'},
  brandingImage: {
    width: 142,
    height: 101,
  },
  buttonGroupContainer: {gap: 15},

  buttonContainer: {
    padding: 19,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButtonContainer: {
    backgroundColor: '#1E232C',
  },
  outlineButtonContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#1E232C',
  },
  font: {
    fontSize: 15,
    fontWeight: '500',
  },
  loginText: {
    fontWeight: '600',
    color: '#FFFFFF',
  },
  registerText: {
    fontWeight: '600',
    color: '#1E232C',
  },
  continueText: {
    fontWeight: '700',
    color: '#35C2C1',
    textDecorationLine: 'underline',
  },
});

const Welcome = () => {
  const navigation = useNavigation();

  const navigateLogin = useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  const navigateRegister = useCallback(() => {
    navigation.navigate('Register');
  }, [navigation]);

  return (
    <ScrollView bounces={false}>
      <ImageBackground
        style={styles.image}
        source={require('../assets/background.png')}
      />

      <View style={styles.formContainer}>
        <SafeAreaView style={styles.flex1}>
          <View style={styles.contentContainer}>
            <View style={styles.brandingContainer}>
              <Image
                style={styles.brandingImage}
                source={require('../assets/branding.png')}
              />
            </View>

            <View style={styles.buttonGroupContainer}>
              <Pressable onPress={navigateLogin}>
                <View
                  style={[
                    styles.buttonContainer,
                    styles.primaryButtonContainer,
                  ]}>
                  <Text style={[styles.font, styles.loginText]}>Login</Text>
                </View>
              </Pressable>

              <Pressable onPress={navigateRegister}>
                <View
                  style={[
                    styles.buttonContainer,
                    styles.outlineButtonContainer,
                  ]}>
                  <Text style={[styles.font, styles.registerText]}>
                    Register
                  </Text>
                </View>
              </Pressable>
            </View>

            <View>
              <Pressable>
                <View style={styles.buttonContainer}>
                  <Text style={[styles.font, styles.continueText]}>
                    Continue as a guest
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </ScrollView>
  );
};

export default Welcome;
