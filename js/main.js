// Rangeway Mojave. Minimal site JS.
(function () {
  // Footer year
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Sticky nav state
  var wrap = document.querySelector(".nav-wrap");
  if (wrap) {
    var onScroll = function () {
      if (window.scrollY > 40) {
        wrap.classList.add("is-scrolled");
      } else {
        wrap.classList.remove("is-scrolled");
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Mobile menu toggle
  var toggle = document.querySelector("[data-toggle]");
  var mobile = document.querySelector("[data-mobile]");
  if (toggle && mobile) {
    var setOpen = function (open) {
      mobile.hidden = !open;
      toggle.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    };

    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      setOpen(mobile.hidden);
    });

    document.addEventListener("click", function (e) {
      if (mobile.hidden) return;
      if (!mobile.contains(e.target) && !toggle.contains(e.target)) {
        setOpen(false);
      }
    });

    mobile.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { setOpen(false); });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !mobile.hidden) setOpen(false);
    });
  }

  // Reveal-on-scroll
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
})();
