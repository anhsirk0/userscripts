// ==UserScript==
// @name         Replace list links with regular links
// @version      2025-01-05
// @description  Replace list links with regular links on youtube
// @author       Anhsirk0
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=netlify.app
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const reloadIfList = () => {
    const base = "https://www.youtube.com/watch?";
    if (location.href.includes("&list=")) {
      const videoId = location.href.split("v=")[1].split("&")[0];
      if (videoId) {
        location.href = `${base}v=${videoId}`;
      }
    }
  };

  const onClick = (e) => {
    console.log("OnClick::enter");
    console.log(e);
    console.log("OnClick::exit");
  };

  // const updateLinks = () => {
  //   console.log("UpdateLinks::enter");
  //   const base = "https://www.youtube.com/watch?";
  //   Array.from(document.querySelectorAll("a"))
  //     .filter((el) => el.href.startsWith(base) && el.href.includes("&list"))
  //     .forEach((el) => {
  //       const prevLink = el.href;
  //       // const match = prevLink.match(new RegExp("^.*watch\?v=(.*)&list.*$"));
  //       const videoId = prevLink.split("v=")[1].split("&")[0];
  //       if (videoId) {
  //         console.log("UpdateLinks::match");
  //         el.href = `${base}v=${videoId}`;
  //         console.log("UpdateLinks::updated %s", el);
  //       }
  //     });
  //   console.log("UpdateLinks::exit");
  // };

  const main = () => {
    console.log("Main::enter");
    reloadIfList();
    console.log("Main::exit");
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
  }, 200);
})();
