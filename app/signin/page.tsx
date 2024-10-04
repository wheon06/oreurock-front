'use client';

import { Input, Button } from '@nextui-org/react';
import { useState } from 'react';
import { EyeFilledIcon, EyeSlashFilledIcon } from '@nextui-org/shared-icons';
import { Gugi } from 'next/font/google';

const gugi = Gugi({
  subsets: ['latin'],
  weight: ['400'],
});

export default function SignIn() {
  const [isVisible, setIsVisible] = useState(false);
  const [isUsernameInvalid, setIsUsernameInvalid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);

  const handleChangeUsername = (username: string) => {
    // 4~12 자리, 최소 하나의 영문자와 하나의 숫자 포함
    const usernameRegex = /^(?=.*[A-Za-z])(?=.*\d).{4,12}$/;
    setIsUsernameInvalid(!usernameRegex.test(username));
  };

  const handleChangePassword = (password: string) => {
    // 8~25 자리, 최소 하나의 영문자와 하나의 숫자 포함
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,25}$/;
    setIsPasswordInvalid(!passwordRegex.test(password));
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSignInSubmit = () => {};

  return (
    <div className='flex min-h-screen w-full items-center justify-center'>
      <div className='flex h-fit w-[600px] flex-col gap-3 rounded-3xl border-2 p-20'>
        <div className='mx-auto flex items-end gap-1'>
          <h1 className={gugi.className + ' text-5xl'}>오르락</h1>
          <p className={gugi.className + ' text-md text-black/60'}>OreuRock</p>
        </div>
        <div className='flex flex-col gap-2'>
          <Input
            fullWidth
            label='아이디'
            labelPlacement='inside'
            errorMessage='영문과 숫자를 포함한 4~12 자리 이어야 합니다.'
            onChange={(e) => {
              handleChangeUsername(e.target.value);
            }}
            isInvalid={isUsernameInvalid}
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
            errorMessage='영문과 숫자를 포함한 8~25 자리 이어야 합니다.'
            onChange={(e) => {
              handleChangePassword(e.target.value);
            }}
            isInvalid={isPasswordInvalid}
          />
        </div>
        <Button color='primary' onClick={handleSignInSubmit}>
          로그인
        </Button>
        <div className='border-lightGray/30 my-[1%] w-full border-[1px]'></div>
        <div className='flex justify-between'>
          <a href='signup' className='text-sm text-black/50'>
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
