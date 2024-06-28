document.addEventListener('DOMContentLoaded', () => {
    // FAQ Section Toggle:
    // Adds a click event listener to each FAQ question. When a question is clicked,
    // it toggles the visibility of the corresponding answer with a smooth transition.
    // If the question is clicked again, it hides the answer.
    const faqQuestions = document.querySelectorAll('.faq-question');
  
    faqQuestions.forEach(question => {
      question.addEventListener('click', () => {
        question.classList.toggle('active');
        
        const answer = question.querySelector('p');
        
        if (question.classList.contains('active')) {
          answer.style.maxHeight = `${answer.scrollHeight}px`;
        } else {
          answer.style.maxHeight = '0';
        }
      });
    });
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    // Lazy Loading Images:
    // Implements lazy loading for images. Uses the IntersectionObserver API to load images
    // only when they are about to enter the viewport. This improves page load times by
    // loading images only when necessary.
    const images = document.querySelectorAll('img[data-src]');
  
    const loadImage = (image) => {
      image.src = image.dataset.src;
      image.removeAttribute('data-src');
    }
  
    const imgObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadImage(entry.target);
          observer.unobserve(entry.target);
        }
      });
    });
  
    images.forEach(img => {
      imgObserver.observe(img);
    });
  });
  


document.addEventListener('DOMContentLoaded', function() {
    // Get the elements
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    // Function to toggle the navigation menu
    function toggleNavMenu() {
        navMenu.classList.toggle('active');
    }

    // Event listener for the hamburger icon
    hamburger.addEventListener('click', function(event) {
        event.preventDefault();
        toggleNavMenu();
    });

    // Optional: Close the menu when clicking outside of it
    window.addEventListener('click', function(event) {
        if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
            navMenu.classList.remove('active');
        }
    });
});






    document.addEventListener('DOMContentLoaded', function () {
        const track = document.querySelector('.slider-track');
        const slides = Array.from(track.children);
        const nextButton = document.querySelector('.next');
        const prevButton = document.querySelector('.prev');
        let currentIndex = 0;

        function updateSlideWidth() {
            const slideWidth = slides[0].getBoundingClientRect().width;
            track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        }

        nextButton.addEventListener('click', () => {
            currentIndex++;
            if (currentIndex >= slides.length) {
                currentIndex = 0;
            }
            updateSlideWidth();
        });

        prevButton.addEventListener('click', () => {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = slides.length - 1;
            }
            updateSlideWidth();
        });

        window.addEventListener('resize', updateSlideWidth);
        updateSlideWidth();

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        slides.forEach(slide => {
            observer.observe(slide);
        });
    });



    function smoothScroll(target, duration) {
      var targetElement = document.querySelector(target);
      var targetPosition = targetElement.getBoundingClientRect().top;
      var startPosition = window.pageYOffset;
      var startTime = null;

      function animation(currentTime) {
          if (startTime === null) startTime = currentTime;
          var timeElapsed = currentTime - startTime;
          var run = ease(timeElapsed, startPosition, targetPosition, duration);
          window.scrollTo(0, run);
          if (timeElapsed < duration) requestAnimationFrame(animation);
      }

      function ease(t, b, c, d) {
          t /= d / 2;
          if (t < 1) return c / 2 * t * t + b;
          t--;
          return -c / 2 * (t * (t - 2) - 1) + b;
      }

      requestAnimationFrame(animation);
  }

  document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault(); // Prevent default anchor behavior
          var target = this.getAttribute('href');
          smoothScroll(target, 100); 
      });
  });