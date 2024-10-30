export type ClimbType = {
  id: 31;
  climbType: string;
  isCompleted: boolean;
  attempt: number;
  videoUrl: string;
  thumbnailUrl: string;
  userId: number;
  placeId: number;
  boulderGradeId: number | null;
  leadGradeId: number | null;
  boardGradeId: number | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};
