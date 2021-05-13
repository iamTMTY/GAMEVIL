export const homeQuery = `{ 
  collections(first: 10) {
      edges {
          node {
              handle
              products(first: 10) {
                edges {
                    node {
                        handle
                        id
                        productType
                        title
                        collections(first: 1){
                          edges {
                            node {
                              handle
                            }
                          }
                        }
                        images(first: 1) {
                            edges {
                                node {
                                    originalSrc
                                }
                            }
                        }
                        variants(first: 1) {
                            edges {
                                node {
                                    price
                                }
                            }
                        }
                    }
                }
            }
          } 
      }
  } 
}`;

export function productQuery(productHandle) {
	const query = `{
    productByHandle(handle: "${productHandle}") {
      title
      description
      collections(first: 1){
        edges {
          node {
            handle
          }
        }
      }
      options(first: 4) {
        name
        values
      }
      images(first: 1) {
        edges {
          node {
            originalSrc
          }
        }
      }
      variants(first: 1) {
        edges {
          node {
            sku
            weight
            price
            compareAtPrice
          }
        }
      }
    }
  }`;

	return query;
}

export function searchProductQuery(searchText) {
	const query = `{
    products(first: 10 query: "${searchText}") {
      edges {
        node {
          handle
          title
          productType
          collections(first: 1){
            edges {
              node {
                handle
              }
            }
          }
          images(first: 1) {
            edges {
                node {
                    originalSrc
                }
            }
          }
          variants(first: 1) {
              edges {
                  node {
                      price
                  }
              }
          }
        }
      }
    }
  }`;

	return query;
}

export function searchCollectionQuery(searchHandle) {
	const query = `{
    collectionByHandle(handle: "${searchHandle}") {
      handle
      products(first: 10) {
        edges {
            node {
                handle
                id
                productType
                title
                collections(first: 1){
                  edges {
                    node {
                      handle
                    }
                  }
                }
                images(first: 1) {
                    edges {
                        node {
                            originalSrc
                        }
                    }
                }
                variants(first: 1) {
                    edges {
                        node {
                            price
                        }
                    }
                }
            }
        }
      }
    }
  }`;

	return query;
}

export function collectionQuery(handle) {
	const query = `{ 
    collectionByHandle(handle: "${handle}") {
      handle
      products(first: 10) {
        edges {
          node {
            handle
            id
            productType
            title
            collections(first: 1){
              edges {
                node {
                  handle
                }
              }
            }
            images(first: 1) {
              edges {
                  node {
                      originalSrc
                  }
              }
            }
            variants(first: 1) {
              edges {
                  node {
                      price
                  }
              }
            }
          }
        }
      }
    } 
  }`;

	return query;
}
