const options=document.getElementById('options');
const lang=document.getElementById('lang');
const dropDownLogo=document.getElementById('drop-down-logo');
const langValue=document.getElementById('lang-value');
const posterRow=document.getElementById('posterRow');
const scrollBtnImg=document.querySelectorAll('.scroll-btn-img');
const leftBtn=document.getElementById('left-scroll');
const rightBtn=document.getElementById('right-scroll');
const questionBox=document.querySelectorAll('.faq-box>div:nth-child(1)');
const answerBox=document.querySelectorAll('.faq-box>div:nth-child(2)');
const plusSign=document.querySelectorAll('.faq-box>div:nth-child(1)>div:nth-child(2)');
const FixedGetStarted=document.getElementById('FixedGetStarted');

function optionSelect(){
    options.classList.toggle('active');
    lang.classList.toggle('highlight');
    dropDownLogo.classList.toggle('drop-up');
}

function optionSelectHin(){
    langValue.textContent='हिन्दी';
}

function optionSelectEng() {
	langValue.textContent='English';
}

function checkBtns(){
	let leftScroll=posterRow.scrollLeft;
	let clientWidth=posterRow.clientWidth;
	let scrollWidth=posterRow.scrollWidth;
	
	if (leftScroll<=1){
		leftBtn.style.width='0px';
	} else {
		leftBtn.style.width='50px';
	}
	
	if (leftScroll+clientWidth>=scrollWidth-1){
		rightBtn.style.width='0';
	} else {
		rightBtn.style.width='50px';
	}
}

function scrolling(element,direction){
	element.style.background='#6AB0FF';
	setTimeout(() => {
		element.style.background='';
	},100);
    
    let leftScroll=(posterRow.scrollLeft);
    const img=document.querySelector('#posterRow img');
    const imgWidth=img.width;
    const imgGap=parseInt(getComputedStyle(posterRow).gap);
    let noOfImgLeft=Math.floor(leftScroll/(imgWidth));
    let extraImgWidthLeft=(leftScroll-(noOfImgLeft*(imgWidth+imgGap)));
    let scrollAmountLeft=((imgWidth-extraImgWidthLeft)+(imgGap/2));
    
    let rightScroll=posterRow.scrollWidth-(posterRow.clientWidth+leftScroll);
    let noOfImgRight=Math.round(rightScroll/(imgWidth));
    let extraImgWidthRight=(rightScroll-(noOfImgRight*(imgWidth+imgGap)));
    let scrollAmountRight=(imgWidth-extraImgWidthRight)+imgGap/2;
    
    /* console.log('new down')
    console.log('left scroll',leftScroll)
    console.log('img width',imgWidth)
    console.log('img gap',imgGap)
    console.log('number of img',noOfImg)
    console.log('extra img width',extraImgWidth)
    console.log('scroll amount',scrollAmount) */
    
    if (direction===1){
    	posterRow.scrollBy({
    	left:scrollAmountLeft,
    	behavior:'smooth'
    	});
    } else if(direction===-1){
    	posterRow.scrollBy({
    	left:-scrollAmountRight,
    	behavior:'smooth'
    	});
    }
}

function checkFixedGetStarted(){
    let topScroll=window.scrollY;
    let minHeight=window.innerWidth*1.4;
    let maxHeight=window.innerWidth*4.25;
    
    if (topScroll>minHeight && topScroll<maxHeight){
        FixedGetStarted.style.bottom='0';
    } else {
        console.log('hello')
        FixedGetStarted.style.bottom=`-100%`;
    }
}

questionBox.forEach((box,questionIndex) => {
	box.addEventListener('click',function () {
		
		answerBox.forEach((answer,answerIndex) => {
		    if(questionIndex!=answerIndex){
		        answer.classList.remove('answerHeight');
		        plusSign[answerIndex].classList.remove('crossSign');
		    }
		});
		
		answerBox[questionIndex].classList.toggle('answerHeight');
		
		this.style.background='#5592D7';
		setTimeout(() => {
			this.style.background='';
		},100);
		
		plusSign[questionIndex].classList.toggle('crossSign');
	});
});

lang.addEventListener('click',
    () => {
        options.classList.toggle('active');
        lang.classList.toggle('highlight');
        dropDownLogo.classList.toggle('drop-up');
    }
);

posterRow.addEventListener('scroll',checkBtns
);

window.addEventListener('scroll',checkFixedGetStarted);

checkBtns();