document.addEventListener('DOMContentLoaded', cargarMaterias);
document.getElementById('formMateria').addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    clave: document.getElementById('clave').value,
    nombre: document.getElementById('nombre').value
  };
  await fetch('http://localhost:3000/materias', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  cargarMaterias();
  e.target.reset();
});

async function cargarMaterias() {
  const res = await fetch('http://localhost:3000/materias');
  const datos = await res.json();
  const tabla = document.getElementById('tablaMaterias');
  tabla.innerHTML = '';
  datos.forEach(m => {
    tabla.innerHTML += `<tr><td>${m.clave}</td><td>${m.nombre}</td></tr>`;
  });
}
