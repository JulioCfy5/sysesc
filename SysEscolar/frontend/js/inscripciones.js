document.addEventListener('DOMContentLoaded', async () => {
  await cargarSelect('alumno', 'alumnos', alumno => ({
    value: alumno.id,
    label: `${alumno.nombre} ${alumno.apellido_paterno} ${alumno.apellido_materno}`
  }));

  await cargarSelect('carrera', 'carreras', carrera => ({
    value: carrera.id,
    label: carrera.nombre
  }));

  await cargarSelect('materia', 'materias', materia => ({
    value: materia.id,
    label: materia.nombre
  }));

  await cargarSelect('profesor', 'profesores', profe => ({
    value: profe.id,
    label: `${profe.nombre} ${profe.apellido_paterno}`
  }));
});

// Función reutilizable
async function cargarSelect(selectName, endpoint, formatOption) {
  try {
    const res = await fetch(`http://localhost:3000/${endpoint}`);
    const data = await res.json();
    const select = document.querySelector(`select[name="${selectName}"]`);
    select.innerHTML = `<option value="">Selecciona ${selectName}</option>`;
    data.forEach(item => {
      const option = document.createElement('option');
      const { value, label } = formatOption(item);
      option.value = value;
      option.textContent = label;
      select.appendChild(option);
    });
  } catch (error) {
    console.error(`Error cargando ${selectName}:`, error);
  }
}
