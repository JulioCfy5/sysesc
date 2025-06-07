document.addEventListener('DOMContentLoaded', cargarAlumnos);

document.getElementById('alumnoForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const matricula = document.getElementById('matricula').value.trim();
  const nombre = document.getElementById('nombre').value.trim();
  const apPat = document.getElementById('apPat').value.trim();
  const apMat = document.getElementById('apMat').value.trim();
  const correo = document.getElementById('correo').value.trim();
  const telefono = document.getElementById('telefono').value.trim();

  // 🚫 Validaciones
  if (!matricula || !nombre || !apPat || !apMat || !correo || !telefono) {
    alert('Por favor, llena todos los campos.');
    return;
  }

  if (matricula.length > 10) {
    alert('La matrícula no debe exceder 10 caracteres.');
    return;
  }

  const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
  if (!correoValido) {
    alert('Correo no válido.');
    return;
  }

  const telefonoValido = /^[0-9]{10}$/.test(telefono);
  if (!telefonoValido) {
    alert('El teléfono debe tener exactamente 10 dígitos numéricos.');
    return;
  }

  const alumno = { matricula, nombre, apellido_paterno: apPat, apellido_materno: apMat, correo, telefono };

  try {
    const res = await fetch('http://localhost:3000/alumnos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(alumno)
    });

    if (res.ok) {
      alert('Alumno guardado correctamente.');
      cargarAlumnos();
      e.target.reset();
    } else {
      const error = await res.json();
      alert('Error al guardar: ' + (error.error || 'Verifica los datos.'));
    }
  } catch (error) {
    console.error('Error de conexión:', error);
    alert('No se pudo conectar al servidor.');
  }
});

async function cargarAlumnos() {
  try {
    const res = await fetch('http://localhost:3000/alumnos');
    const alumnos = await res.json();

    const tabla = document.getElementById('tablaAlumnos');
    tabla.innerHTML = '';
    alumnos.forEach(a => {
      tabla.innerHTML += `
        <tr>
          <td>${a.matricula}</td>
          <td>${a.nombre}</td>
          <td>${a.apellido_paterno}</td>
          <td>${a.apellido_materno}</td>
          <td>${a.correo}</td>
          <td>${a.telefono}</td>
        </tr>
      `;
    });
  } catch (error) {
    console.error('Error al cargar alumnos:', error);
  }
}
