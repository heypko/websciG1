
var current = "\nTown of Oyster Bay, NY\nTuesday, April 11, 2017\n",
    update = "\nTown of Oyster Bay, NY\nTuesday, April 18, 2017\n",
    color = '',
    span = null;


var diff = JsDiff.diffChars(current, update),
    //display = document.getElementById('display'),
    diffWindow = document.getElementById('diffWindow'),
    fragment = document.createDocumentFragment();

diff.forEach(function(part){
  // green for additions, red for deletions
  // grey for common parts
  color = part.added ? 'green' :
    part.removed ? 'red' : 'grey';
  span = document.createElement('span');
  span.style.color = color;
  span.appendChild(document
    .createTextNode(part.value));
  fragment.appendChild(span);
});

diffWindow.appendChild(fragment);
