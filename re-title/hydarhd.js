// ==UserScript==
// @name         Retitle hydrahd
// @namespace    http://tampermonkey.net/
// @version      2025-01-05
// @description  Fix document title
// @author       You
// @match        https://hydrahd.me/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=netlify.app
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const getName = (docTitle) => {
    let name = docTitle.split(" - ")[0].replaceAll(" ", "_");

    const splitted = location.href.split("?")[0].split("/");
    const season = splitted.at(-3);
    const episode = splitted.at(-1);

    if (season && episode) {
      name = `${episode}_${name}_S${season}`;
    }
    return name;
  };

  const main = () => {
    document.title = getName(document.title);
  };

  setTimeout(main, 800);
})();
