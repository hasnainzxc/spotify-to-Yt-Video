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
  twitter: '@Hasnainzxc',
  site: 'sajidjaved.com',
  calendly: 'https://calendly.com/hasnainzxc',
  links: {
    github: 'https://github.com/hasnainzxc',
    linkedin: 'https://linkedin.com/in/hasnainzxc',
    email: 'mailto:hasnainzxc@icloud.com',
  },
};
