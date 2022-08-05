declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    PORT: string;
    CLINETID: string;
    CLINETSECRET: string;
    JWT_SECRET: string;
  }
}
