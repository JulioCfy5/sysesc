document.addEventListener('DOMContentLoaded', () => {
  cargarMaterias();

  document.getElementById('formMateria').addEventListener('submit', async (e) => {
    e.preventDefault();

    const clave = document.getElementById('clave').value.trim();
    const nombre = document.getElementById('nombre').value.trim();

    // Validaciones básicas
    if (clave.length === 0 || nombre.length === 0) {
      alert('Por favor, llena todos los campos.');
      return;
    }
    if (clave.length > 10) {
      alert('La clave no puede exceder 10 caracteres.');
      return;
    }
    if (nombre.length > 50) {
      alert('El nombre no puede exceder 50 caracteres.');
      return;
    }

    const data = { clave, nombre };

    try {
      const res = await fetch('http://localhost:3000/materias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        alert(`Error al guardar la materia: ${error.message || res.statusText}`);
        return;
      }

      cargarMaterias();
      e.target.reset();

    } catch (error) {
      alert('Error de conexión con el servidor.');
      console.error(error);
    }
  });
});

async function cargarMaterias() {
  try {
    const res = await fetch('http://localhost:3000/materias');
    if (!res.ok) throw new Error('Error al obtener materias');
    const datos = await res.json();
    const tabla = document.getElementById('tablaMaterias');
    tabla.innerHTML = '';
    datos.forEach(m => {
      tabla.innerHTML += `<tr><td>${m.clave}</td><td>${m.nombre}</td></tr>`;
    });
  } catch (error) {
    alert('Error al cargar materias.');
    console.error(error);
  }
}
