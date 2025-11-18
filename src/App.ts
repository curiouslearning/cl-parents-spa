import { YouTubePlayer } from "./YouTubePlayer";

export class App {
    constructor() {

    }

    public async initialize() {


        document.addEventListener("DOMContentLoaded", () => {
            // Initialize YouTube player with the video ID you want to load
            new YouTubePlayer("GHaclxuG_tQ");
        });
    }
}

// Create an instance and initialize
const app = new App();
app.initialize();
