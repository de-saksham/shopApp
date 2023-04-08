import { useDispatch, useSelector } from 'react-redux';
import CartItems from '../../molecules/cartItems/cartItems';
import './cart.scss';
import { CartProducts } from '../../../store/types/types';
import { usePlaceOrderQuery, useLazyPlaceOrderQuery } from '../../../controllers/orderController';
import { useEffect, useState } from 'react';
import { isModalActive, orderStatus } from '../../../store/actions';
import Icons from '../../atoms/icon/icon';

function Cart() {
    const dispatch = useDispatch();
    const cart = useSelector((state: any) => state.reducer.ProductReducer.cart);
    const [trigger, {data, isSuccess}] = useLazyPlaceOrderQuery();

    const orderObj = {
        order: {
            userId: 1,
            items: cart.map((item: CartProducts) => ({ itemId: item._id, quantity: item.quantity }))
        }
    };

    const totalPrice = cart.reduce((accumulator: number, currentItem: CartProducts) => {
        return accumulator + currentItem.price * currentItem.quantity;
      }, 0);

    useEffect(() => {
        if(isSuccess) { 
            dispatch(orderStatus(isSuccess));

            setTimeout(() => {
                dispatch(isModalActive());
            }, 2000)
        }
    }, [data, isSuccess])

    return(
        <div className="mainCart">
            <CartItems />

            
            {cart.length > 0 && !isSuccess &&
            <div className='cartFooter'>
                <div>
                    <span className='total'>Order Total: € </span>
                    <span className='price'>{totalPrice.toFixed(2)}</span>
                </div>

                <div onClick={() => trigger(orderObj)} className='buyNow'>
                    <h4>Buy now!</h4>
                </div>
            </div>
            }

            {isSuccess && 
                <div className='success'>
                    <Icons text='' iconName='check' locationType='header' />
                    <span className='message'>Order placed Successfully!</span>
                </div>}
        </div>
    )
};

export default Cart;