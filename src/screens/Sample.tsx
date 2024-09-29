import React from 'react';
import {ChnirtStyleSheet} from '../utils';
import {View, Text} from 'react-native';

const styles = ChnirtStyleSheet.create({
  container: {
    flex: 1,
  },
});

const Sample = () => {
  return (
    <View style={styles.container}>
      <Text>Sample</Text>
    </View>
  );
};

export default Sample;
