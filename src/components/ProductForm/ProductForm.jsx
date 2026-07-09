import { useState } from 'react';

const ProductForm = ({ initialData, onSave, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    nombre: initialData?.nombre || '',
    precio: initialData?.precio || '',
    foto: initialData?.foto || '',
    descripcion: initialData?.descripcion || '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
    if (!formData.precio || Number(formData.precio) <= 0) newErrors.precio = 'El precio debe ser mayor a 0';
    if (!formData.foto.trim()) newErrors.foto = 'La URL de la foto es obligatoria';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave({
      nombre: formData.nombre.trim(),
      precio: Number(formData.precio),
      foto: formData.foto.trim(),
      descripcion: formData.descripcion.trim(),
    });
  };

  return (
    <div style={wrapperStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h3 style={{ color: '#3e2723', margin: '0 0 15px' }}>
          {initialData ? 'Editar Producto' : 'Nuevo Producto'}
        </h3>

        <div>
          <input name="nombre" placeholder="Nombre del café *" value={formData.nombre} onChange={handleChange} style={inputStyle} />
          {errors.nombre && <span style={errTextStyle}>{errors.nombre}</span>}
        </div>

        <div>
          <input name="precio" placeholder="Precio ($) *" type="number" value={formData.precio} onChange={handleChange} style={inputStyle} />
          {errors.precio && <span style={errTextStyle}>{errors.precio}</span>}
        </div>

        <div>
          <input name="foto" placeholder="URL de la imagen *" value={formData.foto} onChange={handleChange} style={inputStyle} />
          {errors.foto && <span style={errTextStyle}>{errors.foto}</span>}
        </div>

        <div>
          <textarea name="descripcion" placeholder="Descripción (opcional)" value={formData.descripcion} onChange={handleChange} style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" disabled={loading} style={saveBtnStyle(loading)}>
            {loading ? 'Guardando...' : initialData ? 'Actualizar' : 'Crear Producto'}
          </button>
          {onCancel && (
            <button type="button" onClick={onCancel} style={cancelBtnStyle}>
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

const wrapperStyle = {
  backgroundColor: '#fdf5e6',
  padding: '25px',
  borderRadius: '15px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  maxWidth: '500px',
  margin: '0 auto 30px',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
};

const inputStyle = {
  width: '100%',
  boxSizing: 'border-box',
  padding: '10px',
  borderRadius: '8px',
  border: '1px solid #d2b48c',
  fontSize: '1rem',
  outline: 'none',
};

const errTextStyle = {
  color: '#e74c3c',
  fontSize: '0.8rem',
  marginTop: '3px',
  display: 'block',
};

const saveBtnStyle = (loading) => ({
  flex: 1,
  backgroundColor: loading ? '#ccc' : '#3e2723',
  color: 'white',
  padding: '12px',
  border: 'none',
  borderRadius: '8px',
  cursor: loading ? 'not-allowed' : 'pointer',
  fontWeight: 'bold',
  fontSize: '1rem',
});

const cancelBtnStyle = {
  backgroundColor: '#d2b48c',
  color: 'black',
  padding: '12px',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '1rem',
};

export default ProductForm;
