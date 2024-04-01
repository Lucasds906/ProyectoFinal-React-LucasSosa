import useCount from '../../hooks/useCount'

const ItemCount = ({onAdd, initialValue, stock})=> {

    const {count, decrement, increment} = useCount(initialValue, stock)

    return(
        <div className='cardCount'>
            <h3>En stock: {stock}</h3>
            <button onClick={decrement}>-</button>
            <h4>Cantidad: {count}</h4>
            <button onClick={increment}>+</button>
            <div>
            <button onClick={()=> onAdd(count)}>Agregar al carrito</button>
            </div>
        </div>
    )
}

export default ItemCount