import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Product } from '../../../store/types/types';
import ProductTile from '../../molecules/productTile/productTile';
import { useGetProductsByCategoryQuery } from '../../../controllers/productController';
import { storeProducts } from '../../../store/actions';
import Pagination from '../../atoms/pagination/pagination';
import './shop.scss';
import Cart from '../../organisms/cart/cart';

function Shop() {
    
    const currentPage = useSelector((state: any) => state.reducer.ProductReducer.currentPage);
    const cart = useSelector((state: any) => state.reducer.ProductReducer.cart);
    const activeCategory = useSelector((state: any) => state.reducer.ProductReducer.activeCategory);
    const isLoading = useSelector((state: any) => state.reducer.ProductReducer.isLoading);
    const isModalActive = useSelector((state: any) => state.reducer.ProductReducer.isModalActive);
    const {data, isSuccess} = useGetProductsByCategoryQuery({category: activeCategory});
    const [lastItem, setLastItem] = useState('');
    const dispatch = useDispatch();

    const productShowcase = () => {
        if(isSuccess) {
            dispatch(storeProducts(data));
            return(
                data[currentPage - 1]?.map((item: Product) => {
                    return(
                        <div key={item._id}>
                            <ProductTile product={item} />
                        </div>
                    )
                })
            )
        } else {
            return(
                <div><span>Loading .......</span></div>
            )
        }
        
    };

    useEffect(() => {
        setLastItem(cart[cart.length - 1]?.title);
        setTimeout(() => {
            setLastItem('');
        }, 1500);
    }, [cart, currentPage]);

    return(
        <div>
            <div className='mainShop' style={isModalActive ? {opacity: 0.1, pointerEvents: 'none'} : undefined}>
                { !isLoading &&  
                    <div className='productShowcase'>
                        {productShowcase()}
                    </div>
                }

                { lastItem && !isModalActive &&
                    <div className='lastItem'>
                        <h4>{lastItem} added to the cart!</h4>
                    </div> 
                }

                <Pagination />
            </div>

            {isModalActive && <Cart />}

            
        </div>
    )
};

export default Shop;