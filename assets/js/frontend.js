!function(n){var e={};function t(l){if(e[l])return e[l].exports;var c=e[l]={i:l,l:!1,exports:{}};return n[l].call(c.exports,c,c.exports,t),c.l=!0,c.exports}t.m=n,t.c=e,t.d=function(n,e,l){t.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:l})},t.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},t.t=function(n,e){if(1&e&&(n=t(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var l=Object.create(null);if(t.r(l),Object.defineProperty(l,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var c in n)t.d(l,c,function(e){return n[e]}.bind(null,c));return l},t.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(e,"a",e),e},t.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},t.p="",t(t.s="./src/frontend.js")}({"./src/frontend.js":function(module,__webpack_exports__,__webpack_require__){"use strict";eval("__webpack_require__.r(__webpack_exports__);\n\n// EXTERNAL MODULE: external \"hljs\"\nvar external_hljs_ = __webpack_require__(\"highlight.js\");\nvar external_hljs_default = /*#__PURE__*/__webpack_require__.n(external_hljs_);\n\n// EXTERNAL MODULE: ./src/utils/hack-highlight.js\nvar hack_highlight = __webpack_require__(\"./src/utils/hack-highlight.js\");\n\n// CONCATENATED MODULE: ./src/blocks/snippet/frontend.js\n\n\ndocument.addEventListener('DOMContentLoaded', function () {\n  document.querySelectorAll('pre code').forEach(function (block) {\n    if (!!external_hljs_default.a) {\n      Object(hack_highlight[\"a\" /* default */])();\n      external_hljs_default.a.highlightBlock(block);\n    }\n  });\n  /**\n   * Copy some text to the clipboard\n   *\n   * @param {string} str Text to copy\n   */\n\n  var copyToClipboard = function copyToClipboard(str) {\n    var el = document.createElement('textarea');\n    el.value = str;\n    el.style.position = 'absolute';\n    el.style.left = '-100000px';\n    document.body.appendChild(el);\n    el.select();\n    document.execCommand('copy');\n    document.body.removeChild(el);\n  };\n\n  document.querySelectorAll('.wp-block-sentidoweb-snippet button').forEach(function (button) {\n    button.addEventListener('click', function () {\n      copyToClipboard(button.nextSibling.textContent);\n      button.innerHTML = button.dataset.labelCopied;\n    });\n    button.addEventListener('mouseout', function () {\n      button.innerHTML = button.dataset.labelCopy;\n    });\n  });\n});\n// CONCATENATED MODULE: ./src/frontend.js\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZnJvbnRlbmQuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYmxvY2tzL3NuaXBwZXQvZnJvbnRlbmQuanM/OWU4ZiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgaGxqcyBmcm9tICdoaWdobGlnaHQuanMnO1xuaW1wb3J0IGhhY2tIaWdobGlnaHQgZnJvbSAnLi4vLi4vdXRpbHMvaGFjay1oaWdobGlnaHQnO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgncHJlIGNvZGUnKS5mb3JFYWNoKGZ1bmN0aW9uIChibG9jaykge1xuICAgIGlmICghIWhsanMpIHtcbiAgICAgIGhhY2tIaWdobGlnaHQoKTtcbiAgICAgIGhsanMuaGlnaGxpZ2h0QmxvY2soYmxvY2spO1xuICAgIH1cbiAgfSk7XG4gIC8qKlxuICAgKiBDb3B5IHNvbWUgdGV4dCB0byB0aGUgY2xpcGJvYXJkXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgVGV4dCB0byBjb3B5XG4gICAqL1xuXG4gIHZhciBjb3B5VG9DbGlwYm9hcmQgPSBmdW5jdGlvbiBjb3B5VG9DbGlwYm9hcmQoc3RyKSB7XG4gICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTtcbiAgICBlbC52YWx1ZSA9IHN0cjtcbiAgICBlbC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgZWwuc3R5bGUubGVmdCA9ICctMTAwMDAwcHgnO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWwpO1xuICAgIGVsLnNlbGVjdCgpO1xuICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdjb3B5Jyk7XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChlbCk7XG4gIH07XG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndwLWJsb2NrLXNlbnRpZG93ZWItc25pcHBldCBidXR0b24nKS5mb3JFYWNoKGZ1bmN0aW9uIChidXR0b24pIHtcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICBjb3B5VG9DbGlwYm9hcmQoYnV0dG9uLm5leHRTaWJsaW5nLnRleHRDb250ZW50KTtcbiAgICAgIGJ1dHRvbi5pbm5lckhUTUwgPSBidXR0b24uZGF0YXNldC5sYWJlbENvcGllZDtcbiAgICB9KTtcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBidXR0b24uaW5uZXJIVE1MID0gYnV0dG9uLmRhdGFzZXQubGFiZWxDb3B5O1xuICAgIH0pO1xuICB9KTtcbn0pOyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/frontend.js\n")},"./src/utils/hack-highlight.js":function(module,__webpack_exports__,__webpack_require__){"use strict";eval("/* harmony default export */ __webpack_exports__[\"a\"] = (function () {\n  console.warn('HACKKKKKKKKKKKKKKKK');\n\n  if (!!window.hljs.hacked) {\n    return;\n  }\n\n  var prevHighligth = window.hljs.highlightBlock;\n\n  window.hljs.highlightBlock = function (block) {\n    var newline = '<span class=\"sw_new_line\"></span>'; // Replace all without regex\n\n    block.innerHTML = block.innerHTML.split(newline).join('');\n    prevHighligth(block);\n\n    if (block.classList.contains('sw_show_line_numbers')) {\n      block.innerHTML = newline + block.innerHTML.replace(/\\n/g, \"\\n\".concat(newline));\n    }\n  };\n\n  window.hljs.hacked = true;\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvdXRpbHMvaGFjay1oaWdobGlnaHQuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvaGFjay1oaWdobGlnaHQuanM/YWExNyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIGNvbnNvbGUud2FybignSEFDS0tLS0tLS0tLS0tLS0tLSycpO1xuXG4gIGlmICghIXdpbmRvdy5obGpzLmhhY2tlZCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBwcmV2SGlnaGxpZ3RoID0gd2luZG93LmhsanMuaGlnaGxpZ2h0QmxvY2s7XG5cbiAgd2luZG93LmhsanMuaGlnaGxpZ2h0QmxvY2sgPSBmdW5jdGlvbiAoYmxvY2spIHtcbiAgICB2YXIgbmV3bGluZSA9ICc8c3BhbiBjbGFzcz1cInN3X25ld19saW5lXCI+PC9zcGFuPic7IC8vIFJlcGxhY2UgYWxsIHdpdGhvdXQgcmVnZXhcblxuICAgIGJsb2NrLmlubmVySFRNTCA9IGJsb2NrLmlubmVySFRNTC5zcGxpdChuZXdsaW5lKS5qb2luKCcnKTtcbiAgICBwcmV2SGlnaGxpZ3RoKGJsb2NrKTtcblxuICAgIGlmIChibG9jay5jbGFzc0xpc3QuY29udGFpbnMoJ3N3X3Nob3dfbGluZV9udW1iZXJzJykpIHtcbiAgICAgIGJsb2NrLmlubmVySFRNTCA9IG5ld2xpbmUgKyBibG9jay5pbm5lckhUTUwucmVwbGFjZSgvXFxuL2csIFwiXFxuXCIuY29uY2F0KG5ld2xpbmUpKTtcbiAgICB9XG4gIH07XG5cbiAgd2luZG93LmhsanMuaGFja2VkID0gdHJ1ZTtcbn0iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/utils/hack-highlight.js\n")},"highlight.js":function(module,exports){eval("module.exports = hljs;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlnaGxpZ2h0LmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaGxqc1wiPzczYzgiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBobGpzOyJdLCJtYXBwaW5ncyI6IkFBQUEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///highlight.js\n")}});