/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/YouTubePlayer.ts":
/*!******************************!*\
  !*** ./src/YouTubePlayer.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   YouTubePlayer: () => (/* binding */ YouTubePlayer)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class YouTubePlayer {
    constructor(videoId) {
        this.videoId = videoId;
        const overlay = document.getElementById("play-overlay");
        if (!overlay)
            throw new Error("Overlay element not found");
        this.overlay = overlay;
        this.createIframe();
        this.setupOverlayClick();
        this.initializeYouTubeAPI();
        this.fetchVideoTitle(videoId).then(title => {
            if (title)
                this.setVideoTitle(title);
        });
    }
    createIframe() {
        const wrapper = document.getElementById("video-wrapper");
        const blocker = document.createElement("div");
        blocker.className = "no-click-zone";
        wrapper.appendChild(blocker);
        if (!wrapper)
            throw new Error("Video wrapper not found");
        const iframe = document.createElement("iframe");
        iframe.id = "youtube-player";
        iframe.src = `https://www.youtube-nocookie.com/embed/${this.videoId}?rel=0&modestbranding=1&iv_load_policy=3&enablejsapi=1&controls=1&disablekb=1&origin=${window.location.origin}`;
        iframe.allow =
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; ";
        iframe.allowFullscreen = true;
        iframe.referrerPolicy = "strict-origin-when-cross-origin";
        iframe.width = "100%";
        iframe.height = "100%";
        iframe.style.border = "0";
        iframe.style.aspectRatio = "16/9";
        wrapper.prepend(iframe);
    }
    setupOverlayClick() {
        this.overlay.addEventListener("click", () => {
            if (this.player) {
                this.player.seekTo(0);
                this.player.playVideo();
                this.overlay.classList.remove("show");
            }
        });
    }
    fetchVideoTitle(videoId) {
        return __awaiter(this, void 0, void 0, function* () {
            const endpoint = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
            try {
                const response = yield fetch(endpoint);
                if (!response.ok)
                    throw new Error(`Failed: ${response.status}`);
                const data = yield response.json();
                return data.title;
            }
            catch (error) {
                console.error("Failed to fetch video title:", error);
                return null;
            }
        });
    }
    setVideoTitle(title) {
        console.log("trying to set Title!");
        const titleEl = document.getElementById("video-title");
        if (titleEl) {
            titleEl.textContent = title;
        }
    }
    initializeYouTubeAPI() {
        window.onYouTubeIframeAPIReady = () => {
            this.player = new window.YT.Player("youtube-player", {
                events: {
                    onStateChange: this.onPlayerStateChange.bind(this),
                },
            });
        };
    }
    onPlayerStateChange(event) {
        return __awaiter(this, void 0, void 0, function* () {
            if (event.data === YT.PlayerState.ENDED) {
                console.log("video ended");
                this.overlay.classList.add("show");
            }
            else if (event.data === YT.PlayerState.PLAYING) {
                const iframeEl = document.getElementById('youtube-player');
                if (iframeEl.requestFullscreen) {
                    this.openCustomFullscreen();
                }
                this.overlay.classList.remove("show");
            }
        });
    }
    openCustomFullscreen() {
        const playerWrapper = document.getElementById("video-wrapper");
        playerWrapper.classList.add("fullscreen-mode");
        const closeBtn = document.createElement("button");
        closeBtn.textContent = "✕ Close";
        closeBtn.className = "close-btn";
        closeBtn.onclick = () => __awaiter(this, void 0, void 0, function* () {
            playerWrapper.classList.remove("fullscreen-mode");
            this.enforceOrientationMode("portrait");
            closeBtn.remove();
            if (this.player)
                this.player.pauseVideo();
        });
        document.body.appendChild(closeBtn);
    }
    enforceOrientationMode(type) {
        if (window.Android && typeof window.Android.setContainerAppOrientation === "function") {
            window.Android.setContainerAppOrientation(type);
        }
    }
    loadVideo(newVideoId) {
        const wrapper = document.getElementById("video-wrapper");
        if (!wrapper)
            return;
        const oldIframe = document.getElementById("youtube-player");
        if (oldIframe)
            oldIframe.remove();
        this.videoId = newVideoId;
        this.createIframe();
        this.initializeYouTubeAPI();
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/App.ts ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   App: () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var _YouTubePlayer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./YouTubePlayer */ "./src/YouTubePlayer.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

class App {
    constructor() {
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            document.addEventListener("DOMContentLoaded", () => {
                new _YouTubePlayer__WEBPACK_IMPORTED_MODULE_0__.YouTubePlayer("GHaclxuG_tQ");
            });
        });
    }
}
const app = new App();
app.initialize();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXNzZXNzbWVudC1zdXJ2ZXktanMvLi9zcmMvWW91VHViZVBsYXllci50cyIsIndlYnBhY2s6Ly9hc3Nlc3NtZW50LXN1cnZleS1qcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9hc3Nlc3NtZW50LXN1cnZleS1qcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYXNzZXNzbWVudC1zdXJ2ZXktanMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9hc3Nlc3NtZW50LXN1cnZleS1qcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2Fzc2Vzc21lbnQtc3VydmV5LWpzLy4vc3JjL0FwcC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBZb3VUdWJlUGxheWVyLnRzXG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgICBpbnRlcmZhY2UgV2luZG93IHtcbiAgICAgICAgb25Zb3VUdWJlSWZyYW1lQVBJUmVhZHk6ICgpID0+IHZvaWQ7XG4gICAgICAgIFlUOiB0eXBlb2YgWVQ7XG4gICAgfVxuXG4gICAgbmFtZXNwYWNlIFlUIHtcbiAgICAgICAgY2xhc3MgUGxheWVyIHtcbiAgICAgICAgICAgIGNvbnN0cnVjdG9yKGVsZW1lbnRJZDogc3RyaW5nLCBvcHRpb25zPzogUGxheWVyT3B0aW9ucyk7XG4gICAgICAgICAgICBzZWVrVG8oc2Vjb25kczogbnVtYmVyKTogdm9pZDtcbiAgICAgICAgICAgIHBsYXlWaWRlbygpOiB2b2lkO1xuICAgICAgICB9XG5cbiAgICAgICAgaW50ZXJmYWNlIFBsYXllck9wdGlvbnMge1xuICAgICAgICAgICAgZXZlbnRzPzoge1xuICAgICAgICAgICAgICAgIG9uU3RhdGVDaGFuZ2U/OiAoZXZlbnQ6IFBsYXllckV2ZW50KSA9PiB2b2lkO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGludGVyZmFjZSBQbGF5ZXJFdmVudCB7XG4gICAgICAgICAgICBkYXRhOiBudW1iZXI7XG4gICAgICAgIH1cblxuICAgICAgICBlbnVtIFBsYXllclN0YXRlIHtcbiAgICAgICAgICAgIEVOREVEID0gMCxcbiAgICAgICAgICAgIFBMQVlJTkcgPSAxLFxuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgWW91VHViZVBsYXllciB7XG4gICAgcHJpdmF0ZSBwbGF5ZXI/OiBZVC5QbGF5ZXI7XG4gICAgcHJpdmF0ZSBvdmVybGF5OiBIVE1MRWxlbWVudDtcbiAgICBwcml2YXRlIHZpZGVvSWQ6IHN0cmluZztcblxuXG4gICAgY29uc3RydWN0b3IodmlkZW9JZDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMudmlkZW9JZCA9IHZpZGVvSWQ7XG4gICAgICAgIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXktb3ZlcmxheVwiKTtcbiAgICAgICAgaWYgKCFvdmVybGF5KSB0aHJvdyBuZXcgRXJyb3IoXCJPdmVybGF5IGVsZW1lbnQgbm90IGZvdW5kXCIpO1xuICAgICAgICB0aGlzLm92ZXJsYXkgPSBvdmVybGF5O1xuXG4gICAgICAgIHRoaXMuY3JlYXRlSWZyYW1lKCk7XG4gICAgICAgIHRoaXMuc2V0dXBPdmVybGF5Q2xpY2soKTtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplWW91VHViZUFQSSgpO1xuICAgICAgICAvLyB0aGlzLnNldHVwQ3VzdG9tUGxheUJ1dHRvbigpO1xuICAgICAgICB0aGlzLmZldGNoVmlkZW9UaXRsZSh2aWRlb0lkKS50aGVuKHRpdGxlID0+IHtcbiAgICAgICAgICAgIGlmICh0aXRsZSkgdGhpcy5zZXRWaWRlb1RpdGxlKHRpdGxlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVJZnJhbWUoKSB7XG4gICAgICAgIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpZGVvLXdyYXBwZXJcIik7XG4gICAgICAgIGNvbnN0IGJsb2NrZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBibG9ja2VyLmNsYXNzTmFtZSA9IFwibm8tY2xpY2stem9uZVwiO1xuICAgICAgICB3cmFwcGVyLmFwcGVuZENoaWxkKGJsb2NrZXIpO1xuXG4gICAgICAgIGlmICghd3JhcHBlcikgdGhyb3cgbmV3IEVycm9yKFwiVmlkZW8gd3JhcHBlciBub3QgZm91bmRcIik7XG5cbiAgICAgICAgY29uc3QgaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlmcmFtZVwiKTtcbiAgICAgICAgaWZyYW1lLmlkID0gXCJ5b3V0dWJlLXBsYXllclwiO1xuXG4gICAgICAgIC8vIFVzZSB0aGUgcHJpdmFjeS1mcmllbmRseSBhbmQgZXJyb3ItZnJlZSBkb21haW5cbiAgICAgICAgaWZyYW1lLnNyYyA9IGBodHRwczovL3d3dy55b3V0dWJlLW5vY29va2llLmNvbS9lbWJlZC8ke3RoaXMudmlkZW9JZH0/cmVsPTAmbW9kZXN0YnJhbmRpbmc9MSZpdl9sb2FkX3BvbGljeT0zJmVuYWJsZWpzYXBpPTEmY29udHJvbHM9MSZkaXNhYmxla2I9MSZvcmlnaW49JHt3aW5kb3cubG9jYXRpb24ub3JpZ2lufWA7XG5cbiAgICAgICAgLy8gU2V0IGltcG9ydGFudCBhdHRyaWJ1dGVzIGZvciBZb3VUdWJlIHBsYXliYWNrXG4gICAgICAgIGlmcmFtZS5hbGxvdyA9XG4gICAgICAgICAgICBcImFjY2VsZXJvbWV0ZXI7IGF1dG9wbGF5OyBjbGlwYm9hcmQtd3JpdGU7IGVuY3J5cHRlZC1tZWRpYTsgZ3lyb3Njb3BlOyBwaWN0dXJlLWluLXBpY3R1cmU7IFwiO1xuICAgICAgICBpZnJhbWUuYWxsb3dGdWxsc2NyZWVuID0gdHJ1ZTtcblxuICAgICAgICAvLyBBZGQgcmVmZXJyZXIgcG9saWN5IHRvIHByZXZlbnQgZXJyb3IgMTUzIChtaXNzaW5nIG9yaWdpbi9yZWZlcnJlcilcbiAgICAgICAgaWZyYW1lLnJlZmVycmVyUG9saWN5ID0gXCJzdHJpY3Qtb3JpZ2luLXdoZW4tY3Jvc3Mtb3JpZ2luXCI7XG5cbiAgICAgICAgLy8gT3B0aW9uYWwgYnV0IHJlY29tbWVuZGVkIGZvciBzdHlsaW5nL2ZpdFxuICAgICAgICBpZnJhbWUud2lkdGggPSBcIjEwMCVcIjtcbiAgICAgICAgaWZyYW1lLmhlaWdodCA9IFwiMTAwJVwiO1xuICAgICAgICBpZnJhbWUuc3R5bGUuYm9yZGVyID0gXCIwXCI7XG4gICAgICAgIGlmcmFtZS5zdHlsZS5hc3BlY3RSYXRpbyA9IFwiMTYvOVwiO1xuXG4gICAgICAgIC8vIEluc2VydCBpZnJhbWUgaW50byB3cmFwcGVyXG4gICAgICAgIHdyYXBwZXIucHJlcGVuZChpZnJhbWUpO1xuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXR1cE92ZXJsYXlDbGljaygpIHtcbiAgICAgICAgdGhpcy5vdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXIpIHtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmVuZm9yY2VPcmllbnRhdGlvbk1vZGUoXCJsYW5kc2NhcGVcIilcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5zZWVrVG8oMCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIucGxheVZpZGVvKCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIik7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHByaXZhdGUgYXN5bmMgZmV0Y2hWaWRlb1RpdGxlKHZpZGVvSWQ6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nIHwgbnVsbD4ge1xuICAgICAgICBjb25zdCBlbmRwb2ludCA9IGBodHRwczovL3d3dy55b3V0dWJlLmNvbS9vZW1iZWQ/dXJsPWh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9JHt2aWRlb0lkfSZmb3JtYXQ9anNvbmA7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goZW5kcG9pbnQpO1xuICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQ6ICR7cmVzcG9uc2Uuc3RhdHVzfWApO1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIHJldHVybiBkYXRhLnRpdGxlO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBmZXRjaCB2aWRlbyB0aXRsZTpcIiwgZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJpdmF0ZSBzZXRWaWRlb1RpdGxlKHRpdGxlOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJ0cnlpbmcgdG8gc2V0IFRpdGxlIVwiKVxuICAgICAgICBjb25zdCB0aXRsZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aWRlby10aXRsZVwiKTtcbiAgICAgICAgaWYgKHRpdGxlRWwpIHtcbiAgICAgICAgICAgIHRpdGxlRWwudGV4dENvbnRlbnQgPSB0aXRsZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIGluaXRpYWxpemVZb3VUdWJlQVBJKCkge1xuICAgICAgICAvLyBEZWZpbmUgY2FsbGJhY2sgZm9yIHRoZSBZb3VUdWJlIElGcmFtZSBBUElcbiAgICAgICAgd2luZG93Lm9uWW91VHViZUlmcmFtZUFQSVJlYWR5ID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIgPSBuZXcgd2luZG93LllULlBsYXllcihcInlvdXR1YmUtcGxheWVyXCIsIHtcbiAgICAgICAgICAgICAgICBldmVudHM6IHtcblxuICAgICAgICAgICAgICAgICAgICBvblN0YXRlQ2hhbmdlOiB0aGlzLm9uUGxheWVyU3RhdGVDaGFuZ2UuYmluZCh0aGlzKSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBvblBsYXllclN0YXRlQ2hhbmdlKGV2ZW50OiBZVC5QbGF5ZXJFdmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuZGF0YSA9PT0gWVQuUGxheWVyU3RhdGUuRU5ERUQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidmlkZW8gZW5kZWRcIilcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheS5jbGFzc0xpc3QuYWRkKFwic2hvd1wiKTtcbiAgICAgICAgfSBlbHNlIGlmIChldmVudC5kYXRhID09PSBZVC5QbGF5ZXJTdGF0ZS5QTEFZSU5HKSB7XG4gICAgICAgICAgICBjb25zdCBpZnJhbWVFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd5b3V0dWJlLXBsYXllcicpO1xuXG4gICAgICAgICAgICBpZiAoaWZyYW1lRWwucmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmVuZm9yY2VPcmllbnRhdGlvbk1vZGUoXCJsYW5kc2NhcGVcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuQ3VzdG9tRnVsbHNjcmVlbigpO1xuXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMub3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIG9wZW5DdXN0b21GdWxsc2NyZWVuKCkge1xuICAgICAgICBjb25zdCBwbGF5ZXJXcmFwcGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aWRlby13cmFwcGVyXCIpO1xuICAgICAgICBwbGF5ZXJXcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJmdWxsc2NyZWVuLW1vZGVcIik7XG4gICAgICAgIGNvbnN0IGNsb3NlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgY2xvc2VCdG4udGV4dENvbnRlbnQgPSBcIuKclSBDbG9zZVwiO1xuICAgICAgICBjbG9zZUJ0bi5jbGFzc05hbWUgPSBcImNsb3NlLWJ0blwiO1xuICAgICAgICBjbG9zZUJ0bi5vbmNsaWNrID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgcGxheWVyV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKFwiZnVsbHNjcmVlbi1tb2RlXCIpO1xuICAgICAgICAgICAgdGhpcy5lbmZvcmNlT3JpZW50YXRpb25Nb2RlKFwicG9ydHJhaXRcIik7XG4gICAgICAgICAgICBjbG9zZUJ0bi5yZW1vdmUoKTtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYXllcikgdGhpcy5wbGF5ZXIucGF1c2VWaWRlbygpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY2xvc2VCdG4pO1xuICAgIH1cbiAgICBwcml2YXRlIGVuZm9yY2VPcmllbnRhdGlvbk1vZGUodHlwZTogU3RyaW5nKSB7XG4gICAgICAgIC8vIEF0dGVtcHQgdG8gZW5mb3JjZSBsYW5kc2NhcGUgbW9kZSB0aHJvdWdoIEFuZHJvaWQgYnJpZGdlIGNhbGxcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBpZiAod2luZG93LkFuZHJvaWQgJiYgdHlwZW9mIHdpbmRvdy5BbmRyb2lkLnNldENvbnRhaW5lckFwcE9yaWVudGF0aW9uID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICAgICAgd2luZG93LkFuZHJvaWQuc2V0Q29udGFpbmVyQXBwT3JpZW50YXRpb24odHlwZSk7XG5cbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBwcml2YXRlIHNldHVwQ3VzdG9tUGxheUJ1dHRvbigpIHtcbiAgICAvLyAgICAgY29uc3QgcGxheUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3VzdG9tLXBsYXktYnRuXCIpO1xuICAgIC8vICAgICBpZiAoIXBsYXlCdG4pIHRocm93IG5ldyBFcnJvcihcIkN1c3RvbSBwbGF5IGJ1dHRvbiBub3QgZm91bmRcIik7XG5cbiAgICAvLyAgICAgcGxheUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuICAgIC8vICAgICAgICAgaWYgKCF0aGlzLnBsYXllcikgcmV0dXJuO1xuXG4gICAgLy8gICAgICAgICAvLyDinIUgUm90YXRlIHRvIGxhbmRzY2FwZSBmaXJzdFxuICAgIC8vICAgICAgICAgLy8gYXdhaXQgdGhpcy5lbmZvcmNlT3JpZW50YXRpb25Nb2RlKFwibGFuZHNjYXBlXCIpO1xuXG4gICAgLy8gICAgICAgICAvLyBXYWl0IGZvciByb3RhdGlvbiB0byBjb21wbGV0ZVxuICAgIC8vICAgICAgICAgLy8gc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG4gICAgLy8gICAgICAgICB0aGlzLm92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIik7XG4gICAgLy8gICAgICAgICB0aGlzLnBsYXllciEuc2Vla1RvKDApO1xuICAgIC8vICAgICAgICAgdGhpcy5wbGF5ZXIhLnBsYXlWaWRlbygpO1xuICAgIC8vICAgICAgICAgdGhpcy5lbmZvcmNlT3JpZW50YXRpb25Nb2RlKFwibGFuZHNjYXBlXCIpXG4gICAgLy8gICAgICAgICBhd2FpdCB0aGlzLm9wZW5DdXN0b21GdWxsc2NyZWVuKCk7XG4gICAgLy8gICAgICAgICAvLyB9LCA1MDApO1xuICAgIC8vICAgICB9KTtcbiAgICAvLyB9XG5cbiAgICAvLyBFeGFtcGxlIG1ldGhvZCBmb3IgZHluYW1pYyB2aWRlbyBzd2l0Y2hpbmdcbiAgICBwdWJsaWMgbG9hZFZpZGVvKG5ld1ZpZGVvSWQ6IHN0cmluZykge1xuICAgICAgICBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aWRlby13cmFwcGVyXCIpO1xuICAgICAgICBpZiAoIXdyYXBwZXIpIHJldHVybjtcbiAgICAgICAgY29uc3Qgb2xkSWZyYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ5b3V0dWJlLXBsYXllclwiKTtcbiAgICAgICAgaWYgKG9sZElmcmFtZSkgb2xkSWZyYW1lLnJlbW92ZSgpO1xuXG4gICAgICAgIHRoaXMudmlkZW9JZCA9IG5ld1ZpZGVvSWQ7XG4gICAgICAgIHRoaXMuY3JlYXRlSWZyYW1lKCk7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZVlvdVR1YmVBUEkoKTtcbiAgICB9XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBZb3VUdWJlUGxheWVyIH0gZnJvbSBcIi4vWW91VHViZVBsYXllclwiO1xuXG5leHBvcnQgY2xhc3MgQXBwIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBpbml0aWFsaXplKCkge1xuICAgICAgICAvLyBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gICAgICAgIC8vICAgICAod2luZG93IGFzIGFueSkubHVjaWRlLmNyZWF0ZUljb25zKCk7IC8vIHJlbmRlciB0aGUgaWNvbnNcbiAgICAgICAgLy8gfSk7XG5cbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZSBZb3VUdWJlIHBsYXllciB3aXRoIHRoZSB2aWRlbyBJRCB5b3Ugd2FudCB0byBsb2FkXG4gICAgICAgICAgICBuZXcgWW91VHViZVBsYXllcihcIkdIYWNseHVHX3RRXCIpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbi8vIENyZWF0ZSBhbiBpbnN0YW5jZSBhbmQgaW5pdGlhbGl6ZVxuY29uc3QgYXBwID0gbmV3IEFwcCgpO1xuYXBwLmluaXRpYWxpemUoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==