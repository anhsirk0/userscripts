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
  const CHANNEL_SEL = ".yt-content-metadata-view-model__metadata-row";
  const SHORTS_SEL = "ytd-rich-shelf-renderer";
  const INFO_SEL = ".yt-core-attributed-string";

  function debounce(method, delay) {
    clearTimeout(method._tId);
    method._tId = setTimeout(method, delay);
  }

  function handleIt(el) {
    // if (el.dataset.processed === "1") return;
    // el.dataset.processed = "1";

    const title = el.querySelector(TITLE_SEL)?.innerText ?? "";
    const channel = el.querySelector(CHANNEL_SEL)?.innerText ?? "";

    const notInterested = [
      "Screen Rant",
      "Ryan George",
      "Pitch Meeting",
      "Trevor Wallace",
      "Doctor Mike",
      "Comedy Central",
      "Key & Peele",
      "Samay",
      "Chris and Jack",
      "Brooklyn 99",
      "AGC ANDY",
    ];

    let remove = notInterested.some(
      (i) => channel.includes(i) || title.includes(i)
    );

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
    }
  }

  function handleAll(selector) {
    for (const el of document.querySelectorAll(selector)) {
      handleIt(el);
    }
  }

  function main() {
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
