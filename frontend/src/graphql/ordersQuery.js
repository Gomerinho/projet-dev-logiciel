import { gql } from '@apollo/client';

export const GET_ORDERs_BY_USER = gql`
  query Query($filters: OrderFiltersInput) {
    orders(filters: $filters, sort: ["createdAt:DESC"]) {
      data {
        attributes {
          createdAt
          total
          products {
            data {
              attributes {
                title
                price
                image {
                  data {
                    id
                    attributes {
                      url
                    }
                  }
                }
              }
              id
            }
          }
          user {
            data {
              id
              attributes {
                username
              }
            }
          }
        }
        id
      }
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation Mutation($data: OrderInput!) {
    createOrder(data: $data) {
      data {
        id
      }
    }
  }
`;
