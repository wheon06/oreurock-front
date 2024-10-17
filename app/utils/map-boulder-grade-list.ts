import { BoulderGradeType } from '@/app/types/boulder-grade-type';

export type InputData = {
  id: number;
  colorGrade: string;
  vGrade: string;
  placeId: number;
};

export default function mapBoulderGradeList(
  data: InputData[],
): BoulderGradeType[] {
  const result: BoulderGradeType[] = [];
  const groupedGrades: { [key: string]: BoulderGradeType } = {};

  data.forEach((item) => {
    const { id, colorGrade, vGrade, placeId } = item;

    if (!groupedGrades[colorGrade]) {
      groupedGrades[colorGrade] = {
        id: id,
        colorGrade: colorGrade,
        placeId: placeId,
        vGrade: [],
      };
    }
    groupedGrades[colorGrade].vGrade.push(vGrade);
  });

  for (const key in groupedGrades) {
    const entry = groupedGrades[key];
    result.push(entry);
  }

  return result;
}
