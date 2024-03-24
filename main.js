(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-7",headers:{authorization:"a053bd71-f044-4ff6-9a78-ec78ff529431","Content-Type":"application/json"},headersShort:{authorization:"a053bd71-f044-4ff6-9a78-ec78ff529431"}},t=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},n=document.querySelector("#card-template").content;function o(e,t,o,r,c){var a=n.querySelector(".card").cloneNode(!0),i=a.querySelector(".card__delete-button"),u=a.querySelector(".card__image"),s=a.querySelector(".card__like-button"),l=a.querySelector(".card__like-amount");return u.src=e.link,u.alt=e.name,a._id=e._id,a.owner_id=e.owner._id,l.textContent=e.likes.length,e.likes.forEach((function(e){e._id===t._id&&s.classList.add("card__like-button_is-active")})),a.querySelector(".card__title").textContent=e.name,i.addEventListener("click",(function(){o(i)})),a.owner_id!==t._id&&i.remove(),s.addEventListener("click",r),u.addEventListener("click",c),a}function r(n){var o,r=n.closest(".card");(o=r,fetch("".concat(e.baseUrl,"/cards/").concat(o),{method:"DELETE",headers:e.headers}).then((function(e){return t(e)}))).then((function(){r.remove()})).catch((function(e){console.log(e)}))}function c(n){var o,r=n.target,c=r.closest(".card");r.classList.contains("card__like-button_is-active")?(o=c,fetch("".concat(e.baseUrl,"/cards/likes/").concat(o._id),{method:"DELETE",headers:e.headers}).then((function(e){return t(e)}))).then((function(e){r.classList.toggle("card__like-button_is-active"),c.querySelector(".card__like-amount").textContent=e.likes.length})).catch((function(e){console.log(e)})):function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n._id),{method:"PUT",headers:e.headers}).then((function(e){return t(e)}))}(c).then((function(e){r.classList.toggle("card__like-button_is-active"),c.querySelector(".card__like-amount").textContent=e.likes.length})).catch((function(e){console.log(e)}))}function a(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",u)}function i(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",u)}function u(e){"Escape"===e.key&&i(document.querySelector(".popup_is-opened"))}var s=function(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),o.classList.remove(n.errorClass),o.textContent=""};function l(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?t.classList.remove(n.inactiveButtonClass):(t.classList.add(n.inactiveButtonClass),t.disabled=!0),t.disabled=!1}function d(e,t){Array.from(e.querySelectorAll(t.inputSelector)).forEach((function(n){s(e,n,t)}));var n=e.querySelector(t.submitButtonSelector);n.classList.add(t.inactiveButtonClass),n.disabled=!0}var f=document.querySelector(".places__list"),p=document.querySelector(".profile__edit-button"),m=document.querySelector(".profile__add-button"),_=document.querySelector(".popup_type_edit"),v=document.querySelector(".popup_type_new-card"),h=document.querySelector(".popup_type_image"),y=document.querySelector(".popup__image"),S=document.querySelector(".profile__title"),b=document.querySelector(".profile__description"),g=document.querySelector(".profile__image"),C=document.forms["edit-profile"],q=document.forms["new-place"],k=document.forms["edit-avatar"],L=document.forms["edit-avatar"]["link-avatar"],E=document.forms["edit-profile"].name,x=document.forms["edit-profile"].description,w=document.forms["new-place"]["place-name"],U=document.forms["new-place"].link,A=document.querySelector(".popup__caption"),B=document.querySelectorAll(".popup"),T=document.querySelector(".profile__image-edit-button"),D=document.querySelector(".popup_type_edit-avatar"),P={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button-isunactive",inputErrorClass:"popup__input_type_error",inputUrlImageClass:"popup__input-url-image",errorClass:"popup__input-error_active"};function I(e){f.prepend(e)}function N(e){a(h),y.src=e.target.closest(".card__image").src,y.alt=e.target.closest(".card__image").alt,A.textContent=e.target.closest(".card__image").alt}q.addEventListener("submit",(function(n){n.preventDefault();var a={};a.likes=new Array,a.name=w.value,a.link=U.value;var u=n.target.querySelector(".popup__button");u.textContent="Сохранение...",function(n){return fetch("".concat(e.baseUrl,"/cards"),{method:"POST",body:JSON.stringify({name:n.name,link:n.link}),headers:e.headers}).then((function(e){return t(e)}))}(a).then((function(e){I(o(e,S,r,c,N)),q.reset(),d(q,P),i(v)})).catch((function(e){console.log(e)})).finally((function(){u.textContent="Сохранить"}))})),C.addEventListener("submit",(function(t){t.preventDefault();var n=t.target.querySelector(".popup__button");n.textContent="Сохранение...",function(t,n){return request(e.baseUrl+"/users/me",{method:"PATCH",headers:e.headers,body:JSON.stringify({name:t.value,about:n.value})})}(E,x).then((function(){S.textContent=E.value,b.textContent=x.value,d(C,P),i(_)})).catch((function(e){console.log(e)})).finally((function(){n.textContent="Сохранить"}))})),p.addEventListener("click",(function(){E.value=S.textContent,x.value=b.textContent,d(C,P),a(_)})),m.addEventListener("click",(function(){a(v)})),T.addEventListener("click",(function(){a(D)})),k.addEventListener("submit",(function(n){n.preventDefault();var o,r=n.target.querySelector(".popup__button");r.textContent="Сохранение...",(o=L.value,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",body:JSON.stringify({avatar:o}),headers:e.headers}).then((function(e){return t(e)}))).then((function(){g.style.backgroundImage="url("+L.value+")",k.reset(),d(k,P),i(D)})).catch((function(e){console.log(e)})).finally((function(){r.textContent="Сохранить"}))})),B.forEach((function(e){e.addEventListener("mousedown",(function(t){t.target.classList.contains("popup_is-opened")&&i(e),t.target.classList.contains("popup__close")&&i(e)}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);l(n,o,t),n.forEach((function(r){r.addEventListener("input",(function(){l(n,o,t),function(e,t,n){t.validity.patternMismatch?t.classList.contains(n.inputUrlImageClass)?t.setCustomValidity("Вставьте ссылку, которая ведет на изображение"):t.setCustomValidity("Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы"):t.setCustomValidity(""),t.validity.valid?s(e,t,n):function(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o.inputErrorClass),r.textContent=n,r.classList.add(o.errorClass)}(e,t,t.validationMessage,n)}(e,r,t)}))}))}(t,e)}))}(P),Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headersShort}).then((function(e){return t(e)})),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headersShort}).then((function(e){return t(e)}))]).then((function(e){S.textContent=e[0].name,S._id=e[0]._id,b.textContent=e[0].about,g.style.backgroundImage="url("+e[0].avatar+")",e[1].reverse(),e[1].forEach((function(e){I(o(e,S,r,c,N))}))})).catch((function(e){console.log(e)}))})();