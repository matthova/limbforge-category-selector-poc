/**
 * This library is used to keep track of the cursor's current X and Y values.
 *
 * It should work identically for desktop and mobile.
 *
 * If the window is resized or rotated, it should maintain a proportional location.
 *
 * If the mouse is dragged outside of the window,
 * the X and Y value should stay at their maximum or minimum value.
 */
$(document).ready(function(){
  //////////////////////////////////////////////////////////////////////////////
  // THE CORE PURPOSE OF THIS LIBRARY IS TO ACCURATELY TRACK THESE TWO VARIABLES
  var current_x = 0;
  var current_y = 0;
  //////////////////////////////////////////////////////////////////////////////

  // Declare all jquery variables
  var $window = $(window);
  var $body = $('body');

  var width = $window.width();    // returns width of browser viewport
  var height = $window.height();  // returns height of browser viewport
  var old_width = width;          // placeholder used in case of window being resized
  var old_height = height;        // placeholder used in case of window being resized

  // Important for keeping your value on the screen, even when you drag off the screen
  var dragging = false;           // boolean value for if the mouse or touch is dragging
  var drag_x = 0;                 // keeps track of x when dragging
  var drag_y = 0;                 // keeps track of y when dragging

  //Prevent Rubberband Drag on top and bottom edges
  $body.bind('touchmove', function (e) {
    e.preventDefault();
  });

  //Resize canvas when window is resized
  renderWindow(); // Render any events for the first time
  window.onresize = function(){
    renderWindow();
  };

  function renderWindow(){
    width = $window.width();      // browser window width
    height = $window.height();    // browser window height
    // if the image needs to resize on mobile revisit this:
    //current_x = current_x * width / old_width;
    //current_y = current_y * height / old_height;
    render_cursor(parseInt(current_x, 10), parseInt(current_y, 10));

    // Set the current width and height to old_width and old_height
    // after all resize logic is complete
    old_width = width;
    old_height = height;
  }

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////// MOUSE LIFECYCLE /////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  // The functions set below will deal with a mouse lifecycle
  // The mouse is clicked/tapped, moved, and released


  //Handle creation of click / tap events
  ///////////////////////////////////////

  // Desktop Click Starts
  document.body.onmousedown = function(event){
    dragging = true;
    drag_x = event.clientX;
    drag_y = event.clientY;
    update_event_log('mouse_down', drag_x, drag_y);
    return false;
  };
  // Mobile Touch Starts
  document.body.addEventListener('touchstart', function(event){
    event.preventDefault();
    dragging = true;
    drag_x = event.touches[0].pageX;
    drag_y = event.touches[0].pageY;
    update_event_log('touch_start', drag_x, drag_y);
  });

  //// Handle mouse and touch drag events
  ///////////////////////////////////////

  // Desktop Drag Mouse
  window.onmousemove = function(event){
    if (dragging) {
      drag_x = event.clientX;
      drag_y = event.clientY;

      // Keep it within the browser window
      if (drag_x > width) {
        drag_x = width - 1;
      }
      if (drag_x < 0) {
        drag_x = 0;
      }

      if (drag_y > height) {
        drag_y = height - 1;
      }
      if (drag_y < 0) {
        drag_y = 0;
      }
      update_event_log('mouse_move', drag_x, drag_y);
    }
    return false;
  };

  // Mobile Tap Drag
  document.body.addEventListener('touchmove', function(event){
    event.preventDefault();
    if (!dragging) {
      return false;
    }

    drag_x = event.touches[0].pageX;
    drag_y = event.touches[0].pageY;

    // Limit coordinate to canvas boundaries
    if (drag_x > width) {
      drag_x = width - 1;
    }
    if (drag_x < 0) {
      drag_x = 0;
    }

    if (drag_y > height) {
      drag_y = height - 1;
    }
    if(drag_y < 0) {
      drag_y = 0;
    }

    update_event_log('touch_move', drag_x, drag_y);
    return true;
  });

  // Handle mouse and touch end events
  /////////////////////////////////////////

  //Desktop mouse click ends
  document.body.onmouseup = function(event){
    if (dragging) {
      dragging = false;
      update_event_log('mouse_up', drag_x, drag_y);
    }
  };

  //Catchall event in case a mouse that is dragging the canvas leaves the canvas
  $(window).mouseup(function(event){
    if (dragging) {
      dragging = false;
      update_event_log('mouse_up', drag_x, drag_y);
    }
  });

  //Mobile tap end
  document.body.addEventListener('touchend', function(event){
    event.preventDefault();
    dragging = false;
    update_event_log('touch_end', drag_x, drag_y);
    return true;
  });

  function update_event_log(id, x, y){
    // You can log events here
    // console.log('Event', id);
    // console.log('Just moved to', x, y);
    update_most_recent(x, y);
  }

  function update_most_recent(x, y){
    current_x = x;
    current_y = y;
    renderWindow();
  }
});
