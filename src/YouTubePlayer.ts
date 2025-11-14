// YouTubePlayer.ts

declare global {
    interface Window {
        onYouTubeIframeAPIReady: () => void;
        YT: typeof YT;
    }

    namespace YT {
        class Player {
            constructor(elementId: string, options?: PlayerOptions);
            seekTo(seconds: number): void;
            playVideo(): void;
        }

        interface PlayerOptions {
            events?: {
                onStateChange?: (event: PlayerEvent) => void;
            };
        }

        interface PlayerEvent {
            data: number;
        }

        enum PlayerState {
            ENDED = 0,
            PLAYING = 1,
        }
    }
}

export class YouTubePlayer {
    private player?: YT.Player;
    private overlay: HTMLElement;
    private videoId: string;


    constructor(videoId: string) {
        this.videoId = videoId;
        const overlay = document.getElementById("play-overlay");
        if (!overlay) throw new Error("Overlay element not found");
        this.overlay = overlay;

        this.createIframe();
        this.setupOverlayClick();
        this.initializeYouTubeAPI();
        // this.setupCustomPlayButton();
        this.fetchVideoTitle(videoId).then(title => {
            if (title) this.setVideoTitle(title);
        });
    }

    private createIframe() {
        const wrapper = document.getElementById("video-wrapper");
        const blocker = document.createElement("div");
        blocker.className = "no-click-zone";
        wrapper.appendChild(blocker);

        if (!wrapper) throw new Error("Video wrapper not found");

        const iframe = document.createElement("iframe");
        iframe.id = "youtube-player";

        // Use the privacy-friendly and error-free domain
        iframe.src = `https://www.youtube-nocookie.com/embed/${this.videoId}?rel=0&modestbranding=1&iv_load_policy=3&enablejsapi=1&controls=1&disablekb=1&origin=${window.location.origin}`;

        // Set important attributes for YouTube playback
        iframe.allow =
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; ";
        iframe.allowFullscreen = true;

        // Add referrer policy to prevent error 153 (missing origin/referrer)
        iframe.referrerPolicy = "strict-origin-when-cross-origin";

        // Optional but recommended for styling/fit
        iframe.width = "100%";
        iframe.height = "100%";
        iframe.style.border = "0";
        iframe.style.aspectRatio = "16/9";

        // Insert iframe into wrapper
        wrapper.prepend(iframe);

    }

    private setupOverlayClick() {
        this.overlay.addEventListener("click", () => {
            if (this.player) {
                // this.enforceOrientationMode("landscape")
                this.player.seekTo(0);
                this.player.playVideo();

                this.overlay.classList.remove("show");

            }
        });
    }
    private async fetchVideoTitle(videoId: string): Promise<string | null> {
        const endpoint = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;

        try {
            const response = await fetch(endpoint);
            if (!response.ok) throw new Error(`Failed: ${response.status}`);
            const data = await response.json();
            return data.title;
        } catch (error) {
            console.error("Failed to fetch video title:", error);
            return null;
        }
    }
    private setVideoTitle(title: string) {
        console.log("trying to set Title!")
        const titleEl = document.getElementById("video-title");
        if (titleEl) {
            titleEl.textContent = title;
        }
    }
    private initializeYouTubeAPI() {
        // Define callback for the YouTube IFrame API
        window.onYouTubeIframeAPIReady = () => {
            this.player = new window.YT.Player("youtube-player", {
                events: {

                    onStateChange: this.onPlayerStateChange.bind(this),
                },
            });
        };
    }

    private async onPlayerStateChange(event: YT.PlayerEvent) {
        if (event.data === YT.PlayerState.ENDED) {
            console.log("video ended")
            this.overlay.classList.add("show");
        } else if (event.data === YT.PlayerState.PLAYING) {
            const iframeEl = document.getElementById('youtube-player');

            if (iframeEl.requestFullscreen) {
                // this.enforceOrientationMode("landscape");
                this.openCustomFullscreen();


            }
            this.overlay.classList.remove("show");
        }
    }
    private openCustomFullscreen() {
        const playerWrapper = document.getElementById("video-wrapper");
        playerWrapper.classList.add("fullscreen-mode");
        const closeBtn = document.createElement("button");
        closeBtn.textContent = "✕ Close";
        closeBtn.className = "close-btn";
        closeBtn.onclick = async () => {
            playerWrapper.classList.remove("fullscreen-mode");
            this.enforceOrientationMode("portrait");
            closeBtn.remove();
            // @ts-ignore
            if (this.player) this.player.pauseVideo();
        };

        document.body.appendChild(closeBtn);
    }
    private enforceOrientationMode(type: String) {
        // Attempt to enforce landscape mode through Android bridge call
        // @ts-ignore
        if (window.Android && typeof window.Android.setContainerAppOrientation === "function") {
            //@ts-ignore
            window.Android.setContainerAppOrientation(type);

        }
    }
    // private setupCustomPlayButton() {
    //     const playBtn = document.getElementById("custom-play-btn");
    //     if (!playBtn) throw new Error("Custom play button not found");

    //     playBtn.addEventListener("click", async () => {
    //         if (!this.player) return;

    //         // ✅ Rotate to landscape first
    //         // await this.enforceOrientationMode("landscape");

    //         // Wait for rotation to complete
    //         // setTimeout(async () => {
    //         this.overlay.classList.remove("show");
    //         this.player!.seekTo(0);
    //         this.player!.playVideo();
    //         this.enforceOrientationMode("landscape")
    //         await this.openCustomFullscreen();
    //         // }, 500);
    //     });
    // }

    // Example method for dynamic video switching
    public loadVideo(newVideoId: string) {
        const wrapper = document.getElementById("video-wrapper");
        if (!wrapper) return;
        const oldIframe = document.getElementById("youtube-player");
        if (oldIframe) oldIframe.remove();

        this.videoId = newVideoId;
        this.createIframe();
        this.initializeYouTubeAPI();
    }
}