'use client';

import { Do_Hyeon } from 'next/font/google';
import Image from 'next/image';
import palette from '@/app/utils/palette';
import { PostListSkeleton } from '@/app/components/post-list-skeleton';
import { usePostList } from '@/app/hooks/use-post-list';

export default function PostList() {
  const { postList, isLoading } = usePostList();

  if (isLoading) return <PostListSkeleton />;

  if (postList.length === 0)
    return <div className='text-center'>기록한 운동이 없습니다.</div>;

  return (
    <div className='grid gap-3 px-2 pb-2 mobile:grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4'>
      {postList?.map((post) => (
        <PostItem
          key={post.id}
          id={post.id}
          placeName={post.placeName}
          thumbnail={post.thumbnail}
          best={palette[post.colorGrade as keyof typeof palette]}
          vGrade={post.vGrade}
          author={post.author}
          date={post.date}
        />
      ))}
    </div>
  );
}

const doHyeon = Do_Hyeon({
  subsets: ['latin'],
  weight: ['400'],
});

interface Props {
  id: number;
  placeName: string;
  thumbnail: string;
  best: string;
  vGrade: string;
  author: string;
  date: string;
}

function PostItem({
  id,
  placeName,
  thumbnail,
  best,
  vGrade,
  author,
  date,
}: Props) {
  return (
    <a
      href={'post/' + id}
      className='max-h-80 max-w-60 rounded-md bg-white p-1 shadow'
    >
      <div className='mx-auto'>
        <div className='flex'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='gray'
            className='size-4'
          >
            <path
              fillRule='evenodd'
              d='m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z'
              clipRule='evenodd'
            />
          </svg>
          <p
            className={
              doHyeon.className +
              ' w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm text-black/80'
            }
          >
            {placeName}
          </p>
        </div>
        <Image
          src={thumbnail}
          alt='No image'
          width={230}
          height={230}
          className='rounded-md'
        />
        <div className='p-1'>
          <div className='flex items-center gap-1'>
            <p className='text-sm font-bold text-black/40 mobile:text-xs'>
              최고 난이도 |
            </p>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='16'
              viewBox='0 0 47.5 47.5'
              id='heart'
            >
              <defs>
                <clipPath id='a'>
                  <path d='M0 38h38V0H0v38Z'></path>
                </clipPath>
              </defs>
              <g clip-path='url(#a)' transform='matrix(1.25 0 0 -1.25 0 47.5)'>
                <path
                  fill={'#' + best}
                  d='M3.067 25.68c0 8.799 12.184 12.06 15.933 1.874 3.749 10.186 15.933 6.925 15.933-1.874C34.933 16.12 19 3.999 19 3.999S3.067 16.12 3.067 25.68'
                ></path>
              </g>
            </svg>
            <p className='text-sm font-bold text-black/40 mobile:text-xs'>
              {'(' + vGrade + ')'}
            </p>
          </div>
          <div className='flex max-h-32 justify-between gap-3'>
            <p className='text-sm font-bold text-blue-500 mobile:text-xs'>
              {author}
            </p>
            <p className='text-sm font-bold text-black/40 mobile:text-xs'>
              {date}
            </p>
          </div>
        </div>
      </div>
    </a>
  );
}
