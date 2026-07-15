import { useState } from 'react';
import { useCart } from '../../context/CartContext';

const CarritoView = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrecio } = useCart();

  const finalizarCompra = () => {
    alert(`¡Compra finalizada! Total: $${totalPrecio}. Gracias por tu compra ☕`);
    clearCart();
  };

  const totalConDescuento = totalPrecio;

  return (
    <div style={wrapperStyle}>
      <h2 style={{ textAlign: 'center', color: '#3e2723', marginBottom: '30px' }}>Resumen de Compra</h2>

      {cart.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#6f4e37', fontSize: '1.1rem' }}>Tu carrito está vacío ☕</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} style={itemStyle}>
              <img src={item.foto} alt={item.nombre} style={imgStyle} />
              <div style={{ flex: 1, minWidth: '120px' }}>
                <strong style={{ color: '#3e2723' }}>{item.nombre}</strong>
                <p style={{ color: '#6f4e37', margin: '5px 0' }}>${item.precio} c/u</p>
              </div>
              <div style={qtyStyle}>
                <button onClick={() => updateQuantity(item.id, item.cantidad - 1)} style={qtyBtnStyle}>−</button>
                <span style={{ fontWeight: 'bold', minWidth: '25px', textAlign: 'center' }}>{item.cantidad}</span>
                <button onClick={() => updateQuantity(item.id, item.cantidad + 1)} style={qtyBtnStyle}>+</button>
              </div>
              <span style={{ fontWeight: 'bold', color: '#3e2723', minWidth: '70px', textAlign: 'right' }}>
                ${item.precio * item.cantidad}
              </span>
              <button onClick={() => removeFromCart(item.id)} style={removeBtnStyle}>✕</button>
            </div>
          ))}

          <div style={totalStyle}>
            <div style={totalRowStyle}>
              <span>Subtotal:</span>
              <span>${totalPrecio}</span>
            </div>
            <div style={{ ...totalRowStyle, fontSize: '1.2rem', fontWeight: 'bold', borderTop: '2px solid #d2b48c', paddingTop: '10px' }}>
              <span>Total:</span>
              <span>${totalConDescuento}</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', flexWrap: 'wrap', marginTop: '20px' }}>
              <button onClick={clearCart} style={vaciarBtnStyle}>Vaciar Carrito</button>
              <button onClick={finalizarCompra} style={finalizarBtnStyle}>Finalizar Compra</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const wrapperStyle = {
  maxWidth: '800px',
  margin: '0 auto',
  padding: '40px 20px',
};

const itemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
  padding: '15px 0',
  borderBottom: '1px solid #ddd',
  flexWrap: 'wrap',
};

const imgStyle = {
  width: '60px',
  height: '60px',
  borderRadius: '8px',
  objectFit: 'cover',
};

const qtyStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
};

const qtyBtnStyle = {
  backgroundColor: '#d2b48c',
  border: 'none',
  width: '30px',
  height: '30px',
  borderRadius: '50%',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '1.1rem',
};

const removeBtnStyle = {
  backgroundColor: 'transparent',
  border: 'none',
  color: '#e74c3c',
  cursor: 'pointer',
  fontSize: '1.2rem',
  fontWeight: 'bold',
};

const totalStyle = {
  marginTop: '25px',
  padding: '20px',
  backgroundColor: '#f9f5f0',
  borderRadius: '10px',
};

const totalRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '8px',
  color: '#3e2723',
};

const vaciarBtnStyle = {
  backgroundColor: '#e74c3c',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
};

const finalizarBtnStyle = {
  backgroundColor: '#3e2723',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: 'bold',
};

export default CarritoView;
