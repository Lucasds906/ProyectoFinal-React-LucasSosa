import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from './index'
import { createProductFromFirestore } from "../../adapters/productAdapter"

export const getBooks = async (categoryId) => {
    let collectionRef;

    if (!categoryId) {
        collectionRef = collection(db, 'books');
    } else {
        collectionRef = query(collection(db, 'books'), where('category', '==', categoryId));
    }

    const snapshot = await getDocs(collectionRef);
    const books = [];

    snapshot.forEach((doc) => {
        const book = createProductFromFirestore(doc);
        if (book) {
            books.push(book);
        }
    });
    return books;
}