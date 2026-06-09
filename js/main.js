/* XFVerse — Main JS (matched to Hanzo interactions) */

document.addEventListener("DOMContentLoaded", () => {
  // ---- Scroll-triggered fade-up animations ----
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("on");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -32px 0px" }
  );

  document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));

  // ---- Nav scroll state ----
  const nav = document.querySelector("nav");
  if (nav) {
    window.addEventListener("scroll", () => {
      nav.classList.toggle("scrolled", window.scrollY > 50);
    });
  }

  // ---- Overlay Menu Toggle ----
  const menuBtn = document.querySelector(".nav-menu-btn");
  const menuOverlay = document.getElementById("menuOverlay");
  const menuPanel = menuOverlay ? menuOverlay.querySelector(".menu-panel") : null;
  const menuLinks = menuOverlay ? menuOverlay.querySelectorAll("a") : [];

  function openMenu() {
    menuOverlay.classList.add("open");
    menuBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    menuOverlay.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  if (menuBtn && menuOverlay) {
    menuBtn.addEventListener("click", openMenu);
    // Close on backdrop click
    menuOverlay.addEventListener("click", (e) => {
      if (!menuPanel.contains(e.target)) closeMenu();
    });
    // Close on menu link click
    menuLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menuOverlay.classList.contains("open")) {
        closeMenu();
      }
    });
  }

  // ---- FAQ Accordion ----
  document.querySelectorAll(".faq-q").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      const isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach((el) => {
        el.classList.remove("open");
      });
      if (!isOpen) {
        item.classList.add("open");
      }
    });
  });

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const navHeight = nav ? nav.offsetHeight : 64;
        const targetPosition =
          target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
});
