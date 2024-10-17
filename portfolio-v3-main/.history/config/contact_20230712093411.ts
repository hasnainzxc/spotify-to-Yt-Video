export enum ContactType {
  github = 'github',
  linkedin = 'linkedin',
  email = 'email',
}

export interface Contact {
  twitter: string;
  site: string;
  calendly?: string;
  links: Record<ContactType, string>;
}

export const contact: Contact = {
  twitter: '@sajid.javed',
  site: 'sajidjaved.com',
  calendly: 'https://calendly.com/karanpratapsingh',
  links: {
    github: 'https://github.com/SageTheThird',
    linkedin: 'https://linkedin.com/in/sajidjavedxyz',
    email: 'mailto:ksajid505@gmail.com',
  },
};
