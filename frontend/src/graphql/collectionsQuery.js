import { gql } from '@apollo/client';

export const GET_COLLECTION_BY_ID = gql`
  query Collection($collectionId: ID, $filters: ProductFiltersInput) {
    collection(id: $collectionId) {
      data {
        id
        attributes {
          name
          products(filters: $filters) {
            data {
              id
              attributes {
                title
                price
                image {
                  data {
                    id
                    attributes {
                      name
                      alternativeText
                      caption
                      width
                      height
                      formats
                      hash
                      ext
                      mime
                      size
                      url
                      previewUrl
                      provider
                      provider_metadata
                      createdAt
                      updatedAt
                    }
                  }
                }
                stock
                availability
                categories {
                  data {
                    id
                    attributes {
                      name
                    }
                  }
                }
                collection {
                  data {
                    id
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
            }
          }
        }
      }
    }
  }
`;
