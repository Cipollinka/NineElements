import React from 'react';
import CustomText from './Text';

export default function Label({title}: {title: string}) {
  return (
    <CustomText style={{fontSize: 18, marginBottom: 6, lineHeight: 16}}>
      {title}
    </CustomText>
  );
}
