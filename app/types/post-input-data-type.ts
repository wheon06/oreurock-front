import { DateValue } from '@internationalized/date';

export type PostInputDataType = {
  placeId: number;
  climbType: string;
  isCompleted: number;
  attempt: number;
  boulderGradeId: number;
  leadGradeId: number;
  boardGradeId: number;
  date: DateValue;
};
