import React, {useState} from 'react';
import {Product} from '../../../store/types/types';
import Quantity from '../../atoms/quantity/quantity';
import {useDispatch, useSelector} from "react-redux";
import { addToCart } from '../../../store/actions';
import './productTile.scss'

interface Props {
    product: Product;
}

function ProductTile(props: Props) {
    const dispatch = useDispatch();
    const [productQ, setProductQ] = useState(0);
    const [status, setStatus] = useState(false);
    const cart = useSelector((state: any) => state.reducer.ProductReducer.cart);

    const handlePropsUpdate = (newProps: any) => {
        setProductQ(newProps.quantity)
        setStatus(false);
    };

    const addItemToCart = (itemToAdd: Product) => {
        dispatch(addToCart(itemToAdd, productQ, ''));
        setStatus(true);
    };

    const isStockNotAvailable = cart.length >= 0 && 
        cart.find((item: Product) => item._id === props.product._id)?.quantity >= props.product.stock;

    return(
        <div className='mainProductTile'>
            <h3 className='h3'>{props.product.title}</h3>
            <span className='desc'>{props.product.desc}</span>
            <div className='quantityContainer'>
                <Quantity product={props.product} onPropsUpdate={handlePropsUpdate} status={status} />
            </div>

            <div className='addToCart'>
                { isStockNotAvailable ?
                    <h4 className='h4'>No Stock Available</h4>   
                    : <h4 className='h4Stock' onClick={() => addItemToCart(props.product)}>Add to Cart</h4>
                }

                <h4 className='h4Price'>€ {props.product.price}</h4>
            </div>
        </div>
    )
}

export default ProductTile;
