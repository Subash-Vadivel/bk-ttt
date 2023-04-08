exports.winner=(board)=>{
    const winningCombos = [
        // Rows
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        // Columns
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        // Diagonals
        [0, 4, 8], [2, 4, 6]
      ];
    
      for (let i = 0; i < winningCombos.length; i++) {
        const [a, b, c] = winningCombos[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          return true;
        }
      }
    
      return false;
    }

    exports.check=(board)=>{
      for(var i=0;i<board.length;i++)
      {
        if(board[i]==null)
        return false;
      }
      return true;
    }