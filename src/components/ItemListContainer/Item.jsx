import { useState } from 'react';
import { useCart } from '../../context/CartContext';

const Item = ({ id, nombre, precio, foto }) => {
  const [hover, setHover] = useState(false);
  const { addToCart } = useCart();

  return (
    <div 
      onMouseEnter={() => setHover(true)} 
      onMouseLeave={() => setHover(false)}
      style={{
        ...cardStyle,
        transform: hover ? 'translateY(-10px)' : 'translateY(0)',
        transition: 'all 0.3s ease'
      }}
    >
      <img src={foto} alt={nombre} style={imgStyle} />
      <div style={{ padding: '15px' }}>
        <h3 style={{ margin: '10px 0', color: '#3e2723' }}>{nombre}</h3>
        <p style={{ color: '#6f4e37', fontSize: '20px', fontWeight: 'bold' }}>${precio}</p>
        <button 
          onClick={() => addToCart({ id, nombre, precio, foto })}
          style={{
            ...btnStyle,
            backgroundColor: hover ? '#6f4e37' : '#d2b48c',
            color: hover ? 'white' : 'black'
          }}
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
};

const cardStyle = { backgroundColor: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 6px 12px rgba(0,0,0,0.1)', textAlign: 'center' };
const imgStyle = { width: '100%', height: '200px', objectFit: 'cover' };
const btnStyle = { border: 'none', padding: '8px 15px', borderRadius: '20px', cursor: 'pointer', transition: '0.3s' };

export default Item;