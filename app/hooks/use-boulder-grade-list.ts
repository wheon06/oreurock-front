import fetcher from '@/app/utils/fetcher';
import { useState } from 'react';
import MethodType from '@/app/types/method-type';
import { BoulderGradeType } from '@/app/types/boulder-grade-type';
import mapBoulderGradeList from '@/app/utils/map-boulder-grade-list';
import { toast } from 'sonner';

const useBoulderGradeList = () => {
  const [boulderGradeList, setBoulderGradeList] = useState<BoulderGradeType[]>(
    [],
  );

  const fetchBoulderGradeList = async (placeId: number) => {
    try {
      const response = await fetcher(
        '/boulder-grade/' + placeId,
        MethodType.GET,
      );
      const boulderGradeListData = await response.json();
      const mappedBoulderGradeListData =
        mapBoulderGradeList(boulderGradeListData);
      setBoulderGradeList(mappedBoulderGradeListData);
    } catch {
      toast.error('알 수 없는 오류가 발생했습니다.');
    }
  };

  return { boulderGradeList, fetchBoulderGradeList };
};

export default useBoulderGradeList;
