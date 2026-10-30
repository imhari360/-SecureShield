
/* ==========================================
   SECURESHIELD INSURANCE - JAVASCRIPT
========================================== */

// 1. Agency configuration
// Replace these demo details before publishing.
const AGENCY = {
  whatsapp: "919876543210", // Country code + mobile number, digits only
  phone: "+919876543210",
  email: "hello@example.com"
};

// 2. Select elements
const header = document.querySelector(".header");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const backToTop = document.getElementById("backToTop");
const quoteForm = document.getElementById("quoteForm");
const formStatus = document.getElementById("formStatus");

// 3. Mobile navigation
function closeMenu() {
  navMenu.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
}

menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );
});

navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("click", (event) => {
  if (
    !navMenu.contains(event.target) &&
    !menuToggle.contains(event.target)
  ) {
    closeMenu();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 760) {
    closeMenu();
  }
});

// 4. Header shadow and back-to-top visibility
function handleScroll() {
  const scrollPosition = window.scrollY;

  header.classList.toggle("scrolled", scrollPosition > 20);
  backToTop.classList.toggle("visible", scrollPosition > 400);
}

window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll();

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// 5. Reveal elements on scroll
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -30px 0px"
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}

// 6. Automatically update the footer year
document.getElementById("year").textContent =
  new Date().getFullYear();

// 7. Select a service from the service cards
document.querySelectorAll("[data-service]").forEach((link) => {
  link.addEventListener("click", () => {
    const service = link.dataset.service;
    const insuranceSelect = document.getElementById("insuranceType");

    insuranceSelect.value = service;
  });
});

// 8. WhatsApp helper
function openWhatsApp(message) {
  const number = AGENCY.whatsapp.replace(/\D/g, "");

  // Basic configuration check
  if (!number || number.length < 10) {
    formStatus.textContent =
      "Please configure the agency WhatsApp number in script.js.";
    return;
  }

  const url =
    "https://wa.me/" + number +
    "?text=" + encodeURIComponent(message);

  window.open(url, "_blank", "noopener,noreferrer");
}

// 9. Floating WhatsApp button
const whatsappFloat = document.getElementById("whatsappFloat");

whatsappFloat.addEventListener("click", (event) => {
  event.preventDefault();

  openWhatsApp(
    "Hello SecureShield Insurance, I would like to know more about your insurance options."
  );
});

// 10. Quote form submission
quoteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  formStatus.textContent = "";

  if (!quoteForm.checkValidity()) {
    quoteForm.reportValidity();
    return;
  }

  const fullName = document.getElementById("fullName").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const insuranceType = document.getElementById("insuranceType").value;
  const message = document.getElementById("message").value.trim();
  const consent = document.getElementById("consent").checked;

  if (!fullName || !phone || !insuranceType || !consent) {
    formStatus.textContent =
      "Please complete all required fields and give consent.";
    return;
  }

  // Validate Indian mobile number
  if (!/^[6-9]\d{9}$/.test(phone)) {
    document.getElementById("phone").setCustomValidity(
      "Enter a valid 10-digit Indian mobile number."
    );
    document.getElementById("phone").reportValidity();
    document.getElementById("phone").setCustomValidity("");
    return;
  }

  const enquiry = [
    "Hello SecureShield Insurance,",
    "",
    "I would like to make an insurance enquiry.",
    "",
    "Name: " + fullName,
    "Mobile: " + phone,
    "Email: " + (email || "Not provided"),
    "Insurance category: " + insuranceType,
    "Question: " + (message || "No additional message"),
    "",
    "Please contact me about this enquiry."
  ].join("\n");

  openWhatsApp(enquiry);
});

// 11. Active navigation link while scrolling
const sections = document.querySelectorAll(
  "main section[id], main section[id='home']"
);

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;

          document.querySelectorAll(".nav-link").forEach((link) => {
            const isActive =
              link.getAttribute("href") === "#" + sectionId;

            link.classList.toggle("active", isActive);
          });
        }
      });
    },
    {
      rootMargin: "-25% 0px -65% 0px",
      threshold: 0
    }
  );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
}
