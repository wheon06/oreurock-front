import React from 'react';

interface Props {
  height: number;
  hex: string;
}

export default function HeartSvg({ height, hex }: Props) {
  return (
    <div>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        clipPath='url(#clip-path)'
        height={String(height)}
        viewBox='0 0 47.5 47.5'
        id='heart'
      >
        <defs>
          <clipPath id='clip-path'>
            <path d='M0 38h38V0H0v38Z'></path>
          </clipPath>
        </defs>
        <g clipPath='url(#a)' transform='matrix(1.25 0 0 -1.25 0 47.5)'>
          <path
            fill={'#' + hex}
            d='M3.067 25.68c0 8.799 12.184 12.06 15.933 1.874 3.749 10.186 15.933 6.925 15.933-1.874C34.933 16.12 19 3.999 19 3.999S3.067 16.12 3.067 25.68'
          ></path>
        </g>
      </svg>
    </div>
  );
}
