import { Maybe, Tuple } from '../types';
import { Stack } from './stack';

export type Deployment = {
  web?: string;
  android?: string;
  ios?: string;
  github?: string;
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
    title: 'HyperTrade',
    slug: 'hypertrade',
    banner: '/static/projects/hypertrade/banner.png',
    website: 'https://github.com/karanpratapsingh/HyperTrade',
    description:
      'Ready to deploy, distributed cryptocurrency trading bot. The idea of this project originally came from a script I used to automate buying and selling of fiat assets. I was curious and wanted to scale it into a real system which can execute trades for me. I had a lot of fun building this. I got to play with lots of different technologies while growing my financial knowledge.',
    shortDescription:
      'Ready to deploy, distributed cryptocurrency trading bot.',
    repository: 'https://github.com/karanpratapsingh/HyperTrade',
    stack: [
      Stack.typescript,
      Stack.react,
      Stack.python,
      Stack.kubernetes,
      Stack.docker,
    ],
    dimensions: [360, 640],
    screenshots: [
      'https://firebasestorage.googleapis.com/v0/b/portfolio-8fa71.appspot.com/o/projects%2Fhypertrade%2Fcharts.png?alt=media&token=62c42939-9371-4413-b85d-f2dd3b4534ca',
      'https://firebasestorage.googleapis.com/v0/b/portfolio-8fa71.appspot.com/o/projects%2Fhypertrade%2Fdataframe.png?alt=media&token=f2e6523c-c9de-4fde-8fb3-434c74eb20d8',
      'https://firebasestorage.googleapis.com/v0/b/portfolio-8fa71.appspot.com/o/projects%2Fhypertrade%2Fportfolio.png?alt=media&token=8f4e3da1-2dc2-4382-9fc8-1fbc18a98146',
      'https://firebasestorage.googleapis.com/v0/b/portfolio-8fa71.appspot.com/o/projects%2Fhypertrade%2Fconfig.png?alt=media&token=f619b1da-47d5-4c33-b4d0-368adaead1c8',
      'https://firebasestorage.googleapis.com/v0/b/portfolio-8fa71.appspot.com/o/projects%2Fhypertrade%2Fconfig-strategy.png?alt=media&token=68693230-4fce-420b-b419-d211a9568dc5',
      'https://firebasestorage.googleapis.com/v0/b/portfolio-8fa71.appspot.com/o/projects%2Fhypertrade%2Fcharts-indicators.png?alt=media&token=21c7875f-5abe-4ceb-8057-4d7a70b67d33',
      'https://firebasestorage.googleapis.com/v0/b/portfolio-8fa71.appspot.com/o/projects%2Fhypertrade%2Ftelegram.png?alt=media&token=110874dd-fb96-4dd2-b299-12a62b092a04',
    ],
    deployment: {
      web: 'https://github.com/karanpratapsingh/HyperTrade',
      github: 'https://github.com/karanpratapsingh/HyperTrade',
    },
    subProjects: [],
  },
];
