var words=['word1','word2','word3','word4','word5','word6','word7','word8','word9','word10'];
var mic=['mic1','mic2','mic3','mic4','mic5','mic6','mic7','mic8','mic9','mic10'];
var sound=['sound1','sound2','sound3','sound4','sound5','sound6','sound7','sound8','sound9','sound10'];
var audio=['audio1','audio2','audio3','audio4','audio5','audio6','audio7','audio8','audio9','audio10'];

var i=0;
reset();
start();

function main(id) {
	userSound();
}

function userSound(){
	active(sound[i]);
	addPlaySound(sound[i]);
}

function addPlaySound(id){
	var sound = document.getElementById(id);
	var att = document.createAttribute("onclick");
	att.value = "userPlaySound('"+id+"')";
	sound.setAttributeNode(att);
}

function userPlaySound(id) {
	playSound(id)
	removeUserPlaySound(id);
	removeMainFunc(mic[i]);
	inactive(mic[i]);
	nextWord();
}
function removeUserPlaySound(id){
	var sound = document.getElementById(id);
	var att = document.createAttribute("onclick");
	att.value = "playSound('"+id+"')";
	sound.setAttributeNode(att);	
}

function playSound(id){
	var audio = document.getElementById('audio');
	audio.src = 'assets/audio/userSounds/'+id+'.mp3';
	audio.play();	
}

function nextWord(){
	makeInactive(words[i]);
	i++;
	if (i<10) {
		makeActive(words[i]);
		addMainFunc(mic[i]);
		active(mic[i]);
	}
	else{
		originalAudio();
	}
	
}

function playOriginalAudio(id) {
	var audio = document.getElementById('audio');	
		audio.src = 'assets/audio/originalSounds/'+id+'.mp3';
		audio.play();
}

function addMainFunc(id) {
	var mic = document.getElementById(id);
	var att = document.createAttribute("onclick");
	att.value = "main('"+id+"')";
	mic.setAttributeNode(att);
}

function removeMainFunc(id){
	var mic = document.getElementById(id);
	mic.removeAttribute('onclick');
}


function makeActive(id){
	var h1 = document.getElementById(id);
	h1.classList.add('text-green');
}

function makeInactive(id){
	var h1 = document.getElementById(id);
	h1.classList.remove('text-green');
	h1.classList.add('text-white');
}

function show(id){
	var item = document.getElementById(id);
	item.classList.remove('invisible');
	item.classList.add('visible');
}
function hide(id){
	var item = document.getElementById(id);
	item.classList.add('invisible');
}
function active(id){
	var item = document.getElementById(id);
	item.style.filter= 'grayscale(0%)';
	item.classList.add('pointer');
}
function inactive(id){
	var item = document.getElementById(id);
	item.style.filter= 'grayscale(100%)';
	item.classList.remove('pointer');
}

function start() {
	if(i==0){
	  makeActive(words[i]);
	  addMainFunc(mic[i]);
	  active(mic[i]);
	}
}

function originalAudio(){
	for (var i = 0; i < audio.length; i++) {
	  	show(audio[i]);
	}
	endLesson();
}
function endLesson() {
	var help = document.getElementById('help');
	var subtitle = document.getElementById('subtitle');
	help.classList.add('d-none');
	subtitle.classList.remove('d-none');
}
function reset(){
	for (var i = 0; i < audio.length; i++) {
	  	inactive(mic[i]);
	  	inactive(sound[i]);
	  	hide(audio[i]);
	}
}



