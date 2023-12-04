import {Dimensions, StyleSheet} from 'react-native';
import {NamedStyles, moderateScale} from 'react-native-size-matters';
import {SIZE_MATTERS_BASE_WIDTH} from '@env';

const windowWidth = Dimensions.get('window').width; // application

export const ChnirtStyleSheet = {
  create: <T extends NamedStyles<T> | NamedStyles<any>>(
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
  },
};
