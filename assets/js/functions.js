var words=['w1','w2','w3','w4','w5','w6','w7','w8','w9','w10'];
var mic=['m1','m2','m3','m4','m5','m6','m7','m8','m9','m10'];
var sound=['s1','s2','s3','s4','s5','s6','s7','s8','s9','s10'];
var audio=['a1','a2','a3','a4','a5','a6','a7','a8','a9','a10'];

var i=0;
reset();
start();

function reset(){
	for (var i = 0; i < 10; i++) {
	  	inactive(mic[i]);
	  	inactive(sound[i]);
	  	hide(audio[i]);
	}
}

function start() {
	if(i==0){
	  wordActive(words[i]);
	  addRecordingBtn(mic[i]);
	  active(mic[i]);
	}
}

function recordStart(id) {
	var element = document.getElementById(id);
	element.src = 'assets/img/stop.svg';
  	startRecording();
  	inactive(sound[i]);
}

function recordStop(id) {
	var element = document.getElementById(id);
	element.src = 'assets/img/mic.svg';
	stopRecording();
}

function startRecording(){
	console.log('start Recording');
}

function stopRecording(){
	console.log('stop Recording');
	storeRecording();;
}
function storeRecording(){
	console.log('store Recording');
	
	setTimeout(function(){
	    userSound();
	},0);
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
	removeRecordingBtn(mic[i]);
	wordInactive(words[i]);
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

function addRecordingBtn(id){
	var element = document.getElementById(id);
	var mousedown = document.createAttribute("onmousedown");
	var mouseup = document.createAttribute("onmouseup");
	mousedown.value = "recordStart('"+id+"')";
	element.setAttributeNode(mousedown);

	mouseup.value = "recordStop('"+id+"')";
	element.setAttributeNode(mouseup);
}

function removeRecordingBtn(id){
	var element = document.getElementById(id);
	element.removeAttribute('onmouseup');
	element.removeAttribute('onmousedown');
}

function nextWord(){
	i++;
	if (i<10) {
		wordActive(words[i]);
		addRecordingBtn(mic[i]);
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

function wordActive(id){
	var h1 = document.getElementById(id);
	h1.classList.add('text-green');
}

function wordInactive(id){
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




