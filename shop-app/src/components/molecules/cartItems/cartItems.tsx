import { useDispatch, useSelector } from "react-redux"
import { CartProducts, Product } from "../../../store/types/types";
import Quantity from "../../atoms/quantity/quantity";
import { useState } from "react";
import { addToCart } from "../../../store/actions";

function CartItems() {
    const dispatch = useDispatch();
    const [status, setStatus] = useState(false);
    const [productQ, setProductQ] = useState(0);
    const cart = useSelector((state: any) => state.reducer.ProductReducer.cart);

    const handlePropsUpdate = (newProps: any) => {
        setProductQ(newProps.quantity)
        setStatus(false);
    };

    const cartItem = () => {
        return(
            cart?.map((item: CartProducts) => {
                return(
                    <div style={{ display: 'flex', flexDirection: 'row', width: '90%', margin: '10px', backgroundColor: '#DFA67B', borderRadius: 20, padding: 12}}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                            <span style={{ fontSize: 18, color: '#fff', marginLeft: 20, fontWeight: 800}}>{item.title}</span>
                            <span style={{marginLeft: 20, color: '#6D5D6E', fontWeight: 500}}>Quantity: {item.quantity}</span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: 'auto'}}>
                            <Quantity product={item as CartProducts} onPropsUpdate={handlePropsUpdate} status={status} variant={'cart'} />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: 'auto'}}>
                            <span style={{ fontSize: 18, color: '#fff', marginLeft: 20, fontWeight: 800}}>Total: € {item.quantity * item.price}</span>
                        </div>
                    </div>
                )
            })
        )
    }

    return(
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 30, color: '#FF6000'}}>

            <h2>{cart.length <= 0 && 'Your cart is Empty!'}</h2>
            {cartItem()}
        </div>
    )
};

export default CartItems;