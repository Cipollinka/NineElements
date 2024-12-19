export interface Game {
  id: number;
  title: string;
  image: any;
  tasks: Task[];
}

export interface Task {
  title: string;
  // isDone: boolean;
  totalValue?: number;
  // currentValue: number;
}

export enum SlotIds {
  BOOK_DEMO = 'book_demo',
  ZEUS_JOY = 'zeus_joy',
  FISHER_CAMP = 'fisher_camp',
  NINE_ELEMENTS = 'nine_elements',
}

export type Progress = Omit<
  Record<SlotIds, [number, number, number]>,
  SlotIds.NINE_ELEMENTS
>;
