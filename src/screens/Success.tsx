import React, {useCallback} from 'react';
import {View, Text, Pressable, SafeAreaView, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {ChnirtStyleSheet} from '../utils';
import SuccessSvg from '../assets/success.svg';

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
  center: {
    flex: 1,
    justifyContent: 'center',
  },
  successContainer: {
    alignItems: 'center',
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
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#838BA1',
    textAlign: 'center',
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

const Success = () => {
  const navigation = useNavigation();

  const backToLogin = useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  return (
    <ScrollView bounces={false}>
      <View style={styles.container}>
        <SafeAreaView style={styles.flex1}>
          <View style={styles.contentContainer}>
            <View style={styles.center}>
              <View style={styles.successContainer}>
                <SuccessSvg />
              </View>

              <View style={styles.formContainer}>
                <View style={styles.welcomeContainer}>
                  <Text style={styles.welcomeText}>Password Changed!</Text>

                  <Text style={styles.descriptionText}>
                    Your password has been changed successfully.
                  </Text>
                </View>

                <Pressable onPress={backToLogin}>
                  <View
                    style={[
                      styles.buttonContainer,
                      styles.primaryButtonContainer,
                    ]}>
                    <Text style={[styles.font, styles.loginText]}>
                      Back to Login
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

export default Success;
