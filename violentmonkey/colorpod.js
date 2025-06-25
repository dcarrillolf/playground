// ==UserScript==
// @name        CheckPOD Colors
// @namespace   Violentmonkey Scripts
// @match       https://liferay-support.zendesk.com/*
// @grant       none
// @version     1.0
// @author      -
// @description 9/19/2024, 1:51:51 PM
// ==/UserScript==

function setPodBackground(background, quickWin) {
   var curSelector = document.querySelector("#main_navigation nav");
   if (curSelector && typeof background == "undefined") {
      curSelector.style.background="rgb(3, 54, 61)";
   } else {
      curSelector.style.background=background;
   }

   if (curSelector && curSelector.firstElementChild && quickWin) {
      curSelector.firstElementChild.style.color="yellow";
      curSelector.firstElementChild.style.fill="yellow";
      curSelector.style.background="linear-gradient("+background+" 0%, "+background+" 75%, yellow 90%, yellow 100%)";
   } else {
      curSelector.firstElementChild.style.color="rgb(216, 220, 222)";
      curSelector.firstElementChild.style.fill="rgb(216, 220, 222)";
   }


}


function customCheckPod(ticketId) {
    var element = document.querySelector(".property_box[data-ticket-id='"+ticketId+"'] .ember-view.form_field.lesa-ui-form-field.lesa-ui-suborganization>div");
    if (element) {
        var quickWin = document.querySelector("div.lesa-ui-priority[data-ticket-id='"+ticketId+"'] span.lesa-ui-quickwin") !== null;
        if (element.textContent === "Spain Pod C") {
           setPodBackground("rgb(0 144 64)", quickWin);
        } else if (element.textContent === "Spain Pod A") {
           setPodBackground("rgb(16 192 192)", quickWin);
        } else {
           setPodBackground();
        }
    }
}

function customCheckTicket() {
    var ticketPath = '/agent/tickets/';
    if (document.location.pathname.indexOf(ticketPath) == 0) {
        var ticketId = document.location.pathname.substring(ticketPath.length);
        var pos = ticketId.indexOf('/');
        if (pos == -1) {
            customCheckPod(Number(ticketId));
        } else {
          setPodBackground();
        }
    } else {
      setPodBackground();
    }
}


function customUpdateZendeskUI() {
    var pathname = unsafeWindow.location.pathname;
    if (pathname.indexOf('/agent/') == 0) {
        customCheckTicket();
    }
}

setInterval(customUpdateZendeskUI, 1000);

