exports.login = (req, res) => {
  const { usuario, contrasena } = req.body;

  // Validación directa de usuario/contraseña fijos
  if (usuario === "admin" && contrasena === "admin") {
    return res.status(200).json({ acceso: true });
  } else {
    return res.status(401).json({ acceso: false, mensaje: "Usuario o contraseña incorrectos" });
  }
};
