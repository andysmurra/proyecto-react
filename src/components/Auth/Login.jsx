import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, hasConfig } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    if (!email || !password) {
      setLocalError('Todos los campos son obligatorios');
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setLocalError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!hasConfig) {
    return (
      <div style={wrapperStyle}>
        <div style={cardStyle}>
          <h2 style={{ color: '#3e2723', marginBottom: '15px' }}>Inicio de sesión no disponible</h2>
          <p style={{ color: '#e74c3c', marginBottom: '10px' }}>
            Firebase no está configurado.
          </p>
          <p style={{ color: '#6f4e37', fontSize: '0.9rem', marginBottom: '20px' }}>
            Crea un archivo <strong>.env</strong> en la raíz del proyecto con las credenciales de Firebase para habilitar el inicio de sesión.
          </p>
          <Link to="/" style={{ color: '#3e2723', fontWeight: 'bold' }}>Volver al inicio</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={wrapperStyle}>
      <div style={cardStyle}>
        <h2 style={{ color: '#3e2723', marginBottom: '5px' }}>Iniciar Sesión</h2>
        <p style={{ color: '#6f4e37', marginBottom: '25px', fontSize: '0.9rem' }}>Accede a tu cuenta de Coffee Lab</p>
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
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            required
          />
          <button type="submit" disabled={loading} style={btnStyle(loading)}>
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
        <p style={{ marginTop: '20px', color: '#6f4e37', fontSize: '0.9rem' }}>
          ¿No tienes cuenta? <Link to="/register" style={{ color: '#3e2723', fontWeight: 'bold' }}>Regístrate</Link>
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

export default Login;
