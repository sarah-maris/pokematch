let click1 = null;
let click2 = null;

function makeCardArray(data) {
  let array = [];
  //create array
  data.forEach(function(card) {
    array.push(new Card(card, 1));
    array.push(new Card(card, 2));
  });
  return array;
}

/* Shuffle array randomly */
function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue, randomIndex;

  while (0 !== currentIndex) {

    // Choose an element randomly
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // Switch current element and random element
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


function displayCards(cardArray) {
  cardArray.forEach(function(card) {
    let cardID = '#' + card.id;
    $('#game-board').append(card.html);
    $(cardID).click(function() {
      $(cardID).toggleClass('flipped');
      console.log("click", card.name)
    })
  });
}

function flipCard(card) {

}

var Card = function(card, num) {
  this.id = card.id + '-' + num;
  this.image = card.image;
  this.name = card.name;
  this.html = `<article class="card" id="${this.id}">
      <div class="card-back">
        <img src="images/${this.image}" class="card-image" >
      </div>
      <div class="card-front">
        <img src="images/pokeball.png" class="card-image" >
      </div>
    </article>`;
};

let cardArray = makeCardArray(cardData);
shuffle(cardArray);
displayCards(cardArray);


//TODO: create click listener to toggle visilbity of image and name.  Must store
// name of clicked items and trigger match if win and flip (use setTimeout) if no match
//TODO: create move counter




function clickListener() {
  if (!click1) {
    this.name = click1;
    // show card 1
    return;
  } else if (!click2) {
    this.name = click2;
    // show card 2
  } else return;

  if (click1 === click2) {
    // change background-color
    // increase score

  } else {
    //hide cards

  }
  // reset clicks
  click1 = null;
  click2 = null;
}
