document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-alumnos');
  const tabla = document.getElementById('tabla-alumnos');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const matricula = document.querySelector('[name="matricula"]').value.trim();
    const nombre = document.querySelector('[name="nombre"]').value.trim();
    const apellido_paterno = document.querySelector('[name="apellido_paterno"]').value.trim();
    const apellido_materno = document.querySelector('[name="apellido_materno"]').value.trim();
    const correo = document.querySelector('[name="correo"]').value.trim();
    const telefono = document.querySelector('[name="telefono"]').value.trim();

    // Validaciones básicas
    if (matricula.length < 4 || matricula.length > 10) {
      alert('La matrícula debe tener entre 4 y 10 caracteres.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(correo)) {
      alert('Correo inválido.');
      return;
    }
    if (!/^\d{10}$/.test(telefono)) {
      alert('El teléfono debe tener 10 dígitos.');
      return;
    }

    const alumno = { matricula, nombre, apellido_paterno, apellido_materno, correo, telefono };

    try {
      const res = await fetch('http://localhost:3000/alumnos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alumno)
      });

      if (!res.ok) throw new Error('Error al guardar alumno');

      form.reset();
      cargarAlumnos();
    } catch (err) {
      console.error('Error:', err);
      alert('Hubo un error al guardar el alumno.');
    }
  });

  async function cargarAlumnos() {
    try {
      const res = await fetch('http://localhost:3000/alumnos');
      if (!res.ok) throw new Error('No se pudo obtener alumnos');

      const alumnos = await res.json();
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
    } catch (err) {
      console.error('Error al cargar alumnos:', err);
      tabla.innerHTML = '<tr><td colspan="6">Error al cargar alumnos</td></tr>';
    }
  }

  cargarAlumnos(); // Carga inicial
});
