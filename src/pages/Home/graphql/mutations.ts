import { gql } from  "@apollo/client";

export const CREATE_POST_MUTATION = gql`
  mutation newUserPost ($content:String!,$file:Upload) {
    newUserPost(newUserPostRequest:{content:$content , file:$file}){
    success
    message
  }
  }
`;

export const UPLOAD_FILE_MUTATION = gql`
  mutation upload ($file: Upload!) {
    upload(file:$file){
    url
  }
  }
  `;


export const UPDATE_LIKE_MUTATION = gql`
  mutation updatelike($postId: String!) {
    updatelike(postId: $postId) {
      likes
    }
  }
`;

export const C_CREATE_POST_MUTATION = gql`
  mutation companypost($content: String!, $tags:[String]!) {
    newCompanyPost(newCompanyPostRequest:{content:$content,tags:$tags}){
    success
    message
  }
  }
`;


