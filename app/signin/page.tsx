'use client';

import { Button, Input } from '@nextui-org/react';
import { useState } from 'react';
import { EyeFilledIcon, EyeSlashFilledIcon } from '@nextui-org/shared-icons';
import { Gugi } from 'next/font/google';
import { toast } from 'sonner';
import fetcher from '@/app/utils/fetcher';
import MethodType from '@/app/types/method-type';

const gugi = Gugi({
  subsets: ['latin'],
  weight: ['400'],
});

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSignInSubmit = async () => {
    if (!(username && password)) {
      toast.error('모든 값을 입력해주세요.');
      return;
    }

    try {
      const response = await fetcher('/auth/signin', MethodType.POST, {
        username,
        password,
      });

      if (response.status === 401)
        toast.error('아이디 또는 비밀번호를 확인해주세요.');
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        window.location.href = '/';
      }
    } catch {
      toast.error('알 수 없는 오류가 발생했습니다.');
    }
  };

  return (
    <div className='flex min-h-screen w-full items-center justify-center bg-white px-10'>
      <div className='flex h-fit w-[600px] flex-col gap-3 rounded-3xl border-2 p-20 mobile:p-10'>
        <div className='mx-auto flex items-end gap-1'>
          <h1
            className={gugi.className + ' text-5xl text-black mobile:text-4xl'}
          >
            오르락
          </h1>
          <p
            className={gugi.className + ' text-md text-black/60 mobile:text-sm'}
          >
            OreuRock
          </p>
        </div>
        <div className='flex flex-col gap-2'>
          <Input
            fullWidth
            label='아이디'
            labelPlacement='inside'
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <Input
            label='비밀번호'
            labelPlacement='inside'
            endContent={
              <button
                className='focus:outline-none'
                type='button'
                onClick={toggleVisibility}
                aria-label='toggle password visibility'
              >
                {isVisible ? (
                  <EyeFilledIcon className='pointer-events-none text-2xl text-default-400' />
                ) : (
                  <EyeSlashFilledIcon className='pointer-events-none text-2xl text-default-400' />
                )}
              </button>
            }
            type={isVisible ? 'text' : 'password'}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <Button color='primary' onClick={handleSignInSubmit}>
          로그인
        </Button>
        <div className='border-lightGray/30 my-[1%] w-full border-[1px]'></div>
        <div className='flex justify-between'>
          <a href='/signup' className='text-sm text-black/50'>
            회원가입
          </a>
          <a href='#' className='text-sm text-black/50'>
            비밀번호 찾기
          </a>
        </div>
      </div>
    </div>
  );
}
