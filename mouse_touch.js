
$(document).ready(function(){
  //Declare Variables
  var height = $(window).height();   // returns height of browser viewport
  var width = $(window).width();   // returns height of browser viewport
  var window_width = $('#window_width');
  var window_height = $('#window_height');
	var mouse_down = $('#debug_row_mouse_down');
  var mouse_move = $('#debug_row_mouse_move');
  var mouse_up = $('#debug_row_mouse_up');
  var touch_start = $('debug_row_touch_start');
  var touch_move = $('debug_row_touch_move');
  var touch_end = $('debug_row_touch_end');
  
  var touch_x = 0;
  var touch_y = 0;
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
  // front_can.mousedown(function(event){
  //     event.preventDefault();
  // });
  // back_can.mousedown(function(event){
  //     event.preventDefault();
  // });

  renderWindow();
  //   back_can = document.getElementById("back");
  //   back_can.width = width;
  //   back_can.height = height;
  //   back_con = back_can.getContext("2d");
  // 
  //   back_can.style.width = Math.floor(width * zoom) + "px";
  //   back_can.style.height = Math.floor(height * zoom) + "px";

  //DO WORK





  
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
// var started = false;
// 
// var debug = true;
// 
// 
// function init()
// {
//   start_x = 50;
//   start_y = 50;
//   dot_radie = 2;
//   dot_count_x = 3;
//   dot_count_y = 5;
//   dot_space_x = 50;
//   dot_space_y = 50;
//   char_space_x = 100;
//   char_count = 5;
//   auto_store_closeness = 10;
//   zoom = 1.0;
// 
//   width = start_x * 2 + dot_space_x * (dot_count_x - 1) * char_count + char_space_x * (char_count - 1);
//   height = start_y * 2 + dot_space_y * (dot_count_y - 1);
// 
// 
//   painting = false;
//   last_dot = 0;
//   current_dot = 0;
//   lines = [];
// 
//   clear();
// 
  front_can.onmousedown = function(event){ 
    //start_paint(event); 
    
    return false; 
  };
  
  front_can.onmouseup = function(event){
    //stop_paint(event); 
    return false; 
  };
  
  front_can.onmousemove = function(event){
    //preview_paint(event); 
    return false;
  };

  front_can.addEventListener('touchstart', function(e){
    //start_paint_t(event); e.preventDefault(); 
  });

  front_can.addEventListener('touchmove', function(e){
    //preview_paint_t(event); e.preventDefault(); 
  });

  front_can.addEventListener('touchend', function(e){
    //stop_paint_t(event); e.preventDefault(); 
  });
  
  
// 
//   started = true;
//   
//   if(debug)
//   {
//     document.getElementById('debug_table').style.display = 'block';
//   }
// }
// 
// function clear()
// {
//   lines = [];
//   painting = false;
//   last_dot = 0;
//   current_dot = 0;
//   back_con.clearRect(0, 0, back_can.width, back_can.height);
//   make_dots(char_count);
// }
// 
// function start_paint(event)
// {
//   if(debug) debug_row('mouse_down', event.clientX, event.clientY);
//   
//   painting = true;
// 
//   current_dot = last_dot = mouse_to_dot_pos(event.clientX, event.clientY);
// 
//   return true;
// }
// 
// function start_paint_t(event)
// {
//   if(debug) debug_row('touch_start', event.touches[0].pageX, event.touches[0].pageY);
// 
//   touch_x = event.touches[0].pageX;
//   touch_y = event.touches[0].pageY;
//   painting = true;
// 
//   current_dot = last_dot = mouse_to_dot_pos(event.touches[0].pageX, event.touches[0].pageY);
// 
//   return true;
// }
// 
// function stop_paint(event)
// {
//   if(debug) debug_row('mouse_up', event.clientX, event.clientY);
// 
//   painting = false;
//   current_dot = mouse_to_dot_pos(event.clientX, event.clientY);
// 
//   preview_line(event.clientX, event.clientY);
//   store_line();
// 
//   return true;
// }
// 
// function stop_paint_t(event)
// {
//   if(debug) debug_row('touch_end', touch_x, touch_y);
// //   if(debug) debug_row('touch_end', event.touches[0].pageX, event.touches[0].pageY);
// 
//   painting = false;
//   current_dot = mouse_to_dot_pos(touch_x, touch_y);
// 
//   preview_line(touch_x, touch_y);
//   store_line();
// 
//   return true;
// }
// 
// function preview_paint(event)
// {
//   if(debug) debug_row('mouse_move', event.clientX, event.clientY);
// 
//   if(!painting)
//   {
//     return false;
//   }
// 
//   current_dot = mouse_to_dot_pos(event.clientX, event.clientY);
//   preview_line(event.clientX, event.clientY);
// 
//   return true;
// }
// 
// function preview_paint_t(event)
// {
//   if(debug) debug_row('touch_move', event.touches[0].pageX, event.touches[0].pageY);
// 
//   if(!painting)
//   {
//     return false;
//   }
// 
//   touch_x = event.touches[0].pageX;
//   touch_y = event.touches[0].pageY;
//   current_dot = mouse_to_dot_pos(event.touches[0].pageX, event.touches[0].pageY);
//   preview_line(event.touches[0].pageX, event.touches[0].pageY);
// 
//   return true;
// }
// 
// function preview_line(mouse_x, mouse_y)
// {
//   front_con.clearRect(0, 0, front_can.width, front_can.height);
// 
//   if(current_dot == last_dot)
//   {
//     return true;
//   }
// 
//   var char_width = dot_space_x * (dot_count_x - 1);
//   var char_space_width = char_width + char_space_x;
// 
//   var last_char_nr = (last_dot - (last_dot % 100)) / 100;
//   var last_dot_x_nr = ((last_dot % 100) - (last_dot % 10)) / 10;
//   var last_dot_y_nr = (last_dot % 10);
// 
//   var current_char_nr = (current_dot - (current_dot % 100)) / 100;
//   var current_dot_x_nr = ((current_dot % 100) - (current_dot % 10)) / 10;
//   var current_dot_y_nr = (current_dot % 10);
// 
//   if(last_char_nr != current_char_nr)
//   {
//     return true;
//   }
// 
//   var last_dot_x_pos = start_x + last_char_nr * char_space_width + last_dot_x_nr * dot_space_x;
//   var last_dot_y_pos = start_y + last_dot_y_nr * dot_space_y;
//   var current_dot_x_pos = start_x + current_char_nr * char_space_width + current_dot_x_nr * dot_space_x;
//   var current_dot_y_pos = start_y + current_dot_y_nr * dot_space_y;
// 
//   front_con.beginPath();
//   front_con.strokeStyle = 'blue';
//   front_con.lineWidth = 10;
//   front_con.moveTo(last_dot_x_pos, last_dot_y_pos);
//   front_con.lineTo(current_dot_x_pos, current_dot_y_pos);
//   front_con.stroke();
//   front_con.closePath();
// 
//   var dx = mouse_x - current_dot_x_pos;
//   var dy = mouse_y - current_dot_y_pos;
// 
//   if(dx > -auto_store_closeness && dx < auto_store_closeness && dy > -auto_store_closeness && dy < auto_store_closeness)
//   {
//     store_line();
//     last_dot = current_dot;
//   }
// 
//   return true;
// }
// 
// function store_line()
// {
//   front_con.clearRect(0, 0, front_can.width, front_can.height);
// 
//   if(current_dot == last_dot)
//   {
//     return true;
//   }
// 
//   var char_width = dot_space_x * (dot_count_x - 1);
//   var char_space_width = char_width + char_space_x;
// 
//   var last_char_nr = (last_dot - (last_dot % 100)) / 100;
//   var last_dot_x_nr = ((last_dot % 100) - (last_dot % 10)) / 10;
//   var last_dot_y_nr = (last_dot % 10);
// 
//   var current_char_nr = (current_dot - (current_dot % 100)) / 100;
//   var current_dot_x_nr = ((current_dot % 100) - (current_dot % 10)) / 10;
//   var current_dot_y_nr = (current_dot % 10);
// 
//   if(last_char_nr != current_char_nr)
//   {
//     return true;
//   }
// 
//   var char_nr = last_char_nr;
//   var dx = current_dot_x_nr - last_dot_x_nr;
//   var dy = current_dot_y_nr - last_dot_y_nr;
//   var adx = dx;
//   var ady = dy;
// 
//   if(dx < 0)
//   {
//     adx = -dx;
//   }
// 
//   if(dy < 0)
//   {
//     ady = -dy;
//   }
// 
//   if(ady > 1 && adx == ady)
//   {
//     dx = dx / adx;
//     dy = dy / ady;
//     dot_y = last_dot_y_nr;
//     dot_x = last_dot_x_nr;
//     while(dot_x != current_dot_x_nr)
//     {
//       dot_nr = char_nr * 100 + dot_x * 10 + dot_y;
//       add_line(dot_nr, dot_nr + dx * 10 + dy);
// 
//       dot_x += dx;
//       dot_y += dy;
//     }
//   }
//   else if(ady > 1 && adx < ady)
//   {
//     if(adx == 0)
//     {
//       dy = dy / ady;
//       dot_y = last_dot_y_nr;
//       dot_x = last_dot_x_nr;
//       while(dot_y != current_dot_y_nr)
//       {
//         dot_nr = char_nr * 100 + dot_x * 10 + dot_y;
//         add_line(dot_nr, dot_nr + dy);
// 
//         dot_y += dy;
//       }
//     }
//     else if ((ady % adx) == 0)
//     {
//       dx = dx / adx;
//       dy = dy / adx;
//       dot_y = last_dot_y_nr;
//       dot_x = last_dot_x_nr;
// 
//       while(dot_x != current_dot_x_nr)
//       {
//         dot_nr = char_nr * 100 + dot_x * 10 + dot_y;
//         add_line(dot_nr, dot_nr + dx * 10 + dy);
// 
//         dot_x += dx;
//         dot_y += dy;
//       }
//     }
//     else
//     {
//       add_line(last_dot, current_dot);
//     }
//   }
//   else if(adx > 1 && ady < adx)
//   {
//     if(ady == 0)
//     {
//       dx = dx / adx;
//       dot_y = last_dot_y_nr;
//       dot_x = last_dot_x_nr;
// 
//       while(dot_x != current_dot_x_nr)
//       {
//         dot_nr = char_nr * 100 + dot_x * 10 + dot_y;
//         add_line(dot_nr, dot_nr + dx * 10);
// 
//         dot_x += dx;
//       }
//     }
//     else if ((adx % ady) == 0)
//     {
//       dx = dx / ady;
//       dy = dy / ady;
//       dot_y = last_dot_y_nr;
//       dot_x = last_dot_x_nr;
// 
//       while(dot_y != current_dot_y_nr)
//       {
//         dot_nr = char_nr * 100 + dot_x * 10 + dot_y;
//         add_line(dot_nr, dot_nr + dx * 10 + dy);
// 
//         dot_x += dx;
//         dot_y += dy;
//       }
//     }
//     else
//     {
//       add_line(last_dot, current_dot);
//     }
//   }
//   else
//   {
//     add_line(last_dot, current_dot);
//   }
// 
//   if(test_answer())
//   {
//     clear();
//   }
// 
//   return true;
// }
// 
// function add_line(p1, p2)
// {
//   if(p1 == p2)
//   {
//     return true;
//   }
// 
//   if(p1 > p2)
//   {
//     var tp = p2;
//     p2 = p1;
//     p1 = tp;
//   }
// 
//   var found = false;
//   var key;
//   for(key in lines)
//   {
//     if(lines[key][0] == p1 && lines[key][1] == p2)
//     {
//       found = true;
//     }
//   }
// 
//   if(!found)
//   {
//     lines.push( [ p1, p2 ] );
//   }
// 
//   redraw();
// 
//   return true;
// }
// 
// function redraw()
// {
//   back_con.clearRect(0, 0, back_can.width, back_can.height);
//   make_dots(char_count);
// 
//   var char_width = dot_space_x * (dot_count_x - 1);
//   var char_space_width = char_width + char_space_x;
// 
//   var char_nr;
//   var dot_x_nr;
//   var dot_y_nr;
//   var k;
// 
//   for(char_nr = 0; char_nr < char_count; char_nr++)
//   {
//     for(dot_x_nr = 0; dot_x_nr < dot_count_x; dot_x_nr++)
//     {
//       for(dot_y_nr = 0; dot_y_nr < dot_count_y; dot_y_nr++)
//       {
//         dot_nr = char_nr * 100 + dot_x_nr * 10 + dot_y_nr;
//         ndots = [];
//         for(k in lines)
//         {
//           if(lines[k][0] == dot_nr)
//           {
//             ndots.push(lines[k][1]);
//           }
//           else if(lines[k][1] == dot_nr)
//           {
//             ndots.push(lines[k][0]);
//           }
//         }
// 
//         if(ndots.length == 0)
//         {
//           continue;
//         }
// 
//         var dot_x = start_x + char_nr * char_space_width + dot_x_nr * dot_space_x;
//         var dot_y = start_y + dot_y_nr * dot_space_y;
// 
//         if(ndots.length == 1)
//         {
//           var ndot_x_nr = ((ndots[0] % 100) - (ndots[0] % 10)) / 10;
//           var ndot_y_nr = (ndots[0] % 10);
//           var ndot_x = start_x + char_nr * char_space_width + ndot_x_nr * dot_space_x;
//           var ndot_y = start_y + ndot_y_nr * dot_space_y;
// 
//           back_con.beginPath();
//           back_con.strokeStyle = 'yellow';
//           back_con.lineWidth = 10;
//           back_con.moveTo(dot_x, dot_y);
//           back_con.lineTo((ndot_x + dot_x)/2, (ndot_y + dot_y)/2);
//           back_con.stroke();
//           back_con.closePath();
//         }
//         else if(ndots.length > 1)
//         {
//           var k1;
//           var k2;
//           for(k1 in ndots)
//           {
//             var ndot_1_x_nr = ((ndots[k1] % 100) - (ndots[k1] % 10)) / 10;
//             var ndot_1_y_nr = (ndots[k1] % 10);
//             var ndot_1_x = start_x + char_nr * char_space_width + ndot_1_x_nr * dot_space_x;
//             var ndot_1_y = start_y + ndot_1_y_nr * dot_space_y;
// 
//             for(k2 in ndots)
//             {
//               if(k1 == k2)
//               {
//                 continue;
//               }
// 
//               var ndot_2_x_nr = ((ndots[k2] % 100) - (ndots[k2] % 10)) / 10;
//               var ndot_2_y_nr = (ndots[k2] % 10);
//               var ndot_2_x = start_x + char_nr * char_space_width + ndot_2_x_nr * dot_space_x;
//               var ndot_2_y = start_y + ndot_2_y_nr * dot_space_y;
// 
//               back_con.beginPath();
//               back_con.strokeStyle = 'yellow';
//               back_con.lineCap = 'round';
//               back_con.lineWidth = 10;
//               back_con.moveTo((ndot_1_x + dot_x)/2, (ndot_1_y + dot_y)/2);
//               if(Math.max(ndot_1_x - dot_x, ndot_2_x - dot_x, dot_x - ndot_1_x, dot_x - ndot_2_x, ndot_1_y - dot_y, ndot_2_y - dot_y, dot_y - ndot_1_y, dot_y - ndot_2_y) <= (dot_space_y + dot_space_y))
//               {
//                 if(
//                     Math.abs(ndot_1_x - ndot_2_x) == dot_space_x && 
//                     Math.abs(ndot_1_y - ndot_2_y) == dot_space_y && 
//                     Math.abs(ndot_1_x - dot_x) <= dot_space_x && 
//                     Math.abs(ndot_2_x - dot_x) <= dot_space_x && 
//                     Math.abs(ndot_1_y - dot_y) <= dot_space_y && 
//                     Math.abs(ndot_2_y - dot_y) <= dot_space_y
//                   )
//                 {
//                   back_con.arcTo( dot_x, dot_y, (ndot_2_x + dot_x)/2, (ndot_2_y + dot_y)/2, 25);
//                 }
//                 else
//                 {
//                   back_con.lineTo(dot_x, dot_y);
//                   back_con.lineTo((ndot_2_x + dot_x)/2, (ndot_2_y + dot_y)/2);
//                 }
//               }
//               else
//               {
//                 back_con.lineTo(dot_x, dot_y);
//                 back_con.lineTo((ndot_2_x + dot_x)/2, (ndot_2_y + dot_y)/2);
//               }
//               back_con.stroke();
//               back_con.closePath();
//             }
//           }
//         }
//       }
//     }
//   }
// 
//   return true;
// }
// 
// function mouse_to_dot_pos(mouse_x, mouse_y)
// {
//   var char_width = dot_space_x * (dot_count_x - 1);
//   var char_space_width = char_width + char_space_x;
// 
//   var char_nr = Math.round((mouse_x - start_x - char_width / 2) / char_space_width);
//   char_nr = Math.min(Math.max(char_nr, 0), char_count -1);
// 
//   var cx = mouse_x - start_x - char_space_width * char_nr;
//   var cy = mouse_y - start_y;
// 
//   var dot_x_nr = Math.round(cx / dot_space_x);
//   dot_x_nr = Math.min(Math.max(dot_x_nr, 0), dot_count_x -1);
//   var dot_y_nr = Math.round(cy / dot_space_y);
//   dot_y_nr = Math.min(Math.max(dot_y_nr, 0), dot_count_y -1);
// 
//   return char_nr * 100 + dot_x_nr * 10 + dot_y_nr;
// }
// 
// function make_dots(count)
// {
//   var cx = start_x;
//   var cy = start_y;
//   var dx;
//   var dy;
// 
//   b = back_con;
//   b.fillStyle = 'yellow';
// 
//   while(count-- > 0)
//   {
//     for(dy = 0; dy < dot_space_y * dot_count_y; dy += dot_space_y)
//     {
//       for(dx = 0; dx < dot_space_x * dot_count_x; dx += dot_space_x)
//       {
//         b.beginPath();
//         b.arc(cx + dx, cy + dy, dot_radie, 0, 2*Math.PI, false);
//         b.fill();
//         b.closePath();
//       }
//     }
// 
//     cx += dot_space_x * (dot_count_x - 1) + char_space_x;
//   }
// }
// 
// function test_answer()
// {
//   var messages = [];
//   messages[0] = "Låset låter lite, men dörren verkar fortfarande låst";
//   messages[1] = "Låset låter lite, men dörren verkar fortfarande låst";
//   messages[2] = "Låset låter, och dörren verkar vara upplåst";
//   messages[3] = "Låset låter, och dörren verkar vara upplåst";
//   messages[4] = ":-)";
//   messages[5] = "(-:";
// 
//   var answers = [];
//   answers[0] = [
//     [0, 10], [10, 20], [10, 11], [11, 12], [12, 13], [13, 14], 
//     [110, 120], [100, 110], [100, 101], [101, 102], [102, 103], [103, 104], [104, 114], [114, 124], [102, 112], 
//     [200, 201], [201, 202], [202, 203], [203, 204], [204, 214], [214, 224], 
//     [300, 301], [301, 302], [302, 303], [303, 304], [304, 314], [314, 324], [323, 324], [322, 323], [321, 322], [320, 321], 
//     [410, 420], [400, 410], [400, 401], [401, 402], [402, 412], [412, 422], [422, 423], [423, 424], [414, 424], [404, 414]
//   ];
//   answers[1] = [
//     [0, 10], [10, 20], [10, 11], [11, 12], [12, 13], [13, 14], 
//     [110, 120], [100, 110], [100, 101], [101, 102], [102, 103], [103, 104], [104, 114], [114, 124], [102, 112], [112, 122], 
//     [200, 201], [201, 202], [202, 203], [203, 204], [204, 214], [214, 224], 
//     [300, 301], [301, 302], [302, 303], [303, 304], [304, 314], [314, 324], [323, 324], [322, 323], [321, 322], [320, 321], 
//     [410, 420], [400, 410], [400, 401], [401, 402], [402, 412], [412, 422], [422, 423], [423, 424], [414, 424], [404, 414]
//   ];
// 
//   answers[2] = [
//     [410, 420], [400, 410], [410, 411], [411, 412], [412, 413], [413, 414], 
//     [300, 310], [310, 320], [320, 321], [321, 322], [322, 323], [323, 324], [314, 324], [304, 314], [312, 322], 
//     [220, 221], [221, 222], [222, 223], [223, 224], [214, 224], [204, 214], 
//     [120, 121], [121, 122], [122, 123], [123, 124], [114, 124], [104, 114], [103, 104], [102, 103], [101, 102], [100, 101], 
//     [0, 10], [10, 20], [20, 21], [21, 22], [12, 22], [2, 12], [2, 3], [3, 4], [4, 14], [14, 24]
//   ];
// 
//   answers[3] = [
//     [410, 420], [400, 410], [410, 411], [411, 412], [412, 413], [413, 414], 
//     [300, 310], [310, 320], [320, 321], [321, 322], [322, 323], [323, 324], [314, 324], [304, 314], [312, 322], [302, 312]
//     [220, 221], [221, 222], [222, 223], [223, 224], [214, 224], [204, 214], 
//     [120, 121], [121, 122], [122, 123], [123, 124], [114, 124], [104, 114], [103, 104], [102, 103], [101, 102], [100, 101], 
//     [0, 10], [10, 20], [20, 21], [21, 22], [12, 22], [2, 12], [2, 3], [3, 4], [4, 14], [14, 24]
//   ];
// 
//   answers[4] = [
//     [10, 20], [0, 10], [0, 1], [1, 2], [2, 12], [12, 22], [22, 23], [23, 24], [14, 24], [4, 14], 
//     [110, 120], [100, 110], [100, 101], [101, 102], [102, 103], [103, 104], [104, 114], [114, 124], 
//     [210, 220], [200, 210], [200, 201], [201, 202], [202, 203], [203, 204], [204, 214], [214, 224], [223, 224], [222, 223], [221, 222], [220, 221], 
//     [300, 301], [301, 302], [302, 303], [303, 304], [304, 314], [314, 324], [323, 324], [322, 323], [321, 322], [320, 321], 
//     [400, 410], [410, 420], [410, 411], [411, 412], [412, 413], [413, 414]
//   ];
// 
//   answers[5] = [
//     [400, 410], [410, 420], [420, 421], [421, 422], [412, 422], [402, 412], [402, 403], [403, 404], [404, 414], [414, 424], 
//     [300, 310], [310, 320], [320, 321], [321, 322], [322, 323], [323, 324], [314, 324], [304, 314], 
//     [220, 221], [221, 222], [222, 223], [223, 224], [214, 224], [204, 214], [203, 204], [202, 203], [201, 202], [200, 201], [200, 210], [210, 220], 
//     [120, 121], [121, 122], [122, 123], [123, 124], [114, 124], [104, 114], [103, 104], [102, 103], [101, 102], [100, 101], 
//     [0, 10], [10, 20], [10, 11], [11, 12], [12, 13], [13, 14]
//   ];
// 
//   var k1;
//   var k2;
//   var k3;
// 
//   for(k1 in answers)
//   {
//     if(answers[k1].length == lines.length)
//     {
//       var bad = false;
//       for(k2 in answers[k1])
//       {
//         var found = false;
//         for(k3 in lines)
//         {
//           if(answers[k1][k2][0] == lines[k3][0] && answers[k1][k2][1] == lines[k3][1])
//           {
//             found = true;
//             break;
//           }
//         }
//         if(!found)
//         {
//           bad = true;
//           break;
//         }
//       }
//       if(!bad)
//       {
//         alert(messages[k1]);
//         return true;
//       }
//     }
//   }
// 
//   return false;
// }
// 
// function all_lines()
// {
//   lines = [];
//   dots = [0,1,2,3,4, 10,11,12,13,14, 20,21,22,23,24];
//   for(k1 in dots)
//   {
//     for(k2 in dots)
//     {
//       if(k1 < k2)
//       {
//          lines.push([dots[k1]+200, dots[k2]+200]);
//       }
//     }
//   }
//   redraw();
// }
// 
// function undo()
// {
//   if(lines.length > 0)
//   {
//     lines.length--;
//     redraw();
//     return true;
//   }
//   else
//   {
//     return false;
//   }
// }
// 
// function debug_row(action, x, y)
// {
//   var id = 'debug_row_' + action;
//   var row = document.getElementById(id);
//   if(painting)
//   {
//     p = 'yes';
//   }
//   else
//   {
//     p = 'no';
//   }
//   
//   var d = new Date();
//   var time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
//   
//   row.innerHTML = '<td>' + action + '</td><td>' + time + '</td><td>' + x + '</td><td>' + y + '</td><td>' + p + '</td>';
// }
//     </script>
//     <style>
// *
// {
//   margin: 0px;
//   padding: 0px;
// }
// 
// canvas
// {
//   position: absolute;
//   top: 0px;
//   left: 0px;
// }
// 
// button
// {
//   padding: 10px;
//   margin: 10px;
//   color: yellow;
//   font-size: 20px;
//   background: #333333;
// }
// 
// #back
// {
//   background: black;
//   color: white;
// }
// 
// html, body
// {
//   width: 100%;
//   height: 100%;
//   background: black;
//   color: white;
// }
// 
// TD
// {
//   padding-right: 10px;
// }
});