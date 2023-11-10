import { galleryItems } from "./gallery-items.js";

const refs = {
  gallery: document.querySelector(".gallery"),
};

const instance = basicLightbox.create(
  `
<img width="1280"  src="">
`,
  {
    onShow: (instance) => {
      window.addEventListener("keydown", onEscKeyDown);
    },
    onClose: (instance) => {
      window.removeEventListener("keydown", onEscKeyDown);
    },
  }
);

const galleryItemsMarksup = createGalleryItemsMarksup(galleryItems);

refs.gallery.insertAdjacentHTML("beforeend", galleryItemsMarksup);

refs.gallery.addEventListener("click", onGalleryItemClick);

// @param {Click} event
// @returns

function onGalleryItemClick(event) {
  event.preventDefault();
  const isGalleryItemElemImage =
    event.target.classList.contains("gallery__image");

  if (!isGalleryItemElemImage) {
    return;
  }

  openImageInBasicLightbox(event.target.closest(".gallery__link").href);
}

// @param {Object} galleryItems
// @returns

function createGalleryItemsMarksup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    })
    .join("");
}

// @param {String} src

function openImageInBasicLightbox(src) {
  instance.element().querySelector("img").src = src;
  instance.show();
}

// @param {keydown} e

function onEscKeyDown(e) {
  console.log(e);
  if (e.code === "Escape") {
    instance.close();
  }
}
