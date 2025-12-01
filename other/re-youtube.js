// ==UserScript==
// @name         Re-Youtube
// @version      2025-01-05
// @description  Remove shorts, unwanted videos, junk videos etc
// @author       Anhsirk0
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  const TITLE_SEL = ".yt-lockup-metadata-view-model__heading-reset";
  const METADATA_SEL = ".yt-lockup-view-model__metadata";
  const CHANNEL_SEL = ".yt-content-metadata-view-model__metadata-row";
  const SHORTS_SEL = "ytd-rich-shelf-renderer";
  const INFO_SEL = ".yt-core-attributed-string";
  const BADGE_SEL = "yt-badge-shape__text";
  const KEY = "yt-junk";

  let NOT_INTERESTED = [
    "some keywords",
    "channel name",
    "#tagname",
    /some regex/,
  ];
  let JUNK_CHANNELS = [];

  function addStyles() {
    const style = document.createElement("style");
    style.textContent = `.add-channel-to-blacklist-button {
all: unset;
position: absolute;
bottom: 4px;
right: 4px;
padding: 4px 8px;
background-color: #7030AF;
color: #FFFFFF;
box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
display: none;
cursor: pointer;
border-radius: 4px;
font-size: 1.6rem;
}

${METADATA_SEL}:hover .add-channel-to-blacklist-button {
display: inline-block;
}
`;
    document.head.append(style);
  }

  function debounce(method, delay) {
    clearTimeout(method._tId);
    method._tId = setTimeout(method, delay);
  }

  function getJunkChannelsFromLocalStorage() {
    const namesStr = localStorage.getItem(KEY) || "";
    try {
      const parsed = JSON.parse(namesStr);
      if (Array.isArray(parsed)) {
        return parsed.filter((it) => typeof it === "string");
      }
    } catch {
      return [];
    }
  }

  function addBlacklistButton(el, channel) {
    const container = el.querySelector(METADATA_SEL);
    if (!container) return;
    let button = document.createElement("button");
    button.textContent = "Junk";
    button.classList.add("add-channel-to-blacklist-button");
    button.onclick = function () {
      const junkChannels = getJunkChannelsFromLocalStorage().concat(channel);
      localStorage.setItem(KEY, JSON.stringify(junkChannels));
      el.remove();
    };
    container.appendChild(button);
  }

  function handleOne(el) {
    const title = el.querySelector(TITLE_SEL)?.innerText ?? "";
    const channel = el.querySelector(CHANNEL_SEL)?.innerText ?? "";

    let remove =
      NOT_INTERESTED.some((it) => {
        if (it instanceof RegExp) return it.test(channel) || it.test(title);
        else return channel.includes(it) || title.includes(it);
      }) || JUNK_CHANNELS.includes(channel);

    const views = Array.from(el.querySelectorAll(INFO_SEL))
      .filter((e) => e.innerText.includes("views"))
      .at(0)?.innerText;
    const watching = Array.from(el.querySelectorAll(INFO_SEL))
      .filter((e) => e.innerText.includes("watching"))
      .at(0)?.innerText;

    if (views) {
      const [count] = views.split(" ");
      if (!isNaN(Number(count)) && !channel.includes("prot")) {
        remove = true;
      }
    }
    if (watching) {
      const [count] = watching.split(" ");
      if (!isNaN(Number(count)) && !channel.includes("prot")) {
        remove = true;
      }
    }

    if (remove) {
      console.log(`${channel}'s video removed: ${title}`);
      el.remove();
    } else {
      addBlacklistButton(el, channel);
    }
  }

  function handleAll(selector) {
    for (const el of document.querySelectorAll(selector)) {
      handleOne(el);
    }
  }

  function main() {
    addStyles();
    getJunkChannelsFromLocalStorage().forEach((it) => JUNK_CHANNELS.push(it));
    // const base = "https://www.youtube.com/watch?";
    const shorts = document.querySelector(SHORTS_SEL);
    if (shorts) {
      console.log("shorts video removed");
      shorts.remove();
    }
    if (location.href.includes("watch")) handleAll("yt-lockup-view-model");
    else handleAll("ytd-rich-item-renderer");
  }

  setTimeout(main, 200);
  window.addEventListener("scroll", () => debounce(main, 400));
})();
