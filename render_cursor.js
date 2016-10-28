// how tall is the image?
// replace px numbers with %% of total height

function render_cursor(x, y) {
  console.log(y);
  var level = y;
  if (y < 40) {
    level = 0;
    $("#info").text("0");
    console.log("Level = " + level + " y = " + y);
  } else if (y < 80) {
    level = 60;
    $("#info").text("Shoulder Disarticulation");
    console.log("Level = " + level + " y = " + y);
  } else if ((y > 80) && (y < 140)) {
    level = 100;
    $("#info").text("50% Trans Humeral");
    console.log("Level = " + level + " y = " + y);
  } else if ((y > 140) &&(y < 190)) {
    level = 150;-
    $("#info").text("Elbow Disarticulation");
    console.log("Level = " + level + " y = " + y);
  } else if ((y > 190) && (y < 210)) {
    level = 200;
    $("#info").text("Trans Metacarpal");
    console.log("Level = " + level + " y = " + y);
  } else if ((y > 210) && (y < 235)) {
    level = 220;
    $("#info").text("Wrist area");
  } else if ((y > 235) && (y < 240)) {
    level = 230;
    $("#info").text("Hand area");
  }

  $("#top").css("clip", "rect(0px, 350px, " + level + "px, 0px)");
  $("#bar").css("top", y + "px");
}
