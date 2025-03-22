// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation Toggle
  const hamburger = document.querySelector(".hamburger")
  const navLinks = document.querySelector(".nav-links")

  if (hamburger) {
    hamburger.addEventListener("click", function () {
      this.classList.toggle("active")
      navLinks.classList.toggle("active")
    })
  }

  // Close mobile menu when clicking on a nav link
  const navItems = document.querySelectorAll(".nav-links a")
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navLinks.classList.remove("active")
    })
  })

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        })
      }
    })
  })

  // Dark/Light Theme Toggle
  const themeToggle = document.querySelector(".theme-toggle")

  // Check for saved theme preference or use preferred color scheme
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.body.classList.add("dark")
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark")

      // Save theme preference
      if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark")
      } else {
        localStorage.setItem("theme", "light")
      }
    })
  }

  // Animate skill bars on scroll
  const skillSection = document.querySelector(".skills")
  const skillBars = document.querySelectorAll(".skill-progress")
  const languageBars = document.querySelectorAll(".language-progress")

  if (skillSection) {
    const animateSkills = () => {
      const sectionPos = skillSection.getBoundingClientRect().top
      const screenPos = window.innerHeight / 1.3

      if (sectionPos < screenPos) {
        skillBars.forEach((bar) => {
          const width = bar.style.width
          if (!width || width === "0px") {
            bar.style.width = bar.parentElement.parentElement.querySelector(".skill-percentage").textContent
          }
        })

        languageBars.forEach((bar) => {
          const width = bar.style.width
          if (!width || width === "0px") {
            bar.style.width =
              bar.parentElement.parentElement.querySelector(".language-level").dataset.percentage || "100%"
          }
        })
      }
    }

    // Initial check
    animateSkills()

    // Check on scroll
    window.addEventListener("scroll", animateSkills)
  }

  // Form submission with EmailJS
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Show loading state
      const submitBtn = contactForm.querySelector('button[type="submit"]')
      const originalBtnText = submitBtn.textContent
      submitBtn.textContent = "Sending..."
      submitBtn.disabled = true

      // Get form values
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const subject = document.getElementById("subject").value
      const message = document.getElementById("message").value

      // Prepare template parameters
      const templateParams = {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
        to_name: "Bashr Ismail", // Your name
        reply_to: email,
      }

      // Send email using EmailJS
      if (typeof emailjs !== "undefined") {
        emailjs.send("default_service", "template_id", templateParams).then(
          (response) => {
            console.log("SUCCESS!", response.status, response.text)

            // Show success message
            alert("Thank you for your message! I will get back to you soon.")

            // Reset form
            contactForm.reset()

            // Reset button
            submitBtn.textContent = originalBtnText
            submitBtn.disabled = false
          },
          (error) => {
            console.log("FAILED...", error)

            // Show error message
            alert("Oops! Something went wrong. Please try again later.")

            // Reset button
            submitBtn.textContent = originalBtnText
            submitBtn.disabled = false
          },
        )
      } else {
        console.error("EmailJS is not initialized. Make sure to include the EmailJS script in your HTML.")
        alert("Oops! Something went wrong. Please try again later.")
        submitBtn.textContent = originalBtnText
        submitBtn.disabled = false
      }
    })
  }

  // Add active class to navigation links based on scroll position
  const sections = document.querySelectorAll("section")

  function highlightNavLink() {
    const scrollPosition = window.scrollY

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelector('.nav-links a[href="#' + sectionId + '"]')?.classList.add("active")
      } else {
        document.querySelector('.nav-links a[href="#' + sectionId + '"]')?.classList.remove("active")
      }
    })
  }

  window.addEventListener("scroll", highlightNavLink)
})


