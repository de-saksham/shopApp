
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { useGetProductsByCategoryQuery } from './controllers/productController';
import { useEffect } from 'react';
import { init, isLoading, storeProducts } from './store/actions';
import Shop from './components/pages/shop';

function App() {
  const dispatch = useDispatch();
  const activeCategory = useSelector((state: any) => state.reducer.ProductReducer.activeCategory);
  const {data, isSuccess, isError} = useGetProductsByCategoryQuery({category: activeCategory});

  useEffect(() => {
    if(data) {
      // setting loading to false if we have data, spinner would go away. 
      dispatch(init(isSuccess, data.length));
      dispatch(storeProducts(data));
    } else if(isError) {
      dispatch(isLoading());
    }
  }, [isSuccess])

  return (
    <div>
      <Shop />
    </div>
  );
}

export default App;
