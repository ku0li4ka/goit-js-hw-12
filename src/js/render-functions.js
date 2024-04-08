export function renderImg(images, photoGallery, lightbox) {    
  const markupImg = images.map(image => {
    return `<div class="blockForAllElements">
        <li>
        <a href="${image.largeImageURL}" download="false">
        <img src="${image.webformatURL}" alt="${image.tags}" class="imgOfUser">
        </a>
        </li>
        <div class="divForDescription"> 
        <ul class="blockOfInfo"> 
          <li class="title">Likes</li>
          <li class="info">${image.likes}</li>
        </ul>
        <ul class="block">
          <li class="title">Views</li>
          <li class="info">${image.views}</li>
        </ul>
        <ul class="block">
          <li class="title">Comments</li>
          <li class="info">${image.comments}</li>
        </ul>
        <ul class="block">
          <li class="title">Downloads</li>
          <li class="info">${image.downloads}</li>
        </ul>
        </div>
      </div>`;
  }).join('');
  photoGallery.insertAdjacentHTML('beforeend', markupImg);

  lightbox.refresh();
}

export function toggleLoader(loaderContainer, isActive) {
  const loader = loaderContainer.querySelector('.loader');
  if (loader) {
    loader.style.display = isActive ? 'block' : 'none';
  }
}



export function spanElementRem() {                       
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.remove();
  }
}

