</script>
document.getElementById("createForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    alert("Account created successfully!");
    window.location.href = "login.html";
});
function goNext() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    
    if (name === "" || email === "" || password === "") {
        alert("Please fill in all fields.");
    } else {
        // Go to next page
        window.location.href = "nextpage.html";
    }
}
<script/>

</script>
const hiddenElements = document.querySelectorAll(".hidden");

const track = document.querySelector('.carousel-track');
const cards = document.querySelectorAll('.post-card');

const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');

const dots = document.querySelectorAll('.dot');

let currentIndex = 0;

// MOVE CAROUSEL
function moveCarousel() {
    
    const cardWidth = cards[0].offsetWidth + 25;
    
    track.style.transform =
    `translateX(-${currentIndex * cardWidth}px)`;
    
    // UPDATE DOTS
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    dots[currentIndex].classList.add('active');
}

// NEXT BUTTON
nextBtn.addEventListener('click', () => {
    
    if(currentIndex < cards.length - 1){
        
        currentIndex++;
        
    } else {
        
        currentIndex = 0;
    }
    
    moveCarousel();
});

// PREVIOUS BUTTON
prevBtn.addEventListener('click', () => {
    
    if(currentIndex > 0){
        
        currentIndex--;
        
    } else {
        
        currentIndex = cards.length - 1;
    }
    
    moveCarousel();
});

// DOT NAVIGATION
dots.forEach((dot, index) => {
    
    dot.addEventListener('click', () => {
        
        currentIndex = index;
        
        moveCarousel();
    });
    
});
<script/>


</script>
const form = document.getElementById("contactForm");
const popup = document.getElementById("popup");
const overlay = document.getElementById("overlay");

form.addEventListener("submit", function(e){
    
    e.preventDefault();
    
    popup.classList.add("active");
    overlay.classList.add("active");
    
    form.reset();
    
});

function closePopup(){
    
    popup.classList.remove("active");
    overlay.classList.remove("active");
    
}
</script>

