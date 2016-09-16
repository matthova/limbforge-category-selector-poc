
$(document).ready(function(){
  var width = $(window).width();   // returns width of browser viewport
  var height = $(window).height();   // returns height of browser viewport

  //Debug Table Variables
  var window_width_text = $('#window_width_text');
  var window_height_text = $('#window_height_text');
  var mouse_down = $('#mouse_down');
  var mouse_move = $('#mouse_move');
  var mouse_up = $('#mouse_up');
  var touch_start = $('#touch_start');
  var touch_move = $('#touch_move');
  var touch_end = $('#touch_end');
  var drag_status = $('#drag_status');

  //Canvas Variables
  var drag_x = 0;
  var drag_y = 0;
  var drag = false;
  var zoom = 1.0;
  var current_x = 0;
  var current_y = 0;
  var ball_radius = 20;
  var old_width = width;
  var old_height = height;

  //Prevent Rubberband Drag on top and bottom edges
  $('body').bind('touchmove', function (ev) {
    ev.preventDefault();
  });

  var body = $("#body");
  var front_canvas = document.getElementById("front");
  var front_context = front_canvas.getContext("2d");
  var background_canvas = document.getElementById("back");
  var back_con = background_canvas.getContext("2d");

  //Resize canvas when window is resized
  renderWindow();
  window.onresize = function(){renderWindow();};
  function renderWindow(){
    width = $(window).width();      // browser window width
    height = $(window).height();    // browser window height
    current_x = current_x * width / old_width;
    current_y = current_y * height / old_height;
    window_width_text.text(width);       // set debug window text
    window_height_text.text(height);     // set debug window text
    renderForeground(front_canvas, front_context);
    renderBackground(background_canvas, back_con);
    old_width = width;
    old_height = height;
  }


  function renderForeground(canvas, context){
    //Set canvas width and height
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = Math.floor(width * zoom) + "px";
    canvas.style.height = Math.floor(height * zoom) + "px";

    //Draw canvas foreground

    context.fillStyle = "#000000";
    context.fillRect(0, 0, width, current_y);

    context.beginPath();
    context.arc(width / 2, height / 4, ball_radius, 0, 2 * Math.PI, false);
    if (current_y > height / 4) {
      context.fillStyle = "#ff0000";
    } else {
      context.fillStyle = "#ffffff";
    }
    context.fill();

    context.beginPath();
    context.arc(width / 2, height / 2, ball_radius, 0, 2 * Math.PI, false);
    if (current_y > height / 2) {
      context.fillStyle = "#ff0000";
    } else {
      context.fillStyle = "#ffffff";
    }
    context.fill();

    context.beginPath();
    context.arc(width / 2, height * 3 / 4, ball_radius, 0, 2 * Math.PI, false);
    if (current_y > height * 3 / 4) {
      context.fillStyle = "#ff0000";
    } else {
      context.fillStyle = "#ffffff";
    }
    context.fill();
  }

  function renderBackground(canvas, context){
    //set canvas width and height
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = Math.floor(width * zoom) + "px";
    canvas.style.height = Math.floor(height * zoom) + "px";

     // set canvas background color
    context.fillStyle = "#999999";
    context.beginPath();
    context.rect(0,0,width,height);
    context.fill();
  }


  //////////////////////////////
  //       Canvas Events      //
  //////////////////////////////

  //Handle creation of click / tap events
  ///////////////////////////////////////

  // Desktop Click Starts
  front_canvas.onmousedown = function(event){
    start_paint(event);
    return false;
  };
  // Mobile Touch Starts
  front_canvas.addEventListener('touchstart', function(event){
    event.preventDefault();
    start_paint_t(event);
  });

  // Desktop Click set all variables
  function start_paint(event){
    drag = true;
    drag_x = event.clientX;
    drag_y = event.clientY;
    update_drag_status();
    update_event_log('mouse_down', drag_x, drag_y);
    return true;
  }
  // Mobile Touch set all variables
  function start_paint_t(event){
    drag = true;
    update_drag_status();
    update_event_log('touch_start', event.touches[0].pageX, event.touches[0].pageY);

    drag_x = event.touches[0].pageX;
    drag_y = event.touches[0].pageY;
    return true;
  }


  //// Handle mouse and touch drag events
  ///////////////////////////////////////

  // Desktop Drag Mouse
  window.onmousemove = function(event){
    if(drag) move_click(event);
    return false;
  };

  // Mobile Tap Drag
  front_canvas.addEventListener('touchmove', function(event){
    move_touch(event); event.preventDefault();
  });

  // Desktop Click Drag Event
  function move_click(event){
    drag_x = event.clientX;
    drag_y = event.clientY;

    if (drag_x > front_canvas.width) drag_x = front_canvas.width - 1;
    if (drag_x < 0) drag_x = 0;

    if (drag_y > front_canvas.height) drag_y = front_canvas.height - 1;
    if(drag_y < 0) drag_y = 0;

    update_event_log('mouse_move', drag_x, drag_y);
    return true;
  }
  // Mobile Tap Drag Event
  function move_touch(event){
    if (!drag) return false;

    drag_x = event.touches[0].pageX;
    drag_y = event.touches[0].pageY;

    // Limit coordinate to canvas boundaries
    if (drag_x > front_canvas.width) drag_x = front_canvas.width - 1;
    if (drag_x < 0) drag_x = 0;

    if (drag_y > front_canvas.height) drag_y = front_canvas.height - 1;
    if(drag_y < 0) drag_y = 0;

    update_event_log('touch_move', drag_x, drag_y);
    return true;
  }


  // Handle mouse and touch end events
  /////////////////////////////////////////

  //Desktop mouse click ends
  front_canvas.onmouseup = function(event){
    if(drag){
      stop_paint(event);
      return false;
    }
  };

  //Mobile tap end
  front_canvas.addEventListener('touchend', function(event){
    stop_paint_t(event); event.preventDefault();
  });

  //Catchall event in case a mouse that is dragging the canvas leaves the canvas
  $(window).mouseup(function(event){
    if(drag){
      stop_paint(event);
      return false;
    }
  });

  //Desktop stop mouse event
  function stop_paint(event){
    drag = false;
    update_drag_status();
    update_event_log('mouse_up', drag_x, drag_y);
    return true;
  }
  //Mobile stop tap event
  function stop_paint_t(event){
    drag = false;
    update_drag_status();
    update_event_log('touch_end', drag_x, drag_y);
    return true;
  }


  //////////////////////////////
  //       Debug  Events      //
  //////////////////////////////

  function update_drag_status(){
    //drag_status.text(drag);
  }

  function update_event_log(id, x, y){
    update_most_recent(x, y);
  }

  function update_most_recent(x, y){
    current_x = x;
    current_y = y;
    renderForeground(front_canvas, front_context);
  }
});
