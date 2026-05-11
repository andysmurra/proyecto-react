import { useState, useEffect } from 'react';
import Item from './Item';

function ItemListContainer() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch('/data/productos.json')
      .then(res => res.json())
      .then(data => setProductos(data));
  }, []);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', padding: '40px' }}>
      {productos.map(p => (
        <Item key={p.id} {...p} />
      ))}
    </div>
  );
}
export default ItemListContainer;