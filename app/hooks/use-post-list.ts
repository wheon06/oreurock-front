import { useEffect, useState } from 'react';
import fetcher from '@/app/utils/fetcher';
import MethodType from '@/app/types/method-type';
import { PostFetchType } from '@/app/types/post-fetch-type';
import { UserDetailFetchType } from '@/app/types/user-detail-fetch-type';
import { PostType } from '@/app/types/post-type';
import elapsedTime from '@/app/utils/elapsed-time';
import { toast } from 'sonner';

export const usePostList = () => {
  const [postList, setPostList] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllPost = async () => {
      try {
        const response = await fetcher('/post', MethodType.GET);

        if (response && response.ok) {
          const postDataListUnsorted: PostFetchType[] = await response.json();
          const postDataList = postDataListUnsorted.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          );

          const uniqueUserIds = [
            ...new Set(postDataList.map((postData) => postData.userId)),
          ];

          const userResponse = await fetcher(
            '/user-detail',
            MethodType.POST,
            uniqueUserIds,
          );

          if (userResponse && userResponse.ok) {
            const userDataList: UserDetailFetchType[] =
              await userResponse.json();
            const userDataMap = Object.fromEntries(
              userDataList.map((user) => [user.id, user]),
            );

            const formattedPostDataList = postDataList.map(
              (postData): PostType => ({
                id: postData.id,
                placeName: postData.placeName,
                thumbnail: postData.thumbnailUrl,
                colorGrade: postData.colorGrade,
                vGrade: postData.vGrade,
                author: userDataMap[postData.userId]?.name || 'Unknown',
                date: elapsedTime(postData.createdAt),
              }),
            );

            setPostList(formattedPostDataList);
          }
        }
      } catch (error) {
        console.error(error);
        toast.error('알 수 없는 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllPost();
  }, []);

  return { postList, isLoading };
};
