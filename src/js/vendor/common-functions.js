/* eslint-disable */
// function random(num) {
//   return Math.floor(Math.random() * num);
// }
// function IsEmail(email) {
//   var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
//   return regex.test(email);
// }
// function lerp(start, end, t) {
//   return Math.ceil(start * (1 - t) + end * t);
// }

export const Common = (function() {
  function createInstance() {}
  return {
    isMobile() {
      if (
        navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/Windows Phone/i)
      ) {
        return true;
      } 
        return false;
      
    },
  };
})();