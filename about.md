#Responsive card design
Begin with Jen Simmons' page:
view-source:https://labs.jensimmons.com/2017/css/01-009.css
Initial modifications: rename to styles.css, modify link inside index.html

##Desired Features
The layout resembles that of keep.google.com. In particular, the cards, and content within them, vary in height. The column layout is responsive, changing from four columns, through 3, 2, and 1. Columns remain equal width. It's ver nice. The only immediately obvious missing feature is an absence of re-ordering - cards fill columns downwards so their order changes when the page responds to widths. 

##Modifications
###Initial Commit 
The first commit is unchanged from original, bar renaming styles.css and the link to it from index.html

###Style Gutting

Second commit was made following gutting of styles.css.

All classes other than .D were removed from styles.css. Index.html contains only one main class (D). Presumably, the style sheet was built for several pages containing other classes. 

Compound selectors including a named class were deleted from styles.css. Namely .index ul under a @supports category, and a .index block. 

Anchor rules were also removed from styles.css, index.html contains no links. Anchor styles can be added back as required. 

Full page functionality results simply from use of columns and break-inside set to avoid-column and the webkit equivalent.

###Containerising

The original document structure applies the column styles to the body. As the responsive card layout will usually be needed within a container, the class assignment (D) was changed to the enclosing main tag. This broke the layout. The page now rendered into a single column, expanded to accommodate images at full browser width. 

Perhaps <main> tags cannot be treated as a block element. So, the main tag was replaced with a div and assigned the class D. Again, this broke the layout in the same way. 

Closer inspection of the css revealed the reason and the solution. The columns attribute was applied to the compound selector .D main (i.e. main tag inside a .D class). Since main is the sole direct child of body, the column attribute had to be set for body. Instead, a new div was created as to contain everything else, and its class set to D. This works as intended. 

Before committing, the arbitrary class name D, was changed to colum-container to create self-explanatory class names. These changes were then commited as the third commit.  

###Preliminary Javascript

In order to re-order the cards to keep priority content towards the top following re-sizing, some method of working out how many columns are being used will be needed. As the columns items have a width attribute (albeit one that can vary tp fill available space within some, unknown yet, ranges), it will be possible to calculate the number of columns if the container width is known. To this end, a we'll extract some data from the browser using javascript, and display it at the top of the page. Ideally, putative widths should update while resizing.

To this end, a new div (class output) was created at the top of the page. It, and the main div were shrunk to 95% width and centred.

A new file to contain the javascript was created (responsive.js) and linked to from index. html. JS was used to send text to the .output div confirming all good. 

These changes were committed (along with putting a relevant title on the html page).

javascript was used to extract and report the width of the container div using .getBoundingRect() which has the following properties: width, height, top, bottom, left, and right. The extracted width, and its percentage of window.innerWidth were correctly reported to the output div. This minor progress was committed while thought is given to how to calculate a stacking order to display cards by priority. 

A further commit for minor (mostly now commented out) changes to index and styles, which exlpored making float columns inside the report div, was also made.
 
###Using JS to Extract and Present Data on Card Positions and Sizes
The cards (each defined by an article tag) were collected together in an element list called cardCollection
Using .getBoundingClientRect() on each member of the list, data about position, height, and width were extracted and displayed in the output div.

A custom data- attribute was added to each article tag giving them a numberical priority extractable by the .dataset property of the element:
data-priority="1" // inside article opening tag in html
let priority = element.dataset.priority; // javascript extraction.

This data will enable a strategy to be devised to calculate positions and assign different priorities to different positions.

Commit made at this point.

###Isoalting Data Capture in Even Functions
Inspection of the data returned from the .getBoundingClientRect method revealed some odd values that could not easily be explained. Specifically, heights were often way off and had no relationship to those readable from the css inspector, nor to any consideration of margins, padding and borders. Also, the item at the foot of column 1 was often reported as being at the top of column 2).

After much fiddling, it seems that (despite the script being defered) the errors disappeared when the data steps were placed into a function and triggered through event listeners for load and resize. The numbers seem now to be sensible and should allow positions to be manipulated to maintain priority order from the top of the page.

Commit made in order to lock in progess on event listeners.

###How Many Columns?
At any given resize, the number of columns is easily calculated by dividing the container div width, by the card width (all equal to each other, but changes in resize), and rounding down. Javascript was modified to include calculation of number of rows for each resize. Commit made. 

###First Try at Reordering ELements
A new function distributeCards() was created. it will collect elements and attempt to reorder them in a new panel at the foot of the document. It does demonstrate some useful features but caused an unexpected result. Once an element is put somewhere, its original instance is lost. Because a for next loop was used to reverse the order or elements into a new div, it skipped successive elements (as the list was being reduced in size by one each time, with the fist element being removed but the index advanced). 

After some experimentation, the desired effect was achieved using a while(collection.length>0) loop being used to transfer the last item of the collection to the new div, by referencing it by its index set to the length of the collection -1. This could be adapted to remove the items into memory and refil the original container with the re-ordered elements without the need for a new container element. 

Commit made.

###Real Sorting
A new version of distributeCards() was built, the original was commented out at the foot of responsive.js. It creates an array of arrays to house columns, one primary index for each column with inner indices holding an array of elements [n][0], followed by an integer value representing the cumulative element heights as they are added [n][1]. Elements are added iteratively from the priority-ranked elementsArray, with a sort being performed on colsArray between each addition to make index [0] hold the element with the shortest column so far. Thus, by adding the next array from the priority list, elements are always added to the shortest column. No attempt has yet been made to display the re-ordered elements.

###Replacing Page Elements
The article elements are now distributed and ranked inside the cols arrar. Since the html structure has the articles as the only children of a unique main element, a new main element was created into which the articles were filled by iterating a nested for-next loop (outer loop looping through each column, inner loop within (down) that column. Lastly, the existing main element on the page (containing the old order of articles) was simply replaced (it being the sole child of div.column-container). This works but not entirely as intended: the top row was intended to show priorities from left to right. Because the row array is sorted before each new element was assigned (in order to add the new element to the shortest column), the order is not preserved. Will fix after committing this progress. 

###Preserving Column Order
colsArray has one outer element for each column. Within each column are two elements, the first is a further array (with elements ordered 'down'), the second a measure of how long the column is. In order to add the next priority element to the shortest column, colsArray is sorted by column length before each new element is added (thus, the primary order is shuffled as it is filled). This means that the top element of the left most common may not have the highest priority - the only guarantee is that the highest priority element will be in the top row. Left-to-right priority order is not generally achievable but can be for the first, highest priority, most visible elements (beacuse they were each added to a column without height).
We can ensure that the columns are ordered with the highest priority column tops in the lowest outer index, by adding a third element to mark its order, and sorting before filling the container element (filling is ordered).
responsive.js was modified accordingly. The page now displays exactly as intended. Commit.

<b>At this point, the desired features work</b>

###Testing offsetWidth and Height Instead of BoundingClientRect() Data
During development, comprehensive data from element.getBoundingClientRec() was used to understand the layout, to calculate the number of columns, and to update column heights as they were filled. Now that everything works, it might be possible to simplify things using offsetWidth and offsetHeight values instead. These properties are arguably more familiar to developers, take account of padding and borders, and return integer px values (thus removing the need to apply parseInt on BoundingClientRect data. 

To test, a new branch was created called offsetWidths. Data from it will be reported to the screen and compared with the equivalent data obtained from the bounding client rectangle. Assuming the values are equivalent, calculation will be mofdified to use the simpler properties.

There were small discrepancies between the values reported for either offset of bounding rectangle but the former agreed with the box model inspector. Apart from rounding differences, the only mild concern was that the spacing between cards is not included in the card widths. This could be extracted from the css property (where column gap is defined) but to calculate the relevant adjustment, the number of columns is needed (which in turn needs the widths to calculate). Since the gap is small compared to the card width, it might be safe to ignore it but there will remain the possibilty of unexpected results for rare combinations of sizes for cards, gaps and window resize instances. It was ignored previously so will be ignored now.

The number of columns calculated using offset was the same as for the bounding rectangle method. Manual resizing failed to find any instances where the calculation did not agree with the observed column layout, even close to the transition between column numbers. The division to calculate the number of colums was performed without converting values to integers, and they are already rounded regardless of whether returned as strings or numbers (as only digits are present, coercion will take care of things if they are strings).

Overall, the use of offset values presents no problems, and may be simpler and clearer than using the corresponding bounding rectangle values. 


