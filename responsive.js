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
// instead:

Array.prototype.forEach.call(cardCollection, (card, index) =>
 {
  let cardData = card.getBoundingClientRect();
  markup += `panel ${index} -  `;

    for (property in cardData) {
    markup += `${property}: ${parseInt(cardData[property])}, `;
    } // end current property of cardData object;
  markup += `x-offset: ${window.pageXOffset}, y-offset: ${window.pageYOffset}, priority attribute: ${card.dataset.priority}<br>`;
}); // end for each card in collection;

report.innerHTML = markup;

} // end resize trigger;

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
