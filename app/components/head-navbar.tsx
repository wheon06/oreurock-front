import Image from 'next/image';
import { Gugi } from 'next/font/google';

const gugi = Gugi({
  subsets: ['latin'],
  weight: ['400'],
});

export default function HeadNavbar() {
  return (
    <div className='flex h-20 w-full justify-between bg-white px-8 shadow'>
      <a href='/' className='my-auto flex gap-2'>
        <div>
          <Image src='/no-image.jpg' alt='logo' width={45} height={45} />
        </div>
        <div>
          <h1 className={gugi.className + ' text-2xl'}>오르락</h1>
          <h2 className={gugi.className + ' text-right text-[10px]'}>
            Oreu_Rock
          </h2>
        </div>
      </a>
      <div className='flex gap-5'>
        <div className='my-auto'>
          <h2 className='rounded-full border-2 px-3 py-2 font-bold'>
            기록하기
          </h2>
        </div>
        <div className='my-auto flex h-[50px] w-[50px] items-center justify-center rounded-full border-2 border-black'>
          <Image
            src='https://img.icons8.com/fluency-systems-regular/50/user--v1.png'
            alt='user--v1'
            width={30}
            height={30}
            className=''
          />
        </div>
      </div>
    </div>
  );
}
