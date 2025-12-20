// ==UserScript==
// @name         Lichess Autohide top navbar
// @version      2025-03-05
// @description  Lichess Autohide top navbar to get more space for the board
// @author       Anhsirk0
// @match        https://lichess.org/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=lichess.org
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const style = document.createElement("style");
  style.textContent = `#main-wrap.autohide { margin-top: 24px !important }
header#top.autohide { transform: translateY(-48px) !important }
header#top.autohide:hover { transform: translateY(0) !important }
header#top.autohide .signup {
 box-shadow: none !important;
 border: none !important;
 }
`;
  document.head.appendChild(style);

  function onScroll() {
    const html = document.querySelector("html");
    const header = document.querySelector("header#top");
    const wrap = document.querySelector("#main-wrap");
    if (html.scrollTop < 20) {
      header.classList.add("autohide");
      wrap.classList.add("autohide");
    } else {
      header.classList.remove("autohide");
      wrap.classList.remove("autohide");
    }
  }

  onScroll();
  window.addEventListener("scroll", onScroll);
})();
