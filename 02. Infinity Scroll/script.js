const imageContainer = document.querySelector("#image-container");
const loader = document.querySelector("#loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

const count = 5;
const apiKey = "6hWKp2Ph6p53DZZiZfjglT0QFPzOH7ySa_eY_9uDBkA";
let apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function imageLoaded() {
    imagesLoaded++;

    if (imagesLoaded === totalImages) {
        ready = true;
        loader.classList.toggle("hidden");
    }
}

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
        // img.setAttribute("src", photo.urls.regular);
    }
}

function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;

    photosArray.forEach((photo) => {
        const item = document.createElement("a");

        setAttributes(item, {
            href: photo.links.html,
            target: "_blank",
        });

        const img = document.createElement("img");

        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        img.addEventListener("load", imageLoaded);
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

async function getPhotos() {
    try {
        const response = await fetch(apiURL);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        console.log(error);
    }
}

window.addEventListener("scroll", function () {
    if (
        window.innerHeight + window.scrollY >=
            document.body.offsetHeight - 1000 &&
        ready
    ) {
        ready = false;
        getPhotos();
    }
});

getPhotos();
