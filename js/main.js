const galleryList = document.querySelector('.gallery');

let markup = '';

for (const item of images) {
  markup += `
    <li class="gallery-item">
      <a class="gallery-link" href="${item.original}">
        <img
          class="gallery-image"
          src="${item.preview}"
          data-source="${item.original}"
          alt="${item.description}"
        />
      </a>
    </li>`;
}

galleryList.innerHTML = markup;

galleryList.addEventListener('click', (e) => {
  e.preventDefault();

  const img = e.target.closest('img.gallery-image');
  if (!img || !galleryList.contains(img)) return;

  const largeImageURL = img.dataset.source;
  const alt = img.alt || '';

  const instance = basicLightbox.create(`
    <img src="${largeImageURL}" alt="${alt}">
  `);

  instance.show();

  const onEscPress = (evt) => {
    if (evt.key === 'Escape') {
      instance.close();
      window.removeEventListener('keydown', onEscPress);
    }
  };
  window.addEventListener('keydown', onEscPress);
});