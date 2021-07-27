 var player = document.getElementById('player');
    var playButton = document.getElementById('play-button');
    var recordButton = document.getElementById('record-button');
    var download = document.getElementById('download');
    var chunks = [];
    var constraints = { audio: true, video: false }

    window.addEventListener('load',startUp);
    function startUp(){
      navigator.mediaDevices.getUserMedia(constraints);
    }

    playButton.addEventListener('click',play);
     function play() {
       console.log('Playing'); 
       player.play();
     }

    recordButton.addEventListener('mousedown',recordingStart);
    function recordingStart() {
      console.log('recording start');
      recordButton.innerHTML = 'Rec..';
      navigator.mediaDevices.getUserMedia(constraints).then(audioStream);
    }

    function audioStream(stream){
      console.log('audio streaming');
      window.stream = stream;
     
      var options = {mimeType:'audio/webm'};
      try{
        mediaRecorder = new MediaRecorder(window.stream, options);
        mediaRecorder.start(0);
        
      }
      catch(e){
        console.log(e);
      }
      
      mediaRecorder.ondataavailable = function(e) {
        saveaudio(e);
      };
      player.setAttribute('src','');
      player.src = null;
      player.srcObject = null;
      player.srcObject = stream;
      player.play();
      
    }
    function saveaudio(event) {
      if (event.data && event.data.size >0) {
        chunks.push(event.data);
        console.log(chunks);
      }
    }

    recordButton.addEventListener('mouseup',recordingStop);
    function recordingStop(){
      mediaRecorder.stop();
      console.log('recording stop');
      recordButton.innerHTML = 'Start';
      var recorded = new Blob(chunks,{type:'audio/webm'});
      player.setAttribute('src','');
      player.src = null;
      player.srcObject = null;
      player.src = URL.createObjectURL(recorded);
    }