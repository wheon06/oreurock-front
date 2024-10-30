import Image from 'next/image';
import { Gugi } from 'next/font/google';
import { AvatarIcon } from '@nextui-org/shared-icons';

const gugi = Gugi({
  subsets: ['latin'],
  weight: ['400'],
});

export default function HeadNavbar() {
  return (
    <div className='fixed flex h-16 w-full justify-between bg-white px-8 shadow'>
      <a href='/' className='my-auto flex gap-2'>
        <div>
          <Image src='/no-image.jpg' alt='logo' width={40} height={40} />
        </div>
        <div>
          <h1 className={gugi.className + ' text-xl text-black'}>오르락</h1>
          <h2 className={gugi.className + ' text-right text-[8px] text-black'}>
            Oreu_Rock
          </h2>
        </div>
      </a>
      <a href='signin' className='flex gap-5'>
        <div className='my-auto flex h-[30px] w-[30px] items-center justify-center rounded-full border-2 border-black/80 text-black/80'>
          <AvatarIcon />
        </div>
      </a>
    </div>
  );
}
