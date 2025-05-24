// Show welcome message when the page loads
document.addEventListener('DOMContentLoaded', () => {
  console.log("🎓 Welcome to D Y PATIL College Dashboard!");
  alert("Welcome to D Y PATIL College Portal! 🚀");

  // Add animation to the hero section
  const hero = document.querySelector('.hero');
  hero.style.opacity = 0;
  hero.style.transform = 'translateY(30px)';
  setTimeout(() => {
    hero.style.transition = 'all 0.8s ease';
    hero.style.opacity = 1;
    hero.style.transform = 'translateY(0)';
  }, 200);

  // Add smooth scroll to buttons (optional if registration/login are anchors on same page)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Optional: Change header background on scroll
  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
      header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    } else {
      header.style.boxShadow = 'none';
    }
  });
});
