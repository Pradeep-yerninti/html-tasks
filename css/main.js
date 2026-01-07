
let slides = document.querySelectorAll('.slides');
let dots = document.querySelectorAll('.dot');
let index = 0;

function showSlide(i){
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));

  slides[i].classList.add('active');
  dots[i].classList.add('active');
}

setInterval(()=>{
  index++;
  if(index >= slides.length){ index = 0; }
  showSlide(index);
}, 4000);





const testimonialSlides =
    document.querySelectorAll("#testimonialSection .testimonialSlideItem");

const testimonialDots =
    document.querySelectorAll("#testimonialSection .testimonialDotItem");

let testimonialIndex = 0;

function showTestimonialSlide(index) {

    testimonialSlides[testimonialIndex].classList.remove("active");
    testimonialDots[testimonialIndex].classList.remove("active");

    testimonialIndex = index;

    testimonialSlides[testimonialIndex].classList.add("active");
    testimonialDots[testimonialIndex].classList.add("active");
}


setInterval(() => {
    let nextIndex =
        (testimonialIndex + 1) % testimonialSlides.length;
    showTestimonialSlide(nextIndex);
}, 5000);
