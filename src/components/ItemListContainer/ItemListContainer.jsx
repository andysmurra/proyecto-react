import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db, hasConfig } from '../../config/firebase';
import Item from './Item';
import Spinner from '../Spinner/Spinner';

function ItemListContainer() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    if (hasConfig && db) {
      getDocs(collection(db, 'productos'))
        .then(querySnapshot => {
          if (!cancelled) {
            const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProductos(products);
          }
        })
        .catch(() => {
          if (!cancelled) cargarLocal();
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    } else {
      cargarLocal();
    }

    function cargarLocal() {
      fetch('/data/productos.json')
        .then(res => {
          if (!res.ok) throw new Error();
          return res.json();
        })
        .then(data => {
          if (!cancelled) setProductos(data);
        })
        .catch(() => {
          if (!cancelled) setError('No se pudieron cargar los productos.');
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    }

    return () => { cancelled = true; };
  }, []);

  if (loading) return <Spinner mensaje="Cargando productos..." />;
  if (error) return <p style={{ textAlign: 'center', color: '#e74c3c', padding: '40px' }}>{error}</p>;

  return (
    <div className="product-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', padding: '40px', justifyContent: 'center' }}>
      {productos.map(p => (
        <Item key={p.id} {...p} />
      ))}
    </div>
  );
}
export default ItemListContainer;
