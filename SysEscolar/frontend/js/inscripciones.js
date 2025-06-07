// Array para guardar las materias agregadas antes de enviar el formulario
const materiasAgregadas = [];

document.addEventListener('DOMContentLoaded', async () => {
  await cargarSelects();

  // Agregar evento para el botón "Agregar Materia"
  document.getElementById('btn-agregar-materia').addEventListener('click', agregarMateria);

  // Enviar formulario
  document.getElementById('form-inscripciones').addEventListener('submit', enviarFormulario);
});

async function cargarSelects() {
  try {
    // Cargar Alumnos
    const resAlumnos = await fetch('http://localhost:3000/alumnos');
    const alumnos = await resAlumnos.json();
    const selectAlumnos = document.querySelector('select[name="alumno"]');
    alumnos.forEach(a => {
      const option = document.createElement('option');
      option.value = a.matricula;
      option.textContent = `${a.nombre} ${a.apellido_paterno} ${a.apellido_materno}`;
      selectAlumnos.appendChild(option);
    });

    // Cargar Carreras
    const resCarreras = await fetch('http://localhost:3000/carreras');
    const carreras = await resCarreras.json();
    const selectCarreras = document.querySelector('select[name="carrera"]');
    carreras.forEach(c => {
      const option = document.createElement('option');
      option.value = c.id; // O el campo que corresponda
      option.textContent = c.nombre;
      selectCarreras.appendChild(option);
    });

    // Cargar Materias
    const resMaterias = await fetch('http://localhost:3000/materias');
    const materias = await resMaterias.json();
    const selectMaterias = document.querySelector('select[name="materia"]');
    materias.forEach(m => {
      const option = document.createElement('option');
      option.value = m.clave;
      option.textContent = m.nombre;
      selectMaterias.appendChild(option);
    });

    // Cargar Profesores
    const resProfesores = await fetch('http://localhost:3000/profesores');
    const profesores = await resProfesores.json();
    const selectProfesores = document.querySelector('select[name="profesor"]');
    profesores.forEach(p => {
      const option = document.createElement('option');
      option.value = p.id; // O el campo identificador
      option.textContent = `${p.nombre} ${p.apellido_paterno}`;
      selectProfesores.appendChild(option);
    });
  } catch (error) {
    alert('Error cargando datos para selects: ' + error.message);
  }
}

function agregarMateria() {
  const materia = document.querySelector('select[name="materia"]').value;
  const profesor = document.querySelector('select[name="profesor"]').value;
  const hora = document.querySelector('input[name="hora"]').value.trim();
  const aula = document.querySelector('input[name="aula"]').value.trim();

  if (!materia || !profesor || !hora || !aula) {
    alert('Todos los campos para agregar materia son obligatorios.');
    return;
  }

  // Evitar duplicados (opcional)
  if (materiasAgregadas.some(m => m.materia === materia && m.profesor === profesor && m.hora === hora)) {
    alert('Esta materia ya fue agregada con el mismo profesor y horario.');
    return;
  }

  materiasAgregadas.push({ materia, profesor, hora, aula });

  // Actualizar tabla visual
  const tabla = document.getElementById('tabla-materias');
  const fila = document.createElement('tr');

  // Mostrar texto legible en la tabla (opcional: usar nombres en vez de IDs)
  const textoMateria = document.querySelector(`select[name="materia"] option[value="${materia}"]`).textContent;
  const textoProfesor = document.querySelector(`select[name="profesor"] option[value="${profesor}"]`).textContent;

  fila.innerHTML = `
    <td>${textoMateria}</td>
    <td>${textoProfesor}</td>
    <td>${hora}</td>
    <td>${aula}</td>
  `;

  tabla.appendChild(fila);

  // Limpiar campos para nueva materia
  document.querySelector('select[name="materia"]').value = '';
  document.querySelector('select[name="profesor"]').value = '';
  document.querySelector('input[name="hora"]').value = '';
  document.querySelector('input[name="aula"]').value = '';
}

async function enviarFormulario(e) {
  e.preventDefault();

  const alumno = document.querySelector('select[name="alumno"]').value;
  const carrera = document.querySelector('select[name="carrera"]').value;
  const semestre = document.querySelector('input[name="semestre"]').value.trim();
  const turno = document.querySelector('input[name="turno"]').value.trim();
  const tipo = document.querySelector('select[name="tipo"]').value;

  if (!alumno || !carrera || !tipo || materiasAgregadas.length === 0) {
    alert('Completa todos los campos obligatorios y agrega al menos una materia.');
    return;
  }

  const datosInscripcion = {
    alumno,
    carrera,
    semestre,
    turno,
    tipo,
    materias: materiasAgregadas
  };

  try {
    const res = await fetch('http://localhost:3000/inscripciones', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datosInscripcion)
    });

    if (res.ok) {
      alert('Inscripción guardada correctamente.');
      materiasAgregadas.length = 0; // limpia arreglo
      document.getElementById('tabla-materias').innerHTML = '';
      e.target.reset();
    } else {
      alert('Error al guardar la inscripción.');
    }
  } catch (error) {
    alert('Error al conectar con el servidor: ' + error.message);
  }
}
