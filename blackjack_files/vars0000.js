var oNewRound, oGetCard, oCountCard, oDoubleSet;
//	buttons for player's actions
var oPlayerTable, oBossTable, oPlayerValue, oBossValue;
//	divs for displaying cards and values
var iTotalGame=0, iTotalWin=0, iTotalLose=0, iTotalDraw=0, iTotalBJ=0, iTotal21=0, iBossBJ=0;
//	record game history
var oTotalGame, oTotalWin, oTotalLose, oTotalDraw, oTotal21, oTotalBJ, oBossBJ;
//	for displaying game history
var oBGMPlayer, oSoundPlayer, oPreLoader, iLoadedBGM, iCurrentPlayer, iMusicPlayer=0, iMaxSoundPlayer, iTotalBGM=6, bSoundEnable=false;
//	sounds and music
var iPlayerValue, iPlayerCards, iBossValue, iBossCards, iHiddenCard, bPlayerAce, bBossAce, cardArray;
//	game data
var sBGColor="white", iTimeoutId, sCheatCode="", bIsCheatOn=false, iCardType=3, iCardLoaded;
//	game control
var oTitles, oHrs, oBoard, iClientType=0, bTableFlashOn=true, oImageLoadArea, oBackGround;
//	page control

function autoAdjustPage(){
	var iClientWidth=document.body.clientWidth;
	if(iClientType==0 && iClientWidth<1150){
		oHrs[0].style.width="750px";
		oHrs[1].style.width="680px";
		oHrs[2].style.width="680px";
		oHrs[3].style.width="750px";
		oBossTable.style.width="680px";
		oBossTable.style.backgroundImage="url('image/bosstable680.png')";
		oPlayerTable.style.width="680px";
		oPlayerTable.style.backgroundImage="url('image/playertable680.png')";
		oBoard.style.right="1px";
		iClientType=1;
	}
	if(iClientType==1 && iClientWidth>=1150){
		oHrs[0].style.width="850px";
		oHrs[1].style.width="800px";
		oHrs[2].style.width="800px";
		oHrs[3].style.width="850px";
		oBossTable.style.width="800px";
		oBossTable.style.backgroundImage="url('image/bosstable800.png')";
		oPlayerTable.style.width="800px";
		oPlayerTable.style.backgroundImage="url('image/playertable800.png')";
		var iLeftWidth=(iClientWidth-oHrs[1].offsetWidth)/2;
		oBoard.style.right=(iLeftWidth-oBoard.offsetWidth)/2;
	}
	setTimeout(autoAdjustPage,1000);
}

function finishInitialization(){
	oTitles[0].innerHTML="Welcome to BlackJack !";
	oBackGround.style.display="inline";
	oNewRound.style.display="inline";
	autoAdjustPage();
}

function init(){
	oTitles=document.getElementsByTagName("p");
	oTitles[0].innerHTML="游戏资源载入完成，正在初始化……";

	oPlayerTable=document.getElementById("playertable");
	oBossTable=document.getElementById("bosstable");
	oPlayerValue=document.getElementById("playervalue");
	oBossValue=document.getElementById("bossvalue");

	oNewRound=document.getElementsByName("newround")[0];
	oGetCard=document.getElementsByName("getcard")[0];
	oCountCard=document.getElementsByName("countcard")[0];
	oDoubleSet=document.getElementsByName("doubleset")[0];
	
	oBoard=document.getElementById("board");
	oTotalGame=document.getElementById("game");
	oTotalWin=document.getElementById("win");
	oTotalLose=document.getElementById("lose");
	oTotalDraw=document.getElementById("draw");
	oTotal21=document.getElementById("21");
	oTotalBJ=document.getElementById("bj");
	oBossBJ=document.getElementById("bossbj");
	
	oHrs=document.getElementsByTagName("hr");
	oImageLoadArea=document.getElementById("imageloadarea");
	oBackGround=document.getElementById("background");
	oImage=oImageLoadArea.getElementsByTagName("img");
	
	if(window.navigator.appName.match(/Micro/i)){
		document.getElementById("musiccontroller").style.display="";
		bSoundEnable=true;
		
//		oMediaPlayer=document.getElementsByTagName("embed")[0];
		oSoundPlayer=document.getElementsByTagName("bgsound");
		oBGMPlayer=oSoundPlayer[0];
		iLoadedBGM=0;
		oPreLoader=oSoundPlayer[oSoundPlayer.length-1];
		iMaxSoundPlayer=oSoundPlayer.length-2;
		iCurrentPlayer=1;
		preLoadMusic();
		initializeSoundPlayer();
	}else{
		setTimeout(function(){alert("检测到您正在使用非IE浏览器，音效和背景音乐将被关闭，但这并不影响游戏进行！");},500);
	}
	setTimeout(finishInitialization, 700);
}
