import { useState } from 'react';
import ProductManager from './ProductManager';
import CouponManager from '../Coupon/CouponManager';

const TABS = [
  { id: 'productos', label: 'Productos' },
  { id: 'cupones', label: 'Cupones' },
];

const AdminPanel = () => {
  const [tab, setTab] = useState('productos');

  return (
    <div>
      <div style={tabBarStyle}>
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={tab === t.id ? tabActiveStyle : tabStyle}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tab === 'productos' && <ProductManager />}
      {tab === 'cupones' && <CouponManager />}
    </div>
  );
};

const tabBarStyle = {
  display: 'flex',
  gap: '5px',
  padding: '20px 20px 0',
  maxWidth: '900px',
  margin: '0 auto',
};

const tabStyle = {
  backgroundColor: '#d2b48c',
  color: 'black',
  border: 'none',
  padding: '10px 25px',
  borderRadius: '10px 10px 0 0',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '0.95rem',
};

const tabActiveStyle = {
  ...tabStyle,
  backgroundColor: '#3e2723',
  color: 'white',
};

export default AdminPanel;
