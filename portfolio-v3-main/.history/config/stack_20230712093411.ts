import { Colors } from './colors';

export enum Stack {
  // Languages
  javascript,
  typescript,
  java,
  kotlin,
  python,
  swift,
  css,
  tailwind,
  cpp,
  html,
  yaml,
  xml,

  // Web Development
  nodejs,
  react,
  express,
  mongodb,
  gatsby,
  nextjs,

  // Mobile Development
  androidsdk,
  iossdk,
  rxandroid,
  rxswift,
  reactnative,
  room,
  coredata,

  // Cloud Services
  awslambda,
  awscloudwatch,
  awsdynamodb,
  awss3,
  linux,
  firebase,

  // Database & Data Viz
  sql,
  kafka,
  nosql,
  awsrds,
  firebasenosql,
  looker,
  metabase,

  // Testing & CI/CD
  jest,
  chai,
  githubactions,
  hilt,
  dagger2,
  expresso,
  xcuitest,
  cicd,
  slackintegrations,

  // Monitoring
  postman,
  awssynthetics,
  awsec2monitoring,
  moesif,

  // Programs/Tools
  docker,
  kubernetes,
  terraform,
  vscode,
  expo,
  androidstudio,
  pycharm,
  wordpress,
  ahreafs,
  slack,
  jira,
  msoffice,
  zaplin,
}

// export const WorkStack = [
//   Stack.go,
//   Stack.typescript,
//   Stack.python,
//   Stack.react,
//   Stack.aws,
//   Stack.gcp,
//   Stack.kubernetes,
//   Stack.docker,
//   Stack.terraform,
//   Stack.nats,
//   Stack.kafka,
//   Stack.graphql,
//   Stack.postgres,
//   Stack.redis,
//   Stack.arangodb,
//   Stack.reactnative,
// ];

export const LanguageStackStack = [
  Stack.javascript,
  Stack.typescript,
  Stack.java,
  Stack.kotlin,
  Stack.python,
  Stack.swift,
  Stack.css,
  Stack.tailwind,
  Stack.cpp,
  Stack.html,
  Stack.yaml,
  Stack.xml,
];
export const WebDevelopmentStack = [
  Stack.nodejs,
  Stack.react,
  Stack.express,
  Stack.mongodb,
  Stack.gatsby,
  Stack.nextjs,
];
export const MobileDevelopmentStack = [
  Stack.androidsdk,
  Stack.iossdk,
  Stack.rxandroid,
  Stack.rxswift,
  Stack.reactnative,
  Stack.room,
  Stack.coredata,
];
export const CloudServicesStack = [
  Stack.awslambda,
  Stack.awscloudwatch,
  Stack.awsdynamodb,
  Stack.awss3,
  Stack.linux,
  Stack.firebase,
];
export const DatabaseAndVizStack = [
  Stack.sql,
  Stack.kafka,
  Stack.nosql,
  Stack.awsrds,
  Stack.firebasenosql,
  Stack.looker,
  Stack.metabase,
];
export const TestingCiCDStack = [
  Stack.jest,
  Stack.chai,
  Stack.githubactions,
  Stack.hilt,
  Stack.dagger2,
  Stack.expresso,
  Stack.xcuitest,
  Stack.cicd,
  Stack.slackintegrations,
];
export const MonitoringStack = [
  Stack.awscloudwatch,
  Stack.postman,
  Stack.awssynthetics,
  Stack.awsec2monitoring,
  Stack.moesif,
];

export const ProgramsAndToolsStack = [
  Stack.docker,
  Stack.kubernetes,
  Stack.terraform,
  Stack.vscode,
  Stack.expo,
  Stack.androidstudio,
  Stack.pycharm,
  Stack.wordpress,
  Stack.ahreafs,
  Stack.slack,
  Stack.jira,
  Stack.msoffice,
  Stack.zaplin,
];

type StackInfoMap = {
  value: string;
  color: string;
};

export const StackInfo: Record<Stack, StackInfoMap> = {
  // Languages
  [Stack.javascript]: {
    value: 'JavaScript',
    color: Colors.javascript,
  },
  [Stack.typescript]: {
    value: 'TypeScript',
    color: Colors.typescript,
  },
  [Stack.java]: {
    value: 'Java',
    color: Colors.java,
  },
  [Stack.kotlin]: {
    value: 'Kotlin',
    color: Colors.kotlin,
  },
  [Stack.python]: {
    value: 'Python',
    color: Colors.python,
  },
  [Stack.swift]: {
    value: 'Swift',
    color: Colors.swift,
  },
  [Stack.css]: {
    value: 'CSS',
    color: Colors.css,
  },
  [Stack.tailwind]: {
    value: 'Tailwind',
    color: Colors.tailwind,
  },
  [Stack.cpp]: {
    value: 'C++',
    color: Colors.cpp,
  },
  [Stack.html]: {
    value: 'HTML',
    color: Colors.html,
  },
  [Stack.yaml]: {
    value: 'YAML',
    color: Colors.yaml,
  },
  [Stack.xml]: {
    value: 'XML',
    color: Colors.xml,
  },
  // Web Development
  [Stack.nodejs]: {
    value: 'Node.js',
    color: Colors.nodejs,
  },
  [Stack.react]: {
    value: 'React',
    color: Colors.react,
  },
  [Stack.express]: {
    value: 'Express',
    color: Colors.express,
  },
  [Stack.mongodb]: {
    value: 'MongoDB',
    color: Colors.mongodb,
  },
  [Stack.gatsby]: {
    value: 'Gatsby',
    color: Colors.gatsby,
  },
  [Stack.nextjs]: {
    value: 'Next.js',
    color: Colors.nextjs,
  },
  // Mobile Development
  [Stack.androidsdk]: {
    value: 'Android SDK',
    color: Colors.androidsdk,
  },
  [Stack.iossdk]: {
    value: 'iOS SDK',
    color: Colors.iossdk,
  },
  [Stack.rxandroid]: {
    value: 'RxAndroid',
    color: Colors.rxandroid,
  },
  [Stack.rxswift]: {
    value: 'RxSwift',
    color: Colors.rxswift,
  },
  [Stack.reactnative]: {
    value: 'React Native',
    color: Colors.reactnative,
  },
  [Stack.room]: {
    value: 'Room',
    color: Colors.room,
  },
  [Stack.coredata]: {
    value: 'Core Data',
    color: Colors.coredata,
  },
  // Cloud Services
  [Stack.awslambda]: {
    value: 'AWS Lambda',
    color: Colors.awslambda,
  },
  [Stack.awscloudwatch]: {
    value: 'AWS CloudWatch',
    color: Colors.awscloudwatch,
  },
  [Stack.awsdynamodb]: {
    value: 'AWS DynamoDB',
    color: Colors.awsdynamodb,
  },
  [Stack.awss3]: {
    value: 'AWS S3',
    color: Colors.awss3,
  },
  [Stack.linux]: {
    value: 'Linux',
    color: Colors.linux,
  },
  [Stack.firebase]: {
    value: 'Firebase',
    color: Colors.firebase,
  },
  // Database & Data Viz
  [Stack.sql]: {
    value: 'SQL',
    color: Colors.sql,
  },
  [Stack.kafka]: {
    value: 'Kafka',
    color: Colors.kafka,
  },
  [Stack.nosql]: {
    value: 'NoSQL',
    color: Colors.nosql,
  },
  [Stack.awsrds]: {
    value: 'AWS RDS',
    color: Colors.awsrds,
  },
  [Stack.firebasenosql]: {
    value: 'Firebase NoSQL',
    color: Colors.firebasenosql,
  },
  [Stack.looker]: {
    value: 'Looker',
    color: Colors.looker,
  },
  [Stack.metabase]: {
    value: 'Metabase',
    color: Colors.metabase,
  },
  // Testing & CI/CD
  [Stack.jest]: {
    value: 'Jest',
    color: Colors.jest,
  },
  [Stack.chai]: {
    value: 'Chai',
    color: Colors.chai,
  },
  [Stack.githubactions]: {
    value: 'Github Actions',
    color: Colors.githubactions,
  },
  [Stack.hilt]: {
    value: 'Hilt',
    color: Colors.hilt,
  },
  [Stack.dagger2]: {
    value: 'Dagger 2',
    color: Colors.dagger2,
  },
  [Stack.expresso]: {
    value: 'Expresso',
    color: Colors.expresso,
  },
  [Stack.xcuitest]: {
    value: 'XCUITest',
    color: Colors.xcuitest,
  },
  [Stack.cicd]: {
    value: 'CI/CD',
    color: Colors.cicd,
  },
  [Stack.slackintegrations]: {
    value: 'Slack Integrations',
    color: Colors.slackintegrations,
  },
  // Monitoring
  [Stack.postman]: {
    value: 'Postman',
    color: Colors.postman,
  },
  [Stack.awssynthetics]: {
    value: 'AWS Synthetics',
    color: Colors.awssynthetics,
  },
  [Stack.awsec2monitoring]: {
    value: 'AWS EC2 Monitoring',
    color: Colors.awsec2monitoring,
  },
  [Stack.moesif]: {
    value: 'Moesif',
    color: Colors.moesif,
  },
  // Programs/Tools
  [Stack.docker]: {
    value: 'Docker',
    color: Colors.docker,
  },
  [Stack.kubernetes]: {
    value: 'Kubernetes',
    color: Colors.kubernetes,
  },
  [Stack.terraform]: {
    value: 'Terraform',
    color: Colors.terraform,
  },
  [Stack.vscode]: {
    value: 'VS Code',
    color: Colors.vscode,
  },
  [Stack.expo]: {
    value: 'Expo',
    color: Colors.expo,
  },
  [Stack.androidstudio]: {
    value: 'Android Studio',
    color: Colors.androidstudio,
  },
  [Stack.pycharm]: {
    value: 'PyCharm',
    color: Colors.pycharm,
  },
  [Stack.wordpress]: {
    value: 'WordPress',
    color: Colors.wordpress,
  },
  [Stack.ahreafs]: {
    value: 'Ahrefs',
    color: Colors.ahreafs,
  },
  [Stack.slack]: {
    value: 'Slack',
    color: Colors.slack,
  },
  [Stack.jira]: {
    value: 'Jira',
    color: Colors.jira,
  },
  [Stack.msoffice]: {
    value: 'MS Office',
    color: Colors.msoffice,
  },
  [Stack.zaplin]: {
    value: 'Zaplin',
    color: Colors.zaplin,
  },
};
