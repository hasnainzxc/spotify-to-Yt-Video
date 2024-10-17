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
    title: 'Darkblock',
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
];
