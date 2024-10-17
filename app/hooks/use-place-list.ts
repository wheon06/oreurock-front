import fetcher from '@/app/utils/fetcher';
import { useEffect, useState } from 'react';
import { PlaceType } from '@/app/types/place-type';
import MethodType from '@/app/types/method-type';
import { toast } from 'sonner';

const usePlaceList = () => {
  const [placeList, setPlaceList] = useState<PlaceType[]>([]);

  useEffect(() => {
    const fetchPlaceListData = async () => {
      const response = await fetcher('/place', MethodType.GET);
      const placeListData = await response.json();
      setPlaceList(placeListData);
    };

    fetchPlaceListData().catch(() => {
      toast.error('알 수 없는 오류가 발생했습니다.');
    });
  }, []);

  return { placeList };
};

export default usePlaceList;
