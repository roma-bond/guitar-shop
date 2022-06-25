import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import CatalogPage from '../catalog-page/catalog-page';
import CartPage from '../cart-page/cart-page';
import ProductPage from '../product-page/product-page';
import NotFoundPage from '../not-found-page/not-found-page';
import Header from '../header/header';
import Footer from '../footer/footer';
import ModalNetworkError from '../modal-network-error/modal-network-error';
import { AppRoute } from '../../const';
import { RootState } from '../../store/store';
import { updateServerStatus } from '../../store/server-reducer';
import './app.css';

function App(): JSX.Element {
  const { status } = useSelector((state: RootState) => state.server);
  const dispatch = useDispatch();

  const handleModalClose = () => {
    dispatch(updateServerStatus(0));
  };

  return (
    <div className="wrapper">
      <Header />
      <Routes>
        <Route path={'/'} element={<CatalogPage />}>
          <Route path={AppRoute.Catalog} element={<CatalogPage />}>
            <Route path=":pageId" element={<CatalogPage />} />
          </Route>
        </Route>
        <Route path={AppRoute.Cart} element={<CartPage />} />
        <Route
          path={`${AppRoute.Product}/:guitarId`}
          element={<ProductPage />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
      {status && status >= 500 && <ModalNetworkError onModalClose={handleModalClose}/>}
    </div>
  );
}

export default App;
