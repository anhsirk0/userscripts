// ==UserScript==
// @name         Retitle hydrahd
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
    console.log("GetName::enter");
    const el = document.querySelector(".ploting > h1");
    if (el) {
      if (location.href.includes("/movie/")) {
        let name = el.innerText.replaceAll(" ", "_");

        const yearEl = document.querySelector("b + span");
        if (yearEl && yearEl.innerText.match(/\d+/)) {
          name = `${name}_─_${yearEl.innerText}`;
        }
        console.log("GetName::exit");
        return name;
      }

      let match = el.innerText.match(/^(.*) - Season (\d+) Episode (\d+)/);
      if (!match) return el.innerText.replaceAll(" ", "_");

      let [, name, season, episode] = match;
      name = name.replaceAll(" ", "_");
      console.log("GetName::exit");
      return `${episode}__${name}__S${season}`;
    }

    let name = docTitle.split(" - ")[0].replaceAll(" ", "_");
    const splitted = location.href.split("?")[0].split("/");
    const season = splitted.at(-3);
    const episode = splitted.at(-1);

    if (season && episode) {
      name = `${episode}__${name}__S${season}`;
    }
    console.log("GetName::exit");
    return name;
  };

  const main = () => {
    console.log("Main::enter");
    document.title = getName(document.title);
    console.log("Main::enter");
  };

  setTimeout(main, 1000);
})();
