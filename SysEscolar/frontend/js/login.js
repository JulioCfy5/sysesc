document.getElementById('loginForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const usuario = document.getElementById('usuario').value;
  const contrasena = document.getElementById('contrasena').value;

  console.log("Enviando datos:", usuario, contrasena);

  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario, contrasena })
    });

    const data = await response.json();
    console.log("Respuesta del servidor:", data);

    if (response.ok && data.acceso === true) {
      alert("Login exitoso");
      window.location.href = "menu.html";
    } else {
      alert("Usuario o contraseña incorrectos");
    }

  } catch (error) {
    console.error("Error al conectar con el backend:", error);
    alert("No se pudo conectar con el servidor");
  }
});
