var TttPlayer = (function() {
  function TttPlayer(initialName, markId, initialScore) {
    this.name = initialName || "None";
    this.id = markId || 0;
    this.score = initialScore || 0;
  }

  TttPlayer.prototype = {
    // Ttt Player behaviour
  };

  return TttPlayer;
})();









var TttGame = (function(){
  function TttGame() {
    this.p1 = new TttPlayer("P1", 1);
    this.p2 = new TttPlayer("P2", 2);
    this.cp = this.p1;
    this.board = [0,0,0,0,0,0,0,0,0];
    this.winner = [];
    this.ended = false;
  }

  TttGame.prototype = {
    /**
     * Initialized a new game
     *
     */
    init : function () {
      this.cp = this.p1;
      this.board = [0,0,0,0,0,0,0,0,0];
      this.winner = [];
      this.ended = false;
    },

    /**
     * Returns the number of moves left in the game
     * Unocupied cells with value 0;
     */
    availableMoves : function() {
      var count = 0;
      for (var i = 0; i < this.board.length; i++) {
        if (this.board[i] === 0) {
          count++;
        }
      }
      return count;
    },

    /**
     * If the move is permitted, updates the boards
     * with the current move for the current player, swaps the players
     * and returns true if completed successfully, false otherwise
     */
    play : function(aMove) {
      // Only if the move is permitted
      if (this.board[aMove] === 0) {
        // Mark the board
        this.board[aMove] = this.cp.id;
        // And swap the current player
        if (this.cp.id === 1) {
          this.cp = this.p2;
        } else {
          this.cp = this.p1;
        }
        return true;
      }
      return false;
    },

    /**
      * Helper function to check if cells are the same
      */
    checkCells : function(c1, c2, c3) {
      return ((this.board[c1] === this.board[c2]) && (this.board[c2] === this.board[c3]) && (this.board[c1] > 0));
    },

    /**
     * Return an array containing the winner(s) of the game
     * If there is a winner, a single player is return or
     * both players are return in case of a draw.
     * Returns false if there is no winner and there are still
     * moves to be played.
     */
    winner : function() {
      var win = 0;

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

      var result = [];
      // Return both players if no winner is found
      if (win === 0) {
        // If no winner and still moves to be played
        if (this.availableMoves() > 0) {
          return false;
        // Otherwise return both players
        } else {
          result.push(this.p1);
          result.push(this.p2);
        }
      // Return fist player
      } else if (win === 1) {
        result.push(this.p1);
      // Return second player
      } else if (win === 2) {
        result.push(this.p2);
      }

      return result;
    }

  };


  return TttGame;
})();












var ttt = new TttGame();
