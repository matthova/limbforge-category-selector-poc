
$(document).ready(function(){
  //Declare Variables
  var height = $(window).height();   // returns height of browser viewport
  var width = $(window).width();   // returns height of browser viewport
  var window_width = $('#window_width');
  var window_height = $('#window_height');
  var mouse_down = $('#debug_row_mouse_down');
  var mouse_move = $('#debug_row_mouse_move');
  var mouse_up = $('#debug_row_mouse_up');
  var touch_start = $('#debug_row_touch_start');
  var touch_move = $('#debug_row_touch_move');
  var touch_end = $('#debug_row_touch_end');
  var drag_status = $('#drag_status');
  var touch_x = 0;
  var touch_y = 0;
  var drag = false;
  zoom = 1.0;
  
  window.onresize = function(){renderWindow();};

  //Prevent Rubberband Drag on OSX and mobile
  $('body').bind('touchmove', function (ev) { 
    ev.preventDefault();
  });

  front_can = document.getElementById("front");
  front_con = front_can.getContext("2d");
  back_can = document.getElementById("back");
  back_con = back_can.getContext("2d");
  renderWindow();

  function renderWindow(){
    width = $(window).width();      // browser window width
    height = $(window).height();    // browser window height
    window_width.text(width);       // set debug window text
    window_height.text(height);     // set debug window text
    renderForeground(front_can, front_con);
    renderBackground(back_can, back_con);
  }
  
  function renderForeground(canvas, context){
    canvas.width = width;        // set canvas' div width
    canvas.height = height / 2;  // set canvas' div height
    canvas.style.width = Math.floor(width * zoom) + "px";        //  set canvas' width
    canvas.style.height = Math.floor(height * zoom / 2) + "px";  //  set canvas' height
    context.fillStyle = "rgba(255, 255, 0, .5)";
    context.beginPath();
    context.rect(0,0,width / 2,height / 2);
    context.fill();
  }

  function renderBackground(canvas, context){
    canvas.width = width;        // set canvas' div width
    canvas.height = height / 2;  // set canvas' div height
    canvas.style.width = Math.floor(width * zoom) + "px";        //  set canvas' width
    canvas.style.height = Math.floor(height * zoom / 2) + "px";  //  set canvas' height
    context.fillStyle = "#999999"; // set canvas background color
    context.beginPath();
    context.rect(0,0,width,height / 2);
    context.fill();
  }

  front_can.onmousedown = function(event){ 
    start_paint(event); 
    return false; 
  };
  
  front_can.onmouseup = function(event){
    stop_paint(event); 
    return false; 
  };
  
  front_can.onmousemove = function(event){
    preview_paint(event); 
    return false;
  };

  front_can.addEventListener('touchstart', function(event){
    event.preventDefault(); start_paint_t(event); 
  });

  front_can.addEventListener('touchmove', function(event){
    preview_paint_t(event); e.preventDefault(); 
  });

  front_can.addEventListener('touchend', function(event){
    stop_paint_t(event); e.preventDefault(); 
  });
  
  function update_drag_status(){
    drag_status.text(drag);
  } 

  function start_paint(event){
    drag = true;
    update_drag_status();
    update_event_log('mouse_down', event.clientX, event.clientY);
    return true;
  }

  function start_paint_t(event){
    drag = true;
    update_drag_status();
    update_event_log('touch_start', event.touches[0].pageX, event.touches[0].pageY);

    touch_x = event.touches[0].pageX;
    touch_y = event.touches[0].pageY;
    return true;
  }

  function stop_paint(event){
    drag = false;
    update_drag_status();
    update_event_log('mouse_up', event.clientX, event.clientY);
    return true;
  }

  function stop_paint_t(event){
    drag = false;
    update_drag_status();
    update_event_log('touch_end', touch_x, touch_y);
    return true;
  }

  function update_event_log(id, x, y){
    var row = document.getElementById(id);	
    var d = new Date();
    var time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    row.innerHTML = '<td>' + id + '</td><td>' + time + '</td><td>' + x + '</td><td>' + y + '</td>';
  }

  function preview_paint(event){
    if(!drag){return false;}
    update_event_log('mouse_move', event.clientX, event.clientY);
    return true;
  }

  function preview_paint_t(event){

    if(!drag){return false;}

    touch_x = event.touches[0].pageX;
    if(touch_x > front_can.width){
      touch_x = front_can.width - 1;
    }else if(touch_x < 0){
      touch_x = 0;
    }
    
    touch_y = event.touches[0].pageY;
    if(touch_y > front_can.height){
      touch_y = front_can.height - 1;
    }else if(touch_y < 0){
      touch_y = 0;
    }
    
    update_event_log('touch_move', touch_x, touch_y);    
    return true;
  }
});