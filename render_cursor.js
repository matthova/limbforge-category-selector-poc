// how tall is the image?
// replace px numbers with %% of total height

function render_cursor(x, y) {
  var level = y;
  if (y < 40) {
    level = 20;
  } else if (y < 80) {
    level = 80;
  } else if (y < 120) {
    level = 120;
  }
  if (y > 270){
    y = 270
  }
  $("#top").css("clip", "rect(0px, 350px, " + level + "px, 0px)");
  $("#bar").css("top", y + "px");
}
