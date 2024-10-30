import fetcher from '@/app/utils/fetcher';
import { useEffect, useState } from 'react';
import MethodType from '@/app/types/method-type';
import { BoardGradeType } from '@/app/types/board-grade-type';
import { toast } from 'sonner';

const useBoardGradeList = () => {
  const [boardGradeList, setBoardGradeList] = useState<BoardGradeType[]>([]);

  useEffect(() => {
    const fetchBoardGradeListData = async () => {
      const response = await fetcher('/board-grade', MethodType.GET);
      if (response) {
        const boardGradeListData = await response.json();
        setBoardGradeList(
          Array.isArray(boardGradeListData) ? boardGradeListData : [],
        );
      }
    };
    fetchBoardGradeListData().catch(() => {
      toast.error('알 수 없는 오류가 발생했습니다.');
    });
  }, []);

  return { boardGradeList };
};

export default useBoardGradeList;
