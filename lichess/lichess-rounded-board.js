// ==UserScript==
// @name         Lichess Rounded Board
// @version      2025-03-05
// @description  Lichess Rounded Board
// @author       Anhsirk0
// @match        https://lichess.org/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=lichess.org
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const style = document.createElement("style");
  style.textContent = `cg-board { border-radius: 20px !important }`;
  document.head.appendChild(style);
})();
