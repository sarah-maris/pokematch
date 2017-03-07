var cardArray = [];
//create array
cards.forEach(function(card) {
  cardArray.push(card);
  cardArray.push(card);
});


/* Shuffle array randomly */
function shuffle(array) {
  var currentIndex = array.length,
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
    var cardHTML = '<article class="card">' +
      '<div class="card-back"> ' +
      '<img src="images/' + card.image + '" class="card-image" >' +
      '</div>' +
      '<div class="card-front"> ' +
      '<img src="images/pokeball.png" class="card-image" >' +
      '</div>' +
      '</article>';
    $('#game-board').append(cardHTML);
  });
}


shuffle(cardArray);
displayCards(cardArray);
