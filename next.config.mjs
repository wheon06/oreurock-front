/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['img.icons8.com', 'oreurock-bucket.s3.amazonaws.com'],
  },
};

import withVideos from 'next-videos';

export default withVideos(nextConfig);
