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

export const GET_LATEST_PRODUCTS = gql`
  query Products($pagination: PaginationArg) {
    products(pagination: $pagination, sort: ["createdAt:DESC"]) {
      data {
        attributes {
          title
          price
          image {
            data {
              attributes {
                url
              }
            }
          }
          stock
          availability
          collection {
            data {
              attributes {
                name
              }
            }
          }
          description
          createdAt
          updatedAt
          publishedAt
        }
        id
      }
    }
  }
`;
