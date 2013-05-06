function resetCards(){
	cardArray=new Array( 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,
						14,15,16,17,18,19,20,21,22,23,24,25,26,
						27,28,29,30,31,32,33,34,35,36,37,38,39,
						40,41,42,43,44,45,46,47,48,49,50,51,52	);
}

function resetGame(){
	oPlayerTable.innerHTML="";
	oPlayerTable.style.border="5px double "+sBGColor;
	oBossTable.innerHTML="";
	oBossTable.style.border="5px double "+sBGColor;
	oPlayerValue.innerHTML="玩家点数：0";
	oPlayerValue.style.backgroundColor=sBGColor;
	oPlayerValue.style.border="2px dashed "+sBGColor;
	oBossValue.innerHTML="庄家点数：0";
	oBossValue.style.backgroundColor=sBGColor;
	oBossValue.style.border="2px dashed "+sBGColor;
	iPlayerValue=0;
	iPlayerCards=0;
	iBossValue=0;
	iBossCards=0;
	bPlayerAce=false;
	bBossAce=false;
	resetCards();
}

function newRound(){
	oNewRound.style.display="none";
	resetGame();
	iTotalGame++;
	updateBoard();
	iTimeoutId=setTimeout(playerGetCard,300);
	iTimeoutId=setTimeout(bossGetCard,300);
	iTimeoutId=setTimeout(playerGetCard,300);
	iTimeoutId=setTimeout(bossGetCard,300);
	iTimeoutId=setTimeout(checkBlackJack,500);
}

function checkBlackJack(){
	if(iBossValue==21){
		playBJSound();
		iBossBJ++;
		stopPlayerRound();
		iTimeoutId=setTimeout(function(){checkSet(1);},400);
	}else if(iPlayerValue==21){
		playBJSound();
		iTotalBJ++;
		updateBoard();
		stopPlayerRound();
		startBossRound();
	}else{
		startPlayerRound();
	}
}

function startPlayerRound(){
	oGetCard.style.display="inline";
	oCountCard.style.display="inline";
	if(bTableFlashOn){
		oPlayerTable.style.border="5px double lime";
	}
}

function stopPlayerRound(){
	oGetCard.style.display="none";
	oCountCard.style.display="none";
	oPlayerTable.style.border="5px double "+sBGColor;
	clearHiddenCard();
	showBossValue();
}

function startBossRound(){
	if(bTableFlashOn){
		oBossTable.style.border="5px double lime";
	}
	iTimeoutId=setTimeout(bossGetCard,800);
}

function stopBossRound(){
	oBossTable.style.border="5px double "+sBGColor;
	if(iBossValue>21){
		playBustSound();
	}
	if(iBossValue==iPlayerValue){
		if(iBossValue==21)
			play21DrawSound();
		else
			playDrawSound();
	}
}

function bossGetCard(){
	if(iBossValue>=17 || iBossCards==5){
		stopBossRound();
		iTimeoutId=setTimeout(checkSet,750);
		return;
	}
	
	var CardNumber=getOneCard();
	iBossCards++;
	if(iBossCards==2){
		iHiddenCard=CardNumber;
		showHiddenCard();
	}else{
		showBossCard(CardNumber);
	}
	iBossValue+=getCardValue(CardNumber);
	if(CardNumber%13==1 && iBossValue<=11){
		iBossValue+=10;
		bBossAce=true;
	}
	if(iBossValue>21 && bBossAce==true){
		iBossValue-=10;
		bBossAce=false;
	}
	
	if(iBossCards>2){
		showBossValue();
		if(iBossValue>=21){
			iTimeoutId=setTimeout(bossGetCard,100);
		}else{
			iTimeoutId=setTimeout(bossGetCard,800);
		}
	}else{
		if(bIsCheatOn){
			showBossValue();
		}
	}
}

function playerGetCard(){
	var CardNumber=getOneCard();
	showPlayerCard(CardNumber);
	iPlayerCards++;
	iPlayerValue+=getCardValue(CardNumber);
	if(CardNumber%13==1 && iPlayerValue<=11){
		iPlayerValue+=10;
		bPlayerAce=true;
	}
	if(iPlayerValue>21 && bPlayerAce==true){
		iPlayerValue-=10;
		bPlayerAce=false;
	}

	showPlayerValue();
	
	if(iPlayerCards<=2){
		return;
	}
	
	if(iPlayerValue>21){
		playBustSound();
		stopPlayerRound();
		iTimeoutId=setTimeout(function(){checkSet(2);}, 200);
	}else if(iPlayerValue==21){
		stopPlayerRound();
		iTotal21++;
		updateBoard();
		play21Sound();
		startBossRound();
	}else if(iPlayerCards==5){
		stopPlayerRound();
		play5CardSound();
		checkSet(3);
	}
}

function doubleSet(){
}

function checkSet(iSituation){
	var MSG=new Array(	"恭喜，你的点数比庄家大，你赢了！",
						"庄家爆牌，你赢得了这一局！",
						"你和庄家都拿到21点，平局！",
						"你和庄家点数相同，庄家获胜！",
						"你爆牌了，直接输掉了这一局！",
						"你的点数比庄家小，你输了！",
						"真不幸，庄家拿到了Ｂｌａｃｋ　Ｊａｃｋ！你被秒杀了！",
						"5张牌加起来小于21点，直接赢得这一局！");
	var iMsgIndex;
	if(iSituation){
		if(iSituation==1)iMsgIndex=6;
		if(iSituation==2)iMsgIndex=4;
		if(iSituation==3)iMsgIndex=7;
	}else{
		if(iBossValue>21){
			iMsgIndex=1;
		}else{
			if(iPlayerValue<iBossValue){
				iMsgIndex=5;
			}else if(iPlayerValue>iBossValue){
				iMsgIndex=0;
			}else{
				iMsgIndex=iPlayerValue==21?2:3;
			}
		}
	}
	switch(iMsgIndex){
		case 0:
		case 1:
		case 7:
			iTotalWin++;
			break;
		case 2:
			iTotalDraw++;
			break;
		case 3:
		case 4:
		case 5:
		case 6:
			iTotalLose++;
			break;
		default:
			break;
	}
	updateBoard();
	MSG[iMsgIndex]+="还要继续玩吗？";
	if(confirm(MSG[iMsgIndex])){
		oNewRound.click();
	}else{
		oNewRound.style.display="inline";
	}
}
