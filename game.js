function start() {
  changeDiv("gamePage");
}


// game over functios dialog.
function ShowDialogGameOver() {
  // dialog modal when the game is over - no more life or time=0
  document.getElementById("gameover1").showModal();
}
function CloseDialogGameOver() {
  document.getElementById("gameover1").close();
}

// about functions dialog.
function ShowDialog() {
  document.getElementById("about1").showModal();
}
function CloseDialog() {
  document.getElementById("about1").close();
}
$(document).ready(function () {
  // close th dialog window by clicking Esc or on the 'X' or somwhere else on the screen beside the dialog
  //https://stackoverflow.com/questions/25864259/how-to-close-the-new-html-dialog-tag-by-clicking-on-its-backdrop
  var dialog = document.getElementById("about1");
  dialog.addEventListener("click", function (event) {
    var rect = dialog.getBoundingClientRect();
    var isInDialog =
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width;
    if (!isInDialog) {
      dialog.close();
      console.log("close dialog about");
    }
  });
});
