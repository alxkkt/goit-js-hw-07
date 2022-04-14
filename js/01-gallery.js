import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const gallery = document.querySelector(".gallery");

// First option of MARKUP CREATION
// function createSingleElement({ description, preview, original }) {
//   const galleryItem = document.createElement("div");
//   galleryItem.classList.add("gallery__item");

//   const galleryLink = document.createElement("a");
//   galleryLink.classList.add("gallery__link");
//   galleryLink.href = `${original}`;
//   galleryLink.rel = "noopener noreferrer nofollow";

//   const galleryImage = document.createElement("img");
//   galleryImage.classList.add("gallery__image");
//   galleryImage.src = `${preview}`;
//   galleryImage.dataset.source = `${original}`;
//   galleryImage.alt = `${description}`;

//   galleryLink.appendChild(galleryImage);
//   galleryItem.appendChild(galleryLink);
//   gallery.appendChild(galleryItem);

//   return galleryItem;
// }

// galleryItems.map(createSingleElement);

// Second option

const createElements = function (items) {
  return items
    .map(
      (item) =>
        `<div class="gallery__item">
            <a class="gallery__link" href="${item.original}">
                <img class="gallery__image"
                src="${item.preview}"
                data-source="${item.original}"
                alt="${item.description}"/>
            </a>
            </div>`
    )
    .join("");
};

const galleryMarkup = createElements(galleryItems);
gallery.innerHTML = galleryMarkup;

gallery.onclick = (e) => {
  e.preventDefault();

  console.dir(e.target.dataset.source);
  if (e.target.nodeName !== "IMG") {
    return;
  }

  basicLightbox
    .create(
      `
		<img class="gallery__image" 
        src="${e.target.dataset.source}"
         alt="${e.target.alt}">
	`,
      {
        onShow: (instance) => {
          window.addEventListener("keydown", (e) => {
            if (e.key === "Escape" || e.key === "Esc") {
              instance.close();
            }
          });
        },
      }
    )
    .show();
};
