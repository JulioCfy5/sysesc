document.addEventListener('DOMContentLoaded', cargarAlumnos);

document.getElementById('alumnoForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const alumno = {
    matricula: document.getElementById('matricula').value,
    nombre: document.getElementById('nombre').value,
    apellido_paterno: document.getElementById('apPat').value,
    apellido_materno: document.getElementById('apMat').value,
    correo: document.getElementById('correo').value,
    telefono: document.getElementById('telefono').value
  };

  await fetch('http://localhost:3000/alumnos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(alumno)
  });

  cargarAlumnos();
  e.target.reset();
});

async function cargarAlumnos() {
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
}
