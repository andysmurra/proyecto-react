const Spinner = ({ mensaje = 'Cargando...' }) => {
  return (
    <div style={containerStyle}>
      <div style={spinnerStyle}></div>
      <p style={{ color: '#6f4e37', marginTop: '15px' }}>{mensaje}</p>
    </div>
  );
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '60px 20px',
};

const spinnerStyle = {
  width: '50px',
  height: '50px',
  border: '5px solid #d2b48c',
  borderTop: '5px solid #3e2723',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
};

export default Spinner;
