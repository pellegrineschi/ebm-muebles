const WHATSAPP_NUMBER = "5491135916404";
const WHATSAPP_MESSAGE =
  "Hola EBM Muebles, quiero consultar por un mueble a medida.";

document.addEventListener("DOMContentLoaded", () => {
  marcarLinkActivo();
  prepararAnimaciones();
  prepararBotonesWhatsapp();
  prepararFormularioContacto();
});

function marcarLinkActivo() {
  const paginaActual = window.location.pathname.split("/").pop() || "index.html";
  const links = document.querySelectorAll(".navbar-nav .nav-link");

  links.forEach((link) => {
    const href = link.getAttribute("href");

    if (href === paginaActual) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

function prepararAnimaciones() {
  const elementos = document.querySelectorAll(
    "section, .catalogo-card, .beneficio-card, .proceso-card, .trabajos-img"
  );

  elementos.forEach((elemento) => {
    elemento.classList.add("reveal");
  });

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("reveal-visible");
          observador.unobserve(entrada.target);
        }
      });
    },
    {
      threshold: 0.12,
    }
  );

  elementos.forEach((elemento) => observador.observe(elemento));
}

function crearUrlWhatsapp(texto = WHATSAPP_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;
}

function prepararBotonesWhatsapp() {
  const botones = document.querySelectorAll("a[data-whatsapp], a.whatsapp");

  botones.forEach((boton) => {
    const mensaje = boton.dataset.whatsappMessage || WHATSAPP_MESSAGE;

    boton.href = crearUrlWhatsapp(mensaje);
    boton.target = "_blank";
    boton.rel = "noopener";
  });
}

function prepararFormularioContacto() {
  const formulario = document.querySelector(".contacto-form");

  if (!formulario) {
    return;
  }

  formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombre = document.querySelector("#nombre").value.trim();
    const telefono = document.querySelector("#telefono").value.trim();
    const tipo = document.querySelector("#tipo").value;
    const zona = document.querySelector("#zona").value.trim();
    const mensaje = document.querySelector("#mensaje").value.trim();

    const texto = [
      WHATSAPP_MESSAGE,
      nombre ? `Nombre: ${nombre}` : "",
      telefono ? `Teléfono: ${telefono}` : "",
      tipo && tipo !== "Seleccionar" ? `Tipo de mueble: ${tipo}` : "",
      zona ? `Zona: ${zona}` : "",
      mensaje ? `Mensaje: ${mensaje}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const url = crearUrlWhatsapp(texto);
    window.open(url, "_blank", "noopener");
  });
}
