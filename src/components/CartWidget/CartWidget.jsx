import cart from './assets/booklogo.png'
import { useCart } from '../../context/CartContex'
import {Link} from "react-router-dom"

const CartWidget = ()=> {
    const { totalQuantity } = useCart()
    
    return (
        <Link to="/cart">
            <div className='imgLogoContainer'>
                <img src={cart} alt="cart-widget" className='imgLogo' />
                <p>{totalQuantity}</p>
            </div>
        </Link>
    )
}

export default CartWidget