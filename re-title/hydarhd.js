// ==UserScript==
// @name         Retitle hydrahd
// @namespace    http://tampermonkey.net/
// @version      2025-03-05
// @description  Fix document title
// @author       Anhsirk0
// @match        https://hydrahd.sh/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=netlify.app
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const getName = (docTitle) => {
    const el = document.querySelector(".ploting > h1");
    if (el) {
      if (location.href.includes("/movie/")) {
        let name = el.innerText.replaceAll(" ", "_");

        const yearEl = document.querySelector("b + span");
        if (yearEl && yearEl.innerText.match(/\d+/)) {
          name = `${name}__${yearEl.innerText}`;
        }
        return name;
      }

      let match = el.innerText.match(/^(.*) - Season (\d+) Episode (\d+)/);
      if (!match) return el.innerText.replaceAll(" ", "_");

      let [, name, episode, season] = match;
      return `${episode}__${name}__S${season}`;
    }

    let name = docTitle.split(" - ")[0].replaceAll(" ", "_");
    const splitted = location.href.split("?")[0].split("/");
    const season = splitted.at(-3);
    const episode = splitted.at(-1);

    if (season && episode) {
      name = `${episode}__${name}__S${season}`;
    }
    return name;
  };

  const main = () => {
    document.title = getName(document.title);
  };

  setTimeout(main, 1000);
})();
