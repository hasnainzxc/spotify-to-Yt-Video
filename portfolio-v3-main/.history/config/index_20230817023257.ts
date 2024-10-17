import { contact, Contact } from './contact';
import { Project, projects } from './projects';
import { SideProject, sideprojects } from './sideprojects';

interface Config {
  contact: Contact;
  projects: Project[];
  sideprojects: SideProject[];
}

const config: Config = {
  contact,
  projects,
  sideprojects,
};

export const POSTS_PER_PAGE = 10;

export default config;
