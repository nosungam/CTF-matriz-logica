const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Habilitar CORS
app.use(cors());

// Ruta de prueba
app.get("/", (req, res) => {
  const routes = ["/", "/resultado/:password"];

  res.json({ GET: routes, POST: ["/combinacion/:expresion"] });
});

// Endpoint de combinación
app.post("/combinacion/:combinacion", (req, res) => {
  const caracteres =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
  let resultado = "";
  for (let i = 0; i < 300; i++) {
    resultado += caracteres.charAt(
      Math.floor(Math.random() * caracteres.length)
    );
  }
  res.send({
    data: resultado,
    status: 200,
    message: "Combinación generada exitosamente",
  });
});

// Endpoint de resultado
app.get("/resultado/:string", (req, res) => {
  const passwordCorrecta = "00000100";
  const stringRecibido = req.params.string;

  if (stringRecibido !== passwordCorrecta) {
    return res.status(401).json({
      message: "No has encontrado la contraseña",
    });
  }

  res.status(200).json({
    message: "CNEISI{10110011}",
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
