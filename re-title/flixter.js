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
  const toName = (str) => str.replaceAll(" ", "_");
  const getInnerText = (str) => document.querySelector(str)?.innerText;

  const addStyles = () => {
    const style = document.createElement("style");
    style.textContent = `#next-episode-button {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
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

  const getMovieName = (docTitle) => {
    let name = getInnerText(".heading-name > a") || docTitle;
    const released = Array.from(document.querySelectorAll(".row-line")).find(
      (el) => el.innerText.startsWith("Released")
    )?.innerText;

    const yearMatch = released.match(/Released: (\d+)-.*/);
    if (yearMatch) {
      name = `${name}_─_${yearMatch[1]}`;
    }
    return toName(name);
  };

  const getSeriesName = (docTitle) => {
    let info = getInnerText(".heading-name > a") || docTitle;
    let match = info.match(/^(.*) - Season (\d+)/);
    if (!match) return toName(docTitle);
    let [, seriesName, season] = match;

    const epInfo = document.querySelector(".eps-item.active").title;
    if (!epInfo) {
      return toName(`${seriesName}__S${season}`);
    }

    match = epInfo.match(/Eps (\d+): (.*)/);
    if (!match) return toName(name);
    let [, episode, epName] = match;
    let name = `${episode}`;
    if (epName) name = `${name}__${epName}`;
    name = `${name}__${seriesName}__S${season}`;

    return toName(name);
  };

  const clickNextButton = () => {
    const activeEp = document.querySelector(".eps-item.active");
    if (!activeEp) return;

    const episodes = Array.from(
      document.querySelectorAll("div.active>ul.nav.ps-container>li>a")
    );
    const nextIdx = episodes.findIndex(
      (a) => a.dataset.id === activeEp.dataset.id
    );
    episodes.at(nextIdx + 1)?.click();
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
    document.title = location.href.includes("/movie/")
      ? getMovieName(document.title)
      : getSeriesName(document.title);
    setTimeout(addNextButton, 1111);
    setTimeout(chooseMegacloud, 2222);
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
  }, 400);
})();
