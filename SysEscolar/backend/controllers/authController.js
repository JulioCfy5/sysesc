exports.login = (req, res) => {
  const { usuario, password } = req.body;
  if (usuario === 'admin' && password === 'admin') {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
};
