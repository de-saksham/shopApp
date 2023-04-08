
import { useDispatch, useSelector } from 'react-redux';
import { useGetProductsByCategoryQuery } from './controllers/productController';
import { useEffect } from 'react';
import { init, isLoading } from './store/actions';
import Shop from './components/pages/shop/shop';
import { Route, Routes } from 'react-router-dom';
import Header from './components/molecules/header/header';
import Navigation from './components/molecules/navigationMenu/navigation';

function App() {
  const dispatch = useDispatch();
  const activeCategory = useSelector((state: any) => state.reducer.ProductReducer.activeCategory);
  const {data, isSuccess, isError} = useGetProductsByCategoryQuery({category: activeCategory});

  useEffect(() => {
    if(data) {
      // setting loading to false if we have data, spinner would go away. 
      dispatch(init(isSuccess, data.length));
    } else if(isError) {
      dispatch(isLoading());
    }
  }, [isSuccess, activeCategory])

  return (
    <>
    <Header />
    <Navigation />
    <Routes>
      <Route>
        <Route path='/vegetables' element={<Shop />} />
        <Route path='/fruits' element={<Shop />} />
        <Route path='/cheese' element={<Shop />} />
      </Route>
    </Routes>
    </>
    
  );
}

export default App;
