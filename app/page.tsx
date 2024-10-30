'use client';

import HeadNavbar from '@/app/components/head-navbar';
import { Button } from '@nextui-org/react';
import PostList from '@/app/components/post-list';
import React from 'react';

export default function Home() {
  return (
    <div className='relative min-h-screen bg-white'>
      <HeadNavbar />
      <div className='h-full w-full bg-white px-10 mobile:px-5'>
        <div className='mx-auto h-full max-w-4xl overflow-scroll bg-white pt-20'>
          <PostList />
        </div>
      </div>
      <a
        href='/post'
        className='fixed bottom-2 left-1/2 w-fit'
        style={{ transform: 'translateX(-50%)' }}
      >
        <Button isIconOnly aria-label='Like' className='text-[25px]'>
          +
        </Button>
      </a>
    </div>
  );
}
