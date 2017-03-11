(function() {
  'use strict';

  let click1 = {},
    click2 = {},
    level = "medium",
    numStars = 3,
    pairs = 8,
    gameStarted, matches, moves, timer, twoStar, oneStar;

  // Constuctor to create HTML to display card front and back
  let Card = function(card, num) {
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

  function setLevel(level) {
    pairs = gameLevels[level].pairs;
    twoStar = gameLevels[level].twoStar;
    oneStar = gameLevels[level].oneStar;
    $('.board').addClass([level].class);
  }

  // set size of card array based on level
  function trimArray(array) {

    // trim array as needed
    while (array.length > pairs) {
      let randomIndex = Math.floor(Math.random() * array.length);
      array.splice(randomIndex, 1);
    }
    return array;
  }

  function makeCardArray(data, level) {

    let array = [];

    // Get the correct sized array for level
    let trimmedData = trimArray(data, level);

    // Add two of each card to the array
    trimmedData.forEach(function(card) {
      array.push(new Card(card, 1));
      array.push(new Card(card, 2));
    });
    return array;
  }

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

      // Add cards to game board
      $('#game-board').append(card.html);

      // Add click listeners
      $(card.id).click(function() {

        // Start timer on first click
        if (!gameStarted) {
          // start timer!
          gameTimer();
          gameStarted = true;
        }

        // Check for match when clicked
        checkMatch(card);
      });
    });
  }

  function checkMatch(card) {

    if (!click1.name) {
      click1 = card;
      $(card.id).addClass('flipped');
      return;

      // For second card, check if its a different card
    } else if (!click2.name && click1.id !== card.id) {
      click2 = card;
      $(card.id).addClass('flipped');

      // Update move count
      moves++;
      $("#moves").text(moves);

      checkStars();
    } else return;

    if (click1.name === click2.name) {
      foundMatch();
    } else {
      hideCards();
    }

  }

  function foundMatch() {

    matches++;

    if (matches === 3) {
      gameOver();
    }

    // Unbind click functions and reset click objects
    $(click1.id).unbind('click');
    $(click2.id).unbind('click');
    // reset click objects
    click1 = {};
    click2 = {};
  }

  function hideCards() {
    //hide cards
    setTimeout(function() {
      $(click1.id).removeClass('flipped');
      $(click2.id).removeClass('flipped');
      // reset click objects
      click1 = {};
      click2 = {};
    }, 600);
  }

  function gameOver() {
    clearInterval(timer);

    // Pause before shoe modal
    setTimeout(function() {
      $('#winModal').show();
    }, 1500);

  }

  function checkStars() {
    let currentStars;
    console.log(moves, oneStar, twoStar)
    if (moves >= oneStar) {
      currentStars = 1;
    } else if (moves >= twoStar) {
      currentStars = 2;
    } else currentStars = 3;
    if (numStars !== currentStars) {
      displayStars(currentStars);
    }

  }

  function gameTimer() {

    let startTime = new Date().getTime();

    // Update the timer every second
    timer = setInterval(function() {

      var now = new Date().getTime();

      // Find the time elapsed between now and start
      var elapsed = now - startTime;

      // Calculate minutes and seconds
      let minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((elapsed % (1000 * 60)) / 1000);

      // Add starting 0 if seconds < 10
      if (seconds < 10) {
        seconds = "0" + seconds;
      }

      let currentTime = minutes + ':' + seconds;

      // Update clock on game screen and modal
      $(".clock").text(currentTime);
    }, 750);

  }

  // Add stars to game screen and modal
  function displayStars(num) {
    let starImage = '<img src="images/rating-star.png">';
    $('.stars').empty();
    for (let i = 0; i < num; i++) {
      $('.stars').append(starImage);
    }
  }

  $('#openModal').click(function() {
    $('#winModal').show();
  });

  $('#winModal .close, #overlay').click(function() {
    $('#winModal').hide();
  });

  $('.modal').click(function() {
    $('.modal').hide();
  });

  $('.modal-content').click(function(event) {
    event.stopPropagation();
  });

  $('#restart').click(function() {
    startGame(cardData, level);
  });
  // TODO  change background-color andor oadd star image on match
  // TODO Remove open Modal button
  // TODO add media queries for mobile
  // TODO set game end
  // TODO add start screen wtih level choice
  // TODO animoate modal

  function startGame(cards, level) {

    // reset game variables
    gameStarted = false;
    moves = 0;
    matches = 0;
    setLevel(level);

    // reset HTML
    $('#game-board').empty();

    $(".clock").text('0:00');
    $("#moves").text('0');
    $('#winModal').hide();

    // Get cards and start the game!
    let cardArray = makeCardArray(cards, level);
    shuffle(cardArray);
    displayCards(cardArray);
    displayStars(3);
  }

  // Initialze game
  startGame(cardData, "easy");

})();
