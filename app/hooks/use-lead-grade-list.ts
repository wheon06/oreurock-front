import fetcher from '@/app/utils/fetcher';
import { useEffect, useState } from 'react';
import MethodType from '@/app/types/method-type';
import { LeadGradeType } from '@/app/types/lead-grade-type';
import { toast } from 'sonner';

const useLeadGradeList = () => {
  const [leadGradeList, setLeadGradeList] = useState<LeadGradeType[]>([]);

  useEffect(() => {
    const fetchLeadGradeListData = async () => {
      const response = await fetcher('/lead-grade', MethodType.GET);
      if (response) {
        const leadGradeListData = await response.json();
        setLeadGradeList(
          Array.isArray(leadGradeListData) ? leadGradeListData : [],
        );
      }
    };

    fetchLeadGradeListData().catch(() => {
      toast.error('알 수 없는 오류가 발생했습니다.');
    });
  }, []);

  return { leadGradeList };
};

export default useLeadGradeList;
