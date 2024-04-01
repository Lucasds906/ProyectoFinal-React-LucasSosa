import {  Link } from "react-router-dom"
import CartWidget from "../CartWidget/CartWidget"
import Search  from "../Search/Search"
const NavBar = ()=> {
    return (
        <nav className="navBar">
            <Link to='/'>
                <h3 className="princess-sofia-regular">Luxor Libros</h3>
            </Link>
            <div>
                <Search/>
            </div>
            <CartWidget/>
        </nav>
    )
}

export default NavBar