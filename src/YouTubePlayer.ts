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
    private blockerElements: HTMLElement[] = [];
    private wrapper: HTMLElement;

    constructor(videoId: string) {
        this.videoId = videoId;
        const overlay = document.getElementById("play-overlay");
        if (!overlay) throw new Error("Overlay element not found");
        this.overlay = overlay;

        const wrapper = document.getElementById("video-wrapper");
        if (!wrapper) throw new Error("Video wrapper not found");
        this.wrapper = wrapper;

        this.createIframe();
        this.createInteractionBlockers();
        this.setupOverlayClick();
        this.initializeYouTubeAPI();
        // this.setupCustomPlayButton();
        this.fetchVideoTitle(videoId).then(title => {
            if (title) this.setVideoTitle(title);
        });
    }

    private createIframe() {
        const iframe = document.createElement("iframe");
        iframe.id = "youtube-player";

        // Use the privacy-friendly and error-free domain
        // Disable all controls and branding
        // rel=0: Don't show related videos at end
        // modestbranding=1: Minimal YouTube branding
        // iv_load_policy=3: Hide annotations
        // controls=0: Hide all controls
        // disablekb=1: Disable keyboard controls
        // fs=0: Disable fullscreen button
        // showinfo=0: Hide video info
        // cc_load_policy=0: Hide closed captions
        // playsinline=1: Inline playback on mobile
        // autohide=1: Auto-hide controls
        // rel=0: Don't show related videos (also prevents "More videos" section)
        iframe.src = `https://www.youtube-nocookie.com/embed/${this.videoId}?rel=0&modestbranding=1&iv_load_policy=3&enablejsapi=1&controls=0&disablekb=1&fs=0&showinfo=0&cc_load_policy=0&playsinline=1&autohide=1&origin=${window.location.origin}`;

        // Set important attributes for YouTube playback
        // Note: fullscreen is disabled via fs=0 parameter
        iframe.allow =
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; ";
        iframe.allowFullscreen = false;

        // Add referrer policy to prevent error 153 (missing origin/referrer)
        iframe.referrerPolicy = "strict-origin-when-cross-origin";

        // Optional but recommended for styling/fit
        iframe.width = "100%";
        iframe.height = "100%";
        iframe.style.border = "0";
        iframe.style.aspectRatio = "16/9";

        // Insert iframe into wrapper
        this.wrapper.prepend(iframe);
    }

    /**
     * Creates interaction blocker layers to prevent clicks on YouTube UI elements
     * - Top left: Blocks channel name/title area
     * - Top right: Blocks share buttons
     * - Bottom right: Blocks YouTube logo/button
     * - Bottom: Blocks "More videos" section and its close button (X)
     */
    private createInteractionBlockers() {
        // Remove existing blockers if any
        this.removeInteractionBlockers();

        // Top left blocker (channel name/title area)
        const topLeftBlocker = this.createBlocker("yt-blocker-top-left", {
            top: "0",
            left: "0",
            width: "60%", // Covers top-left area where channel name appears
            height: "20%", // Covers top portion
        });

        // Top right blocker (share buttons area)
        const topRightBlocker = this.createBlocker("yt-blocker-top-right", {
            top: "0",
            right: "0",
            width: "40%", // Covers top-right area where share buttons appear
            height: "20%", // Covers top portion
        });

        // Bottom right blocker (YouTube logo/button)
        const bottomRightBlocker = this.createBlocker("yt-blocker-bottom-right", {
            bottom: "0",
            right: "0",
            width: "15%", // Covers bottom-right area where YouTube logo appears
            height: "15%", // Covers bottom portion
        });

        // Bottom blocker (covers "More videos" section that appears on pause)
        const bottomBlocker = this.createBlocker("yt-blocker-bottom", {
            bottom: "0",
            left: "0",
            width: "100%", // Covers entire bottom area
            height: "30%", // Covers bottom portion where "More videos" appears
        });

        // Store blockers for later removal/updates
        this.blockerElements = [topLeftBlocker, topRightBlocker, bottomRightBlocker, bottomBlocker];

        // Append blockers to wrapper (after iframe so they're on top)
        this.blockerElements.forEach(blocker => {
            this.wrapper.appendChild(blocker);
        });
    }

    /**
     * Creates a single blocker element with specified positioning
     */
    private createBlocker(className: string, styles: { [key: string]: string }): HTMLElement {
        const blocker = document.createElement("div");
        blocker.className = className;
        
        // Base styles for all blockers
        Object.assign(blocker.style, {
            position: "absolute",
            zIndex: "1000", // High z-index to be above iframe
            backgroundColor: "transparent", // Transparent but captures clicks
            cursor: "default",
            pointerEvents: "auto", // Capture pointer events
        });

        // Apply custom positioning styles
        Object.assign(blocker.style, styles);

        // Prevent all interactions
        blocker.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
        });

        blocker.addEventListener("mousedown", (e) => {
            e.preventDefault();
            e.stopPropagation();
        });

        blocker.addEventListener("mouseup", (e) => {
            e.preventDefault();
            e.stopPropagation();
        });

        return blocker;
    }

    /**
     * Removes all interaction blockers
     */
    private removeInteractionBlockers() {
        this.blockerElements.forEach(blocker => {
            if (blocker.parentNode) {
                blocker.parentNode.removeChild(blocker);
            }
        });
        this.blockerElements = [];
    }

    /**
     * Updates blocker positions (useful when entering/exiting fullscreen)
     */
    private updateInteractionBlockers() {
        this.removeInteractionBlockers();
        this.createInteractionBlockers();
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

            if (iframeEl && typeof iframeEl.requestFullscreen === 'function') {
                // this.enforceOrientationMode("landscape");
                this.openCustomFullscreen();
            }
            this.overlay.classList.remove("show");
        }
    }
    private openCustomFullscreen() {
        this.wrapper.classList.add("fullscreen-mode");
        
        // Update blockers for fullscreen mode (they scale automatically with CSS)
        // Use a small delay to ensure DOM is updated
        setTimeout(() => {
            this.updateInteractionBlockers();
        }, 100);

        const closeBtn = document.createElement("button");
        closeBtn.textContent = "✕ Close";
        closeBtn.className = "close-btn";
        closeBtn.onclick = async () => {
            this.wrapper.classList.remove("fullscreen-mode");
            this.enforceOrientationMode("portrait");
            closeBtn.remove();
            
            // Update blockers back to normal mode
            setTimeout(() => {
                this.updateInteractionBlockers();
            }, 100);
            
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
        const oldIframe = document.getElementById("youtube-player");
        if (oldIframe) oldIframe.remove();

        this.videoId = newVideoId;
        this.createIframe();
        this.updateInteractionBlockers(); // Recreate blockers for new iframe
        this.initializeYouTubeAPI();
    }
}