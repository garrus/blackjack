function initializeSoundPlayer(){
	oSoundPlayer[0].src="";
	oSoundPlayer[0].loop=-1;
	oSoundPlayer[0].volume=-800;
	for(var i=1;i<=iMaxSoundPlayer;i++){
		oSoundPlayer[i].src="";
		oSoundPlayer[i].volume=0;
	}
}

function preLoadMusic(){
	iLoadedBGM++;
	oPreLoader.src="music/bgmusic"+iLoadedBGM+".mp3";
	if(iLoadedBGM<iTotalBGM){
		setTimeout(preLoadMusic,10000); 
	}
}


function playBGM(oInput){
	if(oInput){
		oInput.value="Í£Ö¹ÒôÀÖ";
		oInput.onclick=function(){stopBGM(oInput);};
	}
	document.getElementsByName("nextBGM")[0].disabled=false;
	oBGMPlayer.src="music/bgmusic"+Math.ceil(Math.random()*iLoadedBGM)+".mp3";

//	oMediaPlayer[iMusicPlayer].stop();
//	iMusicPlayer=Math.floor(Math.random()*oMediaPlayer.length);
//	oMediaPlayer[iMusicPlayer].play();
}

function changeVolume(ini){
	if(ini>0 && oBGMPlayer.volume>=0)return;
	if(ini<0 && oBGMPlayer.volume<=-9600)return;
	oBGMPlayer.volume+=ini;
}

function stopBGM(oInput){
	oBGMPlayer.src="";
	oInput.value="²¥·ÅÒôÀÖ";
	document.getElementsByName("nextBGM")[0].disabled=true;
	oInput.onclick=function(){playBGM(oInput);};
}

function openSound(oInput){
	bSoundEnable=true;
	oInput.value="¹Ø±ÕÒôÐ§";
	oInput.onclick=function(){closeSound(oInput);};
}

function closeSound(oInput){
	bSoundEnable=false;
	oInput.value="´ò¿ªÒôÐ§";
	oInput.onclick=function(){openSound(oInput);};
}

function playCardSound(){
	playSound("GetCard");
}

function playBustSound(){
	playSound("Bust");
}

function play21Sound(){
	playSound("21");
	playSound("Crowd1");
}

function playBJSound(){
	playSound("BJ");
	playSound("Crowd3");
}

function play5CardSound(){
	playSound("5Card");
}
function play21DrawSound(){
	playSound("Crowd4");
}

function playDrawSound(){
	playSound("Crowd2");
}

function playCheatOnSound(){
	playSound("CheatOn");
}

function playCheatOffSound(){
	playSound("CheatOff");
}

function playSound(filename){
	if(!bSoundEnable)return;
	oSoundPlayer[iCurrentPlayer++].src="sound/"+filename+".mp3";
	if(iCurrentPlayer==iMaxSoundPlayer){
		iCurrentPlayer=1;
	}
}