/* =========================================================
   CodeCraft Portfolio – script.js
   Dynamic Features, Micro-Interactions, and Modern UX
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* ---------- 1. Dynamic Skills Data & Filtering ---------- */
  const skillsData = [
    { name: "React.js", category: "frontend", level: 92, icon: "⚛", bg: "rgba(97, 218, 251, 0.15)", color: "#61dafb", tag: "Frontend Framework" },
    { name: "Next.js", category: "frontend", level: 86, icon: "▲", bg: "rgba(255, 255, 255, 0.15)", color: "#ffffff", tag: "Full-Stack React" },
    { name: "TypeScript", category: "frontend", level: 88, icon: "TS", bg: "rgba(49, 120, 198, 0.2)", color: "#3178c6", tag: "Type-Safe Dev" },
    { name: "JavaScript (ES6+)", category: "frontend", level: 94, icon: "JS", bg: "rgba(247, 223, 30, 0.2)", color: "#f7df1e", tag: "Core Web" },
    { name: "HTML5 & CSS3", category: "frontend", level: 98, icon: "HTML", bg: "rgba(228, 77, 38, 0.2)", color: "#e44d26", tag: "Semantic & Responsive" },
    { name: "Tailwind CSS", category: "frontend", level: 94, icon: "≈", bg: "rgba(56, 189, 248, 0.2)", color: "#38bdf8", tag: "Modern Styling" },

    { name: "Node.js & Express", category: "backend", level: 84, icon: "⬢", bg: "rgba(34, 197, 94, 0.2)", color: "#22c55e", tag: "Runtime & APIs" },
    { name: "RESTful APIs", category: "backend", level: 90, icon: "⚡", bg: "rgba(168, 85, 247, 0.2)", color: "#c084fc", tag: "API Architecture" },
    { name: "Python", category: "backend", level: 80, icon: "PY", bg: "rgba(59, 130, 246, 0.2)", color: "#3b82f6", tag: "Scripting & Backend" },

    { name: "Offline AI & LLMs", category: "tools", level: 88, icon: "🤖", bg: "rgba(236, 72, 153, 0.2)", color: "#f472b6", tag: "Edge AI / Studio" },
    { name: "Hardware & IoT", category: "tools", level: 85, icon: "⚙", bg: "rgba(245, 158, 11, 0.2)", color: "#fbbf24", tag: "Embedded Systems" },
    { name: "Git & GitHub", category: "tools", level: 90, icon: "◆", bg: "rgba(240, 80, 50, 0.2)", color: "#f05032", tag: "Version Control" }
  ];

  const skGrid = document.getElementById("sk");

  function renderSkills(filter = "all") {
    if (!skGrid) return;
    const filtered = filter === "all" ? skillsData : skillsData.filter((s) => s.category === filter);

    skGrid.innerHTML = filtered
      .map(
        ({ name, level, icon, bg, color, tag }) => `
      <div class="sk-card" data-category="${tag}">
        <div class="sk-card-top">
          <div class="sk-icon-box" style="background: ${bg}; color: ${color};">${icon}</div>
          <div class="sk-meta">
            <strong>${name}</strong>
            <small>${tag}</small>
          </div>
          <span class="sk-level-pct">${level}%</span>
        </div>
        <div class="sk-track">
          <div class="sk-bar" data-level="${level}" style="width: ${level}%;"></div>
        </div>
      </div>`
      )
      .join("");
  }

  renderSkills();

  // Skill filter button events
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const category = btn.dataset.filter;
      renderSkills(category);
    });
  });

  /* ---------- 2. Typewriter Effect in Hero ---------- */
  const typedEl = document.getElementById("typedText");
  if (typedEl) {
    const phrases = [
      "exceptional web applications",
      "offline AI companions",
      "interactive digital experiences",
      "IoT & hardware integrations",
      "modern, scalable software"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 75;

    function typeLoop() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typedEl.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 35;
      } else {
        typedEl.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 80;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 1800; // Pause when phrase is complete
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 450;
      }

      setTimeout(typeLoop, typingSpeed);
    }

    typeLoop();
  }

  /* ---------- 3. Interactive Mouse Spotlight Glow ---------- */
  const spotlight = document.getElementById("spotlight");
  if (spotlight && window.matchMedia("(pointer: fine)").matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, { passive: true });

    function animateSpotlight() {
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;
      spotlight.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateSpotlight);
    }
    animateSpotlight();
  }

  /* ---------- 4. Scroll Progress & Navbar Elevation ---------- */
  const scrollProgressBar = document.getElementById("scrollProgress");
  const header = document.getElementById("mainHeader");
  const backToTopBtn = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolledPct = height > 0 ? (winScroll / height) * 100 : 0;

    if (scrollProgressBar) {
      scrollProgressBar.style.width = scrolledPct + "%";
    }

    if (header) {
      header.classList.toggle("scrolled", winScroll > 40);
    }

    if (backToTopBtn) {
      backToTopBtn.classList.toggle("show", winScroll > 380);
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- 5. Mobile Navigation Drawer ---------- */
  const burger = document.getElementById("burger");
  const links = document.getElementById("links");

  if (burger && links) {
    burger.addEventListener("click", () => {
      const isOpen = links.classList.toggle("open");
      burger.classList.toggle("open", isOpen);
      burger.setAttribute("aria-expanded", isOpen);
    });

    links.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        links.classList.remove("open");
        burger.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", (e) => {
      if (!links.contains(e.target) && !burger.contains(e.target) && links.classList.contains("open")) {
        links.classList.remove("open");
        burger.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- 6. Active Nav Link on Scroll Spy ---------- */
  const navSections = [...document.querySelectorAll("section[id]")];
  const navLinks = [...document.querySelectorAll(".links a")];

  window.addEventListener("scroll", () => {
    let currentId = "home";
    const scrollPos = window.scrollY + 160;

    navSections.forEach((sec) => {
      if (scrollPos >= sec.offsetTop) {
        currentId = sec.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === "#" + currentId);
    });
  }, { passive: true });

  /* ---------- 7. Stats Counter Animation & Scroll Reveal ---------- */
  function countUp(el) {
    const target = Number(el.dataset.n) || 0;
    const suffix = el.dataset.s || "";
    let current = 0;
    const duration = 1200;
    const startTime = performance.now();

    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      current = Math.floor(ease * target);
      el.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
      }
    }
    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      el.classList.add("in");

      el.querySelectorAll("[data-n]").forEach(countUp);
      observer.unobserve(el);
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  /* ---------- 8. Toast Notification Helper ---------- */
  const toast = document.getElementById("toast");
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 3200);
  }

  /* ---------- 9. One-Click Copy Email Feature ---------- */
  const copyEmailBtn = document.getElementById("copyEmailBtn");
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", () => {
      const email = "gaganbosel5@gmail.com";
      navigator.clipboard.writeText(email).then(() => {
        const copyLabel = copyEmailBtn.querySelector(".copy-label");
        if (copyLabel) copyLabel.textContent = "Copied! ✓";
        showToast("Email copied to clipboard: " + email);

        setTimeout(() => {
          if (copyLabel) copyLabel.textContent = "Copy";
        }, 2500);
      }).catch(() => {
        showToast("Could not copy automatically. Email: " + email);
      });
    });
  }

  /* ---------- 10. Interactive Contact Form Handler ---------- */
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const subject = document.getElementById("subject").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        if (formStatus) {
          formStatus.className = "form-status error";
          formStatus.textContent = "Please fill out all required fields.";
        }
        return;
      }

      // Open email client with pre-filled message
      const mailtoUrl = `mailto:gaganbosel5@gmail.com?subject=${encodeURIComponent(subject || "Portfolio Inquiry")}&body=${encodeURIComponent(
        `Hi Gagan,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      )}`;

      window.open(mailtoUrl, "_blank");

      if (formStatus) {
        formStatus.className = "form-status success";
        formStatus.textContent = "Email client opened! Thank you for reaching out.";
      }
      showToast("Thank you " + name + "! Opening your mail client...");
      contactForm.reset();

      setTimeout(() => {
        if (formStatus) formStatus.textContent = "";
      }, 5000);
    });
  }

  /* ---------- 11. Resume / CV Modal Triggers ---------- */
  const cvModal = document.getElementById("cvModal");
  const closeCvModal = document.getElementById("closeCvModal");
  const cvTriggers = document.querySelectorAll(".cv-trigger");

  function openModal() {
    if (cvModal) {
      cvModal.classList.add("open");
      cvModal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
  }

  function closeModal() {
    if (cvModal) {
      cvModal.classList.remove("open");
      cvModal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
  }

  cvTriggers.forEach((btn) => btn.addEventListener("click", openModal));
  if (closeCvModal) closeCvModal.addEventListener("click", closeModal);

  if (cvModal) {
    cvModal.addEventListener("click", (e) => {
      if (e.target === cvModal) closeModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && cvModal && cvModal.classList.contains("open")) {
      closeModal();
    }
  });

  /* ---------- 12. Project Carousel Pager (Mobile) ---------- */
  const track = document.getElementById("track");
  const dots = [...document.querySelectorAll("#pager button")];

  function setActiveDot(index) {
    dots.forEach((dot, i) => dot.classList.toggle("on", i === index));
  }

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      if (!track || !track.children[i]) return;
      const card = track.children[i];
      track.scrollTo({ left: card.offsetLeft - track.offsetLeft - 16, behavior: "smooth" });
      setActiveDot(i);
    });
  });

  if (track) {
    track.addEventListener("scroll", () => {
      if (!track.children[0]) return;
      const cardWidth = track.children[0].offsetWidth + 16;
      setActiveDot(Math.min(dots.length - 1, Math.round(track.scrollLeft / cardWidth)));
    }, { passive: true });
  }
});