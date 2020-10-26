(()=>{"use strict";(()=>{const e=document.querySelector("#error").content.querySelector(".error"),t=document.querySelector("#success").content.querySelector(".success"),o=()=>{document.location.reload()};window.statusMessage={onError:t=>{const r=e.cloneNode(!0);t?(r.querySelector(".error__message").textContent=t,r.querySelector(".error__button").textContent="Перезагрузить страницу",r.querySelector(".error__button").addEventListener("click",o)):r.querySelector(".error__button").addEventListener("click",window.util.onCloseBtnClick),r.addEventListener("click",window.util.onMouseClick),document.addEventListener("keydown",window.util.onEscBtnClick),document.querySelector("main").prepend(r)},onLoad:()=>{const e=t.cloneNode(!0);e.addEventListener("click",window.util.onMouseClick),document.addEventListener("keydown",window.util.onEscBtnClick),document.querySelector("main").prepend(e),window.main.onClosePopup()}}})(),(()=>{const e="https://21.javascript.pages.academy/keksobooking/data",t="https://21.javascript.pages.academy/keksobooking",o="GET",r="POST",n=(t,r,n,a,s=null)=>{const c=new XMLHttpRequest;c.timeout=1e4,t===o&&(c.responseType="json"),c.addEventListener("load",(()=>((t,o,r)=>{switch(t.status){case 200:t.responseURL===e?o(t.response):o();break;case 404:r("При загрузке данных с сервера произошла ошибка!");break;case 500:case 400:r()}})(c,r,n))),c.addEventListener("error",(()=>n("Проблемы с соединением. Попробуйте перезагрузить страницу"))),c.addEventListener("timeout",(()=>n("Время ожидания ответа от сервера превысило 10 секунд. Попробуйте перезагрузить страницу"))),c.open(t,a),c.send(s)};window.backend={load:(t,r)=>{n(o,t,r,e)},save:(e,o,a)=>{n(r,o,a,t,e)}}})(),(()=>{let e=null;window.debounce={setDebounce:t=>{e&&window.clearTimeout(e),e=window.setTimeout(t,500)}}})(),(()=>{const e="low",t=1e4,o="middle",r="high",n=5e4,a=document.querySelector(".map__filters"),s=a.querySelector("#housing-type"),c=a.querySelector("#housing-price"),i=a.querySelector("#housing-rooms"),d=a.querySelector("#housing-guests"),u=a.querySelector(".map__features"),l=a=>{return w=a.offer.type,("any"===s.value||w===s.value)&&(a=>{switch(c.value){case e:return a<t;case o:return a>=t&&a<=n;case r:return a>n}return!0})(a.offer.price)&&(m=a.offer.rooms,"any"===i.value||m.toString()===i.value)&&(p=a.offer.guests,"any"===d.value||p.toString()===d.value)&&(l=a.offer.features,Array.from(u.querySelectorAll("input[type=checkbox]:checked")).map((e=>e.value)).every((e=>l.includes(e))));var l,p,m,w},p=()=>{window.card.removeCard();const e=window.pinsList.filter(l);window.pin.createPins(e.slice(0,5))},m=()=>{window.debounce.setDebounce(p)},w=e=>{Array.from(a.children).forEach((t=>{t.disabled=e})),e?a.removeEventListener("change",m):a.addEventListener("change",m)};w(!0),window.filter={filteredPins:p,inactivateFilter:w}})(),(()=>{const e=document.querySelector(".ad-form"),t=e.querySelector(".ad-form-header__preview img"),o=e.querySelector(".ad-form__photo"),r="70px",n="70px",a="5px",s="cover",c="-15px",i=(e,t=!1)=>{e.style.width=r,e.style.height=n,e.style.borderRadius=a,e.style.objectFit=s,t&&(e.style.marginLeft=c)},d=e=>{o.textContent="";const t=document.createElement("img");t.src=e.target.result,i(t),o.append(t),e.target.removeEventListener("load",d)},u=e=>{t.src=e.target.result,i(t,!0),e.target.removeEventListener("load",u)};window.photos={setImage:t=>{const o=t.target.files[0];switch(o.type){case"image/png":case"image/jpg":case"image/jpeg":((t,o)=>{const r=new FileReader;t.target===e.avatar?r.addEventListener("load",u):r.addEventListener("load",d),r.readAsDataURL(o)})(t,o)}}}})(),(()=>{const e=document.querySelector(".ad-form"),t=e.querySelectorAll("fieldset"),o={1:["1"],2:["1","2"],3:["1","2","3"],100:["0"]},r={bungalow:0,flat:1e3,house:5e3,palace:1e4},n=t=>{switch(t.target){case e.type:e.price.min=r[e.type.value],e.price.placeholder=r[e.type.value];break;case e.rooms:case e.capacity:(()=>{const t=o[e.rooms.value].includes(e.capacity.value)?"":"Несоответствие количества комнат количеству гостей";e.capacity.setCustomValidity(t),e.capacity.reportValidity()})();break;case e.timein:case e.timeout:(t=>{t.target===e.timein?e.timeout.value=t.target.value:e.timein.value=t.target.value})(t);break;case e.avatar:case e.images:window.photos.setImage(t)}},a=t=>{t.preventDefault(),window.backend.save(new FormData(e),window.statusMessage.onLoad,window.statusMessage.onError)},s=()=>{e.reset()},c=o=>{Array.from(t).forEach((e=>{e.disabled=o})),o?(e.removeEventListener("change",n),e.removeEventListener("submit",a),e.removeEventListener("reset",s)):(e.addEventListener("change",n),e.addEventListener("submit",a),e.addEventListener("reset",s))};c(!0),window.form={onResetBtnClick:s,inactivateForm:c,onFormElementChange:n,onSubmitForm:a}})(),(()=>{const e=document.querySelector(".map"),t=document.querySelector(".ad-form"),o=t.querySelector(".ad-form__photo"),r=e.querySelector(".map__pin--main"),n="375px",a="570px",s=e=>{window.pinsList=e,window.filter.inactivateFilter(!1),window.filter.filteredPins()},c=()=>{e.classList.remove("map--faded"),window.backend.load(s,window.statusMessage.onError,!0),i(),r.removeEventListener("click",c)},i=()=>{t.classList.remove("ad-form--disabled"),window.form.inactivateForm(!1)},d=()=>{const t=e.querySelectorAll(".map__pin:not(.map__pin--main)");for(let e of t)e.remove()};r.addEventListener("click",c),window.main={resetMap:d,setMainAddress:()=>{t.address.value=`${parseInt(r.style.left,10)+window.pin.Pin.WIDTH/2}, ${parseInt(r.style.top,10)+window.pin.Pin.HEIGHT}`},onClosePopup:()=>{d(),window.card.removeCard(),e.classList.add("map--faded"),t.classList.add("ad-form--disabled"),r.style.left=a,r.style.top=n,window.form.inactivateForm(!0),window.filter.inactivateFilter(!0),o.textContent="",t.reset(),r.addEventListener("click",c)}}})(),(()=>{const e=document.querySelector(".map"),t={wifi:"popup__feature--wifi",dishwasher:"popup__feature--dishwasher",parking:"popup__feature--parking",washer:"popup__feature--washer",elevator:"popup__feature--elevator",conditioner:"popup__feature--conditioner"},o={palace:"Дворец",flat:"Квартира",house:"Дом",bungalow:"Бунгало"},r=document.querySelector("#card").content.querySelector(".popup"),n=document.querySelector("#photo").content,a=e=>{const o=document.createElement("li");return o.className="popup__feature "+t[e],o},s=e=>{const t=n.cloneNode(!0);return t.querySelector("img").src=e,t},c=()=>{const t=e.querySelector(".popup");e.contains(t)&&t.remove()};window.card={features:t,typesOfHousing:o,removeCard:c,createCard:t=>{c(),e.append((e=>{const t=r.cloneNode(!0),n=t.querySelector(".popup__features"),c=t.querySelector(".popup__photos");document.addEventListener("keydown",window.util.onEscBtnClick),t.querySelector(".popup__close").addEventListener("click",window.util.onCloseBtnClick),t.querySelector(".popup__avatar").src=e.author.avatar,t.querySelector(".popup__title").textContent=e.offer.title,t.querySelector(".popup__text--address").textContent=e.offer.address,t.querySelector(".popup__text--price").textContent=e.offer.price+" ₽/ночь",t.querySelector(".popup__type").textContent=o[e.offer.type],t.querySelector(".popup__text--capacity").textContent=`${e.offer.rooms} ${window.util.getWordsEndings(e.offer.rooms,["комната","комнаты","комнат"])} для ${e.offer.guests} ${window.util.getWordsEndings(e.offer.guests,["гостя","гостей","гостей"])}`,t.querySelector(".popup__text--time").textContent=`Заезд после ${e.offer.checkin}, выезд до ${e.offer.checkout}`;for(let t of e.offer.features)n.append(a(t));for(let t of e.offer.photos)c.append(s(t));return t.querySelector(".popup__description").textContent=e.offer.description,t})(t))}}})(),(()=>{const e={WIDTH:50,HEIGHT:70},t=document.querySelector(".map").querySelector(".map__pins"),o=document.querySelector("#pin").content.querySelector(".map__pin"),r=t=>{const r=o.cloneNode(!0);return r.style.left=t.location.x+e.WIDTH/2+"px",r.style.top=t.location.y+e.HEIGHT+"px",r.querySelector("img").src=t.author.avatar,r.querySelector("img").alt=t.offer.title,r};window.pin={Pin:e,createPins:e=>{const o=document.createDocumentFragment();for(let t of e){const e=r(t);o.append(e),e.addEventListener("click",(()=>{window.card.createCard(t)}))}window.main.resetMap(),t.append(o)}}})(),(()=>{const e=document.querySelector(".map"),t=e.querySelector(".map__pin--main"),o=e.offsetWidth-32.5;t.addEventListener("mousedown",(function(e){e.preventDefault(),window.main.setMainAddress();let r={x:e.clientX,y:e.clientY};const n=e=>{e.preventDefault();const n=r.x-e.clientX,a=r.y-e.clientY,s=t.offsetLeft-n,c=t.offsetTop-a;r={x:e.clientX,y:e.clientY},s>=-32.5&&s<=o&&(t.style.left=s+"px"),c>=130&&c<=630&&(t.style.top=c+"px"),window.main.setMainAddress()},a=e=>{e.preventDefault(),document.removeEventListener("mousemove",n),document.removeEventListener("mouseup",a)};document.addEventListener("mousemove",n),document.addEventListener("mouseup",a)}))})(),(()=>{const e={ENTER:"Enter",ESCAPE:"Escape"},t=o=>{const r=document.querySelector(".error"),n=document.querySelector(".success"),a=document.querySelector(".popup");o.key===e.ESCAPE&&(o.preventDefault(),r&&r.remove(),n&&n.remove(),a&&a.remove(),document.removeEventListener("keydown",t))},o=e=>{e.target.parentElement.remove(),e.target.removeEventListener("click",o)};window.util={KeyButtons:e,getWordsEndings:(e,t)=>t[e%100>4&&e%100<20?2:[2,0,1,1,1,2][e%10<5?e%10:5]],onEscBtnClick:t,onMouseClick:()=>{document.querySelector(".success")?document.querySelector(".success").remove():document.querySelector(".error").remove()},onCloseBtnClick:o}})()})();