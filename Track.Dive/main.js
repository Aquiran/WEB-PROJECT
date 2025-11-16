/* slider */
const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector("#next");
const prevBtn = document.querySelector("#prev");

index = 0;
slides.forEach(function (slide, index) {
    slide.style.left = `${index * 100}%`;
});

let count = 0;
nextBtn.addEventListener("click", function () {
    count++;
    carousel();
});

prevBtn.addEventListener("click", function () {
    count--;
    carousel();
});

function carousel() {
    if (count < slides.length - 1) {
        nextBtn.style.display = "block";
    } else {
        nextBtn.style.display = "none";
    }

    if (count > 0) {
        prevBtn.style.display = "block";
    } else {
        prevBtn.style.display = "none";
    }

    slides.forEach(function (slide) {
        slide.style.transform = `translateX(-${count * 100}%)`;
    });
}

prevBtn.style.display = "none";

/* Text Event */
texts = document.querySelectorAll("#text-content")

let txt_observer1 = new IntersectionObserver(e => {
    e.forEach(txt => {
        if (txt.isIntersecting) {
            txt.target.style.opacity = 1;
        }
        else {
            txt.target.style.opacity = 0;
        }
    })
}, {threshold: 0.1})

let txt_observer2 = new IntersectionObserver(e => {
    e.forEach(txt => {
        if (txt.isIntersecting) {
            txt.target.style.opacity = 1;
            txt.target.style.transform = "translateY(0px)";
        }
        else {
            txt.target.style.opacity = 0;
            txt.target.style.transform = "translateY(-30px)";
        }
    })
}, {threshold: 0.1})

let txt_observer3 = new IntersectionObserver(e => {
    e.forEach(txt =>{
        if (txt.isIntersecting) {
            txt.target.style.opacity = 1;
            txt.target.style.filter = "blur(0px)";
            txt.target.style.transform = "translateY(0px)";
        }
        else {
            txt.target.style.opacity = 0;
            txt.target.style.filter = "blur(10px)";
            txt.target.style.transform = "translateY(-30px)";
        }
    })
}, {threshold: 0.1})

texts = document.querySelectorAll(".text-content")
txt_observer1.observe(texts[0])
txt_observer2.observe(texts[1])
txt_observer3.observe(texts[2])

/* Image Event */
let img_observer = new IntersectionObserver(e => {
    e.forEach((img) => {
        if (img.isIntersecting) {
            img.target.style.opacity = 1;
        }
        else {
            img.target.style.opacity = 0;
        }
    })
})

document.querySelectorAll(".image-content").forEach(img => {
    {
        img_observer.observe(img)
    }
})


/* Rhythm Game Page 이동 */
document.querySelector("#trackDive").addEventListener("click", () => {
    window.location = "rhythm.html";
})