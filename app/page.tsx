'use client';

import HeadNavbar from '@/app/components/head-navbar';
import { Button, useDisclosure } from '@nextui-org/react';
import PostList from '@/app/components/post-list';
import React from 'react';

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className='relative min-h-screen'>
      <HeadNavbar />
      <div className='mobile:px-5 h-full w-full bg-white px-10'>
        <div className='mx-auto h-full max-w-4xl overflow-scroll bg-white pt-16'>
          <PostList />
        </div>
        {/*<CapsuleInfo />*/}
        {/*<div className='border-lightGray/30 my-[1%] w-full border-[1px]'></div>*/}
      </div>
      <a
        href='#'
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
