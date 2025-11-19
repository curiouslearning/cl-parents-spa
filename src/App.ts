import { YouTubePlayer } from "./YouTubePlayer";
import { getVideoIdFromUrl } from "./utils/paramUtils";

export class App {

    public initialize() {
        document.addEventListener("DOMContentLoaded", () => {
            const videoId = getVideoIdFromUrl() || "GHaclxuG_tQ"; // fallback

            new YouTubePlayer(videoId);
        });
    }
}

const app = new App();
app.initialize();
