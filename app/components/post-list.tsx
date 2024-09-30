'use client';

import { Do_Hyeon } from 'next/font/google';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function PostList() {
  const [postList, setPostList] = useState<[] | null>([]);

  useEffect(() => {
    setPostList(null);
  }, []);

  return (
    <div className='grid grid-cols-4 gap-2'>
      {postList.map((post, index) => (
        <PostItem
          key={index}
          placeName={post.placeName}
          thumbnail={post.thumbnail}
          best={post.best}
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
  placeName: string;
  thumbnail: string;
  best: string;
  author: string;
  date: string;
}

function PostItem({ placeName, thumbnail, best, author, date }: Props) {
  return (
    <div className='max-h-80 max-w-60 cursor-pointer bg-white p-1 shadow'>
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
        <Image src={thumbnail} alt='No image' width={230} height={230} />
        <div className='p-1'>
          <div className='flex items-center gap-1'>
            <p className='text-sm font-bold text-black/40'>최고 난이도 |</p>
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
            <p className='text-sm font-bold text-black/40'>(V4)</p>
          </div>
          <div className='flex max-h-32 justify-between gap-3'>
            <p className='text-sm font-bold text-blue-500'>{author}</p>
            <p className='text-sm font-bold text-black/40'>{date}</p>
          </div>
        </div>
      </div>
    </div>
  );
}