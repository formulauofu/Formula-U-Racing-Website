const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const menu = document.querySelector("[data-menu]");
const menuLinks = menu ? menu.querySelectorAll("a") : [];

function setHeaderState() {
  if (header) header.classList.toggle("is-scrolled", window.scrollY > 16);
}

function closeMenu() {
  if (!menu || !menuToggle) return;
  menu.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menu?.classList.toggle("is-open", !isOpen);
  document.body.style.overflow = isOpen ? "" : "hidden";
});

menuLinks.forEach((link) => link.addEventListener("click", closeMenu));
window.addEventListener("resize", () => {
  if (window.innerWidth > 760) closeMenu();
});

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = new Date().getFullYear();
});
