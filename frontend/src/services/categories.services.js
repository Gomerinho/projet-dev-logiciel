/* eslint-disable import/no-anonymous-default-export */
export default {
  getCategories() {
    return fetch('http://localhost:1337/api/categories?populate=*').then(
      response => {
        return response.json();
      }
    );
  },

  getCategory(id) {
    return fetch(`http://localhost:1337/api/categories/${id}?populate=*`).then(
      response => response.json()
    );
  },
};
