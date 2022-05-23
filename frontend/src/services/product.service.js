/* eslint-disable import/no-anonymous-default-export */
export default {
  getProducts(query) {
    return fetch(`http://localhost:1337/api/products?${query}`).then(
      response => {
        return response.json();
      }
    );
  },

  getProduct(id) {
    return fetch(`http://localhost:1337/api/products/${id}?populate=*`).then(
      response => response.json()
    );
  },
};
