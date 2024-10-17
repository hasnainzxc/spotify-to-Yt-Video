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
  twitter: '@hasnainzxc',
  site: 'hasnainzxc.co',
  calendly: 'https://calendly.com/hasnainzxc/hello',
  links: {
    github: 'https://github.com/hasnainzxc',
    linkedin: 'https://linkedin.com/in/hasnainzxc',
    email: 'mailto:hasnainzxc@icloud.com',
  },
};
