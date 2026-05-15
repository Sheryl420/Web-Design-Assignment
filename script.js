document.addEventListener("DOMContentLoaded", () => {
    const settingsIcon = document.querySelector(".icon");
    const navLeft = document.querySelector(".nav-left");

    if (settingsIcon && navLeft) {
        settingsIcon.setAttribute("role", "button");
        settingsIcon.setAttribute("tabindex", "0");
        settingsIcon.setAttribute("aria-label", "Open settings menu");
        settingsIcon.setAttribute("aria-expanded", "false");

        const settingsMenu = document.createElement("div");
        settingsMenu.className = "settings-menu";
        settingsMenu.innerHTML = `
            <h3>Settings</h3>
            <div class="settings-section">
                <span class="settings-label">Language</span>
                <div class="language-options">
                    <button type="button" class="language-btn active" data-language="English">English</button>
                    <button type="button" class="language-btn" data-language="Maltese">Maltese</button>
                </div>
            </div>
            <div class="settings-section">
                <span class="settings-label">Location</span>
                <button type="button" class="location-btn">Show location</button>
                <p class="location-text">Triq Emanuele Pinto, San Pawl il Bahar</p>
            </div>
        `;
        navLeft.appendChild(settingsMenu);

        function toggleSettingsMenu() {
            const isOpen = settingsMenu.classList.toggle("open");
            settingsIcon.setAttribute("aria-expanded", String(isOpen));
        }

        settingsIcon.addEventListener("click", toggleSettingsMenu);
        settingsIcon.addEventListener("keydown", function (e) {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleSettingsMenu();
            }
        });

        settingsMenu.querySelectorAll(".language-btn").forEach((button) => {
            button.addEventListener("click", function () {
                settingsMenu.querySelectorAll(".language-btn").forEach((languageButton) => {
                    languageButton.classList.remove("active");
                });
                button.classList.add("active");
            });
        });

        const locationButton = settingsMenu.querySelector(".location-btn");
        const locationText = settingsMenu.querySelector(".location-text");
        locationButton.addEventListener("click", function () {
            locationText.classList.toggle("show");
        });

        document.addEventListener("click", function (e) {
            if (!navLeft.contains(e.target)) {
                settingsMenu.classList.remove("open");
                settingsIcon.setAttribute("aria-expanded", "false");
            }
        });
    }

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
    const trackContainer = document.querySelector(".carousel-track-container");
    const nextBtn = document.querySelector(".carousel-btn.next-btn");
    const prevBtn = document.querySelector(".carousel-btn.prev-btn");
    const dots = document.querySelectorAll(".dot");

    if (track && trackContainer && cards.length > 0 && nextBtn && prevBtn) {
        let currentIndex = 0;

        function getCarouselMeasurements() {
            const gap = 30;
            const cardWidth = cards[0].offsetWidth + gap;
            const maxTranslate = Math.max(0, track.scrollWidth - trackContainer.offsetWidth);
            const maxIndex = Math.ceil(maxTranslate / cardWidth);

            return { cardWidth, maxTranslate, maxIndex };
        }

        function moveCarousel() {
            const { cardWidth, maxTranslate, maxIndex } = getCarouselMeasurements();
            currentIndex = Math.min(currentIndex, maxIndex);

            const translateAmount = Math.min(currentIndex * cardWidth, maxTranslate);
            track.style.transform = `translateX(-${translateAmount}px)`;

            dots.forEach((dot, index) => {
                const dotIsNeeded = index <= maxIndex;
                dot.style.display = dotIsNeeded ? "" : "none";
                dot.classList.toggle("active", dotIsNeeded && index === currentIndex);
            });
        }

        nextBtn.addEventListener("click", () => {
            const { maxIndex } = getCarouselMeasurements();
            currentIndex = currentIndex < maxIndex ? currentIndex + 1 : 0;
            moveCarousel();
        });

        prevBtn.addEventListener("click", () => {
            const { maxIndex } = getCarouselMeasurements();
            currentIndex = currentIndex > 0 ? currentIndex - 1 : maxIndex;
            moveCarousel();
        });

        dots.forEach((dot, index) => {
            dot.addEventListener("click", () => {
                const { maxIndex } = getCarouselMeasurements();
                currentIndex = index <= maxIndex ? index : 0;
                moveCarousel();
            });
        });

        window.addEventListener("resize", moveCarousel);
        moveCarousel();
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

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            popup.classList.add("active");
            overlay.classList.add("active");
            contactForm.reset();
        });
    }

    const missingPetForm = document.getElementById("missingPetForm");
    const petPhotoInput = document.getElementById("petPhoto");
    const photoPreview = document.getElementById("photoPreview");

    if (petPhotoInput && photoPreview) {
        petPhotoInput.addEventListener("change", function () {
            const file = petPhotoInput.files[0];
            if (!file) {
                return;
            }

            if (!file.type.startsWith("image/")) {
                petPhotoInput.value = "";
                return;
            }

            photoPreview.src = URL.createObjectURL(file);
            photoPreview.alt = "Uploaded photo of missing pet";
        });
    }

    if (missingPetForm) {
        missingPetForm.addEventListener("submit", function (e) {
            e.preventDefault();

            if (!missingPetForm.checkValidity()) {
                missingPetForm.reportValidity();
                return;
            }

            window.location.href = "notification.centre.html";
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
document.addEventListener("DOMContentLoaded", function () {
    const volunteerForm = document.getElementById("volunteerForm");
    const popup = document.getElementById("popup");
    const overlay = document.getElementById("overlay");
    const requirementsBox = document.getElementById("requirementsBox");

    if (!volunteerForm || !popup || !overlay) {
        return;
    }

    const requirementCheckboxes = requirementsBox.querySelectorAll(".form-check-input");

    function allRequirementsChecked() {
        for (let i = 0; i < requirementCheckboxes.length; i++) {
            if (!requirementCheckboxes[i].checked) {
                return false;
            }
        }
        return true;
    }

    function showRequirementsError(showError) {
        if (showError) {
            requirementsBox.classList.add("requirements-error");
        } else {
            requirementsBox.classList.remove("requirements-error");
        }
    }

    for (let i = 0; i < requirementCheckboxes.length; i++) {
        requirementCheckboxes[i].addEventListener("change", function () {
            if (allRequirementsChecked()) {
                showRequirementsError(false);
            }
        });
    }

    volunteerForm.addEventListener("submit", function (e) {
        e.preventDefault();

        if (!allRequirementsChecked()) {
            showRequirementsError(true);
            requirementsBox.scrollIntoView({ behavior: "smooth", block: "center" });
            return;
        }

        showRequirementsError(false);

        if (!volunteerForm.checkValidity()) {
            volunteerForm.reportValidity();
            return;
        }

        popup.classList.add("active");
        overlay.classList.add("active");
        volunteerForm.reset();
        showRequirementsError(false);
    });

    overlay.addEventListener("click", function () {
        closePopup();
    });
});