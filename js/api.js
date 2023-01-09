const DOWNLOAD_URL = 'https://27.javascript.pages.academy/keksobooking/data1';
const UPLOAD_URL = 'https://27.javascript.pages.academy/keksobooking';

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
    })
    .catch(onError);
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
        console.log('fetch sendData success');
        onSuccess();
      } else {
        console.log('fetch sendData error');
        onError();
      }
    })
    .catch(onError);
    console.log('sendData completed');
};

export {getData, sendData};
