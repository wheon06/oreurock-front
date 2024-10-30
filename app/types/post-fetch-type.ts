export type PostFetchType = {
  id: number;
  isCompleted: boolean; // 빵클 여부
  thumbnailUrl: string;
  placeName: string;
  colorGrade: string;
  vGrade: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  climbs: [
    {
      id: number;
      climbType: '볼더링' | '리드' | '문보드' | '킬터보드';
      isCompleted: boolean;
      attempt: number;
      videoUrl: string;
      thumbnailUrl: string;
      userId: number;
      placeId: number;
      boulderGradeId: number | null;
      leadGradeId: number | null;
      boardGradeId: number | null;
      createdAt: string;
      updatedAt: string;
      deletedAt: string | null;
    },
  ];
};
