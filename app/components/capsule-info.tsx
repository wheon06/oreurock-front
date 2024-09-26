import { Do_Hyeon } from 'next/font/google';
import Image from 'next/image';

const doHyeon = Do_Hyeon({
  subsets: ['latin'],
  weight: ['400'],
});

export default function CapsuleInfo() {
  return (
    <div className='mt-10 flex max-h-60 max-w-full flex-col gap-2'>
      <div className='flex justify-between'>
        <div className='flex gap-2'>
          <h2 className={doHyeon.className + ' flex'}>홈짐</h2>
          <div className='flex items-center justify-center'>
            <Image
              src='https://img.icons8.com/fluency/48/home.png'
              alt='home'
              width={17}
              height={17}
            />
          </div>

          <h2 className={doHyeon.className + ' flex'}>비블럭클라이밍 영종점</h2>
        </div>
        <div className='flex gap-2'>
          <h2 className={doHyeon.className + ' flex'}>클생 D+81</h2>
        </div>
      </div>

      <div className='py-5'>
        <div className='flex gap-2'>
          <h2 className={doHyeon.className + ' flex'}>이번달 운동시간</h2>
          <div className='flex items-center justify-center'>
            <Image
              src='https://img.icons8.com/fluency/48/clock--v1.png'
              alt='clock--v1'
              width={17}
              height={17}
            />
          </div>
          <h2 className={doHyeon.className + ' flex'}>41시간 20분</h2>
        </div>
        <div className='flex gap-2'>
          <h2 className={doHyeon.className + ' flex'}>이번달 운동횟수</h2>
          <div className='flex items-center justify-center'>
            <Image
              src='https://img.icons8.com/color/48/flex-biceps.png'
              alt='flex-biceps'
              width={17}
              height={17}
            />
          </div>
          <h2 className={doHyeon.className + ' flex'}>6회</h2>
        </div>
      </div>
    </div>
  );
}
