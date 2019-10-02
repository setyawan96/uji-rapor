// ==UserScript==
// @name         MyRaportBeta
// @namespace    https://github.com/setyawan96/raport
// @version      1.0
// @description  Hanya usaha untuk mempermudah guru
// @author       Wawan
// @homepageURL  https://github.com/setyawan96/raport
// @updateURL    https://github.com/setyawan96/raport/raw/master/MyRaportBeta.user.js
// @downloadURL  https://github.com/setyawan96/raport/raw/master/MyRaportBeta.user.js
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

/*****KUMPULAN VAR INJECT*****/
/*****KUMPULAN VAR INJECT*****/
//Var Inject html
var ihtml = '<div id="wrap-utama">\
\        <div id="wrap-konten" style="display: none;">\
\            <div id="konten1">\
\            	<label>Sikap Spiritual</label>\
\            	<textarea rows="3" cols="50" name="mysikap-spiritual" placeholder="Masukkan Deskripsi Sikap Spiritual" style="margin-top: 0px; margin-bottom: 0px; height: 54px;"></textarea>\
\            	<label>Sikap Sosial</label>\
\            	<textarea rows="3" cols="50" name="mysikap-sosial" placeholder="Masukkan Deskripsi Sikap Sosial" style="margin-top: 0px; margin-bottom: 0px; height: 54px;"></textarea>\
\            </div>\
\            <div id="konten2">\
\    		<div class="kol1">\
\            		<label>Setting auto description</label>\
\  			<input type="radio" name="pilihan-cus" value="auto" onclick="mychek()">Deskripis dari sistem<br>\
\ 			<input type="radio" name="pilihan-cus" value="manual" onclick="mychek()">Deskripsi saya sendiri<br>\
\                </div>\
\                <div class="kol2">\
\ 			<button onclick="mysmpn()">SIMPAN</button>\
\                </div>\
\		<div style="clear: both;"></div>\
\            </div>\
\        </div>\
\        <div id="wrap-tombol">\
\            <div id="tombol-des" onclick="mychek();mydisplay();">\
\                <a id="isi-tombol-des">Setting Description</a>\
\            </div>';

//var inject css
var icss = '#wrap-utama { position: fixed; top:0; right: 0; width: 420px; z-index: 999; margin: 0; }#wrap-konten { background: #f2f3f8; padding: 10px 10px 10px; border: #9bff06 solid 1px;}#wrap-utama label { display: block; font-weight: bold; margin: 5px 0 0;}#wrap-utama button { background:#5867dd; border-radius: 20px; color: #ffffff; margin-top: 5px; padding: 5px;}#konten1 { display: block; overflow: auto; height: 300px;}.kol1 { display: block; float: left; width: 70%;}.kol2 { display: block; float: right; width: 30%; padding-top: 20px}#tombol-des{ display: block; padding: 10px; background: #716aca; color: #ffffff; width: 150px; border-right: #9bff06 solid 2px; border-left: #9bff06 solid 2px; border-bottom: #9bff06 solid 2px; cursor: pointer;}';

//var inject function display hidden menu
var function1 ='/*function dispaly-hidden menu*/function mydisplay() { var display = document.getElementById("wrap-konten"); var tombol = document.getElementById("isi-tombol-des"); if (display.style.display === "none") { display.style.display = "block"; tombol.innerHTML = "Tutup Pengaturan"; } else { display.style.display = "none"; tombol.innerHTML = "Setting Description"; }}';
//var inject deskripsi master
var function2 ='/*set deskripsi spiritual-sosial dan ekstrakulikuler*/var Ispiritual = "dalam kebiasaan mengucap salam, ketaatan beribadah, perilaku bersyukur, kebiasaan berdo`a belajar, meyakini kebesaran/ anugerah Allah, dan toleransi beribadah.";var Isosial = "dalam percaya diri, jujur, disiplin, tanggung jawab, peduli, dan santun.";var ekstrakulikuler = [];ekstrakulikuler[0] = "dalam memahami teknik dasar al-banjari.";ekstrakulikuler[1] = "dalam memahami teknik dasar olahraga.";ekstrakulikuler[2] = "dalam memahami teknik dasar kepramukaan.";ekstrakulikuler[3] = "dalam memahami teknik dasar menggambar.";ekstrakulikuler[4] = "dalam memahami teknik dasar menari.";';
//var function setting
var function3 ='/*function pilihan setting*/ function mychek(){ var cdata = document.getElementsByName("pilihan-cus")[0].checked; var gsspiritual = document.getElementsByName("mysikap-spiritual")[0]; var gssosial = document.getElementsByName("mysikap-sosial")[0]; var gekskul = document.getElementsByName("ekskul[]"); if (cdata) { var isinya = true; var idspir = Ispiritual; var idsos = Isosial; var ideks = ekstrakulikuler; } else { var isinya = false; var idspir = localStorage.getItem("dspiritual"); var idsos = localStorage.getItem("dsosial"); var geteks = document.getElementsByName("eskul_id[]")[0].getElementsByTagName("option"); var ideks = []; for (var ae = 1; ae < geteks.length; ae++) { ideks[ae-1] = localStorage.getItem("deskul"+(ae-1)); } } gsspiritual.value = idspir; gssosial.value = idsos; gsspiritual.disabled = isinya; gssosial.disabled = isinya; for (var d = 0; d < gekskul.length; d++) { gekskul[d].value = ideks[d]; gekskul[d].disabled = isinya; }}';
//var function simpan
var function4 ='/*Function Simpan*/function mysmpn(){ var cdata = document.getElementsByName("pilihan-cus")[0].checked; var gsspiritual = document.getElementsByName("mysikap-spiritual")[0]; var gssosial = document.getElementsByName("mysikap-sosial")[0]; var gekskul = document.getElementsByName("ekskul[]"); if (cdata) { localStorage.setItem("setdes", "auto"); alert("Berhasil Menyimpan"); } else { localStorage.setItem("setdes", "manual"); localStorage.setItem("dspiritual", gsspiritual.value); localStorage.setItem("dsosial", gssosial.value); for (var ab = 0; ab < gekskul.length; ab++) { localStorage.setItem("deskul"+ab, gekskul[ab].value);} alert("Berhasil Menyimpan"); }}';
//var function ekskull
var function5 = '/*fungsi ekskul*/function myeks(a){ var Hnama = localStorage.getItem("Hnama"); var setting = localStorage.getItem("setdes"); var gseks = document.getElementsByName("eskul_id[]")[a]; var geteks = gseks.getElementsByTagName("option"); var gsindex = gseks.selectedIndex; var Veks = document.getElementsByName("eskul_id[]")[a].value; var Vpeks= document.getElementsByName("student_report_extracurricular[]")[a].value; var Vdeks= document.getElementsByName("student_report_extracurricular_description[]")[a];/*deskripsi ekskul auto-manual*/if (setting == "auto") {var deks = ekstrakulikuler;} else if (setting == "manual") { var deks = []; for (var ad = 1; ad < geteks.length; ad++){ deks[ad-1]=localStorage.getItem("deskul"+(ad-1)); }}/*penerapan auto description*/ for (var ac = 0; ac < geteks.length; ac++){ if (gsindex == 0) { Vdeks.value = ""; } else { if (gsindex == ac) { Vdeks.value = "Ananda "+Hnama+" "+Vpeks+" "+deks[ac-1]; } } }}';
//var function spiritual
var function6 = '/*fungsi spiritual*/function myspiritual() { var Hnama = localStorage.getItem("Hnama"); var setting = localStorage.getItem("setdes"); var Sspiritual = document.getElementsByName("student_report_predicate_attitude_spiritual")[0].value; var Tspiritual = document.getElementsByName("student_report_description_attitude_spiritual")[0]; if (setting == "auto") { var isides = Ispiritual; } else if (setting == "manual") { var isides = localStorage.getItem("dspiritual"); } if (Sspiritual == "") { Tspiritual.value = ""; } else { Tspiritual.value = "Ananda " + Hnama + " " + Sspiritual + " " + isides; }}';
//var function sosial
var function7 = '/*fungsi sosial*/function mysosial() { var Hnama = localStorage.getItem("Hnama"); var setting = localStorage.getItem("setdes"); var Ssosial = document.getElementsByName("student_report_predicate_attitude_social")[0].value; var Tsosial = document.getElementsByName("student_report_description_attitude_social")[0]; if (setting == "auto") { var isides = Isosial; } else if (setting == "manual") { var isides = localStorage.getItem("dsosial"); } if (Ssosial == "") { Tsosial.value = ""; } else { Tsosial.value = "Ananda " + Hnama + " " + Ssosial + " " + isides; }}';
/*****END KUMPULAN VAR INJECT*****/

/*****KUMPULAN cmd INJECT*****/
//inject css command
var inj = document.createElement('style');
inj.type = 'text/css';
inj.appendChild(document.createTextNode(icss));
document.getElementsByTagName('head')[0].appendChild(inj);
//inject html command
var getbody = document.getElementsByTagName("body")[0];
getbody.insertAdjacentHTML("beforeend",ihtml);
//inject auto ekskul description fom
var aaa = document.getElementsByName("eskul_id[]")[0];
var geteks = aaa.getElementsByTagName("option");
for (var ay = 1; ay < geteks.length; ay++) {
    var geteteks = geteks[ay].innerHTML;
    var adda = '<label>Deskripsi '+geteteks+'</label><textarea rows="3" cols="50" name="ekskul[]" placeholder="Masukkan Deskripsi '+geteteks+'" style="margin-top: 0px; margin-bottom: 0px; height: 54px;"></textarea>';
    var tamdes = document.getElementById("konten1");
    tamdes.insertAdjacentHTML("beforeend",adda);
}
//inject script1
var injscp1 = document.createElement('script');
    injscp1.text = function1;
    document.getElementsByTagName('head')[0].appendChild(injscp1);
//inject script2
var injscp2 = document.createElement('script');
    injscp2.text = function2+function3+function4+function5+function6+function7;
    document.getElementsByTagName('head')[0].appendChild(injscp2);
/*****END KUMPULAN cmd INJECT*****/

/*****COMMAND non INJECT*****/
//Awal cek setting dan cek data localStorage
var cdlocal = localStorage.getItem("setdes");
var ekskul = document.getElementsByName("ekskul[]");
if (cdlocal == null) {localStorage.setItem("setdes", "auto");}
if (cdlocal !== "auto") {
    document.getElementsByName("pilihan-cus")[1].checked="true";
    } else {
    document.getElementsByName("pilihan-cus")[0].checked="true";
    }
//Injek onchange spiritual
var att1 = document.createAttribute("onchange");
att1.value = "myspiritual()";
document.getElementsByName("student_report_predicate_attitude_spiritual")[0].setAttributeNode(att1);
//injek onchange sosial
var att2 = document.createAttribute("onchange");
att2.value = "mysosial()";
document.getElementsByName("student_report_predicate_attitude_social")[0].setAttributeNode(att2);
//Injek tombol onchange ekstrakulikuler
var eks = document.getElementsByName("eskul_id[]");
var peks = document.getElementsByName("student_report_extracurricular[]");
for (var i = 0; i < eks.length; i++){
           var atte1 = document.createAttribute("onchange");
           var atte2 = document.createAttribute("onchange");
           atte1.value = "myeks('"+ i +"')";
           atte2.value = "myeks('"+ i +"')";
           eks[i].setAttributeNode(atte1);
           peks[i].setAttributeNode(atte2);
       }
/*****END COMMAND non INJECT*****/


    break;
//jika tak ada pembanding
    default:
      console.log("INJEK SCRIP AKTIF LO");
}

//end semua
})();
