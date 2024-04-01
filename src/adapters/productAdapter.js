// export const createProductFromFirestore = (doc) => {
//     const data = doc.data()

//     console.log(doc)
//     const productAdapted = {
//         id: doc.id,
//         name: data.name,
//         img: data.img,
//         price: data.price,
//         category: data.category,
//         description: data.description
//     }
// }

export const createProductFromFirestore = (doc) => {
  if (doc && doc.data) {
    const data = doc.data();
    if (data) {
      const productAdapted = {
        id: doc.id,
        name: data.name,
        img: data.img,
        price: data.price,
        category: data.category,
        description: data.description,
        author: data.author,
        pages: data.pages,
        stock: data.stock,
      };
      return productAdapted;
    } else {
      console.log("El documento no contiene datos válidos.");
      return null;
    }
  } else {
    console.log("El documento no es válido.");
    return null;
  }
};
