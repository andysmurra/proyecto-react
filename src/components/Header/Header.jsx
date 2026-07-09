import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { totalQuantity } = useCart();
  const { user, isAdmin, logout } = useAuth();

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <Link to="/" style={styles.logoLink}>
          <h1 style={styles.logo}>☕ Coffee Lab</h1>
        </Link>
        <nav style={styles.nav}>
          <Link to="/" style={styles.link}>Inicio</Link>
          <Link to="/productos" style={styles.link}>Productos</Link>
          {isAdmin && <Link to="/admin" style={styles.link}>Gestión</Link>}
          <Link to="/carrito" style={styles.link}>
            <div style={styles.cartContainer}>
              🛒 {totalQuantity > 0 && <span style={styles.badge}>{totalQuantity}</span>}
            </div>
          </Link>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#d2b48c', fontSize: '0.85rem' }}>{user.email}</span>
              <button onClick={logout} style={styles.logoutBtn}>Salir</button>
            </div>
          ) : (
            <Link to="/login" style={styles.link}>Ingresar</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

const styles = {
  header: { backgroundColor: '#3e2723', color: 'white', padding: '1rem 0' },
  container: { maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', flexWrap: 'wrap', gap: '10px' },
  logoLink: { textDecoration: 'none' },
  logo: { fontSize: '1.5rem', margin: 0, color: 'white' },
  nav: { display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' },
  link: { color: '#d2b48c', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.95rem' },
  cartContainer: { display: 'flex', alignItems: 'center', position: 'relative' },
  badge: { backgroundColor: '#e67e22', color: 'white', borderRadius: '50%', padding: '2px 8px', fontSize: '0.75rem', position: 'absolute', top: '-12px', right: '-15px' },
  logoutBtn: { backgroundColor: 'transparent', color: '#d2b48c', border: '1px solid #d2b48c', padding: '5px 12px', borderRadius: '5px', cursor: 'pointer', fontSize: '0.85rem' },
};

export default Header;
