// import { useState } from "react"
// import { useCart } from '../../context/CartContex'
// import { db } from '../../services/firebase'
// import { addDoc, collection, documentId, getDocs, query, where, writeBatch } from "firebase/firestore"
import Formulario from "../Formulario/Formulario";

const Checkout = () => {
  // const [loading, setLoading] = useState(false)
  // const [created, setCreated] = useState(false)
  // const [formData, setFormData] = useState()
  // const { cart, totalQuantity, getTotal, clearCart } = useCart()
  // const total = getTotal()

  // const createOrder = async () => {
  //     setLoading(true)
  //     try {
  //         const objOrder = {
  //             buyer: formData ? { ...formData } : 'no hay datos',
  //             items: cart,
  //             totalQuantity,
  //             total,
  //             date: new Date()
  //         }
  //         const ids = cart.map((item) => item.id)
  //         const booksRef = collection(db, 'books')
  //         const booksFromFiertore = await getDocs(query(booksRef, where(documentId(), 'in', ids)))
  //         const { docs } = booksFromFiertore
  //         const outOfStock = []
  //         const batch = writeBatch(db)
  //         docs.forEach((doc) => {
  //             const dataDoc = doc.data()
  //             const stockDb = dataDoc.stock
  //             const bookAdded = cart.find((book) => book.id === doc.id)
  //             const bookQuantity = bookAdded?.quantity
  //             if (stockDb >= bookQuantity) {
  //                 batch.update(doc.ref, { stock: stockDb - bookQuantity })
  //             } else {
  //                 outOfStock.push({ id: doc.id, ...dataDoc })
  //             }
  //         })
  //         if (outOfStock.length === 0) {
  //             await batch.commit()
  //             const orderRef = collection(db, 'orders')
  //             const orderAdded = await addDoc(orderRef, objOrder)
  //             console.log(`el id de su orden es : ${orderAdded.id}`)
  //             clearCart()
  //             setCreated(true)
  //         } else {
  //             console.log('Productos fuera de stock')
  //         }
  //     } catch (error) {
  //         console.log(error)
  //     } finally {
  //         setLoading(false)
  //     }
  // }
  // const handleFormSubmit = (formData) => {
  //     setFormData(formData)
  //     createOrder()
  // }

  // if (loading) {
  //     return <h1>Orden siendo generada</h1>
  // }
  // if (created) {
  //     return (
  //         <h1>Orden creada exitosamente</h1>
  //     )
  // }

  return (
    <div className="checkoutForm">
      <h1>Checkout</h1>
      <Formulario />
    </div>
  );
};

export default Checkout;
