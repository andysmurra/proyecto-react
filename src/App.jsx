import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Layout from './components/Layout/Layout';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import NewProductContainer from './components/NewProductContainer/NewProductContainer';
import CarritoView from './components/Carrito/CarritoView';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={
              <div style={{ textAlign: 'center', padding: '100px 20px' }}>
                <h1 style={{ color: '#3e2723', fontSize: '3rem' }}>☕ Bienvenid@ a Coffee Lab</h1>
                <p style={{ fontSize: '1.2rem', color: '#6f4e37' }}>Selecciona "Productos" para ver nuestro catálogo.</p>
              </div>
            } />
            <Route path="/productos" element={<ItemListContainer />} />
            <Route path="/admin" element={<NewProductContainer />} />
            <Route path="/carrito" element={<CarritoView />} />
            <Route path="/producto/:id" element={<h2 style={{ textAlign: 'center', padding: '50px' }}>Detalle</h2>} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;