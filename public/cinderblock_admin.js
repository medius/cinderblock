var _cb = _cb || [];

(function () {

// Localize jQuery variable
  var jQuery;

  var host = "http://localhost:5000";

  /******** Load jQuery if not present *********/
  if (window.jQuery === undefined || window.jQuery.fn.jquery !== /1.7.\d/) {
    var script_tag = document.createElement('script');
    script_tag.setAttribute("type", "text/javascript");
    script_tag.setAttribute("src",
      "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js");
    if (script_tag.readyState) {
      script_tag.onreadystatechange = function () { // For old versions of IE
        if (this.readyState == 'complete' || this.readyState == 'loaded') {
          scriptLoadHandler();
        }
      };
    } else { // Other browsers
      script_tag.onload = scriptLoadHandler;
    }
    // Try to find the head, otherwise default to the documentElement
    (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
  } else {
    // The jQuery version on the window is the one we want to use
    jQuery = window.jQuery;
    loadSocketIO();
  }

  /******** Called once jQuery has loaded ******/
  function scriptLoadHandler() {
    // Restore $ and window.jQuery to their previous values and store the
    // new jQuery in our local jQuery variable
    jQuery = window.jQuery.noConflict(true);
    // Call our main function
    loadSocketIO();
  }

  function loadSocketIO() {

    var script_tag = document.createElement('script');
    script_tag.setAttribute("type", "text/javascript");
    script_tag.setAttribute("src",
      host + "/socket.io/socket.io.js");
    if (script_tag.readyState) {
      script_tag.onreadystatechange = function () { // For old versions of IE
        if (this.readyState == 'complete' || this.readyState == 'loaded') {
          socketIOscriptLoadHandler();
        }
      };
    } else { // Other browsers
      script_tag.onload = socketIOscriptLoadHandler;
    }
    // Try to find the head, otherwise default to the documentElement
    (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
  }

  /******** Called once SocketIO has loaded ******/
  function socketIOscriptLoadHandler() {
    main();
  }

  /******** Our main function ********/
  function main() {
    jQuery(document).ready(function ($) {

      var server = io.connect(host);

      server.on('replay', function(element) {

      });

      // We can use jQuery 1.7.x here
      $(document).click(function (e) {


        var elem = e.target;
        console.log($(elem).prop("class") + " " + $(elem).prop("id") + " " + "Clicked at " + e.pageX + " " + e.pageY);

        element = {
          userEmail:_cb['email'],
          className:$(elem).prop('class'),
          idName:$(elem).prop('id'),
          tagName:$(elem).prop('tagName'),
          parentClassName:$(elem).parent().prop('class'),
          parentIdName:$(elem).parent().prop('id'),
          parentTagName:$(elem).parent().prop('tagName'),
          text:$(elem).text(),
          posX:e.pageX,
          posY:e.pageY
        };

        server.emit('elements', element);
      });
    });
  }

})();