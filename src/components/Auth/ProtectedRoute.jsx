import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Spinner from '../Spinner/Spinner';

const ProtectedRoute = ({ children, rolesPermitidos }) => {
  const { user, userRole, loading } = useAuth();

  if (loading) {
    return <Spinner mensaje="Verificando autenticación..." />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (rolesPermitidos && !rolesPermitidos.includes(userRole)) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h2 style={{ color: '#e74c3c' }}>Acceso denegado</h2>
        <p style={{ color: '#6f4e37' }}>No tenés permisos para acceder a esta sección.</p>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
