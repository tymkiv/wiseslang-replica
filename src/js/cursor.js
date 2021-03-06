/* eslint-disable */
export const cursor = (function () {
  const body = document.querySelector("body");
  const cursorDiv = document.createElement("div");
  const cursorSmallDiv = document.createElement("div");
  let x = 0;
  let y = 0;
  let currentx = 0;
  let currenty = 0;

  const init_ = function () {
    cursorDiv.style.position = "absolute";
    cursorDiv.style.top = "-5px";
    cursorDiv.style.left = "-5px";
    cursorDiv.style.marginTop = "-10px";
    cursorDiv.style.marginLeft = "-10px";
    cursorDiv.style.pointerEvents = "none";
    cursorDiv.style.background = "rgba(0,0,0,0.7)";
    cursorDiv.style.border = "1px solid #fff";
    cursorDiv.style.opacity = "0.6";
    cursorDiv.style.zIndex = "99999999999999999";
    cursorDiv.style.width = "20px";
    cursorDiv.style.height = "20px";
    cursorDiv.style.borderRadius = "100px";
    cursorSmallDiv.style.position = "absolute";
    cursorSmallDiv.style.top = "-5px";
    cursorSmallDiv.style.left = "-5px";
    cursorSmallDiv.style.marginTop = "0px";
    cursorSmallDiv.style.marginLeft = "0px";
    cursorSmallDiv.style.width = "2px";
    cursorSmallDiv.style.height = "2px";
    cursorSmallDiv.style.pointerEvents = "none";
    cursorSmallDiv.style.background = "white";
    // cursorSmallDiv.style.border = "2px solid white";
    cursorSmallDiv.style.zIndex = "99999999999999999";
    cursorSmallDiv.style.borderRadius = "10px";
    body.appendChild(cursorDiv);
    body.appendChild(cursorSmallDiv);
    document.addEventListener(
      "mousemove",
      function (e) {
        cursorSmallDiv.style.left = `${e.clientX  }px`;
        cursorSmallDiv.style.top = `${e.clientY  }px`;
        x = e.clientX;
        y = e.clientY;
      },
      false,
    );
    frame();
  };

  const frame = function () {
    currentx += (x - currentx) / 3;
    currenty += (y - currenty) / 3;
    cursorDiv.style.left = `${currentx  }px`;
    cursorDiv.style.top = `${currenty  }px`;
    window.requestAnimationFrame(frame);
  };

  function buttonize_() {
    const buttons = document.querySelectorAll(".button");
    buttons.forEach((e) => {
      e.addEventListener(
        "mouseenter",
        function (event) {
          hover();
        },
        false,
      );
      e.addEventListener(
        "mouseleave",
        function (event) {
          unhover();
        },
        false,
      );
    });
  }

  function hover() {
    TweenMax.to(cursorDiv, 0.1, {
      width: 30,
      height: 30,
      marginLeft: -15,
      marginTop: -15,
      opacity: 1,
    });
    cursorDiv.style.backgroundColor = "rgba(255,255,255,0.5)";
    cursorSmallDiv.style.marginTop = "-2px";
    cursorSmallDiv.style.marginLeft = "-2px";
    cursorSmallDiv.style.width = "6px";
    cursorSmallDiv.style.height = "6px";
  }

  function unhover() {
    TweenMax.to(cursorDiv, 0.6, {
      width: 20,
      height: 20,
      marginLeft: -10,
      marginTop: -10,
      opacity: 0.6,
    });
    cursorDiv.style.background = "rgba(0,0,0,0.7)";
    cursorSmallDiv.style.marginTop = "0px";
    cursorSmallDiv.style.marginLeft = "0px";
    cursorSmallDiv.style.width = "2px";
    cursorSmallDiv.style.height = "2px";
  }

  function createInstance() {}
  return {
    init () {
      init_();
    },
    buttonize () {
      buttonize_();
    },
  };
})();