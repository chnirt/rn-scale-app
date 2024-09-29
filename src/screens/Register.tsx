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

type RegisterParamsType = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type RegisterType = 'facebook' | 'google' | 'apple';

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
});

const Register = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const register = useCallback(
    (registerParams: RegisterParamsType, type?: RegisterType) => {
      console.log('🚀 ~ Register ~ registerParams:', registerParams);
      console.log('🚀 ~ Register ~ type:', type);
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

  const navigateLogin = useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  return (
    <ScrollView bounces={false}>
      <View style={styles.container}>
        <SafeAreaView style={styles.flex1}>
          <View style={styles.contentContainer}>
            <View>
              <Pressable onPress={goBack}>
                <View style={styles.button}>
                  <BackArrow />
                </View>
              </Pressable>

              <View style={styles.formContainer}>
                <View style={styles.welcomeContainer}>
                  <Text style={styles.welcomeText}>
                    Hello! Register to get started
                  </Text>
                </View>

                <View style={styles.form}>
                  <TextInput
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Username"
                    placeholderTextColor="#8391A1"
                  />

                  <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email"
                    placeholderTextColor="#8391A1"
                  />

                  <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password"
                    placeholderTextColor="#8391A1"
                    secureTextEntry
                  />

                  <TextInput
                    style={styles.input}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="Confirm Password"
                    placeholderTextColor="#8391A1"
                    secureTextEntry
                  />
                </View>

                <Pressable
                  onPress={() =>
                    register({username, email, password, confirmPassword})
                  }>
                  <View
                    style={[
                      styles.buttonContainer,
                      styles.primaryButtonContainer,
                    ]}>
                    <Text style={[styles.font, styles.loginText]}>
                      Register
                    </Text>
                  </View>
                </Pressable>

                <View style={styles.loginWithContainer}>
                  <View style={styles.loginWithHeader}>
                    <View style={styles.divider} />
                    <View>
                      <Text style={styles.loginWithText}>Or Register with</Text>
                    </View>
                    <View style={styles.divider} />
                  </View>

                  <View style={styles.loginWithBody}>
                    <Pressable
                      style={styles.socialButton}
                      onPress={() =>
                        register(
                          {username, email, password, confirmPassword},
                          'facebook',
                        )
                      }>
                      <Facebook />
                    </Pressable>

                    <Pressable
                      style={styles.socialButton}
                      onPress={() =>
                        register(
                          {username, email, password, confirmPassword},
                          'google',
                        )
                      }>
                      <Google />
                    </Pressable>

                    <Pressable
                      style={styles.socialButton}
                      onPress={() =>
                        register(
                          {username, email, password, confirmPassword},
                          'apple',
                        )
                      }>
                      <Apple />
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <Text style={styles.font}>
                Already have an account?{' '}
                <TouchableWithoutFeedback onPress={navigateLogin}>
                  <Text style={styles.registerNowText}>Login Now</Text>
                </TouchableWithoutFeedback>
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </ScrollView>
  );
};

export default Register;
