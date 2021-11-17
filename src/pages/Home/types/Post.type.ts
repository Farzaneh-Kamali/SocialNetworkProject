import { User } from "../../../models/User";

export type Post = {
  id:string;
  user: User;
  body: {
    text: string;
    media?: string;
  };
  likes:Array<string>;
};
