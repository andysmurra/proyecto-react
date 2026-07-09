import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout/Layout';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import CarritoView from './components/Carrito/CarritoView';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import ProductManager from './components/Admin/ProductManager';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={
                <div className="hero-section">
                  <h1>☕ Bienvenid@ a Coffee Lab</h1>
                  <p>Descubre nuestra selección de cafés artesanales y disfruta de la mejor experiencia.</p>
                </div>
              } />
              <Route path="/productos" element={<ItemListContainer />} />
              <Route path="/carrito" element={<CarritoView />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin" element={
                <ProtectedRoute rolesPermitidos={['admin']}>
                  <ProductManager />
                </ProtectedRoute>
              } />
            </Routes>
          </Layout>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
