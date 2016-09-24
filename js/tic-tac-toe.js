var TttPlayer = (function() {
  function TttPlayer(initialName, initialScore, isAI) {
    this.name = initialName || "None"; // The players name
    this.score = initialScore || 0;    // Keeps the total score for each player
    this.isAI = false;                 // Indicates whether the player is human or AI
  }

  TttPlayer.prototype = {
    // Ttt Player behaviour
  };

  return TttPlayer;
})();



var TttGame = (function(){
  function TttGame() {
    this.players = [new TttPlayer("P1", 0, false), new TttPlayer("P2", 0, false)];
    this.cp = 1;
    this.board = [0,0,0,0,0,0,0,0,0];
  }

  TttGame.prototype = {
    /**
     * Initialized a new game
     *
     */
    init : function () {
      this.p1 = this.players[0].name;
      this.p2 = this.players[1].name;
      this.cp = 1;
      this.board = [0,0,0,0,0,0,0,0,0];
    },


    /**
     * Returns the number of moves left in the game
     * Unocupied cells with value 0;
     */
    numMovesLeft : function() {
      var count = 0;
      for (var i = 0; i < this.board.length; i++) {
        if (this.board[i] === 0) {
          count++;
        }
      }
      return count;
    },


    /**
      * Helper function to check if cells are the same
      */
    checkCells : function(c1, c2, c3) {
      return ((this.board[c1] === this.board[c2]) && (this.board[c2] === this.board[c3]) && (this.board[c1] > 0));
    },


    /**
     * Checkes board for winning combinations and returns:
     *   0 - No winning combinations
     *   1 - Player 1 won
     *   2 - Player 2 won
     */
    checkBoard : function() {
      var win = 0; // Default value to return if no winners are found

      // Horizontal check
      if (this.checkCells(0, 1, 2)) {
        win = this.board[1];
      } else if (this.checkCells(3, 4, 5)) {
        win = this.board[3];
      } else if (this.checkCells(6, 7, 8)) {
        win = this.board[6];
      // Vertical check
      } else if (this.checkCells(0, 3, 6)) {
        win = this.board[0];
      } else if (this.checkCells(1, 4, 7)) {
        win = this.board[1];
      } else if (this.checkCells(2, 5, 8)) {
        win = this.board[2];
      // Diagonal check
      } else if (this.checkCells(0, 4, 8)) {
        win = this.board[0];
      } else if (this.checkCells(2, 4, 6)) {
        win = this.board[2];
      }

      return win;
    },


    /**
     * Checks for the legality of a move and checks the board after the move
     *   0 - No winners, moves left
     *   1 - Player 1 won
     *   2 - Player 2 won
     *   3 - Draw, no moves left
     *   9 - Illeagal move, invalid position or game ended
     */
    playMove : function(aMove) {
      // Check if move is available and legal
      if ((aMove >=0 && aMove <=8) && (this.board[aMove] === 0)) {

        // Make the move and check the game board for winners
        ttt.board[aMove] = ttt.cp;
        var status = this.checkBoard();

        // No winners found
        if (status === 0) {
          if (this.numMovesLeft() > 0) {
            // Next player's turn
            if (this.cp === 1) {
              this.cp = 2;
            } else {
              this.cp = 1;
            }
            return 0; // No winners, moves left
          } else {
            return 3; // Draw - No winners, no moves left
          }

        // We have winners
        } else {
          this.players[status-1].score++; // Increase player score
          return status; // Return the winning player number
        }

      } else {
        return 9; // Illeagal move
      }
    }

  };

  return TttGame;
})();



////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////



var htmlStart = '<div class="screen screen-start" id="start">' +
                '<header>' +
                '<h1>Tic Tac Toe</h1>' +
                '<div class="player-names">' +
          			'	<input type="text" placeholder="Player One" id="p1-name">' +
          			'	<input type="text" placeholder="Player Two" id="p2-name">' +
          			'</div>' +
          			'<p class="intro-message">Please pick an opponent</p>' +
          			'<a href="#" class="button btn-opp-human">Human</a>' +
          			'<a href="#" class="button btn-opp-computer">Computer</a>' +
          			'<a href="#" class="button btn-start">Start game</a>' +
                '</header>' +
                '</div>';

var htmlWin   = '<div class="screen screen-win" id="finish">' +
                '<header>' +
                '<h1>Tic Tac Toe</h1>' +
                '<p class="message">Winner</p>' +
                '<a href="#" class="button">New game</a>' +
                '</header>' +
                '</div>';



var ttt = new TttGame();
var htmlBoard = $('#board');


/**
 * Remove any content from the page and display
 * the start a new game screen
 */
function gameInit() {
  $('body div').remove();
  $('body').append(htmlStart);
  $('.player-names').hide();
  $('.btn-start').hide();
  // If chosing human oponent, ask for their names
  $('.btn-opp-human').click(function() {
    $('.button').hide();
    $('#start p').hide();
    $('.btn-start').show();
    $('.player-names').show().children().first().focus();
  });

  // Start the game when clicking the start button
  $('.btn-start').click(function() {
    ttt.players[0].name = $('.player-names input').eq(0).val() !== "" ? $('.player-names input').eq(0).val() : "Player One";
    ttt.players[1].name = $('.player-names input').eq(1).val() !== "" ? $('.player-names input').eq(1).val() : "Player Two";
    gameStart();
  });
}


/**
 * Ends the current game
 */
function gameEnd(status) {
  $('body div').remove();
  $('body').append(htmlWin);

  var screen = '';
  var message = '';

  switch (status) {
    case 1:
      screen = 'screen-win-one';
      message = ttt.p1 + ' Won!';
      break;
    case 2:
      screen = 'screen-win-two';
      message = ttt.p2 + ' Won!';
      break;
    case 3:
      screen = 'screen-win-tie';
      message = 'It\'s a Tie!';
      break;
  }

  // Display the corrent winning screen and add button behaviour
  $('.message').text(message);
  $('.screen').addClass(screen);
  $('.button').click(function() {
    gameStart();
  });
}



/**
 * Selects the current player
 */
function activatePlayer(p) {
  var $playerId = '',
      $playerImage = '',
      $playerClass = '';

  if (p === 1) {
    $playerId = '#player1';
    $playerImage = 'img/o.svg';
    $playerClass = 'box-filled-1';
  } else {
    $playerId = '#player2';
    $playerImage = 'img/x.svg';
    $playerClass = 'box-filled-2';
  }

  // Activate the current player and unbind click and hover events
  $('.players').removeClass('active');
  $($playerId).addClass('active');
  $('.boxes li').unbind('mouseenter mouseleave');
  $('.boxes li').unbind('click');

  // Bind hover effect for the current user
  $('.boxes li:not(.box-filled-1, .box-filled-2)').hover(function() {
    $(this).css('background-image', 'url(' + $playerImage + ')');
  }, function() {
    $(this).css('background-image', 'none');
  });

  // Make a move when the current player clicks an available cell
  $('.boxes li:not(.box-filled-1, .box-filled-2)').click(function() {

    // Make the move, update the UI and check for winners
    var gameStatus = ttt.playMove($(this).index());
    $(this).addClass($playerClass);
    $(this).unbind('mouseenter mouseleave');

    // If the game has finished (status 1, 2 or 3), end the game
    if (gameStatus > 0 && gameStatus !== 9) {
      gameEnd(gameStatus);
    // Or activate the other player
    } else {
      if (p === 1) {
        activatePlayer(2);
      } else {
        activatePlayer(1);
      }
    }

  });

}

/**
* Starts a new game by removing any previous graphics.
* Initiliases the game and loads the board screen
*/
function gameStart() {
  // Initialise the game
  ttt.init();
  $('body div').remove();
  $('body').append(htmlBoard);
  $('.players span').remove();
  $('#player1').prepend('<span>' + ttt.p1 + '</span>');
  $('#player2').prepend('<span>' + ttt.p2 + '</span>');
  $('.box').attr('class', 'box');
  $('.box').css('background-image', 'none');
  // Activate the first player
  activatePlayer(1);
}





gameInit();
