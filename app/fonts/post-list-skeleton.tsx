import { Card, Skeleton } from '@nextui-org/react';

export const PostListSkeleton = () => {
  return (
    <div className='grid gap-3 px-2 pb-4 mobile:grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4'>
      {Array.from({ length: 12 }).map((_, index) => (
        <Card
          key={index}
          className='space-y-5 p-4 shadow mobile:w-[180px] tablet:w-[200px]'
          radius='lg'
        >
          <Skeleton className='rounded-lg'>
            <div className='h-24 rounded-lg bg-default-300'></div>
          </Skeleton>
          <div className='space-y-3'>
            <Skeleton className='w-3/5 rounded-lg'>
              <div className='h-3 w-3/5 rounded-lg bg-default-200'></div>
            </Skeleton>
            <Skeleton className='w-4/5 rounded-lg'>
              <div className='h-3 w-4/5 rounded-lg bg-default-200'></div>
            </Skeleton>
            <Skeleton className='w-2/5 rounded-lg'>
              <div className='h-3 w-2/5 rounded-lg bg-default-300'></div>
            </Skeleton>
          </div>
        </Card>
      ))}
    </div>
  );
};
