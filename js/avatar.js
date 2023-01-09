import {isImageFileType} from './validate.js';

const avatarInputElement = document.querySelector('#avatar');
const avatarContainer = document.querySelector('.ad-form-header__preview img');
const imagesInputElement = document.querySelector('#images');
const imagesContainer = document.querySelector('.ad-form__photo');

const DEFAULT_AVATAR = 'img/muffin-grey.svg';

const initAvatarAndPhotos = () => {
  avatarInputElement.addEventListener('change', () => {
    const newAvatar = avatarInputElement.files[0];
    if (newAvatar && isImageFileType(newAvatar)){
      avatarContainer.src = URL.createObjectURL(newAvatar);
    }
  });

  imagesInputElement.addEventListener('change', () => {
    const newImage = imagesInputElement.files[0];

    if (newImage && isImageFileType(newImage)){
      imagesContainer.innerHTML = '';
      const image = document.createElement('img');
      image.src = URL.createObjectURL(newImage);
      image.style.maxWidth = '100%';
      image.style.height = 'auto';
      imagesContainer.append(image);
    }
  });
};

const resetAvatarAndPhotos = () => {
  avatarContainer.src = DEFAULT_AVATAR;
  imagesContainer.innerHTML = '';
};

export {initAvatarAndPhotos,
  resetAvatarAndPhotos};
