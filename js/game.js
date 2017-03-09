let click1 = {};
let click2 = {};
let gameStarted = false;
let moves = 0;
let matches = 0;

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
    $('#game-board').append(card.html);
    $("#clock").text("0:00");
    $("#moves").text(moves);
    $(card.id).click(function() {
      if (!gameStarted) {
        // start timer!
        gameTimer();
        gameStarted = true;
      }
      moves++;
      $("#moves").text(moves);
      checkCard(card);
    });
  });
}

function checkCard(card) {

  if (!click1.name) {
    click1 = card;
    $(card.id).addClass('flipped');
    return;
  } else if (!click2.name && click1.id !== card.id) {
    click2 = card;
    $(card.id).addClass('flipped');
  } else return;

  if (click1.name === click2.name) {
    // TODO  change background-color
    // TODO increase score
    matches++;
    $("#matches").text(matches);
    $(click1.id).unbind('click');
    $(click2.id).unbind('click');
    // reset click objects
    click1 = {};
    click2 = {};
  } else {
    //hide cards
    setTimeout(function() {
      $(click1.id).removeClass('flipped');
      $(click2.id).removeClass('flipped');
      // reset click objects
      click1 = {};
      click2 = {};
    }, 600);
  }

}

var Card = function(card, num) {
  let cardID = card.id + '-' + num;
  this.id = '#' + card.id + '-' + num;
  this.image = card.image;
  this.name = card.name;
  this.html = `<article class="card" id="${cardID}">
      <div class="card-back">
        <img src="images/${this.image}" class="card-image" >
      </div>
      <div class="card-front">
        <img src="images/pokeball.png" class="card-image" >
      </div>
    </article>`;
};


function gameTimer() {

  let startTime = new Date().getTime();

  // Update the timer every second
  let timer = setInterval(function() {

    var now = new Date().getTime();

    // Find the time elapsed between now and start
    var elapsed = now - startTime;

    // Time calculations hours, minutes and seconds
    let minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((elapsed % (1000 * 60)) / 1000);
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    let currentTime = minutes + ':' + seconds;

    $("#clock").text(currentTime);
  }, 1000);

}

let cardArray = makeCardArray(cardData);
shuffle(cardArray);
displayCards(cardArray);
