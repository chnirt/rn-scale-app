import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  TextInput,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {ChnirtStyleSheet} from '../utils';
import BackArrow from '../assets/back_arrow.svg';
import Facebook from '../assets/facebook.svg';
import Google from '../assets/google.svg';
import Apple from '../assets/apple.svg';

type LoginParamsType = {
  email: string;
  password: string;
};

type LoginType = 'facebook' | 'google' | 'apple';

const styles = ChnirtStyleSheet.create({
  flex1: {flex: 1},
  container: {
    width: 375,
    height: 812,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    flex: 1,
    marginTop: 12,
    marginHorizontal: 22,
    justifyContent: 'space-between',
  },
  formContainer: {
    marginTop: 30,
    gap: 30,
  },
  welcomeContainer: {},
  welcomeText: {
    fontSize: 30,
    fontWeight: '700',
    color: '#1E232C',
  },
  form: {
    gap: 16,
  },
  button: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#E8ECF4',
    borderRadius: 12,
    justifyContent: 'center',
    paddingLeft: 8,
  },
  backIcon: {
    width: 19,
    height: 19,
  },
  input: {
    borderRadius: 8,
    backgroundColor: '#F7F8F9',
    borderWidth: 1,
    borderColor: '#E8ECF4',
    paddingTop: 16,
    paddingLeft: 16,
    paddingBottom: 18,

    fontSize: 15,
    fontWeight: '500',
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
  },
  forgotPasswordText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6A707C',
  },
  buttonContainer: {
    padding: 19,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButtonContainer: {
    backgroundColor: '#1E232C',
  },
  font: {
    fontSize: 15,
    fontWeight: '500',
  },
  loginText: {
    fontWeight: '600',
    color: '#FFFFFF',
  },
  loginWithContainer: {
    gap: 20,
  },
  loginWithHeader: {flexDirection: 'row', alignItems: 'center', gap: 12},
  divider: {
    borderTopWidth: 1,
    borderColor: '#E8ECF4',
    flex: 1,
  },
  loginWithText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8391A1',
  },
  loginWithBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  socialButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#E8ECF4',
    paddingVertical: 12,
  },
  registerNowText: {
    fontWeight: '700',
    color: '#35C2C1',
  },
  socialIcon: {
    width: 26,
    height: 26,
  },
});

const Login = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const navigateForgotPassword = useCallback(() => {
    navigation.navigate('ForgotPassword');
  }, [navigation]);

  const login = useCallback(
    (loginParams: LoginParamsType, type?: LoginType) => {
      console.log('🚀 ~ login ~ loginParams:', loginParams);
      console.log('🚀 ~ login ~ type:', type);
      switch (type) {
        case 'facebook':
          break;
        case 'google':
          break;
        case 'apple':
          break;
        default:
          break;
      }
    },
    [],
  );

  const navigateRegister = useCallback(() => {
    navigation.navigate('Register');
  }, [navigation]);

  return (
    <ScrollView bounces={false}>
      <View style={styles.container}>
        <SafeAreaView style={styles.flex1}>
          <View style={styles.contentContainer}>
            <View>
              <Pressable onPress={goBack}>
                <View style={styles.button}>
                  <BackArrow
                    width={styles.backIcon.width}
                    height={styles.backIcon.height}
                  />
                </View>
              </Pressable>

              <View style={styles.formContainer}>
                <View style={styles.welcomeContainer}>
                  <Text style={styles.welcomeText}>
                    Welcome back! Glad to see you, Again!
                  </Text>
                </View>

                <View style={styles.form}>
                  <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your email"
                    placeholderTextColor="#8391A1"
                  />

                  <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter your password"
                    placeholderTextColor="#8391A1"
                    secureTextEntry
                  />

                  <View style={styles.forgotPasswordContainer}>
                    <Pressable onPress={navigateForgotPassword}>
                      <Text style={styles.forgotPasswordText}>
                        Forgot Password?
                      </Text>
                    </Pressable>
                  </View>
                </View>

                <Pressable onPress={() => login({email, password})}>
                  <View
                    style={[
                      styles.buttonContainer,
                      styles.primaryButtonContainer,
                    ]}>
                    <Text style={[styles.font, styles.loginText]}>Login</Text>
                  </View>
                </Pressable>

                <View style={styles.loginWithContainer}>
                  <View style={styles.loginWithHeader}>
                    <View style={styles.divider} />
                    <View>
                      <Text style={styles.loginWithText}>Or Login with</Text>
                    </View>
                    <View style={styles.divider} />
                  </View>

                  <View style={styles.loginWithBody}>
                    <Pressable
                      style={styles.socialButton}
                      onPress={() => login({email, password}, 'facebook')}>
                      <Facebook
                        width={styles.socialIcon.width}
                        height={styles.socialIcon.height}
                      />
                    </Pressable>

                    <Pressable
                      style={styles.socialButton}
                      onPress={() => login({email, password}, 'google')}>
                      <Google
                        width={styles.socialIcon.width}
                        height={styles.socialIcon.height}
                      />
                    </Pressable>

                    <Pressable
                      style={styles.socialButton}
                      onPress={() => login({email, password}, 'apple')}>
                      <Apple
                        width={styles.socialIcon.width}
                        height={styles.socialIcon.height}
                      />
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <Text style={styles.font}>
                Don’t have an account?{' '}
                <TouchableWithoutFeedback onPress={navigateRegister}>
                  <Text style={styles.registerNowText}>Register Now</Text>
                </TouchableWithoutFeedback>
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </ScrollView>
  );
};

export default Login;
