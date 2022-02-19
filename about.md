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

 
