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

const LIMIT_DIGITS = 4;

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
  form: {},
  button: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#E8ECF4',
    borderRadius: 12,
    justifyContent: 'center',
    paddingLeft: 8,
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
  registerNowText: {
    fontWeight: '700',
    color: '#35C2C1',
  },
  codeContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  codeInputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F8F9',
    borderWidth: 1,
    borderColor: '#E8ECF4',
    borderRadius: 8,
  },
  validCodeInputContainer: {
    backgroundColor: '#FFFFFF',
    borderColor: '#35C2C1',
  },
  validCodeInputText: {
    minHeight: 60,
    paddingVertical: 16,
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  digitsMask: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  digitsText: {
    flex: 1,
    color: 'transparent',
  },
});

const Verification = () => {
  const navigation = useNavigation();
  const [digits, setDigits] = useState('');

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const verify = useCallback(() => {
    console.log('🚀 ~ Verification ~ verify:', digits);
    navigation.navigate('CreateNewPassword');
  }, [digits, navigation]);

  const resend = useCallback(() => {
    console.log('🚀 ~ resend ~ resend:');
  }, []);

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
                  <Text style={styles.welcomeText}>OTP Verification</Text>

                  <Text style={styles.descriptionText}>
                    Enter the verification code we just sent on your email
                    address.
                  </Text>
                </View>

                <View style={styles.form}>
                  <View style={styles.codeContainer}>
                    {Array(LIMIT_DIGITS)
                      .fill(null)
                      .map((_, di) => {
                        const valid = digits[di];
                        return (
                          <View
                            key={['digit', di].join('-')}
                            style={[
                              styles.codeInputContainer,
                              valid
                                ? styles.validCodeInputContainer
                                : undefined,
                            ]}>
                            <Text style={[styles.validCodeInputText]}>
                              {digits[di]}
                            </Text>
                          </View>
                        );
                      })}
                  </View>

                  <View style={styles.digitsMask}>
                    <TextInput
                      style={styles.digitsText}
                      value={digits}
                      onChangeText={setDigits}
                      keyboardType="number-pad"
                      maxLength={LIMIT_DIGITS} // Limit to 4 digits (or adjust as needed)
                      autoFocus // Auto-focus on input (optional)
                      caretHidden
                    />
                  </View>
                </View>

                <Pressable
                  onPress={verify}
                  disabled={digits.length < LIMIT_DIGITS}>
                  <View
                    style={[
                      styles.buttonContainer,
                      styles.primaryButtonContainer,
                    ]}>
                    <Text style={[styles.font, styles.loginText]}>Verify</Text>
                  </View>
                </Pressable>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <Text style={styles.font}>
                Didn’t received code?{' '}
                <TouchableWithoutFeedback onPress={resend}>
                  <Text style={styles.registerNowText}>Resend</Text>
                </TouchableWithoutFeedback>
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </ScrollView>
  );
};

export default Verification;
