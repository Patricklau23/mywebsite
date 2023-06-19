document.addEventListener("DOMContentLoaded", function () {
    const wordElement = document.getElementById("word");
    const words = ["Fast learner.", "Software Engineer.","Programmer.","Problem-solver.","Team Player."];
  
    let index = 0;
    let isDeleting;
    let delay = 100;
  
    function display() {
      const currentWord = words[index];
      if (isDeleting) {
        wordElement.textContent = currentWord.substring(0, wordElement.textContent.length - 1);
      } else {
        wordElement.textContent = currentWord.substring(0, wordElement.textContent.length + 1);
      }
      //if the element is any one of the word from the array, delete it
      if (wordElement.textContent === currentWord) {
        isDeleting = true;
        delay = 100;
      } else if (wordElement.textContent === "") {
        isDeleting = false;
        index = (index + 1) % words.length;
        delay = 200;
      }
  
      setTimeout(display, delay);
    }

    display();
  });

  
  window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    let currentSection = '';
  
    sections.forEach(function(section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (window.pageYOffset >= sectionTop - navbar.offsetHeight && window.pageYOffset < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });
  
    const activeLink = document.querySelector('.navbar-fixed ul li a.active');
    if (activeLink) {
      activeLink.classList.remove('active');
    }
  
    const navLinks = document.querySelectorAll('.navbar-fixed ul li a');
    navLinks.forEach(function(link) {
      if (link.getAttribute('href').substring(1) === currentSection) {
        link.classList.add('active');
      }
    });
  
    navbar.classList.toggle('navbar-fixed', window.pageYOffset > 0);
  
    sections.forEach(function(section) {
      if (section.getAttribute('id') !== currentSection) {
        section.style.marginTop = navbar.offsetHeight + 'px';
        section.style.zIndex = '-1';
      } else {
        section.style.marginTop = '0';
        section.style.zIndex = '0';
      }
    });
  });
  
  
  
  
// Smooth scroll for all navigation links
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(function(link) {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetElement = document.querySelector(link.getAttribute('href'));
    targetElement.scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// skills
function toggleSkills(category) {
  var skillsElement = document.getElementById(category)
  skillsElement.classList.toggle("hidden-skills");
}

document.getElementById("contact-form").addEventListener("submit",function(){

  var nameInput = document.getElementById("Inputname").value;
  var emailInput = document.getElementById("Inputemail").value;
  var messageInput = document.getElementById("Inputmessage").value;

  // Create an object to store the form data
  var formData = {
    "name": nameInput,
    "email": emailInput,
    "message": messageInput
  };

  // Store the form data in localStorage
  localStorage.setItem("formData", JSON.stringify(formData));

  alert("Your information has been submitted successfully. Thank you for contacting me!");

  document.getElementById("contact-form").reset();
});

var storedFormData = localStorage.getItem("formData");
if (storedFormData) {
  var formData = JSON.parse(storedFormData);
  console.log(formData);
} 

//   // Send the form data to the JSON file using fetch
//   fetch("http://127.0.0.1:8080/contact.json", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(formData)
//   })
//     .then(function(response) {
//       if (response.ok) {
//         console.log("Form submitted");
//         alert("Your information has been submitted successfully. Thank you for contacting me!");
//         document.getElementById("contact-form").reset();
//       } else {
//         alert("An error occurred while submitting the form.");
//       }
//     })
//     .catch(function(error) {
//       alert("An error occurred while submitting the form.");
//       console.error(error);
//     });
// });


const galleryImages = document.querySelectorAll('.gallery-image');

// Attach click event listeners to enlarge each image
galleryImages.forEach(image => {
  image.addEventListener('click', () => {
    image.classList.toggle('enlarged');
  });
});

const sentenceElement = document.getElementById('sentence');
const sentence = "After a busy week, I find solace in nature's beauty.";
let index = 0;

function writeSentence() {
  if (index < sentence.length) {
    sentenceElement.textContent += sentence.charAt(index);
    index++;
  } else {
    clearInterval(timer);
  }
}

const sentenceElement2 = document.getElementById('sentence2');
const sentence2 = "Devoted to excellence, I channel my unwavering focus into every task, leaving no room for mediocrity.";
let index2 = 0;

function writeSentence2() {
  if (index2 < sentence2.length) {
    sentenceElement2.textContent += sentence2.charAt(index2);
    index2++;
  } else {
    clearInterval(timer2);
  }
}

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5, // Adjust the threshold value based on your requirement
};

const observer = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('hidden');
      timer = setInterval(writeSentence, 30); // Adjust the delay (in milliseconds) to control the typing speed
      observer.unobserve(entry.target);
    }
  });
}, options);

const observer2 = new IntersectionObserver(function(entries, observer2) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('hidden');
      timer2 = setInterval(writeSentence2, 30); // Adjust the delay (in milliseconds) to control the typing speed
      observer2.unobserve(entry.target);
    }
  });
}, options);

observer.observe(sentenceElement);
observer2.observe(sentenceElement2);
