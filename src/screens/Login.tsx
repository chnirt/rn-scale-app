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
import {NamedStyles, moderateScale} from 'react-native-size-matters';
import {SIZE_MATTERS_BASE_WIDTH} from '@env';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width; // application

const iPhoneXViewport = {
  width: 375,
  height: 812,
};

const makeStyles = <T extends NamedStyles<T> | NamedStyles<any>>(
  _styles: T | NamedStyles<T>,
) => {
  const same = Number(SIZE_MATTERS_BASE_WIDTH) === windowWidth;
  const convertScaleObj = (o: any): any => {
    Object.keys(o).forEach(k => {
      if (typeof o[k] === 'object') {
        convertScaleObj(o[k]);
      }
      if (typeof o[k] === 'number') {
        o[k] = moderateScale(o[k], same ? 0 : undefined);
      }
    });
    return o;
  };
  return StyleSheet.create(convertScaleObj(_styles));
};

const styleSheetStyles = StyleSheet.create({
  container: {
    width: iPhoneXViewport.width,
    height: iPhoneXViewport.height,
    justifyContent: 'flex-end',
  },
  image: {
    position: 'absolute',
    width: 375,
    height: 812,
  },
  contentContainer: {gap: 44, marginHorizontal: 22},
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
  font: {
    fontSize: 15,
  },
});

const Login = () => {
  const [scaled, setScaled] = useState(false);
  const styles = scaled
    ? makeStyles({
        container: {
          width: iPhoneXViewport.width,
          height: iPhoneXViewport.height,
          justifyContent: 'flex-end',
        },
        image: {
          position: 'absolute',
          width: 375,
          height: 812,
        },
        contentContainer: {gap: 44, marginHorizontal: 22},
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
        font: {
          fontSize: 15,
        },
      })
    : styleSheetStyles;
  console.log('styles---', styles);

  return (
    <View>
      <ScrollView>
        <View style={styles.container}>
          <Image
            style={[
              styles.image,
              // scaled && styles.scaledImage
            ]}
            source={require('../assets/background.png')}
          />

          <View
            style={[
              styles.contentContainer,
              // scaled && styles.scaledContentContainer,
            ]}>
            <View style={{alignItems: 'center'}}>
              <Image
                style={[
                  styles.brandingImage,
                  // scaled && styles.scaledBrandingImage,
                ]}
                source={require('../assets/branding.png')}
              />
            </View>
            <View style={styles.buttonGroupContainer}>
              <Pressable>
                <View
                  style={[
                    styles.buttonContainer,
                    {
                      backgroundColor: '#1E232C',
                    },
                  ]}>
                  <Text
                    style={[
                      styles.font,
                      {
                        color: '#FFFFFF',
                      },
                    ]}>
                    Login
                  </Text>
                </View>
              </Pressable>

              <Pressable>
                <View
                  style={[
                    styles.buttonContainer,
                    {
                      backgroundColor: '#FFFFFF',
                      borderWidth: 1,
                      borderColor: '#1E232C',
                    },
                  ]}>
                  <Text
                    style={[
                      styles.font,
                      {
                        color: '#1E232C',
                      },
                    ]}>
                    Register
                  </Text>
                </View>
              </Pressable>
            </View>

            <View>
              <Pressable>
                <View style={styles.buttonContainer}>
                  <Text
                    style={[
                      styles.font,
                      {
                        color: '#35C2C1',
                      },
                    ]}>
                    Continue as a guest
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          borderWidth: 1,
          alignSelf: 'center',
          bottom: 0,
          left: 0,
          alignItems: 'center',
        }}>
        <Text>
          {windowWidth}x{windowHeight}
        </Text>
        <Text>
          {iPhoneXViewport.width}x{iPhoneXViewport.height}
        </Text>
        <Pressable onPress={() => setScaled(prevState => !prevState)}>
          <View style={styles.buttonContainer}>
            <Text
              style={[
                styles.font,
                {
                  color: '#35C2C1',
                },
              ]}>
              {scaled ? 'Scaled' : 'Not scale'}
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default Login;
