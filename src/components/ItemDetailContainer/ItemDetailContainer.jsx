import { useState, useEffect } from "react"
import ItemDetail from "../ItemDetail/ItemDetail"
import { useParams } from "react-router-dom"
import { db } from "../../services/firebase"
import { getDoc, doc } from "firebase/firestore"

const ItemDetailContainer = () => {
    const [book, setBook] = useState(null)
    const [loading, setLoading] = useState(true)
    const { itemId } =useParams()

    useEffect(() => {
        setLoading(true)
        getDoc(doc(db, 'books', itemId))
            .then((querySnapshot) => {
                console.log(querySnapshot)
                const book = { id: querySnapshot.id, ...querySnapshot.data() }
                setBook(book)
            })
        .catch(error => {
            console.error(error)
        })
        .finally(() => {
            setLoading(false)
        })
    }, [itemId])
    if (loading) {
        return <h1>Cargando Productos</h1>
    }
    return (
        <div className="detailContainer">
            {loading ? <h1>Cargando...</h1> : <ItemDetail {...book}/>}
        </div>
    )
}

export default ItemDetailContainer
