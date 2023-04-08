import { useState, useEffect } from 'react';
import { CartProducts, Product } from '../../../store/types/types';
import './quantity.scss';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../store/actions';

interface Props {
    product: CartProducts | Product;
    onPropsUpdate: (newProps: any) => void;
    status: boolean;
    variant?: string;
}

function Quantity(props: Props) {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(0);
    const updatedProps  = {
        ...props,
        quantity: quantity
    };

    const handleIncrement = async(variant: string) => {
        if(quantity < props.product.stock) {
            await setQuantity(function(prevQ: number) {
                return (prevQ + 1);
            })
            if(props.product && 'quantity' in props.product && props.product.quantity < props.product.stock && props.variant) {
                dispatch(addToCart(props.product, quantity, variant));
            }
        }
    };

    const handleDecrement = async(variant: string) => {
        if(quantity > 0) {
            setQuantity(quantity - 1);
        };

        if(quantity >= 0 && props.variant) {
            dispatch(addToCart(props.product, quantity, variant));
        }
    };
    
    useEffect(() => {
        props.onPropsUpdate(updatedProps);

        if(props.status) {
            setQuantity(0);
        }
    }, [quantity, props.status]);

    return(
        <div className='mainQuantity'>
            <div className='dec' onClick={() => handleDecrement('dec')}>
                <span className='text'>-</span>
            </div>
            <div className='qty'>
                <span className='qtyText'>{props.product && 'quantity' in props.product ? props.product.quantity : quantity}</span>
            </div>

            <div className='inc' onClick={() => handleIncrement('inc')}>
                <span className='text'>+</span>
            </div>
        </div>
    )
};

export default Quantity;