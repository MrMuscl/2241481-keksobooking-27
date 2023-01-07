const DOWNLOAD_URL = 'https://27.javascript.pages.academy/keksobooking/data';
const UPLOAD_URL = 'https://27.javascript.pages.academy/keksobooking1';

const getData = (onSuccess, onError) =>{
  fetch(DOWNLOAD_URL)
    .then((response) =>{
      if (!response.ok){
        onError();
      }
      return response.json();
    })
    .then((cards) => {
      onSuccess(cards);
    });
};

const sendData = (onSuccess, onError, body) => {
  fetch(
    UPLOAD_URL,
    {
      method: 'POST',
      body: body,
    })
    .then((responce) => {
      if (responce.ok){
        onSuccess();
      } else {
        onError();
      }
    });
};

export {getData, sendData};
