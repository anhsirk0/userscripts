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
  const toName = (str) => str.replaceAll(" ", "_");
  const getInnerText = (str) => document.querySelector(str)?.innerText;

  const addStyles = () => {
    const style = document.createElement("style");
    style.textContent = `#next-episode-button {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
  font-size: 24px;
  padding: 10px;
  background-color: #bc0000;
  color: #eeeeee;
  z-index: 99999;
  position: fixed;
  bottom: 16px;
  left: 16px;
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
    let name = getInnerText(".ploting > h1");
    if (!name) return toName(docTitle.split(" - ")[0]);

    const yearEl = getInnerText("b + span");
    if (yearEl && yearEl.match(/\d+/)) name = `${name}_─_${yearEl.innerText}`;
    return toName(name);
  };

  const getSeriesName = (docTitle) => {
    let info = getInnerText(".ploting > h1");
    if (!info) return toName(docTitle.split(" - ")[0]);

    let match = info.match(/^(.*) - Season (\d+) Episode (\d+)/);
    if (!match) return toName(info);
    let [, name, season, epNum] = match;

    match = info.match(/^.*\n(.*)/);
    if (!match) return toName(`${epNum}__${name}__S${season}`);

    const epName = match[1];
    if (epName && !epName.includes("Season") && !epName.includes("Episode"))
      return toName(`${epNum}__${epName}__${name}__S${season}`);
    return toName(`${epNum}__${name}__S${season}`);
  };

  const clickNextButton = () => {
    const btn = document.getElementById("nextEpisodeButton");
    if (btn) btn.click();
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

  const main = () => {
    document.title = location.href.includes("/movie/")
      ? getMovieName(document.title)
      : getSeriesName(document.title);
    addNextButton();
  };

  addStyles();
  setTimeout(main, 400);
})();
