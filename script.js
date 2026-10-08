/* =========================================================
   CodeCraft Portfolio – script.js
   1. Skills   2. Scroll animations   3. Mobile menu
   4. Active nav link   5. Project pager   6. CV button
   ========================================================= */

/* ---------- 1. Skills (rendered from data) ---------- */
const skills = [
  { name: "HTML",         level: 95, icon: "5",  cls: "html" },
  { name: "React.js",     level: 85, icon: "⚛", cls: "react plain" },
  { name: "Node.js",      level: 80, icon: "⬢", cls: "node plain" },
  { name: "CSS",          level: 90, icon: "3",  cls: "css" },
  { name: "Next.js",      level: 80, icon: "N",  cls: "next plain" },
  { name: "Tailwind CSS", level: 90, icon: "~",  cls: "tailwind plain" },
  { name: "JavaScript",   level: 90, icon: "JS", cls: "js" },
  { name: "TypeScript",   level: 85, icon: "TS", cls: "ts" },
  { name: "Git",          level: 85, icon: "◆", cls: "git plain" }
];

document.getElementById("sk").innerHTML = skills
  .map(({ name, level, icon, cls }) => `
    <div class="sk">
      <div class="row">
        <span class="ti ${cls}">${icon}</span>
        <span>${name}</span>
        <span class="pct">${level}%</span>
      </div>
      <div class="bar-track"><i data-w="${level}"></i></div>
    </div>`)
  .join("");

/* ---------- 2. Scroll animations ---------- */
function countUp(el) {
  const target = Number(el.dataset.n);
  const suffix = el.dataset.s;
  let current = 0;

  const step = () => {
    current = Math.min(target, current + Math.ceil(target / 30));
    el.textContent = current + suffix;
    if (current < target) requestAnimationFrame(step);
  };
  step();
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    const el = entry.target;
    el.classList.add("in");
    el.querySelectorAll("[data-w]").forEach((bar) => (bar.style.width = bar.dataset.w + "%"));
    el.querySelectorAll("[data-n]").forEach(countUp);
    observer.unobserve(el);
  });
}, { threshold: 0.25 });

document.querySelectorAll(".reveal, .skills .wrap").forEach((el) => observer.observe(el));

/* ---------- 3. Mobile menu ---------- */
const burger = document.getElementById("burger");
const links = document.getElementById("links");

burger.addEventListener("click", () => {
  const isOpen = links.classList.toggle("open");
  burger.setAttribute("aria-expanded", isOpen);
});

links.addEventListener("click", () => links.classList.remove("open"));

/* ---------- 4. Active nav link while scrolling ---------- */
const sections = [...document.querySelectorAll("section[id], footer[id]")];
const navLinks = [...links.querySelectorAll("a")];

window.addEventListener("scroll", () => {
  let current = sections[0].id;

  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 140) current = section.id;
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + current);
  });
}, { passive: true });

/* ---------- 5. Project pager ---------- */
const track = document.getElementById("track");
const dots = [...document.querySelectorAll("#pager button")];

function setActiveDot(index) {
  dots.forEach((dot, i) => dot.classList.toggle("on", i === index));
}

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    const card = track.children[i];
    const isScrollable = track.scrollWidth > track.clientWidth;

    if (isScrollable) {
      track.scrollTo({ left: card.offsetLeft - track.offsetLeft - 16, behavior: "smooth" });
    }
    setActiveDot(i);
  });
});

track.addEventListener("scroll", () => {
  const cardWidth = track.children[0].offsetWidth + 16;
  setActiveDot(Math.round(track.scrollLeft / cardWidth));
}, { passive: true });

/* ---------- 6. Download CV button ---------- */
document.getElementById("cv").addEventListener("click", (e) => {
  e.preventDefault();
  alert('Add your CV file here: <a href="cv.pdf" download>');
});