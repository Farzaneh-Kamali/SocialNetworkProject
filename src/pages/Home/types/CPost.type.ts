import { Tag } from "../../../components/Tag/Tag.types";
import { User } from "../../../models/User";

export type CPost = {
  user:User;
  posts: {
    content: string;
    tags?: Array<Tag>;
  };
  resumeNumber?: number;
};
