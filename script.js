// Array of your projects
const projects = [
    {
        title: "Portfolio Website",
        description: "A personal website to showcase my work and skills.",
        link: "#",
        image: "portfolio.png" 
    },
    {
        title: "Resume Maker App",
        description: "A user-friendly web app that allows users to create professional resumes instantly with customizable templates and easy input forms.",
        link: "https://resume-screening-five.vercel.app/",
        image: "resume-maker.png"
    },
    {
        title: "Zomato Clone",
        description: "A static Zomato clone website built using HTML and CSS, mimicking the original UI design.",
        link: "https://zomato-clone-murex-three.vercel.app/",
        image: "zomato-clone.png"
    },
    {
        title: "SoftSell Marketing Website",
        description: "A responsive single-page website for 'SoftSell', built with Tailwind CSS and featuring a modern UI, interactivity, and a mock AI chatbot.",
        link: "https://soft-sell-three.vercel.app/",
        image: "softsell.png"
    }
];
const projectList = document.querySelector('.project-list');

projects.forEach(project => {
    const card = document.createElement('div');
    card.innerHTML = `
        <img src="${project.image}" alt="${project.title}" style="width:100%;border-radius:8px 8px 0 0;">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <a href="${project.link}" target="_blank" style="color:#ff00cc;text-decoration:none;font-weight:bold;">View Project</a>
    `;
    card.setAttribute('data-aos', 'zoom-in');
    projectList.appendChild(card);
});

document.querySelector('form').addEventListener('submit', function(e) {
    alert('Thank you for your message! I will be back to you very soon :)');
});

// Reveal sections on scroll
const sections = document.querySelectorAll('section');
function revealSections() {
    const triggerBottom = window.innerHeight * 0.85;
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if(sectionTop < triggerBottom) {
            section.classList.add('visible');
        }
    });
}
window.addEventListener('scroll', revealSections);
window.addEventListener('load', revealSections);

window.addEventListener('scroll', function() {
    const footer = document.querySelector('footer');
    const resumeBtn = document.getElementById('resumeBtn');
    const footerRect = footer.getBoundingClientRect();
    // Hide the button if the bottom of the button would overlap the footer
    if (footerRect.top < window.innerHeight - 40) {
        resumeBtn.style.opacity = '0';
        resumeBtn.style.pointerEvents = 'none';
    } else {
        resumeBtn.style.opacity = '1';
        resumeBtn.style.pointerEvents = 'auto';
    }
});
window.addEventListener('mousemove', function(e) {
    // Create multiple sparkles for a richer effect
    [1, 0.7, 0.4].forEach(function(i) {
        const x = (1 - i) * 24;
        const star = document.createElement('div');
        star.className = 'star';
        star.style.top = (e.clientY + Math.round(Math.random() * x - x / 2)) + 'px';
        star.style.left = (e.clientX + Math.round(Math.random() * x - x / 2)) + 'px';
        document.body.appendChild(star);
        setTimeout(function() {
            document.body.removeChild(star);
        }, Math.round(Math.random() * i * 500 + 300));
    });
});
// Animate skill bars when the skills section is visible
function animateSkills() {
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    skillProgressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = progress;
    });
}

// Use Intersection Observer to trigger animation when skills section is in view
const skillsSection = document.getElementById('skills');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
            observer.unobserve(skillsSection); // Animate only once
        }
    });
}, { threshold: 0.5 });

observer.observe(skillsSection);
// Unlock overlay logic
document.getElementById('lock-container').addEventListener('click', function() {
    const overlay = document.getElementById('lock-overlay');
    overlay.classList.add('unlocked');
    // Optionally, allow scrolling again if you disabled it
    document.body.style.overflow = '';
});

// Prevent page scroll while overlay is active
document.body.style.overflow = 'hidden';
// Typewriter Overlay Logic
const typewriterText = "Welcome to Krishna Joshi's Portfolio...";
const typewriterElem = document.getElementById('typewriter');
const enterBtn = document.getElementById('enter-btn');
const overlay = document.getElementById('typewriter-overlay');
let typeIdx = 0;

function typeWriter() {
    if (typeIdx < typewriterText.length) {
        typewriterElem.textContent += typewriterText.charAt(typeIdx);
        typeIdx++;
        setTimeout(typeWriter, 60);
    } else {
        // Show the enter button after typing is done
        enterBtn.style.display = 'inline-block';
    }
}

window.addEventListener('DOMContentLoaded', () => {
    document.body.style.overflow = 'hidden'; // Prevent scrolling while overlay is active
    typeWriter();
});
function fireConfetti() {
    // Burst confetti from the center
    confetti({
        particleCount: 160,
        spread: 80,
        origin: { y: 0.6 }
    });
    // Optionally, repeat for a fuller effect
    setTimeout(() => {
        confetti({
            particleCount: 120,
            spread: 120,
            origin: { y: 0.3 }
        });
    }, 400);
}

// When hiding the overlay, also fire confetti
function hideOverlay() {
    overlay.classList.add('hide');
    document.body.style.overflow = '';
    fireConfetti();
}

// Button click to enter
enterBtn.addEventListener('click', hideOverlay);

// Also allow pressing Enter key to enter
overlay.addEventListener('keydown', function(e) {
    if (e.key === "Enter" || e.key === " ") {
        hideOverlay();
    }
});
overlay.tabIndex = 0; // Make overlay focusable for accessibility

// Optional: auto-focus overlay for keyboard accessibility
setTimeout(() => overlay.focus(), 800);
