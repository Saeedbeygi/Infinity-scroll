const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let raedy = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
//unsplash API
const count = 30
const apikey ='XEScxNBx1aC4ZGEfnFMpJa7N-8jFmK9lii_DGZ9EplY';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=
${apikey}&count=${count}`;
// check if all image were loaded
function imageLoaded() {
    imagesLoaded++;
    
    if (imagesLoaded === totalImages) {
        raedy = true;
        loader.hidden = true;
         }
}
//Helper Function to set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}


//creat Elements for Links & Photos, Add to Dom
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    
    //Run function for each object in photosArray
    photosArray.forEach((photo) => {
// Create <a> to link to unsplash
const item = document.createElement('a');
//item.setAttribute('href' , photo.links.html);
//item.setAttribute('target' , '_blank');
setAttributes(item, {
    href:photo.links.html,
    target:'_blank',

});
//Create <img> for photo
const img = document.createElement('img');
//img.setAttribute('src', photo.urls.regular);
//img.setAttribute('alt', photo.alt_description);
//img.setAttribute('title', photo.alt_description);
setAttributes(img, {
src: photo.urls.regular,
alt: photo.alt_description,
title: photo.alt_description,
});
//Event Listener, check when each is finished loading
img.addEventListener('load', imageLoaded);
// Put <img> inside <a>, then put both inside imageContainer Element
item.appendChild(img);
imageContainer.appendChild(item);
    });
 }

// Get Photos from unsplash API
async function getPhotos() {
    try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
    } catch (error) {
        // catch error
    }
}
// check to see if scroll near bottom of page, Load more photos
window.addEventListener('scroll', () => {
if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && raedy) {

    ready = false;
getPhotos();
}
});
// On Load
getPhotos();