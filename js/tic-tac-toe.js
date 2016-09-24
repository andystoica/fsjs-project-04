(function() {

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

var htmlBoard   = '<div class="board" id="board">' +
                    '<header>' +
                      '<h1>Tic Tac Toe</h1>' +
                      '<ul>' +
                        '<li class="players" id="player1"><svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-200.000000, -60.000000)" fill="#000000"><g transform="translate(200.000000, 60.000000)"><path d="M21 36.6L21 36.6C29.6 36.6 36.6 29.6 36.6 21 36.6 12.4 29.6 5.4 21 5.4 12.4 5.4 5.4 12.4 5.4 21 5.4 29.6 12.4 36.6 21 36.6L21 36.6ZM21 42L21 42C9.4 42 0 32.6 0 21 0 9.4 9.4 0 21 0 32.6 0 42 9.4 42 21 42 32.6 32.6 42 21 42L21 42Z"/></g></g></g></svg></li>' +
                        '<li class="players" id="player2"><svg xmlns="http://www.w3.org/2000/svg" width="42" height="43" viewBox="0 0 42 43" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-718.000000, -60.000000)" fill="#000000"><g transform="translate(739.500000, 81.500000) rotate(-45.000000) translate(-739.500000, -81.500000) translate(712.000000, 54.000000)"><path d="M30 30.1L30 52.5C30 53.6 29.1 54.5 28 54.5L25.5 54.5C24.4 54.5 23.5 53.6 23.5 52.5L23.5 30.1 2 30.1C0.9 30.1 0 29.2 0 28.1L0 25.6C0 24.5 0.9 23.6 2 23.6L23.5 23.6 23.5 2.1C23.5 1 24.4 0.1 25.5 0.1L28 0.1C29.1 0.1 30 1 30 2.1L30 23.6 52.4 23.6C53.5 23.6 54.4 24.5 54.4 25.6L54.4 28.1C54.4 29.2 53.5 30.1 52.4 30.1L30 30.1Z"/></g></g></g></svg></li>' +
                      '</ul>' +
                    '</header>' +
                    '<ul class="boxes">' +
                      '<li class="box"></li>' +
                      '<li class="box"></li>' +
                      '<li class="box"></li>' +
                      '<li class="box"></li>' +
                      '<li class="box"></li>' +
                      '<li class="box"></li>' +
                      '<li class="box"></li>' +
                      '<li class="box"></li>' +
                      '<li class="box"></li>' +
                    '</ul>' +
                  '</div>';
/**
   *************************
   * The TTT Player Object *
   *************************
   */
  var TttPlayer = (function() {
    function TttPlayer(initialName, initialScore) {
      this.name = initialName || "None"; // The players name
      this.score = initialScore || 0;    // Keeps the total score for each player
    }

    TttPlayer.prototype = {
      // Ttt Player behaviour
    };

    return TttPlayer;
  })();




  /**
   ***********************
   * The TTT Game Object *
   ***********************
   */
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
          this.board[aMove] = this.cp;
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
      },

      /**
       * Cycles through all available moves and picks a random one
       */
      pickAiMove : function() {
        // Build a list of all available moves (val = 0)
        var availMoves = [];
        for (var i = 0; i < this.board.length; i++) {
          if (this.board[i] === 0) {
            availMoves.push(i);
          }
        }
        // Return a random value
        return availMoves[Math.floor(Math.random() * availMoves.length)];
      }

    };

    return TttGame;
  })();




  /**
   ********************
   * Main Application *
   ********************
   */
  var ttt = new TttGame();

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
    $('.box').css('background-image', '');
    // Activate the first player
    activatePlayer(1);
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

    ////
    /// Multiplayer behaviour
    //
    if (ttt.players[p-1].name !== "Computer"){

      // Bind hover effect for the current user if not computer
      $('.boxes li:not(.box-filled-1, .box-filled-2, .box-filled-ai)').hover(function() {
        $(this).css('background-image', 'url(' + $playerImage + ')');
      }, function() {
        $(this).css('background-image', '');
      });

      // Make a move when the current player clicks an available cell
      $('.boxes li:not(.box-filled-1, .box-filled-2, .box-filled-ai)').click(function() {

        // Make the move, update the UI and check for winners
        var gameStatus = ttt.playMove($(this).index());
        $(this).addClass($playerClass);
        $(this).unbind('mouseenter mouseleave');

        // If the game has finished (status 1, 2 or 3), end the game
        if (gameStatus > 0 && gameStatus !== 9) {
          gameEnd(gameStatus);
          // Or activate the other player in multi player mode or
          // Make the computer move
        } else {
          if (p === 1) {
            activatePlayer(2);
          } else {
            activatePlayer(1);
          }
        }
      });

    ////
    /// Single player behaviour, always for player 2
    //
    } else {
      var AiMove = ttt.pickAiMove();
      // Slow delay to simulate intense computation behind the scene
      // ... consider suggesting a more powerful computer and moan about limited resources
      setTimeout(function() {
        $('.box').eq(AiMove).addClass('box-filled-ai').css('background-image', 'url(' + $playerImage + ')');
        // Make the move and handle possible win situations
        var gameStatus = ttt.playMove(AiMove);
        // If the game has finished (status 1, 2 or 3), end the game
        if (gameStatus > 0) {
          gameEnd(gameStatus);
        // Or give control back to the player
        } else {
          // Wait for animations to complete before giving control back to human player
          setTimeout(function() {
            activatePlayer(1);
          }, 200);
        }
      }, 300);
    }
  }


/**
 * Game initialisation
 * Removes any content from the page and displays
 * the start a new game screen allowing the user to select
 * the option of playing against another user or the computer.
 */

  // Remove all screens, load the start screen and hide all
  // unnecessary elements from view
  $('body div').remove();
  $('body').append(htmlStart);
  $('.player-names').hide();
  $('.btn-start').hide();

  // If the user chosses a human oponent, ask for both their names
  $('.btn-opp-human').click(function() {
    $('.button').hide();
    $('#start p').hide();
    $('.btn-start').show();
    $('.player-names').show().children().first().focus();
    // Start game if pressing Enter in the 2nd field
    $('#p2-name').keyup(function(e) {
      if (e.which === 13) {
        $('.btn-start').trigger('click');
      }
    });
  });

  // If the user chosses a computer oponent, ask for a single name
  $('.btn-opp-computer').click(function() {
    $('.button').hide();
    $('#start p').hide();
    $('.btn-start').show();
    $('.player-names').show().children().first().focus();
    $('#p2-name').hide().val('Computer');
    // Start game if pressing Enter in the name field
    $('#p1-name').keyup(function(e) {
      if (e.which === 13) {
        $('.btn-start').trigger('click');
      }
    });
  });

  // Start the game when clicking the start button
  $('.btn-start').click(function() {
    // Grab the players names before starting the game
    ttt.players[0].name = $('.player-names input').eq(0).val() !== "" ? $('.player-names input').eq(0).val() : "Player One";
    ttt.players[1].name = $('.player-names input').eq(1).val() !== "" ? $('.player-names input').eq(1).val() : "Player Two";
    gameStart();
  });

})();
