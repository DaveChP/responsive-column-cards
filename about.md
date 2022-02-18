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

