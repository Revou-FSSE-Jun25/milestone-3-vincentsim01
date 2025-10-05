import type { NextConfig } from "next";

const nextConfig: NextConfig = {

    images: {
        domains: [
          'placehold.co',            // placeholder images
          'api.lorem.space',         // lorem space API
          'reidosestofados.com.br',  // sofa product images
          'i.pinimg.com',      
          'i.imgur.com',
          'www.google.com',
          'www.bing.com',
          'tse3.mm.bing.net',
          'images.tokopedia.net',
          'test.url'
        ],

    remotePatterns: [
      
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
        pathname: '/**',
      },
       {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placeimg.com',
        port: '',
        pathname: '/**',
      }
      ,
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      }
            ,
      {
        protocol: 'https',
        hostname: 'api.lorem.space',
        port: '',
        pathname: '/**',
      }

    ],
  },
  /* config options here */
};

export default nextConfig;
