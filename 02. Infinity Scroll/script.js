const imageContainer = document.querySelector("#image-container");
const loader = document.querySelector("#loader");

let photosArray = [];

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
        // img.setAttribute("src", photo.urls.regular);
    }
}

function displayPhotos() {
    photosArray.forEach((photo) => {
        const item = document.createElement("a");

        setAttributes(item, {
            href: photo.links.html,
            target: "_blank",
        });

        const img = document.createElement("img");

        setAttributes(item, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

const count = 10;
const apiKey = "6hWKp2Ph6p53DZZiZfjglT0QFPzOH7ySa_eY_9uDBkA";
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

async function getPhotos() {
    try {
        const response = await fetch(apiURL);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        console.log(error);
    }
}

getPhotos();
