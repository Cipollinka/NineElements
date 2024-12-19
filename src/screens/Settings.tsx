import React from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import CustomText from '@/components/ui/Text';

import Website from '@/assets/icons/website.svg';
import TosIcon from '@/assets/icons/tos.svg';
import PrivacyIcon from '@/assets/icons/privacy.svg';
import ArrowIcon from '@/assets/icons/arrow.svg';

import Row from '@/components/layout/Row';
import {
  Linking,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from 'react-native';
import {UseNavigationProp} from '@/types/navigation';
import {useNavigation} from '@react-navigation/native';
import {useSettingsStore} from '@/stores/settingsStore';

const options = [
  {
    label: 'Developer Website',
    icon: Website,
    value: 'https://www.termsfeed.com/live/5c5b12f1-3823-4215-ae93-e9861e4c784a',
  },
  {
    label: 'Terms of Use',
    icon: TosIcon,
    value: 'https://www.termsfeed.com/live/5c5b12f1-3823-4215-ae93-e9861e4c784a',
  },
  {
    label: 'Privacy Policy',
    icon: PrivacyIcon,
    value: 'https://www.termsfeed.com/live/5c5b12f1-3823-4215-ae93-e9861e4c784a',
  },
];

export default function Settings() {
  const nav = useNavigation<UseNavigationProp>();

  const isGameSoundsEnabled = useSettingsStore(
    state => state.isGameSoundsEnabled,
  );
  const setIsGameSoundsEnabled = useSettingsStore(
    state => state.setIsGameSoundsEnabled,
  );

  const handleToggleSounds = () => {
    setIsGameSoundsEnabled(!isGameSoundsEnabled);
  };

  const handleGoBack = () => {
    nav.goBack();
  };

  const handleOptionPress = (value: string) => {
    Linking.openURL(value);
  };

  return (
    <BackgroundWrapper>
      <Container>
        <Row gap={16}>
          <TouchableOpacity onPress={handleGoBack}>
            <View style={styles.actionBtn}>
              <ArrowIcon
                width={36}
                height={20}
                style={{transform: [{rotate: '90deg'}]}}
              />
            </View>
          </TouchableOpacity>

          <CustomText fw="bold" fs={28}>
            Settings
          </CustomText>
        </Row>
        <Row style={[styles.item, {marginTop: 36}]}>
          <CustomText fw="semibold" fs={20}>
            Game sounds
          </CustomText>
          <Switch
            ios_backgroundColor="#050322"
            value={isGameSoundsEnabled}
            onValueChange={handleToggleSounds}
            trackColor={{true: '#FFBE0D', false: '#050322'}}
          />
        </Row>

        <View style={{marginTop: 44, gap: 20}}>
          {options.map(option => {
            const Icon = option.icon;
            return (
              <TouchableOpacity onPress={() => handleOptionPress(option.value)}>
                <Row style={[styles.item, {height: 88}]} key={option.label}>
                  <CustomText fs={20} fw="semibold">
                    {option.label}
                  </CustomText>
                  <Icon />
                </Row>
              </TouchableOpacity>
            );
          })}
        </View>
      </Container>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  actionBtn: {
    backgroundColor: '#1D1C30',
    width: 52,
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: '#1D1C30',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
});
