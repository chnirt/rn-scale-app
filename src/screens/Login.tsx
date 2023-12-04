import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ChnirtStyleSheet} from '../utils';

const windowWidth = Dimensions.get('window').width; // application
const windowHeight = Dimensions.get('window').height;

const iPhoneXViewport = {
  width: 375,
  height: 812,
};

const chnirtStyleSheet = ChnirtStyleSheet.create({
  flex1: {flex: 1},
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  image: {
    position: 'absolute',
    width: 375,
    height: 812,
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
  },
  loginText: {
    color: '#FFFFFF',
  },
  registerText: {
    color: '#1E232C',
  },
  continueText: {
    color: '#35C2C1',
  },

  absoluteContainer: {
    position: 'absolute',
    borderWidth: 1,
    alignSelf: 'center',
    bottom: 0,
    left: 0,
    alignItems: 'center',
  },
});

const styleStyleSheet = StyleSheet.create({
  flex1: {flex: 1},
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  image: {
    position: 'absolute',
    width: 375,
    height: 812,
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
  },
  loginText: {
    color: '#FFFFFF',
  },
  registerText: {
    color: '#1E232C',
  },
  continueText: {
    color: '#35C2C1',
  },

  absoluteContainer: {
    position: 'absolute',
    borderWidth: 1,
    alignSelf: 'center',
    bottom: 0,
    left: 0,
    alignItems: 'center',
  },
});

const Login = () => {
  const [scaled, setScaled] = useState(false);
  const styles = scaled ? chnirtStyleSheet : styleStyleSheet;

  return (
    <View style={styles.flex1}>
      <ScrollView style={styles.flex1} contentContainerStyle={styles.flex1}>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={require('../assets/background.png')}
            resizeMode="contain"
          />

          <View style={styles.contentContainer}>
            <View style={styles.brandingContainer}>
              <Image
                style={styles.brandingImage}
                source={require('../assets/branding.png')}
                resizeMode="contain"
              />
            </View>
            <View style={styles.buttonGroupContainer}>
              <Pressable>
                <View
                  style={[
                    styles.buttonContainer,
                    styles.primaryButtonContainer,
                  ]}>
                  <Text style={[styles.font, styles.loginText]}>Login</Text>
                </View>
              </Pressable>

              <Pressable>
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
        </View>
      </ScrollView>

      <View style={styles.absoluteContainer}>
        <Text>
          {windowWidth}x{windowHeight}
        </Text>
        <Text>
          {iPhoneXViewport.width}x{iPhoneXViewport.height}
        </Text>
        <Pressable onPress={() => setScaled(prevState => !prevState)}>
          <View style={styles.buttonContainer}>
            <Text style={styles.font}>{scaled ? 'Scaled' : 'Not scale'}</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default Login;
