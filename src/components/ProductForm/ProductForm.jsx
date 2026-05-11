function ProductForm({ datosForm, manejarCambio, manejarCambioImagen, manejarEnvio, loading }) {
  return (
    <div style={{ backgroundColor: '#fdf5e6', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', maxWidth: '500px', margin: '20px auto' }}>
      <form onSubmit={manejarEnvio} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input name="nombre" placeholder="Nombre del Café" value={datosForm.nombre} onChange={manejarCambio} required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #d2b48c' }} />
        <input name="precio" placeholder="Precio ($)" type="number" value={datosForm.precio} onChange={manejarCambio} required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #d2b48c' }} />
        <label style={{ fontSize: '14px', color: '#6f4e37' }}>Foto del producto:</label>
        <input type="file" onChange={manejarCambioImagen} required style={{ fontSize: '14px' }} />
        <button type="submit" disabled={loading} style={{ backgroundColor: loading ? '#ccc' : '#6f4e37', color: 'white', padding: '12px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', transition: '0.3s' }}>
          {loading ? 'Subiendo a la nube...' : 'CREAR PRODUCTO'}
        </button>
      </form>
    </div>
  );
}
export default ProductForm;