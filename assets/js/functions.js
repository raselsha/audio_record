// id list for word as 'words', microphone recording as 'mic', user sound as 'sounds' and original sounds as 'audio' 
var words=['w1','w2','w3','w4','w5','w6','w7','w8','w9','w10'];
var mic=  ['m1','m2','m3','m4','m5','m6','m7','m8','m9','m10'];
var sound=['s1','s2','s3','s4','s5','s6','s7','s8','s9','s10'];
var audio=['a1','a2','a3','a4','a5','a6','a7','a8','a9','a10'];
var player = document.getElementById('player');

var recorded_data = [];
var chunks = [];
var constraints = { audio: true, video: false }

var i=0; //increment
reset(); // reset for all 
start(); // start the program

// this method will reset elements
function reset(){
	for (var i = 0; i < 10; i++) {
	  	inactive(mic[i]); // inactive microphone icons
	  	inactive(sound[i]); // inactive user sounds icon
	  	hide(audio[i]); // hide original sounds icon
	}
}

//ask permision for audio 
window.addEventListener('load',startUp);
function startUp(){
  navigator.mediaDevices.getUserMedia(constraints);
  console.log('media permission allowed');
}

function start() {
	if(i==0){
	  wordActive(words[i]); // make first word green as active
	  addRecordingBtn(mic[i]); // add attribute onmousedown for recording
	  active(mic[i]); // active for recording buton
	}
}

function recordStart(id) {
	var element = document.getElementById(id);
	element.style.backgroundImage = 'url(assets/img/stop.svg)';
  	startRecording();
  	inactive(sound[i]);
}

function recordStop(id) {
	var element = document.getElementById(id);
	element.style.backgroundImage = 'url(assets/img/mic.svg)';
	stopRecording();
}

function startRecording(){
	console.log('recording start');
	navigator.mediaDevices.getUserMedia(constraints).then(audioStream);
}

function audioStream(stream){
  console.log('audio streaming');
  window.stream = stream;
 
  var options = {mimeType:'audio/webm'};
  try{
    mediaRecorder = new MediaRecorder(window.stream, options);
    mediaRecorder.start(100);
    
  }
  catch(e){
    console.log(e);
  }
  
  mediaRecorder.ondataavailable = function(event) {
    if (event.data && event.data.size >0) {
      chunks.push(event.data);
      console.log(chunks);
    }
  };
  player.srcObject = stream;
  player.play();
  
}

function stopRecording(){
	mediaRecorder.stop();
	console.log('recording stop');
	var raw_data = new Blob(chunks,{type:'audio/webm'});
	recorded_data[i] = URL.createObjectURL(raw_data);
	player.setAttribute('src','');
	player.src = null;
	player.srcObject = null;
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
	playUserSound(id)
	removeUserPlaySound(id);
	removeRecordingBtn(mic[i]);
	wordInactive(words[i]);
	inactive(mic[i]);
	nextWord();
	chunks=[];
}

function removeUserPlaySound(id){
	var sound = document.getElementById(id);
	var att = document.createAttribute("onclick");
	att.value = "playUserSound('"+id+"')";
	sound.setAttributeNode(att);	
}

function playUserSound(id){
	player.src = recorded_data[sound.indexOf(id)];
	player.play();	
}

function addRecordingBtn(id){
	var element = document.getElementById(id);
	var mousedown = document.createAttribute("onpointerdown");
	var mouseup = document.createAttribute("onpointerup");
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
		activeOriginalAudio();
	}
	
}

function playOriginalAudio(id) {	
	player.src = 'assets/audio/originalSounds/'+id+'.mp3';
	player.play();
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

function activeOriginalAudio(){
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




