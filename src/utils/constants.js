import {Platform} from 'react-native';
const productSkus = Platform.select({
  android: ['one2one_sub'],
});

const SCORE_LABELS = {
  0: 'Not Covered',
  1: 'Introduced',
  2: 'Under Full Instruction',
  3: 'Prompted',
  4: 'Seldom Prompted',
  5: 'Independent',
};

export const constants = {
  productSkus,
  SCORE_LABELS,
};
