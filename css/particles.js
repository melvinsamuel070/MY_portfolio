window.onload = function() {
  particlesJS('particles-js', {
    "particles": {
      "number": {
        "value": 50
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "circle"
      },
      "opacity": {
        "value": 0.3
      },
      "size": {
        "value": 3
      },
      "move": {
        "enable": true,
        "speed": 1
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "repulse"
        }
      }
    }
  });
};

