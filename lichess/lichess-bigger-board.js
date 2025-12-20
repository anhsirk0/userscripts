// ==UserScript==
// @name         Lichess Bigger Board
// @version      2025-03-05
// @description  Lichess Bigger Board (to be used with autohide navbar)
// @author       Anhsirk0
// @match        https://lichess.org/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=lichess.org
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const style = document.createElement("style");
  style.textContent = `html { scrollbar-width: none !important }
body { ---zoom: 105 !important }`;
  document.head.append(style);
})();
