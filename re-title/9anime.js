// ==UserScript==
// @name         Retitle 9animetv
// @namespace    http://tampermonkey.net/
// @version      2025-01-05
// @description  Fix document title
// @author       You
// @match        https://9animetv.to/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=netlify.app
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  // let logsCount = 0;
  // const log = (text) => {
  //   let el = document.createElement("a");
  //   el.innerHTML = text;
  //   el.style.fontSize = "1rem";
  //   el.style.padding = "0.8rem";
  //   el.style.backgroundColor = "#5a2e98";
  //   el.style.color = "#EFEFEF";
  //   el.style.zIndex = "9999";
  //   el.style.position = "fixed";
  //   el.style.top = `${1 + 4.4 * logsCount}rem`;
  //   el.style.left = "1rem";
  //   el.style.borderRadius = "0.5rem";
  //   document.body.appendChild(el);
  //   logsCount++;
  // };

  const getName = () => {
    let name = "";
    const nameEl = document.querySelector("h2.film-name.dynamic-name");
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
      const ep = Number(episodeEl.dataset.number);
      if (ep) name = ep + "_" + name;
    }
    return name;
  };

  const chooseVidcloud = () => {
    const btns = document.querySelectorAll(".server-item[data-type='dub']>a");
    const btn = Array.from(btns).find((a) => a.innerHTML === "Vidcloud");
    if (btn) btn.click();
  };

  const clickNextButton = () => {
    const episodeEl = document.querySelector(".ep-item.active");
    if (!episodeEl) return;

    const episodes = Array.from(document.querySelectorAll(".episodes-ul>a"));
    const ep = Number(episodeEl.dataset.number);

    const nextEpLink = episodes.find((a) => a.dataset.number === `${ep + 1}`);
    if (nextEpLink) nextEpLink.click();
  };

  const addNextButton = () => {
    const prev = document.getElementById("next-episode-btn");
    if (prev) document.removeElement(prevA);

    const btn = document.createElement("div");
    btn.id = "next-episode-btn";
    btn.innerHTML = ">";
    btn.style.width = "2rem";
    btn.style.height = "2rem";
    btn.style.display = "flex";
    btn.style.alignItems = "center";
    btn.style.justifyContent = "center";
    btn.style.boxShadow =
      "box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;";
    btn.style.fontSize = "1.6rem";
    btn.style.padding = "0.6rem";
    btn.style.backgroundColor = "#5a2e98";
    btn.style.color = "#EFEFEF";
    btn.style.zIndex = "9999";
    btn.style.position = "fixed";
    btn.style.bottom = "1rem";
    btn.style.left = "1rem";
    btn.style.borderRadius = "50%";
    btn.style.cursor = "pointer";
    btn.onclick = clickNextButton;
    document.body.appendChild(btn);
  };

  const main = () => {
    document.title = getName();
    setTimeout(addNextButton, 1111);
    setTimeout(chooseVidcloud, 2222);
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
