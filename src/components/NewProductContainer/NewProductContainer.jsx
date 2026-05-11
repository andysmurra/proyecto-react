import { useState } from 'react';
import ProductForm from '../ProductForm/ProductForm';

function NewProductContainer() {
  const [datosForm, setDatosForm] = useState({ nombre: '', precio: '' });
  const [imagenFile, setImagenFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const manejarCambio = (e) => setDatosForm({ ...datosForm, [e.target.name]: e.target.value });
  const manejarCambioImagen = (e) => setImagenFile(e.target.files[0]);

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', imagenFile);
      // RECUERDA CAMBIAR TU_API_KEY POR LA TUYA
      const res = await fetch(`https://api.imgbb.com/1/upload?key=TU_API_KEY`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      console.log("¡Producto creado exitosamente!", { ...datosForm, imagen: data.data.url });
      alert("¡Producto creado! Revisa la consola.");
    } catch (error) {
      console.error("Error al subir:", error);
    } finally {
      setLoading(false);
    }
  };

  return <ProductForm datosForm={datosForm} manejarCambio={manejarCambio} manejarCambioImagen={manejarCambioImagen} manejarEnvio={manejarEnvio} loading={loading} />;
}
export default NewProductContainer;