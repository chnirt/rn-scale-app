import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  TextInput,
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
});

const CreateNewPassword = () => {
  const navigation = useNavigation();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const createNewPassword = useCallback(
    (password: string) => {
      console.log('🚀 ~ CreateNewPassword ~ password:', password);
      navigation.navigate('Success');
    },
    [navigation],
  );

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
                  <Text style={styles.welcomeText}>Create new password</Text>

                  <Text style={styles.descriptionText}>
                    Your new password must be unique from those previously used.
                  </Text>
                </View>

                <View style={styles.form}>
                  <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="New Password"
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

                <Pressable onPress={() => createNewPassword(password)}>
                  <View
                    style={[
                      styles.buttonContainer,
                      styles.primaryButtonContainer,
                    ]}>
                    <Text style={[styles.font, styles.loginText]}>
                      Reset Password
                    </Text>
                  </View>
                </Pressable>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </ScrollView>
  );
};

export default CreateNewPassword;
