const Footer = () => {
  const equipo = [
    { id: 1, nombre: "Andrés", rol: "Frontend Developer" },
    { id: 2, nombre: "Lucía", rol: "UI/UX Designer" },
    { id: 3, nombre: "Marcos", rol: "Project Manager" }
  ];

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.infoEmpresa}>
          <h3>Coffee Lab S.A.</h3>
          <p>Pasión por el café artesanal.</p>
          <p>Buenos Aires, Argentina</p>
        </div>

        <div style={styles.equipoSeccion}>
          <h4>Nuestro Equipo</h4>
          <div style={styles.gridEquipo}>
            {equipo.map(persona => (
              <div key={persona.id} style={styles.tarjetaPersona}>
                <div style={styles.avatar}>👤</div>
                <p style={styles.nombrePersona}>{persona.nombre}</p>
                <p style={styles.rolPersona}>{persona.rol}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={styles.copy}>
        <p>© 2026 Coffee Lab - Pre-entrega Talento Lab</p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#3e2723',
    color: '#d2b48c',
    padding: '40px 20px',
    marginTop: 'auto',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: '30px'
  },
  infoEmpresa: {
    flex: '1 1 300px'
  },
  equipoSeccion: {
    flex: '2 1 500px',
    textAlign: 'center'
  },
  gridEquipo: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '15px'
  },
  tarjetaPersona: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: '15px',
    borderRadius: '10px',
    minWidth: '120px',
    border: '1px solid #6f4e37'
  },
  avatar: {
    fontSize: '2rem',
    marginBottom: '5px'
  },
  nombrePersona: {
    fontWeight: 'bold',
    margin: '5px 0 0 0',
    color: 'white'
  },
  rolPersona: {
    fontSize: '0.8rem',
    margin: 0
  },
  copy: {
    textAlign: 'center',
    marginTop: '30px',
    borderTop: '1px solid #6f4e37',
    paddingTop: '20px',
    fontSize: '0.9rem'
  }
};

export default Footer;