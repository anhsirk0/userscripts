// ==UserScript==
// @name         Retitle flixter
// @version      2025-03-05
// @description  Fix document title
// @author       Anhsirk0
// @match        https://flixter.ac/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=netlify.app
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const addStyles = () => {
    const style = document.createElement("style");
    style.textContent = `#next-episode-button {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    rgba(0, 0, 0, 0.2) 0px 12px 28px 0px,
    rgba(0, 0, 0, 0.1) 0px 2px 4px 0px,
    rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
  font-size: 1.6rem;
  padding: 0.6rem;
  background-color: #56825f;
  color: #eeeeee;
  z-index: 99999;
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  border: none;
  border-radius: 50%;
  transition: all 300ms ease-in;
}

#next-episode-button:active {
  transform: scale(1.2);
}`;
    document.head.append(style);
  };

  const toUnderscores = (str) => str.replaceAll(" ", "_");

  const getMovieName = () => {
    console.log("GetMovieName::enter");
    const el = document.querySelector(".heading-name > a");
    let name = toUnderscores(el.innerText);
    const released = Array.from(document.querySelectorAll(".row-line")).find(
      (el) => el.innerText.startsWith("Released")
    ).innerText;

    const yearMatch = released.match(/Released: (\d+)-.*/);
    if (yearMatch) {
      console.log("GetMovieName::yearMatch");
      name = `${name}_─_${yearMatch[1]}`;
    }
    console.log("GetMovieName::exit");
    return name;
  };

  const getSeriesName = () => {
    console.log("GetSeriesName::enter");
    const info = document.querySelector(".heading-name > a").innerText;
    let match = info.match(/^(.*) - Season (\d+)/);
    let [, name, season] = match;

    const epInfo = document.querySelector(".eps-item.active strong").innerText;
    if (!epInfo) {
      console.log("GetSeriesName::exit");
      return toUnderscores(`${name}__S${season}`);
    }

    match = epInfo.match(/Eps (\d+) :/);
    let [, episode] = match;
    console.log("GetSeriesName::exit");
    return toUnderscores(`${episode}__${name}__S${season}`);
  };

  const clickNextButton = () => {
    const episodeEl = document.querySelector(".eps-item.active");
    if (!episodeEl) return;

    const episodes = Array.from(
      document.querySelectorAll(".nav.ps-container>li>a")
    );
    const ep = Number(episodeEl.dataset.id);

    const nextEpLink = episodes.find((a) => a.dataset.id === `${ep + 1}`);
    if (nextEpLink) nextEpLink.click();
  };

  const addNextButton = () => {
    const prev = document.getElementById("next-episode-button");
    if (prev) document.removeElement(prev);

    const btn = document.createElement("button");
    btn.id = "next-episode-button";
    btn.innerHTML = ">";
    btn.onclick = clickNextButton;
    document.body.appendChild(btn);
  };

  const chooseMegacloud = () => {
    const btns = document.querySelectorAll(".dp-s-line > .nav > .nav-item > a");
    const btn = Array.from(btns).find((a) => a.title.includes("MegaCloud"));
    if (btn) btn.click();
  };

  const main = () => {
    console.log("Main::enter");
    const name = location.href.includes("/movie/")
      ? getMovieName()
      : getSeriesName();
    document.title = name;
    setTimeout(addNextButton, 1111);
    setTimeout(chooseMegacloud, 2222);
    console.log("Main::enter");
  };

  addStyles();
  setTimeout(() => {
    main();
    let previousUrl = "";
    const observer = new MutationObserver(function (mutations) {
      if (location.href !== previousUrl) {
        previousUrl = location.href;
        main();
      }
    });
    observer.observe(document, { subtree: true, childList: true });
  }, 1000);
})();
