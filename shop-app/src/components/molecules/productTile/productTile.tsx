import React, {useState} from 'react';
import { Product } from '../../../store/types/types';
import Quantity from '../../atoms/quantity/quantity';

interface Props {
    product: Product;
}

function ProductTile(props: Props) {
    const [productQ, setProductQ] = useState(0)
    const handlePropsUpdate = (newProps: any) => {
        console.log('NewProps', newProps);
        setProductQ(newProps.quantity)
    }

    const addToCart = () => {
        console.log('Product', props.product, productQ)
    }
    return(
        <div style={{ display: 'flex', flexDirection: 'column', top: 100, height: 260, width: 260, borderRadius: 18, backgroundColor: '#FDF4F5', position: 'relative', padding: 15, margin: 20 }}>
            <h3 style={{ color: '#7149C6', textAlign: 'center'}}>{props.product.title}</h3>
            <span style={{ textAlign: 'center' }}>{props.product.desc}</span>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '260px', justifyContent: 'space-around', bottom: 70, position: 'absolute'}}>
                <Quantity product={props.product} onPropsUpdate={handlePropsUpdate}/>
            </div>
           
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '260px', justifyContent: 'space-around', bottom: 5, position: 'absolute'}}>
                <h4 style={{ color: '#1A5F7A'}} onClick={() => addToCart()}>Add to Cart</h4>
                
                <h4 style={{ textAlign: 'end'}}>€ {props.product.price}</h4>
            </div> 
        </div>
    )
}

export default ProductTile;