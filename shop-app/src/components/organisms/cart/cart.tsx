import { useSelector } from 'react-redux';
import CartItems from '../../molecules/cartItems/cartItems';
import './cart.scss';

function Cart() {
    const cart = useSelector((state: any) => state.reducer.ProductReducer.cart);
    return(
        <div className="mainCart">
            <CartItems />

            {cart.length > 0 && 
                <div style={{ display: 'flex', bottom: 0, right: 20,  margin: 30, backgroundColor: '#002B5B', borderRadius: 18, width: 150, alignItems: 'center', justifyContent: 'center', color: '#fff'}}>
                    <h2>Buy now!</h2>
                </div>
            }
        </div>
    )
};

export default Cart;