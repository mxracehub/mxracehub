
// Fallback for mediumZoom if not loaded
if (typeof mediumZoom === 'undefined') {
  window.mediumZoom = function() {
    return {
      attach: function() { return this; },
      detach: function() { return this; },
      update: function() { return this; },
      clone: function() { return this; },
      on: function() { return this; },
      off: function() { return this; },
      open: function() { return this; },
      close: function() { return this; },
      toggle: function() { return this; }
    };
  };
}
