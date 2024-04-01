import { Link } from "react-router-dom"
const Item = ({id, name, price, author, img, stock, description}) => {

    let validStock = false
    if(stock == 0){
        validStock = true
    }
    return (
        <article className="cards">
            <section>
                <img src={img} alt={name} className="cardsImg"/>
            </section>
            <section className="cardsBodySection">
                <h2 className="princess-sofia-regular">{name}</h2>
                <span>{author}</span>
                <span className="cardDescriptionPreview">{description}</span>
                <p>$ {price}</p>
                {validStock ? (<p>agotado</p>) : (<p>Stock: {stock}</p>)}
            </section>
            <Link to={`/item/${id}`}>Ver más</Link>
        </article>
    )
}

export default Item
