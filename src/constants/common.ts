import {SlotIds} from '@/types/common';

export const NINE_ELEMENTS_SLOT_IMAGES = [
  require('@/assets/images/nine_elements/1.png'),
  require('@/assets/images/nine_elements/2.png'),
  require('@/assets/images/nine_elements/3.png'),
  require('@/assets/images/nine_elements/4.png'),
  require('@/assets/images/nine_elements/5.png'),
  require('@/assets/images/nine_elements/6.png'),
  require('@/assets/images/nine_elements/7.png'),
  require('@/assets/images/nine_elements/8.png'),
  require('@/assets/images/nine_elements/9.png'),
];

export const BOOK_DEMO_SLOT_IMAGES = [
  require('@/assets/images/book_demo/1.png'),
  require('@/assets/images/book_demo/2.png'),
  require('@/assets/images/book_demo/3.png'),
  require('@/assets/images/book_demo/3.png'),
  require('@/assets/images/book_demo/5.png'),
  require('@/assets/images/book_demo/6.png'),
  require('@/assets/images/book_demo/1.png'),
  require('@/assets/images/book_demo/6.png'),
  require('@/assets/images/book_demo/2.png'),
];

export const ZEUS_JOY_SLOT_IMAGES = [
  require('@/assets/images/zeus_joy/1.png'),
  require('@/assets/images/zeus_joy/2.png'),
  require('@/assets/images/zeus_joy/3.png'),
  require('@/assets/images/zeus_joy/3.png'),
  require('@/assets/images/zeus_joy/5.png'),
  require('@/assets/images/zeus_joy/6.png'),
  require('@/assets/images/zeus_joy/6.png'),
  require('@/assets/images/zeus_joy/1.png'),
  require('@/assets/images/zeus_joy/5.png'),
];

export const FISHER_CAMP_SLOT_IMAGES = [
  require('@/assets/images/fisher_camp/1.png'),
  require('@/assets/images/fisher_camp/2.png'),
  require('@/assets/images/fisher_camp/3.png'),
  require('@/assets/images/fisher_camp/4.png'),
  require('@/assets/images/fisher_camp/5.png'),
  require('@/assets/images/fisher_camp/6.png'),
  require('@/assets/images/fisher_camp/7.png'),
  require('@/assets/images/fisher_camp/8.png'),
  require('@/assets/images/fisher_camp/2.png'),
];

export const getSlotImages = (gameId?: string) => {
  switch (gameId) {
    case SlotIds.BOOK_DEMO:
      return BOOK_DEMO_SLOT_IMAGES;
    case SlotIds.ZEUS_JOY:
      return ZEUS_JOY_SLOT_IMAGES;
    case SlotIds.FISHER_CAMP:
      return FISHER_CAMP_SLOT_IMAGES;
    default:
      return NINE_ELEMENTS_SLOT_IMAGES;
  }
};

export const SLOTS_DATA_IMAGES = {
  [SlotIds.BOOK_DEMO]: require('@/assets/images/book.png'),
  [SlotIds.ZEUS_JOY]: require('@/assets/images/lighting.png'),
  [SlotIds.FISHER_CAMP]: require('@/assets/images/fish.png'),
  // [SlotIds.NINE_ELEMENTS]: require('@/assets/images/nine_elements.png'),
};

export const SLOTS_DATA_BG_IMAGES = {
  [SlotIds.BOOK_DEMO]: require('@/assets/images/backgrounds/book_demo_bg.png'),
  [SlotIds.ZEUS_JOY]: require('@/assets/images/backgrounds/zeus_joy_bg.png'),
  [SlotIds.FISHER_CAMP]: require('@/assets/images/backgrounds/fisher_camp_bg.png'),
  [SlotIds.NINE_ELEMENTS]: require('@/assets/images/backgrounds/nine_elements_bg.png'),
};

export const SLOTS_DATA_COMBO_IMAGES = {
  [SlotIds.BOOK_DEMO]: require('@/assets/images/combos/bd_combo.png'),
  [SlotIds.ZEUS_JOY]: require('@/assets/images/combos/zy_combo.png'),
  [SlotIds.FISHER_CAMP]: require('@/assets/images/combos/fc_combo.png'),
  [SlotIds.NINE_ELEMENTS]: require('@/assets/images/combos/ne_combo.png'),
};

export const SLOTS_DATA = [
  {
    title: 'Book Demo',
    gameId: SlotIds.BOOK_DEMO,
    tasks: [
      {
        title: 'Play Book Demo 10 times',
        totalValue: 10,
      },
      {
        title: 'Win 500 coins in Book Demo from 1 spin',
        totalValue: 500,
      },
      {
        title: 'Get 5000 coins from Book Demo',
        totalValue: 5000,
      },
    ],
  },
  {
    title: 'Zeus Joy',
    gameId: SlotIds.ZEUS_JOY,
    tasks: [
      {
        title: 'Play Zeus Joy 50 times',
        totalValue: 50,
      },
      {
        title: 'Win 1000 coins in Zeus Joy from 1 spin',
        totalValue: 1000,
      },
      {
        title: 'Get 10000 coins from Zeus Joy',
        totalValue: 10000,
      },
    ],
  },
  {
    title: 'Fisher Camp',
    gameId: SlotIds.FISHER_CAMP,
    tasks: [
      {
        title: 'Play Fisher Camp 20 times',
        totalValue: 20,
      },
      {
        title: 'Win 1000 coins in Fisher Camp from 1 spin',
        totalValue: 1000,
      },
      {
        title: 'Get 20000 coins from Fisher Camp',
        totalValue: 20000,
      },
    ],
  },
];

export const REWARDS = {
  6: 700,
  7: 50,
  8: 1000,
  9: 1000,
  10: 250,
  11: 30,
  12: 100,
  13: 500,
  14: 50,
  15: 500,
  16: 50,
  17: 250,
  18: 1000,
  19: 10,
  20: 250,
  21: 50,
  22: 100,
  23: 500,
  24: 1000,
  25: 250,
  26: 50,
  27: 1000,
  28: 150,
  29: 700,
  30: 30,
  31: 100,
  32: 500,
};
