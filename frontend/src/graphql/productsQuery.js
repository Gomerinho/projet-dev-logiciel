import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GET_PRODUCT($filters: ProductFiltersInput) {
    products(filters: $filters) {
      data {
        id
        attributes {
          availability
          title
          price
          image {
            data {
              attributes {
                url
              }
            }
          }
          categories {
            data {
              attributes {
                name
              }
            }
          }
          collection {
            data {
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_USER_WISH = gql`
  query GET_USER_WISH($id: ID) {
    usersPermissionsUser(id: $id) {
      data {
        id
        attributes {
          products {
            data {
              attributes {
                title
              }
            }
          }
        }
      }
    }
  }
`;
