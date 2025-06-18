// ==UserScript==
// @name         Reddit extra buttons
// @namespace    http://tampermonkey.net/
// @version      2025-01-05
// @description  Add extra buttons
// @author       You
// @match        https://www.reddit.com/r/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=netlify.app
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const makeButton = (title, url) => {
    console.log(`makeButton::(title=${title}, url=${url})`);
    let btn = document.createElement("a");
    btn.href = url;
    btn.innerText = title;
    btn.title = title;
    btn.classList.add(
      "button",
      "button-small",
      "button-plain",
      "items-center",
      "justify-center",
      "inline-flex",
      "px-sm",
      "text-neutral-content-weak"
    );
    // btn.onclick = () => {
    //   window.location.href = url;
    // };
    console.log("makeButton::exit");
    return btn;
  };

  const makeUrl = (sub, time) =>
    `https://www.reddit.com/r/${sub}/top/?t=${time}`;

  const main = () => {
    const id = "reddit-extra-buttons";
    console.log("Main::enter");
    const slot = document.querySelector("*[bundlename=shreddit_sort_dropdown]");
    if (!slot || !slot.children) return console.log("Main::exit(no slot)");

    const div = slot.children[0];
    if (!div) return console.log("Main::exit(no slot children)");

    const subreddit = location.href
      .replace(new RegExp("^.*reddit.com\/r\/"), "")
      .split("/")[0];
    if (!subreddit) return console.log("Main::exit(no subreddit)");

    if (document.getElementById(id))
      return console.log("Main::exit(buttons already exists)");

    let buttons = document.createElement("div");
    buttons.id = id;
    buttons.classList.add("flex", "items-center");

    buttons.appendChild(makeButton("Top: All Time", makeUrl(subreddit, "all")));
    buttons.appendChild(makeButton("Top: Year", makeUrl(subreddit, "year")));
    buttons.appendChild(makeButton("Top: Month", makeUrl(subreddit, "month")));
    buttons.appendChild(makeButton("Top: Week", makeUrl(subreddit, "week")));
    buttons.appendChild(makeButton("Top: Day", makeUrl(subreddit, "day")));

    div.appendChild(buttons);
    console.log("Main::exit");
  };

  setTimeout(() => {
    main();
    let previousUrl = location.href;
    const observer = new MutationObserver(function (mutations) {
      if (location.href !== previousUrl) {
        previousUrl = location.href;
        main();
      }
    });
    observer.observe(document, { subtree: true, childList: true });
  }, 1000);
})();
