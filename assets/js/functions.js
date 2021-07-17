var tableA=['a1','a2','a3','a4','a5','a6','a7','a8','a9','a10','a11','a12','a13','a14','a15','a16','a17','a18','a19','a20','a21','a22','a23','a24','a25','a26','a27','a28','a29','a30'];
var tableB=['b1','b2','b3','b4','b5','b6','b7','b8','b9','b10','b11','b12','b13','b14','b15','b16','b17','b18','b19'];
var words=['w1','w2','w3','w4','w5','w6','w7','w8','w9','w10'];
var i=0;

if(i==0){
  makeActive(tableA[i]);
}

function main(id) {
	playSound(id);
	moveToFly(id);
	setTimeout(function(){
	    resetLetterPosition(id); // move letter to original position
	}, 1000);
}

function resetLetterPosition(id) {
	var letter = document.getElementById(id);

    if (tableA[i]==id) {
    	resultDot.classList.remove('visible');
    	resultDot.classList.add('invisible');
    	resultLeft.innerHTML=letter.innerHTML;
    	resultLeft.classList.remove('invisible');
    	resultLeft.classList.add('visible');
    	makeInactive(id); // table a, current letter inactive
    	showJoinLetters();
    	rePlay(resultLeft.id,id);
    	makeActive(tableB[j]);
		}
	if (tableB[j]==id) {

		resultRight.innerHTML=letter.innerHTML;
		resultRight.classList.remove('invisible');
		resultRight.classList.add('visible');
		makeInactive(id); // table b, current letter inactive
		rePlay(resultRight.id,id);
		sectionEnable();
		showJoinLetters();
		displayWords();
		displaySentence();
	}
}


function next(){
	playSound('next');
	j++; // increment for next element in right table
	l++; // increment for next joined letters
	w++; // increment for next words 
	s++; // increment for next sentence 
	
	if (j==tableB.length) {
		j=0;
		i++;
		if (i==tableA.length) {
			// lesson completed
			var help = document.getElementById('help');
			var subtitle = document.getElementById('subtitle');
			help.classList.add('d-none'); 
			subtitle.classList.remove('d-none','invisible');
			resetTable(tableA); // reset table A;
			resetTable(tableB);  // reset table B;
		}
		else{
			makeActive(tableA[i]); // table A next letter will be active
			resetTable(tableB); // reset table B;
		}
	    
	}
	resultLeft.classList.remove('visible');
  resultLeft.classList.add('invisible');
  resultRight.classList.remove('visible');
  resultRight.classList.add('invisible');
  sectionDisable();
  makeActive(tableA[i]);

}



// Function for character play sound
function playSound(id) {
	var audio = document.getElementById('audio');	
	if (words[w]==id) {
		audio.src = 'assets/audio/words/'+id+'.mp3';
		audio.play();
	}
}

function originalSound(id) {
	var audio = document.getElementById('audio');	
	audio.src = 'assets/audio/words/'+id+'.mp3';
	audio.play();
}

function makeActive(id){
	var h1 = document.getElementById(id);
	var att = document.createAttribute("onclick");
	att.value = "main('"+id+"')";
	h1.setAttributeNode(att);
	h1.classList.remove('invisible');
	h1.classList.add('text-green','pointer','visible');
	subTag = h1.getElementsByTagName('sub')[0];
	subTag.classList.add('text-white');
}

function makeInactive(id){
	var letter = document.getElementById(id);
	letter.classList.remove('visible');
  letter.classList.add('invisible'); 
  letter.removeAttribute('style');
  letter.classList.remove('pointer');
  letter.removeAttribute("onclick");
}

function resetTable(table){
	for (var i = 0; i < table.length; i++) {
		var reset = document.getElementById(table[i]);
		subTag = reset.getElementsByTagName('sub')[0];
		subTag.classList.remove('text-white');
		reset.classList.remove('invisible','text-green');
		reset.classList.add('visible',);
	}
	
}

// function for stop video on close modal
function stopVideo(video){
	var video = document.getElementById(video);
	video.pause();
}


