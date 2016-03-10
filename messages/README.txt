Identify what aspects of the work have been correctly implemented and what have not.
	To my knowledge, the requirements of this lab have been correctly implemented. I was unclear if I needed to use a for loop so as to make this applicable for other lists, but for this particular one, it appears to work correctly.

Identify anyone with whom you have collaborated or discussed the assignment.


Say approximately how many hours you have spent completing the assignment.
	I spent about 1-1.5 hours on this assignment (mainly looking through examples and notes to figure out how to start the implementation).


is it possible to request the data from a different origin (e.g., http://messagehub.herokuapp.com/) or from your local machine (from file:///) from using XMLHttpRequest?

No, it is not possible, because that does not follow the same-origin policy. If you try to open the index in a browser window or from your local machine, it will only show what is explicitly in the HTML file, and what is in the <script> will not appear because it does not have the same origin permissions.