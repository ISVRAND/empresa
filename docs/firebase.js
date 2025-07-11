import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBm_p8KC4OTse3tILvvfByJzXhndXALG_4",
  authDomain: "isvrand-7993b.firebaseapp.com",
  projectId: "isvrand-7993b",
  storageBucket: "isvrand-7993b.appspot.com",
  messagingSenderId: "795251884254",
  appId: "1:795251884254:web:5b4b74c58ae71a01cc824f",
  measurementId: "G-QDYWV2PQSW",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.db = db;
window.collection = collection;
window.addDoc = addDoc;
window.serverTimestamp = serverTimestamp;

function mostrarNotificacion(mensaje, tipo = "error") {
    const notificacion = document.getElementById("notificacion");
    notificacion.textContent = mensaje;
    notificacion.style.backgroundColor = tipo === "error" ? "#5A2A83" : "#28a745";
    notificacion.classList.add("mostrar");

    clearTimeout(window.notificacionTimeout);
    window.notificacionTimeout = setTimeout(() => {
        notificacion.classList.remove("mostrar");
    }, 3000);
}


document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Limpiar errores previos
  ["nombre", "email", "empresa", "telefono", "mensaje"].forEach((id) => {
    document.getElementById(`error-${id}`).textContent = "";
  });

  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const empresa = document.getElementById("empresa").value.trim();
  const telefonoInput = document.getElementById("telefono").value.trim();
  const telefono = `+569${telefonoInput}`;
  const mensaje = document.getElementById("mensaje").value.trim();

  const telefonoRegex = /^\+569\d{8}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let valido = true;

  if (!nombre) {
    document.getElementById("error-nombre").textContent = "Por favor ingresa tu nombre.";
    mostrarNotificacion("Por favor ingresa tu nombre.", "error");
    valido = false;
  }

  if (!email) {
    document.getElementById("error-email").textContent = "Por favor ingresa tu correo.";
    mostrarNotificacion("Por favor ingresa tu correo.", "error");
    valido = false;
  } else if (!emailRegex.test(email)) {
    document.getElementById("error-email").textContent = "El correo ingresado no es válido.";
    mostrarNotificacion("El correo ingresado no es válido.", "error");
    valido = false;
  }

  if (!empresa) {
    document.getElementById("error-empresa").textContent = "Por favor ingresa el nombre de tu empresa.";
    mostrarNotificacion("Por favor ingresa el nombre de tu empresa.", "error");
    valido = false;
  }

  if (!telefonoInput) {
    document.getElementById("error-telefono").textContent = "Por favor ingresa tu teléfono.";
    mostrarNotificacion("Por favor ingresa tu teléfono.", "error");
    valido = false;
  } else if (!telefonoRegex.test(telefono)) {
    document.getElementById("error-telefono").textContent = "El teléfono debe tener el formato +569XXXXXXXX.";
    mostrarNotificacion("El teléfono debe tener el formato +569XXXXXXXX.", "error");
    valido = false;
  }

  if (!mensaje) {
    document.getElementById("error-mensaje").textContent = "Por favor ingresa tu mensaje.";
    mostrarNotificacion("Por favor ingresa tu mensaje.", "error");
    valido = false;
  }

  if (!valido) return;

  try {
    await addDoc(collection(db, "mensajes"), {
      nombre,
      email,
      empresa,
      telefono,
      mensaje,
      fecha: serverTimestamp(),
    });

    mostrarNotificacion("✅ ¡Mensaje enviado correctamente!", "success");

    document.getElementById("contactForm").reset();
  } catch (error) {
    mostrarNotificacion("❌ Error al enviar el mensaje, inténtalo de nuevo.", "error");
    console.error(error);
  }
});
