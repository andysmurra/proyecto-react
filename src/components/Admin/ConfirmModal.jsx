const ConfirmModal = ({ mensaje, onConfirm, onCancel }) => {
  return (
    <div style={overlayStyle} onClick={onCancel}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <p style={{ fontSize: '1.1rem', color: '#3e2723', marginBottom: '25px' }}>{mensaje}</p>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <button onClick={onConfirm} style={btnConfirmStyle}>Eliminar</button>
          <button onClick={onCancel} style={btnCancelStyle}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalStyle = {
  backgroundColor: 'white',
  padding: '30px',
  borderRadius: '15px',
  boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
  textAlign: 'center',
  maxWidth: '400px',
  width: '90%',
};

const btnConfirmStyle = {
  backgroundColor: '#e74c3c',
  color: 'white',
  border: 'none',
  padding: '10px 25px',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
};

const btnCancelStyle = {
  backgroundColor: '#d2b48c',
  color: 'black',
  border: 'none',
  padding: '10px 25px',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
};

export default ConfirmModal;
