window.addEventListener('load', distributeCards);
window.addEventListener('resize', distributeCards);

function distributeCards() {
const cardsContainer = document.getElementsByTagName('main')[0];
const cardCollection = cardsContainer.getElementsByTagName('article');
const columnCount = Math.floor(cardsContainer.offsetWidth/cardCollection[0].offsetWidth)

const elementsArray = [];
for (let i=0; i<cardCollection.length; i++) {
elementsArray.push([parseInt(cardCollection[i].dataset.priority), cardCollection[i], cardCollection[i].offsetHeight]);
} // next i card to elementsArray;
elementsArray.sort((a,b) => {return (a[0]>b[0]) ? 1 : -1;});
// elementsArray is now ordered by priority, begining at highest priority = 1;
// elementsArray[i][0] holds priority value;
// elementsArray[i][1] holds the respective element object;
// elementsArray[i][2] holds height of element; 

// make arrays to store column colections, one for each column;
const colsArray = [];
let assignedElementCount = 0; // will increment when each element is positioned in colsArray;
// initialise internal arrays, one for each column;
for (let i=0; i<columnCount; i++) {
colsArray[i] = [[elementsArray[assignedElementCount][1]], elementsArray[assignedElementCount][2], i ];
assignedElementCount++;
} // next i columnArray initiated;
// i added as third elements to allow re-ordering after shuffling to fill;

// iterate to add cards to colums in order of priority to the shortest column
while (assignedElementCount < cardCollection.length) {
colsArray.sort((a,b) => {return (a[1]>b[1]) ? 1 : -1});
// firstElement now contains the element with the highest bottom (lowest value);
colsArray[0][0].push(elementsArray[assignedElementCount][1]);
colsArray[0][1] += elementsArray[assignedElementCount][2]  
assignedElementCount++;
} // wend all elements assigned;

// restore column order so priorities go left to right on top row;
colsArray.sort((a,b) => {return (a[2]>b[2]) ? 1 : -1});

// construct new main element, load ordered article elements into it, load it to page;
const mainContainer = document.createElement('main');

for (let i=0; i<colsArray.length; i++) {
// each colsArray element is an array, colsArray[i][0] holds an array of elements for that column;
  for (let j=0; j<colsArray[i][0].length; j++) {
    mainContainer.appendChild(colsArray[i][0][j]);
  } // next j element in colsArray[i][0]
} // next i column array;

let columnContainer = document.getElementsByClassName('column-container')[0];
columnContainer.replaceChildren(mainContainer);


} // end function distributeCards;
