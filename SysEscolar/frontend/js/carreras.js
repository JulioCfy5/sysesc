document.addEventListener('DOMContentLoaded', cargarCarreras);
document.getElementById('formCarrera').addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    clave: document.getElementById('clave').value,
    nombre: document.getElementById('nombre').value
  };
  await fetch('http://localhost:3000/carreras', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  cargarCarreras();
  e.target.reset();
});

async function cargarCarreras() {
  const res = await fetch('http://localhost:3000/carreras');
  const datos = await res.json();
  const tabla = document.getElementById('tablaCarreras');
  tabla.innerHTML = '';
  datos.forEach(c => {
    tabla.innerHTML += `<tr><td>${c.clave}</td><td>${c.nombre}</td></tr>`;
  });
}
