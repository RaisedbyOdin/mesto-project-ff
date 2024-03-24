const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-7',
  headers: {
    authorization: 'a053bd71-f044-4ff6-9a78-ec78ff529431',
    'Content-Type': 'application/json',
  },
  headersShort: {
    authorization: 'a053bd71-f044-4ff6-9a78-ec78ff529431'
  }
};
  
const checkResponse = (res) => {
  if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    } 
    return res.json();
}

const getServerProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headersShort
  })
  .then((res) => {
    return checkResponse(res);
  })
};

const getServerCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headersShort
  })
  .then((res) => {
    return checkResponse(res);
  })
}

const postServerCard = (item) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    body: JSON.stringify({
      name: item.name,
      link: item.link,
    }),
    headers: config.headers
  })
  .then((res) => {
    return checkResponse(res);
  })
}

const putServerLike = (item) => {
  return fetch(`${config.baseUrl}/cards/likes/${item._id}`, {
    method: 'PUT',
    headers: config.headers,
  })
  .then((res) => {
    return checkResponse(res);
  })
}

const deleteServerLike = (item) => {
  return fetch(`${config.baseUrl}/cards/likes/${item._id}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then((res) => {
    return checkResponse(res);
  })
}

const deleteServerCard = (itemId) => {
  return fetch(`${config.baseUrl}/cards/${itemId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then((res) => {
    return checkResponse(res);
  })
}

const patchServerProfile = (data) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    body: JSON.stringify({
      name: data.value,
      about: data.about
    }),
    headers: config.headers
  })
  .then((res) => {
    return checkResponse(res);
  })
}

const patchServerAvatar = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    body: JSON.stringify({
    avatar: link
    }),
    headers: config.headers
  })
  .then((res) => {
    return checkResponse(res);
  })
}
  
export {
  getServerProfile,
  getServerCards,
  patchServerProfile,
  postServerCard,
  deleteServerCard,
  putServerLike,
  deleteServerLike,
  patchServerAvatar,
};