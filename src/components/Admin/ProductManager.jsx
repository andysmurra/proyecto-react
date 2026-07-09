import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db, hasConfig } from '../../config/firebase';
import ProductForm from '../ProductForm/ProductForm';
import ConfirmModal from './ConfirmModal';
import Spinner from '../Spinner/Spinner';

const ProductManager = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const cargarProductos = async () => {
    if (!hasConfig || !db) {
      setError('Firebase no está configurado. Crea un archivo .env con tus credenciales.');
      setLoading(false);
      return;
    }
    try {
      const querySnapshot = await getDocs(collection(db, 'productos'));
      const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProductos(products);
    } catch {
      setError('Error al cargar productos. Verifica tu conexión a Firestore.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    cargarProductos();
  }, []);

  const handleSave = async (productData) => {
    if (!db) return;
    setFormLoading(true);
    setError('');
    setSuccess('');
    try {
      if (editingProduct) {
        await updateDoc(doc(db, 'productos', editingProduct.id), productData);
        setSuccess('Producto actualizado correctamente');
      } else {
        await addDoc(collection(db, 'productos'), productData);
        setSuccess('Producto creado correctamente');
      }
      setEditingProduct(null);
      setShowForm(false);
      await cargarProductos();
    } catch {
      setError('Error al guardar el producto');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!db || !deleteTarget) return;
    try {
      await deleteDoc(doc(db, 'productos', deleteTarget.id));
      setSuccess('Producto eliminado correctamente');
      setDeleteTarget(null);
      await cargarProductos();
    } catch {
      setError('Error al eliminar el producto');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  if (loading) return <Spinner mensaje="Cargando productos..." />;

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={headerStyle}>
        <h2 style={{ color: '#3e2723', margin: 0 }}>Panel de Administración</h2>
        <button onClick={() => { setEditingProduct(null); setShowForm(!showForm); }} style={addBtnStyle}>
          {showForm ? 'Cancelar' : '+ Nuevo Producto'}
        </button>
      </div>

      {error && <p style={errorStyle}>{error}</p>}
      {success && <p style={successStyle}>{success}</p>}

      {showForm && hasConfig && (
        <ProductForm
          initialData={editingProduct}
          onSave={handleSave}
          onCancel={() => { setEditingProduct(null); setShowForm(false); }}
          loading={formLoading}
        />
      )}

      {productos.length === 0 && !error ? (
        <p style={{ textAlign: 'center', color: '#6f4e37', marginTop: '40px' }}>
          No hay productos. ¡Agrega el primero!
        </p>
      ) : (
        <div style={listStyle}>
          {productos.map(product => (
            <div key={product.id} style={itemStyle}>
              <img src={product.foto} alt={product.nombre} style={thumbStyle} onError={(e) => { e.target.style.display = 'none'; }} />
              <div style={{ flex: 1 }}>
                <strong style={{ color: '#3e2723' }}>{product.nombre}</strong>
                <p style={{ color: '#6f4e37', margin: '5px 0 0' }}>${product.precio}</p>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => handleEdit(product)} style={editBtnStyle}>Editar</button>
                <button onClick={() => setDeleteTarget(product)} style={delBtnStyle}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {deleteTarget && (
        <ConfirmModal
          mensaje={`¿Eliminar "${deleteTarget.nombre}"? Esta acción no se puede deshacer.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '15px',
  marginBottom: '25px',
};

const addBtnStyle = {
  backgroundColor: '#3e2723',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
};

const listStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const itemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
  padding: '15px',
  backgroundColor: '#fdf5e6',
  borderRadius: '10px',
  flexWrap: 'wrap',
};

const thumbStyle = {
  width: '60px',
  height: '60px',
  borderRadius: '8px',
  objectFit: 'cover',
};

const editBtnStyle = {
  backgroundColor: '#e67e22',
  color: 'white',
  border: 'none',
  padding: '8px 15px',
  borderRadius: '5px',
  cursor: 'pointer',
};

const delBtnStyle = {
  backgroundColor: '#e74c3c',
  color: 'white',
  border: 'none',
  padding: '8px 15px',
  borderRadius: '5px',
  cursor: 'pointer',
};

const errorStyle = {
  color: '#e74c3c',
  backgroundColor: '#fde8e8',
  padding: '12px',
  borderRadius: '8px',
  marginBottom: '15px',
  textAlign: 'center',
};

const successStyle = {
  color: '#27ae60',
  backgroundColor: '#e8f8f0',
  padding: '12px',
  borderRadius: '8px',
  marginBottom: '15px',
  textAlign: 'center',
};

export default ProductManager;
