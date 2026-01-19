

document.addEventListener("DOMContentLoaded", () => {
    const aboutLeft = document.querySelector(".about-left");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // add animation when visible
                    aboutLeft.classList.add("show");
                } else {
                    // remove animation when out of view
                    aboutLeft.classList.remove("show");
                }
            });
        },
        {
            threshold: 0.3
        }
    );

    observer.observe(aboutLeft);

});
