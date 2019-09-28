// ==UserScript==
// @name         Skripku
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://*/*
// @grant        none
// ==/UserScript==

(function() {

    // Your code here...

    //get tag elment
var tamb = document.getElementsByTagName("tr");

//add att per elment
for (var x = 0; x < tamb.length; x++){
    var att = document.createAttribute("onclick");
        att.value = "myNamaku(this)";
        tamb[x].setAttributeNode(att);
}

//fungsi injek onclick + simpan localStorage
var tm = document.createElement('script');
tm.text = "function myNamaku(a) {var hnama= a.getElementsByTagName('td')[1].innerHTML;localStorage.setItem('Hnama',hnama);}";
document.getElementsByTagName('head')[0].appendChild(tm);


})();
