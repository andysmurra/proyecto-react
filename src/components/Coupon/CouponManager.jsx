import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db, hasConfig } from '../../config/firebase';
import ConfirmModal from '../Admin/ConfirmModal';
import Spinner from '../Spinner/Spinner';

const CouponManager = () => {
  const [cupones, setCupones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editando, setEditando] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [formData, setFormData] = useState({ codigo: '', descuento: '', activo: true });
  const [saving, setSaving] = useState(false);

  const cargarCupones = async () => {
    if (!hasConfig || !db) {
      setError('Firebase no está configurado.');
      setLoading(false);
      return;
    }
    try {
      const qs = await getDocs(collection(db, 'cupones'));
      setCupones(qs.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch {
      setError('Error al cargar cupones.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { cargarCupones(); }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.codigo.trim() || !formData.descuento) return;
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      const data = {
        codigo: formData.codigo.trim().toUpperCase(),
        descuento: Number(formData.descuento),
        activo: formData.activo,
      };
      if (editando) {
        await updateDoc(doc(db, 'cupones', editando.id), data);
        setSuccess('Cupón actualizado');
      } else {
        await addDoc(collection(db, 'cupones'), data);
        setSuccess('Cupón creado');
      }
      setEditando(null);
      setShowForm(false);
      setFormData({ codigo: '', descuento: '', activo: true });
      await cargarCupones();
    } catch {
      setError('Error al guardar cupón');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteDoc(doc(db, 'cupones', deleteTarget.id));
      setSuccess('Cupón eliminado');
      setDeleteTarget(null);
      await cargarCupones();
    } catch {
      setError('Error al eliminar cupón');
    }
  };

  const handleEdit = (cupon) => {
    setEditando(cupon);
    setFormData({ codigo: cupon.codigo, descuento: cupon.descuento, activo: cupon.activo });
    setShowForm(true);
  };

  if (loading) return <Spinner mensaje="Cargando cupones..." />;

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={headerStyle}>
        <h3 style={{ color: '#3e2723', margin: 0 }}>Gestión de Cupones</h3>
        <button onClick={() => { setEditando(null); setFormData({ codigo: '', descuento: '', activo: true }); setShowForm(!showForm); }} style={addBtnStyle}>
          {showForm ? 'Cancelar' : '+ Nuevo Cupón'}
        </button>
      </div>

      {error && <p style={errorStyle}>{error}</p>}
      {success && <p style={successStyle}>{success}</p>}

      {showForm && (
        <form onSubmit={handleSave} style={formStyle}>
          <input name="codigo" placeholder="Código (ej: DESCUENTO10)" value={formData.codigo} onChange={(e) => setFormData({ ...formData, codigo: e.target.value })} style={inputStyle} required />
          <input name="descuento" placeholder="Descuento %" type="number" value={formData.descuento} onChange={(e) => setFormData({ ...formData, descuento: e.target.value })} style={inputStyle} required min="1" max="100" />
          <label style={{ color: '#6f4e37', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" checked={formData.activo} onChange={(e) => setFormData({ ...formData, activo: e.target.checked })} />
            Cupón activo
          </label>
          <button type="submit" disabled={saving} style={saveBtnStyle(saving)}>
            {saving ? 'Guardando...' : editando ? 'Actualizar Cupón' : 'Crear Cupón'}
          </button>
        </form>
      )}

      {cupones.length === 0 && !error ? (
        <p style={{ textAlign: 'center', color: '#6f4e37', marginTop: '30px' }}>No hay cupones. Creá el primero.</p>
      ) : (
        <div style={listStyle}>
          {cupones.map(c => (
            <div key={c.id} style={itemStyle}>
              <div style={{ flex: 1 }}>
                <strong style={{ color: '#3e2723' }}>{c.codigo}</strong>
                <span style={{ marginLeft: '15px', color: '#6f4e37' }}>{c.descuento}% OFF</span>
                {c.activo ? <span style={activoStyle}>Activo</span> : <span style={inactivoStyle}>Inactivo</span>}
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => handleEdit(c)} style={editBtnStyle}>Editar</button>
                <button onClick={() => setDeleteTarget(c)} style={delBtnStyle}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {deleteTarget && (
        <ConfirmModal mensaje={`¿Eliminar cupón "${deleteTarget.codigo}"?`} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
      )}
    </div>
  );
};

const headerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', marginBottom: '20px' };
const addBtnStyle = { backgroundColor: '#3e2723', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' };
const formStyle = { backgroundColor: '#fdf5e6', padding: '20px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' };
const inputStyle = { padding: '10px', borderRadius: '8px', border: '1px solid #d2b48c', fontSize: '1rem', outline: 'none' };
const saveBtnStyle = (saving) => ({ backgroundColor: saving ? '#ccc' : '#3e2723', color: 'white', padding: '10px', border: 'none', borderRadius: '8px', cursor: saving ? 'not-allowed' : 'pointer', fontWeight: 'bold' });
const listStyle = { display: 'flex', flexDirection: 'column', gap: '10px' };
const itemStyle = { display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', backgroundColor: '#fdf5e6', borderRadius: '10px', flexWrap: 'wrap' };
const editBtnStyle = { backgroundColor: '#e67e22', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' };
const delBtnStyle = { backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' };
const activoStyle = { backgroundColor: '#27ae60', color: 'white', padding: '2px 10px', borderRadius: '10px', fontSize: '0.8rem', marginLeft: '10px' };
const inactivoStyle = { backgroundColor: '#95a5a6', color: 'white', padding: '2px 10px', borderRadius: '10px', fontSize: '0.8rem', marginLeft: '10px' };
const errorStyle = { color: '#e74c3c', backgroundColor: '#fde8e8', padding: '12px', borderRadius: '8px', marginBottom: '15px', textAlign: 'center' };
const successStyle = { color: '#27ae60', backgroundColor: '#e8f8f0', padding: '12px', borderRadius: '8px', marginBottom: '15px', textAlign: 'center' };

export default CouponManager;
