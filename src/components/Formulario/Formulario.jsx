import { useState } from "react";
import { useCart } from "../../context/CartContex";
import { db } from "../../services/firebase";
import {
  addDoc,
  collection,
  documentId,
  getDocs,
  query,
  where,
  writeBatch,
} from "firebase/firestore";

const Formulario = () => {
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(false);
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const [newOrderId, setNewOrderId] = useState(null);
  const { cart, totalQuantity, getTotal, clearCart } = useCart();
  const total = getTotal();
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    direccion: "",
    ciudad: "",
    codigo: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const createOrder = async () => {
    setLoading(true);
    try {
      const objOrder = {
        buyer: {
          nombre: form.nombre,
          apellido: form.apellido,
          telefono: form.telefono,
          email: form.email,
          direccion: form.direccion,
          ciudad: form.ciudad,
          codigo: form.codigo,
        },
        items: cart,
        totalQuantity,
        total,
        date: new Date(),
      };
      const ids = cart.map((item) => item.id);
      const booksRef = collection(db, "books");
      const booksFromFiertore = await getDocs(
        query(booksRef, where(documentId(), "in", ids))
      );
      const { docs } = booksFromFiertore;
      const outOfStock = [];
      const batch = writeBatch(db);

      docs.forEach((doc) => {
        const dataDoc = doc.data();
        const stockDb = dataDoc.stock;
        const bookAdded = cart.find((book) => book.id === doc.id);
        const bookQuantity = bookAdded?.quantity;

        if (stockDb >= bookQuantity) {
          batch.update(doc.ref, { stock: stockDb - bookQuantity });
        } else {
          outOfStock.push({ id: doc.id, ...dataDoc });
        }
      });

      if (outOfStock.length === 0) {
        await batch.commit();
        const orderRef = collection(db, "orders");
        const orderAdded = await addDoc(orderRef, objOrder);
        console.log(objOrder);
        const orderId = (await orderAdded).id;
        console.log(`el id de su orden es : ${orderId}`);
        setNewOrderId(orderId);
        clearCart();
        setCreated(true);
      } else {
        console.log("Productos fuera de stock");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <h1>Orden siendo generada</h1>;
  }
  if (created) {
    return <h1>`Orden creada exitosamente ${newOrderId}`</h1>;
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    createOrder();
  };

  const handleCheckbox1 = (evt) => {
    setCheckbox1(evt.target.checked);
    setCheckbox2(false);
  };
  const handleCheckbox2 = (evt) => {
    setCheckbox2(evt.target.checked);
    setCheckbox1(false);
  };

  return (
    <form onSubmit={handleSubmit} className="formContainer">
      <label htmlFor="nombre">Nombre *</label>
      <input
        type="text"
        name="nombre"
        value={form.nombre}
        onChange={handleInputChange}
        id="nombre"
        required
      />
      <label htmlFor="apellido">Apellido *</label>
      <input
        type="text"
        name="apellido"
        value={form.apellido}
        onChange={handleInputChange}
        id="apellido"
        required
      />
      <label htmlFor="telefono">Teléfono *</label>
      <input
        type="number"
        name="telefono"
        value={form.telefono}
        onChange={handleInputChange}
        id="telefono"
        required
      />
      <label htmlFor="email">Email *</label>
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleInputChange}
        id="email"
        required
      />

      <label htmlFor="retiroLocal">Retiro en local del vendedor</label>
      <input
        type="checkbox"
        id="retiroLocal"
        checked={checkbox1}
        onChange={handleCheckbox1}
      />

      <label htmlFor="domicilio">Entrega a domicilio</label>
      <input
        type="checkbox"
        id="domicilio"
        checked={checkbox2}
        onChange={handleCheckbox2}
      />

      <div className={checkbox2 ? "inputMostrado" : "inputOculto"}>
        <label htmlFor="direccion">Dirección:</label>
        <input
          type="text"
          id="direccion"
          name="direccion"
          // required
          value={form.direccion}
          onChange={handleInputChange}
        />
        <label htmlFor="ciudad">Ciudad:</label>
        <input
          type="text"
          id="ciudad"
          name="ciudad"
          // required
          value={form.ciudad}
          onChange={handleInputChange}
        />
        <label htmlFor="codigo">Código postal:</label>
        <input
          type="number"
          id="codigo"
          name="codigo"
          // required
          value={form.codigo}
          onChange={handleInputChange}
        />
      </div>
      <input type="submit" name="submit" value={"Confirmar compra"} />
    </form>
  );
};

export default Formulario;
