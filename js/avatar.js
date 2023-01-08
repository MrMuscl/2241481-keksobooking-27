const avatarInputElement = document.querySelector('#avatar');
const avatarContainer = document.querySelector('.ad-form-header__preview img');
const imagesInputElement = document.querySelector('#images');
const imagesContainer = document.querySelector('.ad-form__photo');

const DEFAULT_AVATAR = 'img/muffin-grey.svg';

const initAvatarAndPhotos = () => {
  avatarInputElement.addEventListener('change', () => {
    const newAvatar = avatarInputElement.files[0];
    avatarContainer.src = URL.createObjectURL(newAvatar);
  });

  imagesInputElement.addEventListener('change', () => {
    const newImage = imagesInputElement.files[0];
    imagesContainer.style.backgroundImage = `url(${URL.createObjectURL(newImage)})`;
    imagesContainer.style.backgroundSize = 'cover';
  });
};

const resetAvatarAndPhotos = () => {
  avatarContainer.src = DEFAULT_AVATAR;
  imagesContainer.style.backgroundImage = 'none';
};

export {initAvatarAndPhotos,
  resetAvatarAndPhotos};
