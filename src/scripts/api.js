const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-7',
  headers: {
    authorization: 'a053bd71-f044-4ff6-9a78-ec78ff529431',
    'Content-Type': 'application/json',
  },
};
  
function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

function takeServerProfile() {
  return request(config['baseUrl'] + '/users/me', {
    headers: config['headers'],
  });
}

function takeServerCards() {
  return request(config['baseUrl'] + '/cards', {
    headers: config['headers'],
  });
}

function changeServerProfile(formInputProfileName, formInputProfileDescription) {
  return request(config['baseUrl'] + '/users/me', {
    method: 'PATCH',
    headers: config['headers'],
    body: JSON.stringify({
      name: formInputProfileName.value,
      about: formInputProfileDescription.value,
    }),
  });
}

function postServerCard(item) {
  return request(config['baseUrl'] + '/cards', {
    method: 'POST',
    headers: config['headers'],
    body: JSON.stringify({
      name: item.name,
      link: item.link,
    }),
  });
}

function deleteServerCard(item) {
  return request(config['baseUrl'] + '/cards/' + item['_id'], {
    method: 'DELETE',
    headers: config['headers'],
  });
}

function putServerLike(item) {
  return request(config['baseUrl'] + '/cards/likes/' + item['_id'], {
    method: 'PUT',
    headers: config['headers'],
  });
}

function deleteServerLike(item) {
  return request(config['baseUrl'] + '/cards/likes/' + item['_id'], {
    method: 'DELETE',
    headers: config['headers'],
  });
}

function changeServerAvatar(link) {
  return request(config['baseUrl'] + '/users/me/avatar', {
    method: 'PATCH',
    headers: config['headers'],
    body: JSON.stringify({
      avatar: link,
    }),
  });
}

export {
  takeServerProfile,
  takeServerCards,
  changeServerProfile,
  postServerCard,
  deleteServerCard,
  putServerLike,
  deleteServerLike,
  changeServerAvatar,
};