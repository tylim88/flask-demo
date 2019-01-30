var enterButton = document.getElementById("enterButton");
var userInput = document.getElementById("userInput");
var list = document.getElementById("list");
var container = document.createElement("div");
var numbering = document.createElement("p");
var numberingTextNode = document.createTextNode("");
var paragraph = document.createElement("p");
var paragraphTextNode = document.createTextNode("");
var button = document.createElement("button");
var buttonTextNode = document.createTextNode("");
var userInputLength = userInput.value.length;
var seperator = ". ";
var maxUserInputLength = 30;
var enterKeyCode = 13;
var target;
var listElement;
var reindexInput = "";
var inputLengthChecked = "";

//doing unecessary initialization in delcalration to give reader impression what those variables are although it may take up some memory?maybe should use comment instead

function creatContainer(){ 

	container = document.createElement("div");
	container.classList.add("container", "row");
	list.appendChild(container);
}

function createParagraph(){

	paragraph = document.createElement("p");
	paragraph.classList.add("col-auto", "listElement");
	container.appendChild(paragraph);	
}

function createButton(){

	button = document.createElement("button");
	button.classList.add("col-auto");
	container.appendChild(button);
}

function createParagraphTextNode(){

	paragraphTextNode = document.createTextNode(list.children.length + seperator + userInput.value);
	paragraph.appendChild(paragraphTextNode);
}

function createButtonTextNode(){

	buttonTextNode = document.createTextNode("Delete");
	button.appendChild(buttonTextNode);
}

function checkInputLength(){

	userInputLength = userInput.value.length;

	if (userInputLength === 0){

		//return 0;//this is no good, this mean you need to run the same function again for another case
		inputLengthChecked = 0;		
	}
	else if (userInputLength > maxUserInputLength){

		//return 1;//this is no good, this mean you need to run the same function again for another case
		inputLengthChecked = 1;
	}
	else {//userInputLength <= maxUserInputLength && userInputLength > 0

		return 2;
		console.log(0);
	}
}

function checkDuplicate(){

	for (var i = 0; i < list.children.length; i++) {

		if (userInput.value.toLowerCase() === list.children[i].children[0].textContent.toLowerCase().split(seperator)[1]){
			
			alert("duplicate value");
			userInput.value = "";

			return false;
		}
	}
	return true;
}

function addListElement(){//merge all components created

	//if (checkInputLength() === 2 && checkDuplicate()){//checkDuplicate alway run before checkInputLength, why?(function without comparison execute faster)
	//if (checkInputLength() === 2 && checkDuplicate() === true){ //this result in race condition 
	// if (checkInputLength() === 2){
	// 	if (checkDuplicate()) { //so to properly control the order, seperate it to two if

	// 		creatContainer();
	// 		createParagraph();
	// 		createButton();
	// 		createParagraphTextNode();
	// 		createButtonTextNode();

	// 		userInput.value = "";
	// 		alert();
	// 	}
	// }
	// else if (checkInputLength() === 1){//this is no good, this mean you need to run the same function again for another case

	// 	alert("exceed maximum length (30 characters)");
	// }
	// else if (checkInputLength() === 0){//this is no good, this mean you need to run the same function again for another case

	// 	alert("no input");
	// }

	//if (checkInputLength() === 2 && checkDuplicate()){//checkDuplicate alway run before checkInputLength, why?(function without comparison execute faster)
	//if (checkInputLength() === 2 && checkDuplicate() === true){ //this result in race condition 
	if (checkInputLength() === 2){
		if (checkDuplicate()) { //so to properly control the order, seperate it to two if

			creatContainer();
			createParagraph();
			createButton();
			createParagraphTextNode();
			createButtonTextNode();

			userInput.value = "";
		}
	}
	else if (inputLengthChecked === 1){//to prevent the same function run unecessary again

		alert("exceed maximum length (30 characters)");
	}
	else if (inputLengthChecked === 0){//to prevent the same function run unecessary again

		alert("no input");
	}
}

function addListElementOnEnter(objectEvent){

	if (objectEvent.keyCode === enterKeyCode){

		addListElement();
	}
}

function reNumbering(childIndex){

	for (var i = childIndex + 1; i <= list.children.length - 1; i++) {
		
		listElement = list.children[i].children[0];//get the p selector
		listElementTextNode =  listElement.childNodes[0];
		reindexInput = document.createTextNode(i + seperator + listElementTextNode.textContent.split(seperator)[1])

		listElement.replaceChild(reindexInput,listElementTextNode);
	}
}

function clickEvent(objectEvent){

	target = objectEvent.target;
	targetParent = target.parentElement;

	if (target.tagName === "P") //toggle class
	{
		target.classList.toggle("done");
	}
	else if (target.tagName === "BUTTON")
	{
		reNumbering(Array.prototype.indexOf.call(list.children, targetParent));
		list.removeChild(targetParent); //remove list element
	}

}

list.addEventListener("click",clickEvent);

enterButton.addEventListener("click", addListElement);

userInput.addEventListener("keypress", addListElementOnEnter); //keypress is not very responsive to prompt alert when the input is empty, why?(because call too much function, solved)

