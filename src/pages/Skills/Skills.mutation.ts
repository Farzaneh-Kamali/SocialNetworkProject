import { gql } from  "@apollo/client";

export const CREATE_TAG_MUTATION = gql`
    mutation create_tag($tags:[String]!) {
        setUserSkills(skill:{name:$tags}){
            success
            message
        }
    }
`;
