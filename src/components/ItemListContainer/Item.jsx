import { useState } from 'react';
import { useCart } from '../../context/CartContext';

const Item = ({ id, nombre, precio, foto }) => {
  const [hover, setHover] = useState(false);
  const { addToCart } = useCart();
  const [favorito, setFavorito] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        ...cardStyle,
        transform: hover ? 'translateY(-10px)' : 'translateY(0)',
        transition: 'all 0.3s ease',
      }}
    >
      <button
        onClick={() => setFavorito(!favorito)}
        style={{
          background: 'rgba(0,0,0,0.4)',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          fontSize: '1.5rem',
          cursor: 'pointer',
          position: 'absolute',
          top: '10px',
          right: '10px',
          color: favorito ? 'gold' : 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(4px)',
          zIndex: 1,
        }}
      >
        {favorito ? '★' : '☆'}
      </button>
      {imgError ? (
        <div style={{ width: '100%', height: '200px', backgroundColor: '#f0e6d6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6f4e37' }}>
          ☕ Sin imagen
        </div>
      ) : (
        <img src={foto} alt={nombre} style={imgStyle} onError={() => setImgError(true)} />
      )}
      <div style={{ padding: '15px' }}>
        <h3 style={{ margin: '10px 0', color: '#3e2723' }}>{nombre}</h3>
        <p style={{ color: '#6f4e37', fontSize: '20px', fontWeight: 'bold' }}>${precio}</p>
        <button
          onClick={() => addToCart({ id, nombre, precio, foto })}
          style={{
            ...btnStyle,
            backgroundColor: hover ? '#6f4e37' : '#d2b48c',
            color: hover ? 'white' : 'black',
          }}
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
};

const cardStyle = {
  backgroundColor: 'white',
  borderRadius: '15px',
  overflow: 'hidden',
  boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
  textAlign: 'center',
  position: 'relative',
  width: '280px',
};

const imgStyle = { width: '100%', height: '200px', objectFit: 'cover' };
const btnStyle = { border: 'none', padding: '8px 15px', borderRadius: '20px', cursor: 'pointer', transition: '0.3s' };

export default Item;
