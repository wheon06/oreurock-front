import Post from '@/app/components/post-list';
import PALETTE from '@/palette';
import HeadNavbar from '@/app/components/head-navbar';
import PostList from '@/app/components/post-list';
import CapsuleInfo from '@/app/components/capsule-info';

export default function Home() {
  return (
    <div className='min-h-screen'>
      <HeadNavbar />
      <div className='mx-auto min-h-screen max-w-4xl bg-white'>
        <CapsuleInfo />
        <div className='border-lightGray/30 my-[1%] w-full border-[1px]'></div>
        {/*<PostList />*/}
      </div>
    </div>
  );
}
