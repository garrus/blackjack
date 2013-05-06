function getCardValue(number){
	var cardValue=0;
	if(number<=13){
		cardValue=number;
	}else if(number<=26){
		cardValue=number-13;
	}else if(number<=39){
		cardValue=number-26;
	}else{
		cardValue=number-39;
	}
	
	return cardValue>=10?10:cardValue;
}

function getImgName(number){
	var sFileName="";
	var sPath="card"+iCardType+"/";
	var sSuffixName=".gif";
	if(number<=13){
		sFileName="Spade";
	}else if(number<=26){
		sFileName="Heart";
		number-=13;
	}else if(number<=39){
		sFileName="Club";
		number-=26;
	}else if(number<=52){
		sFileName="Diamond";
		number-=39;
	}else{
		return "Back.jpg";
	}
	sFileName=sPath+sFileName+number+sSuffixName;
	
	return sFileName;
}

function getOneCard(){
	playCardSound();
	var index=Math.floor(Math.random()*cardArray.length);
	var temp=cardArray[index];
	cardArray[index]=cardArray[cardArray.length-1];
	cardArray[cardArray.length-1]=temp;
	temp=cardArray.pop();
	if(cardArray.length==0)resetCards();
	return temp;
}

function showPlayerValue(){
	oPlayerValue.innerHTML="玩家点数："+iPlayerValue;
	if(iPlayerValue==21){
		oPlayerValue.style.backgroundColor="yellow";
		oPlayerValue.style.border="2px dashed red";
	}else{

	}
}

function showBossValue(){
	oBossValue.innerHTML="庄家点数："+iBossValue;
}

function showPlayerCard(CardNumber){
	oPlayerTable.innerHTML+="<img src=\"cards/"+getImgName(CardNumber)+"\" />";
}

function showBossCard(CardNumber){
	oBossTable.innerHTML+="<img src=\"cards/"+getImgName(CardNumber)+"\" />";
}

function showHiddenCard(){
	showBossCard(99);
}

function clearHiddenCard(){
	var sInnerHTML=oBossTable.innerHTML;
	var sFileName=getImgName(iHiddenCard);
	oBossTable.innerHTML=sInnerHTML.replace(/Back.jpg/,sFileName);
}

function screenFlash(){
	var sColor=sBGColor;
	setBGColor("black");
	setTimeout(function(){setBGColor("white");},300);
	setTimeout(function(){setBGColor("black");},600);
	setTimeout(function(){setBGColor("white");},900);
	setTimeout(function(){setBGColor(sColor);},1200);
}

function setBGColor(color){
	document.body.style.backgroundColor=color;
	sBGColor=color;
	var oP;
	if(color=="black"){
		for(var i=0; i<oTitles.length; i++){
			oP=oTitles[i];
			if(oP.getAttribute("name")=="titles"){
				oP.style.color="white";
			}else if(oP.getAttribute("name")=="secret"){
				oP.style.color=color;
			}
		}
	}else{
		for(var i=0; i<oTitles.length; i++){
			oP=oTitles[i];
			if(oP.getAttribute("name")=="titles"){
				oP.style.color="black";
			}else if(oP.getAttribute("name")=="secret"){
				oP.style.color=color;
			}
		}
	}
}

function showInstruction(){
	window.open("readme.html","newwindow","top=250,left=300,height=500,width=600,scrollbars=yes,resizable=no,status=no,toolbar=no,menubar=yes,location=no");
}

function changeBGMSetting(){
	var iInput=prompt("共有多少首背景音乐？",iTotalBGM);
	if(parseInt(iInput)>0){
		iTotalBGM=parseInt(iInput);
	}
}

function updateCheatCode(iKeyCode){
	sCheatCode+=iKeyCode;
	var regCheatPattern=new RegExp("^"+sCheatCode);
	if(regCheatPattern.test("38384040373937396665")){
		if(sCheatCode.length==20){
			if(bIsCheatOn==false){
				openCheatMode();
			}else{
				closeCheatMode();
			}
			sCheatCode="";
		}
	}else{
		sCheatCode="";
	}
}

function openCheatMode(){
	playCheatOnSound();
	screenFlash();
	bIsCheatOn=true;
}

function closeCheatMode(){
	playCheatOffSound();
	bIsCheatOn=false;
}

function switchTableFlash(){
	bTableFlashOn=bTableFlashOn?false:true;
}

function clearHistory(){
	if(oNewRound.style.display!="inline"){
		if(!confirm("重置记录将会立即结束本局游戏，是否继续？")){
			return;
		}
	}
	clearTimeout(iTimeoutId);
	oGetCard.style.display="none";
	oCountCard.style.display="none";
	oNewRound.style.display="inline";
	resetGame();
	iTotalGame=0;
	iTotalWin=0;
	iTotalLose=0;
	iTotalDraw=0;
	iTotal21=0;
	iTotalBJ=0;
	iBossBJ=0;
	updateBoard();
}

function setCardType(iType){
	if(iType==iCardType)return;
	startLoadingCard();
	iCardType=iType;
	oTitles[0].innerHTML="正在加载游戏资源，请稍候……";
	oBackGround.style.display="none";
}

function startLoadingCard(){
	iCardLoaded=0;
	for(var i=0;i<52;i++){
		oImage[i].src="cards/"+getImgName(i);
	}
}

function cardLoadReport(){
	iCardLoaded++;
	if(iCardLoaded>=51){
		if(oBackGround)setTimeout(cardLoadComplete,100);
	}
}

function cardLoadComplete(){
	oTitles[0].innerHTML="Welcome to BlackJack !";
	oBackGround.style.display="inline";
	replaceCurrentCard();
}

function replaceCurrentCard(){
	oBossTable.innerHTML=oBossTable.innerHTML.replace(/card[0-9]/g,"card"+iCardType);
	oPlayerTable.innerHTML=oPlayerTable.innerHTML.replace(/card[0-9]/g,"card"+iCardType);
}

function updateBoard(){
	oTotalGame.innerHTML=iTotalGame;
	oTotalWin.innerHTML=iTotalWin;
	oTotalLose.innerHTML=iTotalLose;
	oTotalDraw.innerHTML=iTotalDraw;
	oTotal21.innerHTML=iTotal21;
	oTotalBJ.innerHTML=iTotalBJ;
	oBossBJ.innerHTML=iBossBJ;
}

function handleKeyDownEvent(oEvent){

	if(bSoundEnable && oEvent.keyCode==221){
		changeBGMSetting();
		return;
	}
	
	if(oEvent.keyCode==38 || oEvent.keyCode==40 || oEvent.keyCode==37 || oEvent.keyCode==39 || oEvent.keyCode==66 || oEvent.keyCode==65){
		updateCheatCode(oEvent.keyCode);
	}else{
		sCheatCode="";
	}
	
	if(oEvent.keyCode==70){
		switchTableFlash();
	}
	
	if(oEvent.keyCode>=49 && oEvent.keyCode<=51){
		iType=oEvent.keyCode-48;
		setCardType(iType);
	}
	
}
