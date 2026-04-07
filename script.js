const revealTargets = document.querySelectorAll(
  ".section, .feature-card, .metric-card, .mini-metric, .quote-card, .citation-box, .figure-card, .stat-card, .topbar"
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.14,
  }
);

revealTargets.forEach((target) => observer.observe(target));

const sectionLinks = [...document.querySelectorAll(".nav-links a")];
const sections = sectionLinks
  .map((link) => {
    const section = document.querySelector(link.getAttribute("href"));
    return section ? { link, section } : null;
  })
  .filter(Boolean);

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const current = sections.find((item) => item.section === entry.target);
      if (!current) {
        return;
      }

      if (entry.isIntersecting) {
        sectionLinks.forEach((link) => link.classList.remove("is-active"));
        current.link.classList.add("is-active");
      }
    });
  },
  {
    rootMargin: "-30% 0px -55% 0px",
    threshold: 0,
  }
);

sections.forEach(({ section }) => navObserver.observe(section));

document.querySelectorAll("[data-copy-target]").forEach((button) => {
  button.addEventListener("click", async () => {
    const target = document.getElementById(button.dataset.copyTarget);

    if (!target) {
      return;
    }

    try {
      await navigator.clipboard.writeText(target.innerText.trim());
      const previous = button.textContent;
      button.textContent = "Copied";
      window.setTimeout(() => {
        button.textContent = previous;
      }, 1500);
    } catch (_error) {
      button.textContent = "Copy failed";
      window.setTimeout(() => {
        button.textContent = "Copy";
      }, 1500);
    }
  });
});
