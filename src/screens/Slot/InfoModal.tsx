import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import CustomModal from '@/components/ui/Modal';
import CustomText from '@/components/ui/Text';
import CrossIcon from '@/assets/icons/cross.svg';
import {SlotIds} from '@/types/common';
import {SLOTS_DATA_COMBO_IMAGES} from '@/constants/common';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  gameId: SlotIds;
}

export default function InfoModal({isOpen, onClose, gameId}: Props) {
  return (
    <CustomModal onClose={onClose} isVisible={isOpen}>
      <TouchableOpacity
        onPress={onClose}
        style={{position: 'absolute', top: -110, right: 0, zIndex: 10}}>
        <View>
          <CrossIcon />
        </View>
      </TouchableOpacity>

      <CustomText fs={28} fw="bold">
        Combinations
      </CustomText>

      <View style={{marginTop: 16}}>
        <Image
          source={SLOTS_DATA_COMBO_IMAGES[gameId]}
          style={{
            width: 366,
            height: gameId !== SlotIds.FISHER_CAMP ? 202 : 300,
          }}
        />
      </View>
    </CustomModal>
  );
}
