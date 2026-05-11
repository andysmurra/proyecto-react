import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const Header = () => {
  const { totalQuantity } = useCart();

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <h1 style={styles.logo}>☕ Coffee Lab</h1>
        <nav style={styles.nav}>
          <Link to="/" style={styles.link}>Inicio</Link>
          <Link to="/productos" style={styles.link}>Productos</Link>
          <Link to="/carrito" style={styles.link}>
            <div style={styles.cartContainer}>
              🛒 <span style={styles.badge}>{totalQuantity}</span> 
            </div>
          </Link>
        </nav>
      </div>
    </header>
  );
};

const styles = {
  header: { backgroundColor: '#3e2723', color: 'white', padding: '1rem 0' },
  container: { maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' },
  logo: { fontSize: '1.5rem', margin: 0 },
  nav: { display: 'flex', gap: '20px', alignItems: 'center' },
  link: { color: '#d2b48c', textDecoration: 'none', fontWeight: 'bold' },
  cartContainer: { display: 'flex', alignItems: 'center', position: 'relative' },
  badge: { backgroundColor: '#e67e22', color: 'white', borderRadius: '50%', padding: '2px 8px', fontSize: '0.8rem', position: 'absolute', top: '-10px', right: '-15px' }
};

export default Header;