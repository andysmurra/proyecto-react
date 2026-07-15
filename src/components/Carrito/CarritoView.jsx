import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db, hasConfig } from '../../config/firebase';
import { useCart } from '../../context/CartContext';

const CUPONES_FALLBACK = {
  COFFEE10: 10,
  LAB15: 15,
  BIENVENIDO20: 20,
};

const CarritoView = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrecio } = useCart();
  const [codigoCupon, setCodigoCupon] = useState('');
  const [descuento, setDescuento] = useState(0);
  const [cuponMsg, setCuponMsg] = useState('');
  const [cuponError, setCuponError] = useState('');
  const [cuponesDB, setCuponesDB] = useState({});

  useEffect(() => {
    if (hasConfig && db) {
      getDocs(collection(db, 'cupones')).then(qs => {
        const map = {};
        qs.docs.forEach(d => {
          const data = d.data();
          if (data.activo !== false) {
            map[data.codigo?.toUpperCase()] = data.descuento;
          }
        });
        setCuponesDB(map);
      }).catch(() => {});
    }
  }, []);

  const obtenerCupones = () => {
    return { ...CUPONES_FALLBACK, ...cuponesDB };
  };

  const finalizarCompra = () => {
    alert(`¡Compra finalizada! Total: $${totalConDescuento}. Gracias por tu compra ☕`);
    clearCart();
  };

  const aplicarCupon = () => {
    const code = codigoCupon.trim().toUpperCase();
    if (!code) {
      setCuponError('Ingresa un código de cupón');
      setCuponMsg('');
      return;
    }
    const cupones = obtenerCupones();
    const discount = cupones[code];
    if (discount) {
      setDescuento(discount);
      setCuponMsg(`¡Cupón aplicado! ${discount}% de descuento`);
      setCuponError('');
    } else {
      setDescuento(0);
      setCuponError('Código de cupón inválido');
      setCuponMsg('');
    }
  };

  const totalConDescuento = totalPrecio - (totalPrecio * descuento) / 100;

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

          <div style={cuponSectionStyle}>
            <h4 style={{ color: '#3e2723', margin: '0 0 10px' }}>¿Tienes un cupón?</h4>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <input
                type="text"
                placeholder="Ej: COFFEE10"
                value={codigoCupon}
                onChange={(e) => setCodigoCupon(e.target.value)}
                style={cuponInputStyle}
              />
              <button onClick={aplicarCupon} style={cuponBtnStyle}>Aplicar</button>
            </div>
            {cuponMsg && <p style={{ color: '#27ae60', fontSize: '0.9rem', margin: '8px 0 0' }}>{cuponMsg}</p>}
            {cuponError && <p style={{ color: '#e74c3c', fontSize: '0.9rem', margin: '8px 0 0' }}>{cuponError}</p>}
            <p style={{ color: '#6f4e37', fontSize: '0.8rem', margin: '8px 0 0' }}>
              Cupones disponibles: {Object.entries(obtenerCupones()).map(([c, d]) => `${c} (${d}%)`).join(', ')}
            </p>
          </div>

          <div style={totalStyle}>
            <div style={totalRowStyle}>
              <span>Subtotal:</span>
              <span>${totalPrecio}</span>
            </div>
            {descuento > 0 && (
              <div style={{ ...totalRowStyle, color: '#27ae60' }}>
                <span>Descuento ({descuento}%):</span>
                <span>-${(totalPrecio * descuento) / 100}</span>
              </div>
            )}
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

const cuponSectionStyle = {
  backgroundColor: '#f9f5f0',
  padding: '20px',
  borderRadius: '10px',
  marginTop: '25px',
};

const cuponInputStyle = {
  flex: 1,
  minWidth: '150px',
  padding: '10px',
  borderRadius: '8px',
  border: '1px solid #d2b48c',
  fontSize: '1rem',
};

const cuponBtnStyle = {
  backgroundColor: '#3e2723',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '8px',
  cursor: 'pointer',
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
