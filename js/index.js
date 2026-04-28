const WHATSAPP_NUMBER = "541123905440";

document.addEventListener("DOMContentLoaded", () => {
  marcarLinkActivo();
  prepararAnimaciones();
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
      "Hola EBM Muebles, quiero consultar por un mueble a medida.",
      nombre ? `Nombre: ${nombre}` : "",
      telefono ? `Teléfono: ${telefono}` : "",
      tipo && tipo !== "Seleccionar" ? `Tipo de mueble: ${tipo}` : "",
      zona ? `Zona: ${zona}` : "",
      mensaje ? `Mensaje: ${mensaje}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;
    window.open(url, "_blank", "noopener");
  });
}
