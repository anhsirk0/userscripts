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
  style.textContent = `
cg-board { border-radius: 20px !important }
html { scrollbar-width: none !important }
#main-wrap { margin-top: 24px !important }
header#top { transform: translateY(-48px) !important }
header#top:hover { transform: translateY(0) !important }
body { ---zoom: 105 !important }
`;
  document.head.append(style);
})();
