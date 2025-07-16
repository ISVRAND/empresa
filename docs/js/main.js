const btn = document.getElementById("modo-btn");
btn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  btn.innerHTML = isDark
    ? '<i class="fas fa-moon"></i> <span>Oscuro</span>'
    : '<i class="fas fa-sun"></i> <span>Claro</span>';
});

const menuBtn = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});






// js/main.js
import { db } from "../firebase.js";  // Ajusta la ruta si tu firebase.js está en otra carpeta
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// Referencias al DOM
const form         = document.getElementById("contactForm");
const notificacion = document.getElementById("notificacion");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Recolecta valores
  const data = {
    from_name:  form.from_name.value.trim(),
    from_email: form.from_email.value.trim(),
    empresa:    form.empresa.value.trim(),
    telefono:   form.telefono.value.trim(),
    message:    form.message.value.trim(),
    fecha:      serverTimestamp()
  };

  // 1) Guarda en Firestore
  try {
    await addDoc(collection(db, "contactanos"), data);
  } catch (err) {
    console.error("Error guardando en Firestore:", err);
    notificacion.textContent = "Error guardando tus datos. Intenta de nuevo.";
    notificacion.className = "notificacion error";
    return;
  }

  // 2) Envía email via EmailJS
  try {
    await emailjs.sendForm(
      "service_mkdnqw2",
      "template_u5uuk1s",
      "#contactForm"
    );
  } catch (err) {
    console.error("Error enviando email:", err);
    notificacion.textContent = "Error enviando el correo. Intenta más tarde.";
    notificacion.className = "notificacion error";
    return;
  }

  // 3) Éxito
  notificacion.textContent = "¡Mensaje enviado correctamente!";
  notificacion.className = "notificacion exito";
  form.reset();
});
