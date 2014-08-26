/**
 * @file JavaScript for Watchdog js errors.
 */
(function($) {
  Drupal.behaviors.watchdog_js_errors = {
    attach: function(context, settings) {
      $(window).bind('beforeunload', function() {
        if (errors.length > 0) {
          $.ajax({
            url: "watchdog_js_errors",
            data: {
              errors: errors,
            },
            type: "POST",
            dataType: 'json',
            success: function(responce) {
              console.log(responce);
              errors = [];
            }
          });
          return Drupal.t('Do you really want to close the window?');
        }
      });
    }
  };
})(jQuery);

// Save all errors in this variable.
var errors = [];

// Error event.
window.onerror = function(msg, url, line, col, error) {
  // Push errors in Array.
  errors.push({message: msg, url: url, line: line});
}
