import { Maybe, Tuple } from '../types';
import { Stack } from './stack';

export type Deployment = {
  web?: string;
  android?: string;
  ios?: string;
};

export interface SubProject {
  title: string;
  description: string;
  repository: Maybe<string>;
  deployment: Deployment;
}

export const defaultDimensions: Tuple<number> = [450, 220];

export interface Project {
  title: string;
  slug: string;
  website: string;
  banner: string;
  description: string;
  shortDescription?: string;
  repository: Maybe<string>;
  stack: Stack[];
  dimensions?: Tuple<number>; // Tuple of [height, width]
  screenshots: string[];
  deployment: Deployment;
  subProjects: SubProject[];
}

export const projects: Project[] = [
  {
    title:
      'Darkblock: Revolutionizing Content with Web3 - Unlock, Engage, and Monetize with NFTs!',
    slug: 'darkblock',
    banner: '/static/projects/darkblock/banner.png',
    website: 'https://www.darkblock.io/',
    description: `Darkblock is Web3's missing encryption and access control layer. It is a decentralized chain-agnostic protocol that enables creators to control the distribution and monetization of their content.
    A darkblock is a piece of content encrypted by the Darkblock Protocol and stored on Arweave (where it will live for at least 200 years).
    A darkblock is immutably linked to an NFT. Only the creator of the NFT can add a darkblock to it and only the owner of the NFT can access it. NFT creators can add darkblock unlockable content even after the NFT has been sold.`,
    shortDescription: 'Unlock the power of Web3-native publishing',
    repository: 'https://github.com/darkblockio',
    stack: [
      Stack.javascript,
      Stack.nodejs,
      Stack.tailwind,
      Stack.typescript,
      Stack.react,
      Stack.awslambda,
      Stack.awsdynamodb,
      Stack.awscloudwatch,
      Stack.docker,
      Stack.expo,
      Stack.express,
      Stack.nextjs,
      Stack.awssynthetics,
      Stack.awsrds,
      Stack.moesif,
      Stack.metabase,
      Stack.looker,
    ],
    dimensions: [400, 680],
    screenshots: [
      'OuDBzls.png',
      'os1I98X.png',
      'NOIse8w.png',
      '6Om4Nza.png',
      'ABnRSYK.png',
      'MBIUsfB.png',
      'aXlf0Wo.png',
    ],
    deployment: {
      web: 'https://www.darkblock.io/',
    },
    subProjects: [
      {
        title: 'Darkblock Web-App',
        repository: 'https://github.com/darkblockio',
        description: `The Darkblock web app, app.darkblock.io is a place where NFT creators can add Darkblock unlockable content to NFTs and NFT collections they have created.

          It is also a place where owners can access Darkblock unlockable content that has been added to NFTs they own.`,
        deployment: {
          web: 'https://app.darkblock.io',
        },
      },
      {
        title: 'Darkblock-API',
        repository: 'https://github.com/darkblockio',
        description: `The Darkblock API is a tool for partners to integrate with the Darkblock Protocol quickly and easily with simple REST requests. The API enables you to mint Darkblocks, a piece of content that acts as an upgrade to an NFT, that only the NFT owner can access.`,
        deployment: {
          web: 'https://darkblock.redoc.ly/openapi/core/tag/Darkblock-API/',
        },
      },
      {
        title: 'Admin Dashboard',
        repository: 'https://github.com/darkblockio',
        description: `The internal Darkblock dashboard used to monitor the metrics that mattered the most in driving the business forward. Build with React, TailwindCSS and Tremor `,
        deployment: {
          web: 'https://darkblock-dashboard.vercel.app/',
        },
      },
      {
        title: 'NPM Packages For Various Chains',
        repository: 'https://github.com/darkblockio',
        description: `Variety of npms available to make integration easy into developer's/partner's React project. The shared component repo is at the center of all of our other npm projects. This contains our media viewer which helps take popular file formats and render them in browser for consumption. The platform specific npms below use the shared component as a base.`,
        deployment: {
          web: 'https://www.npmjs.com/search?q=keywords:darkblock.io',
        },
      },
    ],
  },

  {
    title: 'Shopsy.pk (Now Prislo): A User-Centric E-commerce Evolution',
    slug: 'shopsy',
    banner: '/static/projects/shopsy/banner.png',
    website: 'https://prislo.com/',
    description: `Shopsy.pk, later Prislo, revamped its Android app to set new e-commerce standards. The project focused on intuitive design, leading to a 17% rise in positive reviews. Leveraging advanced technologies and regular updates, the team, including me as a Junior Android Developer, ensured the app's continuous improvement, reflecting user needs and trends.`,
    shortDescription: 'Revitalizing the User Experience with Online Shopping',
    repository: 'https://github.com/SageTheThird',
    stack: [
      Stack.java,
      Stack.androidsdk,
      Stack.dagger2,
      Stack.androidstudio,
      Stack.cicd,
      Stack.room,
      Stack.coredata,
      Stack.firebase,
      Stack.hilt,
      Stack.xml,
      Stack.zaplin,
    ],
    dimensions: [840, 400],
    screenshots: [
      '0yqWclJ.mp4',
      'vX5yRxs.jpg',
      'zoVYEv4.jpg',
      'aIVkJmJ.jpg',
      'ONuROum.jpg',
      '7UeSkTZ.jpg',
      'fQxvFYk.jpg',
      'Cb2gvYJ.jpg',
      '9u3S1y0.jpg',
    ],
    deployment: {
      web: 'https://prislo.com/',
      android:
        'https://play.google.com/store/apps/details?id=com.prislo.prisloapp&hl=en_SG&gl=US',
    },
    subProjects: [],
  },
  {
    title: 'Dads Agree: The Ultimate Parenting Resource',
    slug: 'dadsagree',
    banner: '/static/projects/dadsagree/banner.png',
    website: 'https://dadsagree.com/',
    description: `"Dads Agree" is a unique platform uniting over 30 dedicated fathers from diverse professions, all committed to offering invaluable parenting insights. From developmental milestones to hands-on product reviews, the website serves as a comprehensive guide for parents navigating the complexities of raising children. Each piece of advice and product recommendation is rooted in real-life experiences, ensuring authentic and practical guidance for the parenting community.`,
    shortDescription:
      'A platform where dads share expert parenting advice and product reviews.',
    repository: 'https://github.com/SageTheThird',
    stack: [
      Stack.wordpress,
      Stack.ahreafs,
      Stack.jira,
      Stack.slack,
      Stack.zaplin,
    ],
    dimensions: [400, 680],
    screenshots: [
      '0ZBueyQ.png',
      'Ij278E9.png',
      'zxeolRP.png',
      'A0K1edX.png',
      'thLZCvv.png',
      '056WP8O.png',
      'L7BSmR5.png',
      'Ij278E9.png',
    ],
    deployment: {
      web: 'https://dadsagree.com/',
    },
    subProjects: [],
  },
  {
    title: 'Yooper Shirt',
    slug: 'yoopershirt',
    banner: '/static/projects/yooper-shirts/hero.png',
    website: 'https://dadsagree.com/',
    description: `"Dads Agree" is a unique platform uniting over 30 dedicated fathers from diverse professions, all committed to offering invaluable parenting insights. From developmental milestones to hands-on product reviews, the website serves as a comprehensive guide for parents navigating the complexities of raising children. Each piece of advice and product recommendation is rooted in real-life experiences, ensuring authentic and practical guidance for the parenting community.`,
    shortDescription:
      'A platform where dads share expert parenting advice and product reviews.',
    repository: 'https://github.com/SageTheThird',
    stack: [
      Stack.wordpress,
      Stack.ahreafs,
      Stack.jira,
      Stack.slack,
      Stack.zaplin,
    ],
    dimensions: [400, 680],
    screenshots: ['FYqywxT.png', 'D6w39Kk.png', 'a/IG9sbrQ.png'],
    deployment: {
      web: 'https://dadsagree.com/',
    },
    subProjects: [],
  },
];
