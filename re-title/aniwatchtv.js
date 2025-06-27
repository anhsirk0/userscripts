// ==UserScript==
// @name         Retitle aniwatchtv
// @namespace    http://tampermonkey.net/
// @version      2025-01-05
// @description  Fix document title
// @author       Anhsirk0
// @match        https://aniwatchtv.to/*
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
  background-color: #5a2e98;
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

  const getName = () => {
    let name = "";
    const nameEl = document.querySelector("h2.film-name>a.dynamic-name");
    if (nameEl) {
      name = nameEl.innerHTML.replaceAll(" ", "_");
      // name = (nameEl.dataset.jname ?? nameEl.innerHTML).replaceAll(" ", "_");
    }
    if (!name) {
      const urlName = location.href.split("/").at(-1) ?? "Anime";
      name = urlName.split("-").slice(0, -1).join("_");
    }

    const episodeEl = document.querySelector(".ep-item.active");
    if (episodeEl) {
      let ep = Number(episodeEl.dataset.number);
      if (ep) name = `${ep}__${name}`;
    }
    return name;
  };

  const clickNextButton = () => {
    const episodeEl = document.querySelector(".ep-item.active");
    if (!episodeEl) return;

    const episodes = Array.from(document.querySelectorAll("a.ep-item"));
    const ep = Number(episodeEl.dataset.number);

    const nextEpLink = episodes.find((a) => a.dataset.number === `${ep + 1}`);
    if (nextEpLink) nextEpLink.click();
  };

  const addNextButton = () => {
    const prev = document.getElementById("next-episode-btn");
    if (prev) document.removeElement(prevA);

    const btn = document.createElement("div");
    btn.id = "next-episode-button";
    btn.innerHTML = ">";
    btn.onclick = clickNextButton;
    document.body.appendChild(btn);
  };

  const main = () => {
    document.title = getName();
    setTimeout(addNextButton, 1111);
  };

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
