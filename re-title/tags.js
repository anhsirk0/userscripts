// ==UserScript==
// @name         Extract tag
// @version      2025-01-05
// @description  Extract tags!
// @author       Anhsirk0
// @match        https://9gag.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=netlify.app
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const main = () => {
    const tagsEl = document.querySelector(".post-tags");
    if (tagsEl) {
      let counter = 0;
      for (const child of tagsEl.children) {
        const text = child.innerText;
        const isDigits = /^\d+$/.test(text);
        if (isDigits) {
          let el = document.createElement("div");
          el.innerHTML = text;
          el.style.fontSize = "2rem";
          el.style.padding = "0.8rem";
          el.style.backgroundColor = "#282C34";
          el.style.color = "#98C379";
          el.style.zIndex = "9999";
          el.style.position = "fixed";
          el.style.bottom = `${1 + 4.4 * counter}rem`;
          el.style.right = "1rem";
          el.style.borderRadius = "0.5rem";
          el.style.userSelect = "all";

          document.body.appendChild(el);
          counter++;
        }
      }
    }
  };

  setTimeout(main, 200);
})();
