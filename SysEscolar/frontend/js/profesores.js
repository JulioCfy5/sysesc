document.addEventListener('DOMContentLoaded', cargarProfesores);
document.getElementById('formProfesor').addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    matricula: document.getElementById('matricula').value,
    nombre: document.getElementById('nombre').value,
    apellido_paterno: document.getElementById('apPat').value,
    apellido_materno: document.getElementById('apMat').value,
    correo: document.getElementById('correo').value,
    telefono: document.getElementById('telefono').value
  };
  await fetch('http://localhost:3000/profesores', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  cargarProfesores();
  e.target.reset();
});

async function cargarProfesores() {
  const res = await fetch('http://localhost:3000/profesores');
  const datos = await res.json();
  const tabla = document.getElementById('tablaProfesores');
  tabla.innerHTML = '';
  datos.forEach(p => {
    tabla.innerHTML += `<tr>
      <td>${p.matricula}</td><td>${p.nombre}</td><td>${p.apellido_paterno}</td>
      <td>${p.apellido_materno}</td><td>${p.correo}</td><td>${p.telefono}</td>
    </tr>`;
  });
}
