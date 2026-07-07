/* ==========================================================================
   Total Gym Salta — main.js
   Vanilla JS: header sticky, menú móvil, tabs de horarios, scroll-reveal,
   botón flotante de WhatsApp. Sin dependencias.
   ========================================================================== */

(function () {
  "use strict";

  /* -----------------------------------------------------------------------
     Datos de horarios — editar acá para actualizar la grilla completa.
     ----------------------------------------------------------------------- */
  var SCHEDULE = {
    musculacion: {
      label: "Musculación",
      rows: [
        { d: "Lunes a Viernes", h: "7:00 — 22:00" },
        { d: "Sábados", h: "9:00 — 13:00" }
      ],
      cta: "Reservá tu lugar en Musculación",
      wa: "https://wa.me/5493872121954?text=Hola!%20Quiero%20reservar%20mi%20lugar%20en%20Musculaci%C3%B3n"
    },
    funcional: {
      label: "Funcional",
      rows: [
        { d: "Lun · Mié · Vie", h: "8 · 14 · 18 · 19 · 20 hs" },
        { d: "Mar · Jue", h: "8 · 9 · 14 · 18 · 19 · 20 hs" }
      ],
      cta: "Reservá tu lugar en Funcional",
      wa: "https://wa.me/5493872121954?text=Hola!%20Quiero%20reservar%20mi%20lugar%20en%20Funcional"
    },
    boxeo: {
      label: "Boxeo",
      rows: [{ d: "Lun · Mié · Vie", h: "21:00" }],
      cta: "Reservá tu lugar en Boxeo",
      wa: "https://wa.me/5493872121954?text=Hola!%20Quiero%20reservar%20mi%20lugar%20en%20Boxeo"
    },
    spinning: {
      label: "Spinning",
      rows: [{ d: "Turnos disponibles", h: "Consultá por WhatsApp" }],
      cta: "Consultá horarios de Spinning",
      wa: "https://wa.me/5493872121954?text=Hola!%20Quiero%20consultar%20los%20horarios%20de%20Spinning"
    },
    gap: {
      label: "GAP",
      rows: [{ d: "Turnos disponibles", h: "Consultá por WhatsApp" }],
      cta: "Consultá horarios de GAP",
      wa: "https://wa.me/5493872121954?text=Hola!%20Quiero%20consultar%20los%20horarios%20de%20GAP"
    },
    reformer: {
      label: "Reformer",
      rows: [
        { d: "Lunes a Viernes · mañana", h: "7:00 — 11:00" },
        { d: "Lunes a Viernes · tarde", h: "14:00 — 21:00 (turnos por hora)" }
      ],
      cta: "Reservá tu clase de reformer",
      wa: "https://wa.me/5493875040110?text=Hola!%20Quiero%20mi%20clase%20de%20prueba%20de%20Pilates%20Reformer"
    }
  };

  var TAB_ORDER = ["musculacion", "funcional", "boxeo", "spinning", "gap", "reformer"];

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ----------------------------- Header sticky --------------------------- */

  function initHeader() {
    var bg = document.getElementById("header-bg");
    if (!bg) return;

    function update() {
      bg.style.opacity = window.scrollY > 40 ? "1" : "0";
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  /* ------------------------------ Menú móvil ----------------------------- */

  function initMobileMenu() {
    var menu = document.getElementById("mobile-menu");
    var openBtn = document.getElementById("menu-open");
    var closeBtn = document.getElementById("menu-close");
    if (!menu || !openBtn || !closeBtn) return;

    function setOpen(open) {
      menu.hidden = !open;
      openBtn.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    }

    openBtn.addEventListener("click", function () { setOpen(true); });
    closeBtn.addEventListener("click", function () { setOpen(false); });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { setOpen(false); });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !menu.hidden) setOpen(false);
    });
  }

  /* --------------------------- Tabs de horarios -------------------------- */

  function initSchedule() {
    var tabsWrap = document.getElementById("schedule-tabs");
    var title = document.getElementById("schedule-title");
    var rowsWrap = document.getElementById("schedule-rows");
    var cta = document.getElementById("schedule-cta");
    if (!tabsWrap || !title || !rowsWrap || !cta) return;

    var activeKey = TAB_ORDER[0];

    function render() {
      var data = SCHEDULE[activeKey];

      tabsWrap.querySelectorAll(".tab").forEach(function (btn) {
        var on = btn.dataset.key === activeKey;
        btn.classList.toggle("is-active", on);
        btn.setAttribute("aria-pressed", String(on));
      });

      title.textContent = data.label;
      rowsWrap.innerHTML = "";
      data.rows.forEach(function (row) {
        var div = document.createElement("div");
        div.className = "schedule__row";

        var day = document.createElement("span");
        day.textContent = row.d;

        var time = document.createElement("span");
        time.className = "schedule__time";
        time.textContent = row.h;

        div.append(day, time);
        rowsWrap.appendChild(div);
      });

      cta.textContent = data.cta;
      cta.href = data.wa;
    }

    TAB_ORDER.forEach(function (key) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "tab";
      btn.dataset.key = key;
      btn.textContent = SCHEDULE[key].label;
      btn.addEventListener("click", function () {
        activeKey = key;
        render();
      });
      tabsWrap.appendChild(btn);
    });

    render();
  }

  /* ------------------------------ Scroll reveal -------------------------- */

  function initReveal() {
    var els = document.querySelectorAll("[data-reveal]");
    if (!els.length) return;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-revealed"); });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    els.forEach(function (el) { io.observe(el); });
  }

  /* ------------------------- WhatsApp flotante --------------------------- */

  function initFloatingWhatsApp() {
    var wa = document.getElementById("wa-float");
    var hero = document.getElementById("top");
    if (!wa || !hero) return;

    var pulsed = false;

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var show = !entry.isIntersecting;
          wa.classList.toggle("is-visible", show);
          if (show && !pulsed && !prefersReducedMotion) {
            pulsed = true;
            setTimeout(function () {
              wa.style.animation = "wapulse 1.3s ease";
            }, 1200);
          }
        });
      },
      { threshold: 0.2 }
    );

    io.observe(hero);
  }

  /* ------------------------------ Hero video ----------------------------- */

  function initHeroVideo() {
    var video = document.querySelector(".hero video");
    if (!video) return;

    // El atributo muted no siempre se refleja al parsear: forzarlo antes de play.
    video.muted = true;
    video.defaultMuted = true;

    var playPromise = video.play();
    if (playPromise && playPromise.catch) {
      playPromise.catch(function () { /* autoplay bloqueado: queda el poster */ });
    }
  }

  /* -------------------------------- Init --------------------------------- */

  initHeader();
  initMobileMenu();
  initSchedule();
  initReveal();
  initFloatingWhatsApp();
  initHeroVideo();
})();
