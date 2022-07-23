import { Request } from 'express';

declare module 'express' {
  interface User extends Request {
    user: DemoUser;
  }
}

interface DemoUser {
  UID: string;
  email: string;
}
