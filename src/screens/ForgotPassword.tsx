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
  welcomeContainer: {
    gap: 10,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: '700',
    color: '#1E232C',
  },
  descriptionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#838BA1',
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
});

const ForgotPassword = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const sendCode = useCallback(
    (email: string) => {
      console.log('🚀 ~ sendCode ~ email:', email);
      navigation.navigate('Verification');
    },
    [navigation],
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
                  <BackArrow
                    width={styles.backIcon.width}
                    height={styles.backIcon.height}
                  />
                </View>
              </Pressable>

              <View style={styles.formContainer}>
                <View style={styles.welcomeContainer}>
                  <Text style={styles.welcomeText}>Forgot Password?</Text>

                  <Text style={styles.descriptionText}>
                    Don't worry! It occurs. Please enter the email address
                    linked with your account.
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
                </View>

                <Pressable onPress={() => sendCode(email)}>
                  <View
                    style={[
                      styles.buttonContainer,
                      styles.primaryButtonContainer,
                    ]}>
                    <Text style={[styles.font, styles.loginText]}>
                      Send Code
                    </Text>
                  </View>
                </Pressable>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <Text style={styles.font}>
                Remember Password?{' '}
                <TouchableWithoutFeedback onPress={navigateLogin}>
                  <Text style={styles.registerNowText}>Login</Text>
                </TouchableWithoutFeedback>
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </ScrollView>
  );
};

export default ForgotPassword;
