const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
const count = 10;

const apiKey = 'jFgS8tteGD425f4oZfygQVaVnD6gt6GucN2yyz3xFek';
const apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

document.addEventListener('DOMContentLoaded', () => getDataFromAPI(apiURL));

window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getDataFromAPI(apiURL);
  }
});

const getDataFromAPI = async (url) => {
  try {
    const response = await fetch(url);
    photosArray = await response.json();
    
    displayPhotos();
  } catch (error) {
    console.log(error.message)
  }
}

const displayPhotos = () => {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach(photo => {
    
    const [link, img] = setElements(photo);
    img.addEventListener('load', imageLoaded);
    link.appendChild(img);
    imageContainer.appendChild(link);
  });
}

const setAttributes = (element, attributes) => {
  for(const key in attributes){
    element.setAttribute(key, attributes[key]);
  }
}

const setElements = (photo) => {
  
  const link = document.createElement('a');
  setAttributes(link, {
    href: photo.links.html,
    target: '_black'
  });

  const img = document.createElement('img');
  setAttributes(img, {
    src: photo.urls.regular,
    alt: photo.alt_description,
    title: photo.alt_description
  });

  return [link, img];
}

const imageLoaded = () => {
  imagesLoaded++;
  if(imagesLoaded === totalImages){
    ready = true;
    loader.hidden= true;
  }
}
