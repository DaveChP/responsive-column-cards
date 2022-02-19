// document.getElementsByClassName('output')[0].innerHTML="<h2>all good here!</h2>";

const report = document.getElementsByClassName('output')[0];
const cardContainer = document.getElementsByTagName('DIV')[1];
let containerData = cardContainer.getBoundingClientRect();

let markup = `div width is ${parseInt(containerData.width)}px<br>`;
markup += `viewport width is ${window.innerWidth}px<br>`;
markup += `the display div occupies ${parseInt(containerData.width*100/window.innerWidth)}% of the window<br>`;

report.innerHTML = markup;

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
