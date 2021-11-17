import { gql } from "@apollo/client";

export const GET_SKILL=gql`
 query skillout($id: ID!){ 
     getSkills(id:$id) {
      skill{name}
    }
  }`;
