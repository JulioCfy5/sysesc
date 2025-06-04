let materiasSeleccionadas = [];

document.addEventListener('DOMContentLoaded', async () => {
  await cargarSelects();

  document.getElementById('btnAgregarMateria').addEventListener('click', agregarMateria);
  document.getElementById('formInscripcion').addEventListener('submit', guardarInscripcion);
});

async function cargarSelects() {
  await cargarOpciones('alumnos', 'alumnoSelect', 'matricula', 'nombre');
  await cargarOpciones('carreras', 'carreraSelect', 'clave', 'nombre');
  await cargarOpciones('materias', 'materiaSelect', 'clave', 'nombre');
  await cargarOpciones('profesores', 'profesorSelect', 'matricula', 'nombre');
}

async function cargarOpciones(endpoint, selectId, valueField, textField) {
  const res = await fetch(`http://localhost:3000/${endpoint}`);
  const data = await res.json();
  const select = document.getElementById(selectId);
  select.innerHTML = '';
  data.forEach(item => {
    const option = document.createElement('option');
    option.value = item[valueField];
    option.textContent = `${item[valueField]} - ${item[textField]}`;
    select.appendChild(option);
  });
}

function agregarMateria() {
  const materia = document.getElementById('materiaSelect').value;
  const materiaText = document.getElementById('materiaSelect').selectedOptions[0].textContent;
  const profesor = document.getElementById('profesorSelect').value;
  const profesorText = document.getElementById('profesorSelect').selectedOptions[0].textContent;
  const hora = document.getElementById('hora').value;
  const aula = document.getElementById('aula').value;

  if (!materia || !profesor || !hora || !aula) return alert('Llena todos los campos de materia');

  materiasSeleccionadas.push({ materia, profesor, hora, aula });

  const fila = `<tr>
    <td>${materiaText}</td>
    <td>${profesorText}</td>
    <td>${hora}</td>
    <td>${aula}</td>
  </tr>`;
  document.getElementById('tablaMateriasAgregadas').innerHTML += fila;

  document.getElementById('hora').value = '';
  document.getElementById('aula').value = '';
}

async function guardarInscripcion(e) {
  e.preventDefault();

  const inscripcion = {
    alumno: document.getElementById('alumnoSelect').value,
    carrera: document.getElementById('carreraSelect').value,
    semestre: document.getElementById('semestre').value,
    turno: document.getElementById('turno').value,
    tipo: document.getElementById('tipo').value,
    materias: materiasSeleccionadas
  };

  const res = await fetch('http://localhost:3000/inscripciones', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inscripcion)
  });

  if (res.ok) {
    alert('Inscripción guardada');
    document.getElementById('formInscripcion').reset();
    document.getElementById('tablaMateriasAgregadas').innerHTML = '';
    materiasSeleccionadas = [];
  } else {
    alert('Error al guardar');
  }
}
