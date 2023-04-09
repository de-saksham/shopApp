import { useSelector } from "react-redux"
import { CartProducts } from "../../../store/types/types";
import Quantity from "../../atoms/quantity/quantity";
import { useState } from "react";
import './cartItems.scss';

function CartItems() {
    const [status, setStatus] = useState(false);
    const [productQ, setProductQ] = useState(0);
    const cart = useSelector((state: any) => state.reducer.ProductReducer.cart);
    const orderStatus = useSelector((state: any) => state.reducer.ProductReducer.orderStatus);

    const handlePropsUpdate = (newProps: any) => {
        setProductQ(newProps.quantity)
        setStatus(false);
    };

    const cartItem = () => {
        return(
            cart?.map((item: CartProducts) => {
                return(
                    <div className='mainCartItem' key={item._id}>
                        <div className="titleQty">
                            <span className="title">{item.title}</span>
                            <span className="quantity">Quantity: {item.quantity}</span>
                        </div>

                        <div className='mainQty'>
                            <Quantity product={item as CartProducts} onPropsUpdate={handlePropsUpdate} status={status} variant={'cart'} />
                        </div>

                        <div className="priceContainer">
                            <span className="price">Total: € {(item.quantity * item.price).toFixed(2)}</span>
                        </div>
                    </div>
                )
            })
        )
    }

    return(
        <div className="cartItems">

            <h2>{cart.length <= 0 && !orderStatus && 'Your cart is Empty!'}</h2>
            {cartItem()}
        </div>
    )
};

export default CartItems;