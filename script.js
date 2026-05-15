document.addEventListener("DOMContentLoaded", () => {
    function isLoggedIn() {
        try {
            return localStorage.getItem("findMyPawLoggedIn") === "true";
        } catch (error) {
            return false;
        }
    }

    function rememberLogin() {
        try {
            localStorage.setItem("findMyPawLoggedIn", "true");
        } catch (error) {
            // The site should still continue if browser storage is unavailable.
        }
    }

    const moreButton = document.querySelector(".hero-btn");
    if (moreButton && moreButton.getAttribute("href") === "Createacc.html") {
        moreButton.addEventListener("click", function (e) {
            if (isLoggedIn()) {
                e.preventDefault();
                window.location.href = "Aboutus.html";
            }
        });
    }

    const createForm = document.getElementById("createForm");
    if (createForm) {
        createForm.addEventListener("submit", function (e) {
            e.preventDefault();
            rememberLogin();
            window.location.href = "Aboutus.html";
        });
    }

    const track = document.querySelector(".carousel-track");
    const cards = document.querySelectorAll(".post-card");
    const nextBtn = document.querySelector(".carousel-btn.next-btn");
    const prevBtn = document.querySelector(".carousel-btn.prev-btn");
    const dots = document.querySelectorAll(".dot");

    if (track && cards.length > 0 && nextBtn && prevBtn) {
        let currentIndex = 0;

        function moveCarousel() {
            const gap = 30;
            const cardWidth = cards[0].offsetWidth + gap;
            track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

            dots.forEach((dot, index) => {
                dot.classList.toggle("active", index === currentIndex);
            });
        }

        nextBtn.addEventListener("click", () => {
            currentIndex = currentIndex < cards.length - 1 ? currentIndex + 1 : 0;
            moveCarousel();
        });

        prevBtn.addEventListener("click", () => {
            currentIndex = currentIndex > 0 ? currentIndex - 1 : cards.length - 1;
            moveCarousel();
        });

        dots.forEach((dot, index) => {
            dot.addEventListener("click", () => {
                currentIndex = index;
                moveCarousel();
            });
        });

        window.addEventListener("resize", moveCarousel);
    }

    const closePageBtn = document.getElementById("closePage");
    if (closePageBtn) {
        closePageBtn.addEventListener("click", () => {
            window.location.href = "Homepage.html";
        });
    }

    const contactForm = document.getElementById("contactForm");
    const popup = document.getElementById("popup");
    const overlay = document.getElementById("overlay");

    if (contactForm && popup && overlay) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            popup.classList.add("active");
            overlay.classList.add("active");
            contactForm.reset();
        });
    }
});

function closePopup() {
    const popup = document.getElementById("popup");
    const overlay = document.getElementById("overlay");

    if (popup && overlay) {
        popup.classList.remove("active");
        overlay.classList.remove("active");
    }
}
