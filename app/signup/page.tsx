'use client';

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import React, { useState } from 'react';
import {
  AvatarIcon,
  CalendarBoldIcon,
  EditIcon,
  EyeFilledIcon,
  EyeSlashFilledIcon,
  SendFilledIcon,
} from '@nextui-org/shared-icons';
import { Gugi } from 'next/font/google';

const gugi = Gugi({
  subsets: ['latin'],
  weight: ['400'],
});

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordAgainVisible, setIsPasswordAgainVisible] = useState(false);
  const [isUsernameInvalid, setIsUsernameInvalid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [isPasswordAgainInvalid, setIsPasswordAgainInvalid] = useState(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleChangeUsername = (username: string) => {
    // 4~12 자리, 최소 하나의 영문자와 하나의 숫자 포함
    setUsername(username);
    const usernameRegex = /^(?=.*[A-Za-z])(?=.*\d).{4,12}$/;
    setIsUsernameInvalid(!usernameRegex.test(username));
  };

  const handleChangePassword = (password: string) => {
    // 8~25 자리, 최소 하나의 영문자와 하나의 숫자 포함
    setPassword(password);
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,25}$/;
    setIsPasswordInvalid(!passwordRegex.test(password));
  };

  const handleChangePasswordAgain = (passwordAgain: string) => {
    setIsPasswordAgainInvalid(!(passwordAgain === password));
  };

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

  const togglePasswordAgainVisibility = () =>
    setIsPasswordAgainVisible(!isPasswordAgainVisible);

  const handleSignUpSubmit = () => {
    onOpen();
  };

  return (
    <div className='flex min-h-screen w-full items-center justify-center'>
      <div className='flex h-fit w-[600px] flex-col gap-3 rounded-3xl border-2 px-20 py-10'>
        <div className='flex items-end gap-1'>
          <h1 className={gugi.className + ' text-3xl'}>오르락</h1>
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
                onClick={togglePasswordVisibility}
                aria-label='toggle password visibility'
              >
                {isPasswordVisible ? (
                  <EyeFilledIcon className='pointer-events-none text-2xl text-default-400' />
                ) : (
                  <EyeSlashFilledIcon className='pointer-events-none text-2xl text-default-400' />
                )}
              </button>
            }
            type={isPasswordVisible ? 'text' : 'password'}
            errorMessage='영문과 숫자를 포함한 8~25 자리 이어야 합니다.'
            onChange={(e) => {
              handleChangePassword(e.target.value);
            }}
            isInvalid={isPasswordInvalid}
          />
          <Input
            label='비밀번호 확인'
            labelPlacement='inside'
            endContent={
              <button
                className='focus:outline-none'
                type='button'
                onClick={togglePasswordAgainVisibility}
                aria-label='toggle password visibility'
              >
                {isPasswordVisible ? (
                  <EyeFilledIcon className='pointer-events-none text-2xl text-default-400' />
                ) : (
                  <EyeSlashFilledIcon className='pointer-events-none text-2xl text-default-400' />
                )}
              </button>
            }
            type={isPasswordAgainVisible ? 'text' : 'password'}
            errorMessage='비밀번호가 일치하지 않습니다.'
            onChange={(e) => {
              handleChangePasswordAgain(e.target.value);
            }}
            isInvalid={isPasswordAgainInvalid}
          />
        </div>
        <Button color='primary' onClick={handleSignUpSubmit}>
          다음
        </Button>
        <div className='border-lightGray/30 my-[1%] w-full border-[1px]'></div>
        <div className='flex justify-end'>
          <a href='signin' className='text-sm text-black/50'>
            아이디가 있으신가요?
          </a>
        </div>
      </div>
      <ModalDetail
        username={username}
        password={password}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </div>
  );
}

interface ModalDetailProps {
  username: string;
  password: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const ModalDetail = ({
  username,
  password,
  isOpen,
  onOpenChange,
}: ModalDetailProps) => {
  const [isPhoneInvalid, setIsPhoneInvalid] = useState(false);
  const [isBirthdayInvalid, setIsBirthdayInvalid] = useState(false);
  const [isFirstDateInvalid, setIsFirstDateInvalid] = useState(false);

  const handleChangePhone = (phone: string) => {
    const phoneRegex = /^010\d{8}$/;
    setIsPhoneInvalid(!phoneRegex.test(phone));
  };

  const handleChangeBirthday = (birthday: string) => {
    const birthdayRegex = /^\d{8}$/;
    setIsBirthdayInvalid(!birthdayRegex.test(birthday));
  };

  const handleChangeFirstDate = (firstDate: string) => {
    if (firstDate === '') {
      setIsFirstDateInvalid(false);
      return;
    }
    const firstDateRegex = /^\d{8}$/;
    setIsFirstDateInvalid(!firstDateRegex.test(firstDate));
  };

  const handleModalSubmit = () => {
    //todo 백엔드 가입 페칭
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                추가 정보
              </ModalHeader>
              <ModalBody>
                <div className='flex flex-col gap-1'>
                  <Input
                    type='text'
                    fullWidth
                    placeholder='이름'
                    startContent={<AvatarIcon className='text-black/50' />}
                    className='mb-2'
                  />
                  <Input
                    type='number'
                    fullWidth
                    placeholder='전화번호'
                    startContent={<SendFilledIcon className='text-black/50' />}
                    errorMessage='올바른 전화번호를 입력해주세요.'
                    onChange={(e) => handleChangePhone(e.target.value)}
                    isInvalid={isPhoneInvalid}
                  />
                  <Input
                    type='number'
                    fullWidth
                    placeholder='생년월일 8자리'
                    startContent={
                      <CalendarBoldIcon className='text-black/50' />
                    }
                    errorMessage='올바른 생년월일을 입력해주세요.'
                    onChange={(e) => handleChangeBirthday(e.target.value)}
                    isInvalid={isBirthdayInvalid}
                  />
                  <Input
                    type='number'
                    fullWidth
                    placeholder='[선택] 클라이밍 시작일 8자리'
                    startContent={<EditIcon className='text-black/50' />}
                    errorMessage='올바른 날짜를 입력해주세요.'
                    onChange={(e) => handleChangeFirstDate(e.target.value)}
                    isInvalid={isFirstDateInvalid}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color='primary'
                  onPress={onClose}
                  className='w-full'
                  onClick={handleModalSubmit}
                >
                  회원가입
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
