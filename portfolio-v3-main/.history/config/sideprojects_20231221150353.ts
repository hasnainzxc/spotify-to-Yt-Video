import { Maybe, Tuple } from '../types';

export const defaultDimensions: Tuple<number> = [450, 220];

export interface SideProject {
  title: string;
  slug: string;
  website: string;
  banner: string;
  description: string;
  shortDescription?: string;
  repository: Maybe<string>;
  dimensions?: Tuple<number>;
}

export const sideprojects: SideProject[] = [
  {
    title: 'WhatsCooking: A Comprehensive Recipe App',
    slug: 'https://github.com/SageTheThird/WhatsCooking-iOS',
    banner:
      'https://opengraph.githubassets.com/3b54907c47fa5c10891db7a9fa18e1e95719ff4b1382345ac4edfb16ff4a81c1/SageTheThird/WhatsCooking-iOS',
    website: 'https://www.darkblock.io/',
    description: `WhatsCooking-iOS is a robust recipe application designed to bring the world of culinary delights to the fingertips of iOS users. Built on top of TheMealDB, the app provides a vast array of recipes to explore. The application is crafted using SwiftUI for the user interface, Alamofire for networking, and RxSwift for handling asynchronous events, all tied together with the MVVM (Model-View-ViewModel) architecture. This blend of technologies ensures a smooth, responsive user experience. From amateur cooks to seasoned chefs, WhatsCooking-iOS serves as a reliable companion in the kitchen, offering a plethora of recipes to suit a variety of tastes and preferences.`,
    shortDescription:
      'An iOS recipe app leveraging TheMealDB, built with SwiftUI, Alamofire, RxSwift, and MVVM Architecture.',
    repository: 'https://github.com/SageTheThird/WhatsCooking-iOS',
  },

  {
    title: 'HeadlinesHay: Your Location-Based News Hub',
    slug: 'https://github.com/SageTheThird/HeadlinesHay-iOS',
    banner:
      'https://opengraph.githubassets.com/a638d25112193d69959d01e2d9802f1b636c45d400b35f8f97a23a287bb64137/SageTheThird/HeadlinesHay-iOS',
    website: 'https://prislo.com/',
    description: `HeadlinesHay is a meticulously crafted news application designed for iOS users. It leverages the power of Swift, UIKit, Alamofire, Core Data, and KingFisher, all structured with the MVC architecture. The app's standout feature is its location-based news delivery, ensuring users receive the most relevant headlines. With an advanced WebView for immersive reading and a search functionality that spans various news sources, "HeadlinesHay" stands as a comprehensive news hub for the modern user.`,
    shortDescription:
      'HeadlinesHay is a location-based news application tailored for iOS. Built using Swift, UIKit, Alamofire, Core Data, and KingFisher, all structured with the MVC architecture.',
    repository: 'https://github.com/SageTheThird/HeadlinesHay-iOS',
  },
  {
    title: 'ThinkAway: A Comprehensive Information Hub',
    slug: 'https://github.com/SageTheThird/ThinkAwayInfoApp',
    banner:
      'https://opengraph.githubassets.com/1c2e756ba470ec802f1a2bcc2a62cbc3889abc12e3e8d2ea4aeb1f3d52018b4b/SageTheThird/ThinkAwayInfoApp',
    website: 'https://dadsagree.com/',
    description: `ThinkAway is an advanced information application tailored for users seeking a seamless experience. Built using Dagger 2 for dependency injection, Room for local data storage, and Rx Android for reactive programming, the app ensures efficient data handling and a smooth user interface. One of its standout features is its back-end server, powered by Django, which not only provides API services but also manages user data, including subscriptions. This combination of front-end and back-end technologies makes "ThinkAwayInfoApp" a comprehensive solution for information management and delivery.`,
    shortDescription:
      'An Android app with Dagger 2, Room, Rx Android, and a Django-powered back-end server.',
    repository: 'https://github.com/SageTheThird/ThinkAwayInfoApp',
  },
];
