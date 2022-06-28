export interface UserObj {
  id: string;
  name: string;
  email: string;
  image: string;
  UID: string;
  social?: Usersocial;
  Education: UserEducation[];
  Projects: Projects[];
}

interface Usersocial {
  id: string;
  github: string;
  linkedIn: string;
  dribble: string;
  behance: string;
}

interface UserEducation {
  id: string;
  college: string;
  Year: string;
  Grade?: string;
  Majour: string;
}
interface Projects {
  id: String;
  name: String;
  url?: String;
  Stack: String;
  info: String;
}
