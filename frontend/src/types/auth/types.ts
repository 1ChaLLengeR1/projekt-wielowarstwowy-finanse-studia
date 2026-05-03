export type AuthBody = {
  username: string;
  password: string;
};

export type Auth = {
  id: string;
  username: string;
  access_token: string;
  refresh_token: string;
};
