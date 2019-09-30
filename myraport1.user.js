// ==UserScript==
// @name         myraport
// @namespace    https://gist.github.com/setyawan96/2ce69abf8d18291e9f10a854cc173525
// @version      1.0
// @description  Hanya mempermudah guru
// @author       Wawan
// @homepageURL  https://github.com/setyawan96/raport
// @updateURL    https://github.com/setyawan96/raport/raw/master/myraport.user.js
// @downloadURL  https://github.com/setyawan96/raport/raw/master/myraport.user.js
// @run-at       document-body
// @match        http://192.168.0.102*
// @match        http://192.168.100.225*
// @include      http://192.168.0.102*
// @include      http://192.168.100.225*
// @grant        none
// ==/UserScript==

(function() {
'use strict';
//get url user
var link = window.location.href;
var lban = link.length;
if (lban>40){
    var banding = link.slice(0, -32);
} else {
    var banding = link;
}

//set url pembending nya
var cocok1 = "http://192.168.0.102/guru/siswa";
var cocok2 = "http://192.168.100.225/guru/siswa";
var cocok3 = "http://192.168.0.102/guru/siswa/siswa_input_rapor/";
var cocok4 = "http://192.168.100.225/guru/siswa/siswa_input_rapor/";
//isi script per url (dicocokkan)
switch(banding) {
//pembanding pertama
    case cocok1:
    case cocok2:

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

       break;
//pembanding kedua
    case cocok3:
    case cocok4:

        //add att onchange spiritual
        var att1 = document.createAttribute("onchange");
        att1.value = "myspiritual()";
        document.getElementsByName("student_report_predicate_attitude_spiritual")[0].setAttributeNode(att1);
        //add att onchange sosial
        var att2 = document.createAttribute("onchange");
        att2.value = "mysosial()";
        document.getElementsByName("student_report_predicate_attitude_social")[0].setAttributeNode(att2);

        //fungsi injek spiritual sosial
        var isiinjek = 'var Hnama = localStorage.getItem("Hnama");\
\       var Ispiritual = "dalam kebiasaan berdo\'a sebelum belajar, ketaatan beribadah, perilaku bersyukur, meyakini kebesaran/ anugerah Alloh, toleransi beribadah, kebiasaan mengucap salam.";\
\       var Isosial = "dalam jujur, disiplin, tanggung jawab, peduli, santun, percaya diri.";\
\       function myspiritual() {\
\           var Sspiritual = document.getElementsByName("student_report_predicate_attitude_spiritual")[0].value;\
\           var Tspiritual = document.getElementsByName("student_report_description_attitude_spiritual")[0];\
\           var USspiritual = Sspiritual.toUpperCase();\
\           if (Sspiritual == "") {\
\               Tspiritual.value = "";\
\           } else {\
\               Tspiritual.value = "Ananda " + Hnama + " " + USspiritual + " " + Ispiritual;\
\           }\
\       }\
\       function mysosial() {\
\           var Ssosial = document.getElementsByName("student_report_predicate_attitude_social")[0].value;\
\           var Tsosial = document.getElementsByName("student_report_description_attitude_social")[0];\
\           var USsosial = Ssosial.toUpperCase();\
\           if (Ssosial == "") {\
\               Tsosial.value = "";\
\           } else {\
\               Tsosial.value = "Ananda " + Hnama + " " + USsosial + " " + Isosial;\
\         }}';

        var tm1 = document.createElement('script');
        tm1.text = isiinjek;
        document.getElementsByTagName('head')[0].appendChild(tm1);

        //add att onchange ekskul
        var eks = document.getElementsByName("eskul_id[]");
        var peks = document.getElementsByName("student_report_extracurricular[]");
        for (var i = 0; i < eks.length; i++){
           var att3 = document.createAttribute("onchange");
           var att4 = document.createAttribute("onchange");
           att3.value = "myeks('"+ i +"')";
           att4.value = "myeks('"+ i +"')";
           eks[i].setAttributeNode(att3);
           peks[i].setAttributeNode(att4);
       }
        //fungsi injek ekskul
        var isiinjek2 = 'var Hnama = localStorage.getItem("Hnama");\
\        var banjari = "dalam memahami tehnik dasar al-banjari.";\
\        var olahraga = "dalam memahami tehnik dasar olahraga.";\
\        var pramuka = "dalam memahami tehnik dasar kepramukaan.";\
\        var menggambar = "dalam memahami tehnik dasar menggambar.";\
\        var menari = "dalam memahami tehnik dasar menari.";\
\        function myeks(a){\
\            var Veks = document.getElementsByName("eskul_id[]")[a].value;\
\            var Vpeks= document.getElementsByName("student_report_extracurricular[]")[a].value;\
\            var Vdeks= document.getElementsByName("student_report_extracurricular_description[]")[a];\
\            switch(Veks) {\
\                case "53b560c22d89dd18ef8b9f3a6bc0f87f":\
\                    Vdeks.value = "Ananda "+Hnama+" "+Vpeks+" "+banjari;\
\                    break;\
\                case "5689296ca376d36a5d973bb490eaff10":\
\                    Vdeks.value = "Ananda "+Hnama+" "+Vpeks+" "+olahraga;\
\                    break;\
\                case "63e5c850856356157a316ead95e436e8":\
\                    Vdeks.value = "Ananda "+Hnama+" "+Vpeks+" "+pramuka;\
\                    break;\
\                case "b6ec633f474c5ab20002dae34a0a61f5":\
\                    Vdeks.value = "Ananda "+Hnama+" "+Vpeks+" "+menggambar;\
\                    break;\
\                case "fb2cebfb717d10de726067e5dfcfd191":\
\                    Vdeks.value = "Ananda "+Hnama+" "+Vpeks+" "+menari;\
\                    break;\
\                default:\
\                    Vdeks.value = "";}}';

        var tm2 = document.createElement('script');
        tm2.text = isiinjek2;
        document.getElementsByTagName('head')[0].appendChild(tm2);
    break;
//jika tak ada pembanding
    default:
      console.log("INJEK SCRIP AKTIF LO");
}

//end
})();
