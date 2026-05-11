import { useCart } from '../../context/CartContext';

const CarritoView = () => {
  const { cart, clearCart } = useCart();

  const totalPrecio = cart.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: 'auto' }}>
      <h2 style={{ textAlign: 'center', color: '#3e2723' }}>Resumen de Compra</h2>
      
      {cart.length === 0 ? (
        <p style={{ textAlign: 'center' }}>Tu carrito está vacío ☕</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} style={itemStyle}>
              <div>
                <strong style={{ fontSize: '1.1rem' }}>{item.nombre}</strong>
                <span style={{ marginLeft: '15px', color: '#6f4e37' }}>x {item.cantidad}</span>
              </div>
              <span style={{ fontWeight: 'bold' }}>${item.precio * item.cantidad}</span>
            </div>
          ))}
          
          <div style={totalStyle}>
            <h3 style={{ margin: '0 0 20px 0' }}>Total: ${totalPrecio}</h3>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button onClick={clearCart} style={btnVaciar}>Vaciar Carrito</button>
              <button style={btnFinalizar}>Finalizar Compra</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const itemStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid #ddd' };
const totalStyle = { marginTop: '30px', textAlign: 'right', padding: '20px', backgroundColor: '#f9f5f0', borderRadius: '10px' };
const btnVaciar = { backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' };
const btnFinalizar = { backgroundColor: '#3e2723', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' };

export default CarritoView;