// ==UserScript==
// @name         Replace list links with regular links
// @namespace    http://tampermonkey.net/
// @version      2025-01-05
// @description  Replace list links with regular links on youtube
// @author       Anhsirk0
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=netlify.app
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const addStyles = () => {
    const style = document.createElement("style");
    style.textContent = `#clean-urls-button {
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

#clean-urls-button:active {
  transform: scale(1.2);
}`;
    document.head.append(style);
  };

  const reloadWithouList = () => {
    const base = "https://www.youtube.com/watch?";
    if (location.href.includes("&list=")) {
      const videoId = location.href.split("v=")[1].split("&")[0];
      if (videoId) {
        location.href = `${base}v=${videoId}`;
      }
    }
  };

  const updateLinks = () => {
    console.log("UpdateLinks::enter");
    const base = "https://www.youtube.com/watch?";
    Array.from(document.querySelectorAll("a"))
      .filter((el) => el.href.startsWith(base) && el.href.includes("&list"))
      .forEach((el) => {
        const prevLink = el.href;
        // const match = prevLink.match(new RegExp("^.*watch\?v=(.*)&list.*$"));
        const videoId = prevLink.split("v=")[1].split("&")[0];
        if (videoId) {
          console.log("UpdateLinks::match");
          el.href = `${base}v=${videoId}`;
          console.log("UpdateLinks::updated %s", el);
        }
      });
    console.log("UpdateLinks::exit");
  };

  const addCleanUrlsButton = () => {
    console.log("addCleanUrlsButton::enter");
    const prev = document.getElementById("clean-urls-button");
    if (prev) document.removeElement(prevA);

    const btn = document.createElement("button");
    btn.id = "clean-urls-button";
    btn.innerHTML = "❄️";
    btn.onclick = updateLinks;
    document.body.appendChild(btn);
    console.log("addCleanUrlsButton::exit");
  };

  const main = () => {
    console.log("Main::enter");
    reloadWithouList();
    setTimeout(updateLinks, 2000);
    setTimeout(addCleanUrlsButton, 1111);
    console.log("Main::exit");
  };

  setTimeout(() => {
    addStyles();
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
