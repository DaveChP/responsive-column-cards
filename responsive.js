// document.getElementsByClassName('output')[0].innerHTML="<h2>all good here!</h2>";

const report = document.getElementsByClassName('output')[0];

window.addEventListener('load', getCardData);
window.addEventListener('resize', getCardData);

function getCardData() {
// has to be called after load and resize or will give silly heights and some other odd stuff;

const cardContainer = document.getElementsByTagName('DIV')[1];
let containerData = cardContainer.getBoundingClientRect();

let markup = `div width is ${parseInt(containerData.width)}px<br>`;
markup += `viewport width is ${window.innerWidth}px<br>`;
markup += `the display div occupies ${parseInt(containerData.width*100/window.innerWidth)}% of the window<br>`;



/* The bounding rectangle of each card is an article element. All articles are direct children of a sole main element. Set the collection of article elements to a variable */

const cardCollection = document.getElementsByTagName('main')[0].getElementsByTagName('article');

// report length of collection:

markup += `${cardCollection.length} cards were assigned to a list array<br>`; // confirms list ok;

// cardCollection.forEach((card, index) =>
// not an array, can't use directly;
// instead;

let cardWidth = 0;

Array.prototype.forEach.call(cardCollection, (card, index) =>
 {
  let cardData = card.getBoundingClientRect();
  cardWidth = cardData.width;
  markup += `panel ${index} -  `;

    for (property in cardData) {
    markup += `${property}: ${parseInt(cardData[property])}, `;
    } // end current property of cardData object;
  markup += `x-offset: ${window.pageXOffset}, y-offset: ${window.pageYOffset}, priority attribute: ${card.dataset.priority}<br>`;
}); // end for each card in collection;

let numCols = parseInt(containerData.width/cardWidth);
markup += `Number of columns: ${numCols} columns<br>`;
report.innerHTML = markup;

distributeCards();

} // end resize trigger;




/* alternative process*/
/* getCardData() was useful for extracting data from the card article elements 
but the overall aim is to use that information to re-order elements after re-size.
since the plan will use element collections, it makes sense to extract data one those collections have been extracted.
hence, this alternative approach.
*/

function distributeCards() {
// to be invoked on load, resize, or when new cards are added;
// function distributes cards article elements in an order calculated
// to push those of higher priority to towards the top of the display

const cardsContainer = document.getElementsByTagName('main')[0];
const containerWidth = parseInt(cardsContainer.getBoundingClientRect().width);

// fetch card elements;
const cardCollection = cardsContainer.getElementsByTagName('article');
const cardWidth = parseInt(cardCollection[0].getBoundingClientRect().width);
const columnCount = Math.floor(containerWidth/cardWidth);
const outputTarget = document.getElementsByClassName('output')[1];
let markup = "";

markup += `${cardCollection.length} card elements were retrieved, each ${cardWidth}px wide, across ${columnCount} columns<br>`;

outputTarget.innerHTML = markup;

// test changing order or collection
let newCollection = new DocumentFragment();

// prepending should add cards back-to-front;

while (cardCollection.length > 0) {
  newCollection.append(cardCollection[cardCollection.length-1]);
} // next card of collection;

// can't have two mains so will use a div instead
let mainDiv = document.createElement('div');
mainDiv.appendChild(newCollection);

let containerDiv = document.createElement('div');
containerDiv.setAttribute("class", "column-container");
containerDiv.appendChild(mainDiv);

document.body.appendChild(containerDiv);


}// end function distributeCards; 




































/*have added data-priority= attributes to each article element in index.html
these are directly accessible in JS with the .dataset property of an element: element.dataset.priority
see https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
*/


/* might later break the output div into three float children to allow columns to be reported, experiments were left in index and styles but commented out */

/* properties available in .getBoundingRect() are:
{
    width: 960,
    height: 71,
    top: 603,
    bottom: 674,
    left: 360,
    right: 1320
}
it might be a good idea to extract the top and height properties to decide how they will stack in columns and order them according to priority
*/
