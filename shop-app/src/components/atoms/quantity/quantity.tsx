import { useState, useEffect } from 'react';
import { Product } from '../../../store/types/types';

interface Props {
    product: Product;
    onPropsUpdate: (newProps: any) => void;
}

function Quantity(props: Props) {
    let [quantity, setQuantity] = useState(0);
    const updatedProps  = {
        ...props,
        quantity: quantity
    };

    const handleIncrement = async() => {
        if(quantity < props.product.stock) {
            await setQuantity(function(prevQ) {
                return (prevQ + 1);
            })
            
        }
    };

    const handleDecrement = async() => {
        if(quantity > 0) {
            setQuantity(quantity - 1)
        }
    };
    
    useEffect(() => {
        props.onPropsUpdate(updatedProps)
    }, [quantity]);

    return(
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 25, width: 90, borderRadius: 8}}>
                <div style={{ backgroundColor: '#fff', width: 25, cursor: 'pointer', borderTopLeftRadius: 8, borderBottomLeftRadius: 8, textAlign: 'center'}} onClick={() => handleDecrement()}>
                    <span style={{ fontWeight: '800', fontSize: '21px' }}>-</span>
                </div>
                <div style={{ backgroundColor: '#fff', width: 40, textAlign: 'center', padding: 2}}>
                    <span style={{ fontWeight: '800', fontSize: '18px' }}>{quantity}</span>
                </div>
                <div style={{ backgroundColor: '#fff', width: 25, cursor: 'pointer',  borderTopRightRadius: 8, borderBottomRightRadius: 8, textAlign: 'center'}} onClick={() => handleIncrement()}>
                    <span style={{ fontWeight: '800', fontSize: '21px' }}>+</span>
                </div>
        </div>
    )
};

export default Quantity;