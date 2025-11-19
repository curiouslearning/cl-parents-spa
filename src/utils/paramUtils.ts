

export function getVideoIdFromUrl(): string | null {
    const params = new URLSearchParams(window.location.search);
    return params.get("video_id");
}