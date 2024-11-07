import React from 'react';
import { Text } from 'react-native';

const TYPOGRAPHY_STYLES = {
  H1: { fontSize: 40, lineHeight: 2.5 * 16, fontFamily: 'Aleo' },
  H2: { fontSize: 36, lineHeight: 2.25 * 16,  fontFamily: 'Aleo' },
  H3: { fontSize: 32, lineHeight: 2 * 16,  fontFamily: 'Aleo' },
  H4: { fontSize: 28, lineHeight: 1.75 * 16,  fontFamily: 'Aleo' },
  H5: { fontSize: 24, lineHeight: 1.5 * 16,  fontFamily: 'Aleo' },
  SH1: { fontSize: 28, lineHeight: 1.75 * 16,  fontFamily: 'BostonRegular' },
  SH2: { fontSize: 24, lineHeight: 1.5 * 16, fontFamily: 'BostonRegular' },
  SH3: { fontSize: 20, lineHeight: 1.25 * 16, fontFamily: 'BostonSemiBold' },
  SH4: { fontSize: 16, lineHeight: 1 * 16,  fontFamily: 'BostonSemiBold' },
  SH5: { fontSize: 12, lineHeight: 0.75 * 16,  fontFamily: 'BostonRegular' },
  BodyL: { fontSize: 20, lineHeight: 1.25 * 16,  fontFamily: 'BostonRegular' },
  BodyS: { fontSize: 16, lineHeight: 1 * 16,  fontFamily: 'BostonRegular' },
  Caption: { fontSize: 12, lineHeight: 0.75 * 16, fontFamily: 'BostonRegular' },
};

const Typography = ({ variant = 'BodyS', children, color, align, style }) => {
  const textStyle = TYPOGRAPHY_STYLES[variant] || TYPOGRAPHY_STYLES.BodyS;

  return (
    <Text style={[textStyle, { color, textAlign: align }, style]}>
      {children}
    </Text>
  );
};

export default Typography;
