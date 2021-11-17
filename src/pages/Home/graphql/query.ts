import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts {
    post {
      user
      body
      likes
    }
  }
`;

export const GET_COMPANY_POSTS = gql`
  query GetPosts($id: ID!) {
    companyProfile(id:$id) {
      name
      description
      posts {
        content
        tags {
          name
        }
      }
    }
  }
`;

export const GET_USER = gql`
query getProfile($id: ID!){
  getProfile(id:$id){
    userId
    isActive
    isCompany
    name
    description
  }
}`;
