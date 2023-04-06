import * as React from 'react';
import Navigation from '../molecules/navigationMenu/navigation';
import Header from '../molecules/header/header';
import { useSelector } from 'react-redux';
import { Product } from '../../store/types/types';
import ProductTile from '../molecules/productTile/productTile';

function Shop() {
    const products = useSelector((state: any) => state.reducer.ProductReducer?.products);
    const currentPage = useSelector((state: any) => state.reducer.ProductReducer.currentPage);
    const productShowcase = () => {
        return(
            products[currentPage - 1]?.map((item: Product) => {
                return(
                    <ProductTile product={item} />
                )
            })
        )
    };

    return(
        <div style={{ display: 'flex', flexDirection: 'row', height: '100%'}}>
            <Header />
            
            <div style={{ width: '100%' }}>
                <Navigation />
                <div style={{ display: 'flex', flexDirection: 'row', padding: 20, flexWrap: 'wrap'}}>
                    {productShowcase()}
                </div>
            </div>
        </div>
    )
};

export default Shop;