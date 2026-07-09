import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, hasConfig } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    if (!email || !password || !confirmPassword) {
      setLocalError('Todos los campos son obligatorios');
      return;
    }
    if (password.length < 6) {
      setLocalError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    if (password !== confirmPassword) {
      setLocalError('Las contraseñas no coinciden');
      return;
    }
    setLoading(true);
    try {
      await register(email, password);
      navigate('/');
    } catch (err) {
      setLocalError(err.message || 'Error al registrarse. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (!hasConfig) {
    return (
      <div style={wrapperStyle}>
        <div style={cardStyle}>
          <h2 style={{ color: '#3e2723', marginBottom: '15px' }}>Registro no disponible</h2>
          <p style={{ color: '#e74c3c', marginBottom: '10px' }}>
            Firebase no está configurado.
          </p>
          <p style={{ color: '#6f4e37', fontSize: '0.9rem', marginBottom: '20px' }}>
            Crea un archivo <strong>.env</strong> en la raíz del proyecto con las credenciales de Firebase para habilitar el registro.
          </p>
          <Link to="/" style={{ color: '#3e2723', fontWeight: 'bold' }}>Volver al inicio</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={wrapperStyle}>
      <div style={cardStyle}>
        <h2 style={{ color: '#3e2723', marginBottom: '5px' }}>Crear Cuenta</h2>
        <p style={{ color: '#6f4e37', marginBottom: '25px', fontSize: '0.9rem' }}>Regístrate en Coffee Lab</p>
        {localError && <p style={errorStyle}>{localError}</p>}
        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            required
          />
          <input
            type="password"
            placeholder="Contraseña (mín. 6 caracteres)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            required
          />
          <input
            type="password"
            placeholder="Confirmar Contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={inputStyle}
            required
          />
          <button type="submit" disabled={loading} style={btnStyle(loading)}>
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>
        <p style={{ marginTop: '20px', color: '#6f4e37', fontSize: '0.9rem' }}>
          ¿Ya tienes cuenta? <Link to="/login" style={{ color: '#3e2723', fontWeight: 'bold' }}>Inicia Sesión</Link>
        </p>
      </div>
    </div>
  );
};

const wrapperStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '60vh',
  padding: '40px 20px',
};

const cardStyle = {
  backgroundColor: '#fdf5e6',
  padding: '40px',
  borderRadius: '15px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  maxWidth: '400px',
  width: '100%',
  textAlign: 'center',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
};

const inputStyle = {
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid #d2b48c',
  fontSize: '1rem',
  outline: 'none',
};

const btnStyle = (loading) => ({
  backgroundColor: loading ? '#ccc' : '#3e2723',
  color: 'white',
  padding: '12px',
  border: 'none',
  borderRadius: '8px',
  cursor: loading ? 'not-allowed' : 'pointer',
  fontWeight: 'bold',
  fontSize: '1rem',
  transition: '0.3s',
});

const errorStyle = {
  color: '#e74c3c',
  backgroundColor: '#fde8e8',
  padding: '10px',
  borderRadius: '8px',
  fontSize: '0.9rem',
  marginBottom: '15px',
};

export default Register;
