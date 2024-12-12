// src/mediaRecorder.js

export function createMediaRecorder(
    stream,
    onDataAvailable,
    onStop,
    { mimeType = "video/webm" } = {}
) {
    const supportedMimeTypes = [
        "video/webm; codecs=vp8",
        "video/webm; codecs=vp9",
        "video/webm",
        "video/mp4",
    ];

    let selectedMimeType = null;

    for (const type of supportedMimeTypes) {
        if (MediaRecorder.isTypeSupported(type)) {
            selectedMimeType = type;
            break;
        }
    }

    if (!selectedMimeType) {
        console.error("No supported MIME types are available for MediaRecorder.");
        return null;
    }

    console.log(`Using MIME type: ${selectedMimeType}`);

    const mediaRecorder = new MediaRecorder(stream, { mimeType: selectedMimeType });
    let chunks = [];

    mediaRecorder.ondataavailable = (e) => {
        console.log("Data chunk received:", e.data);
        if (e.data && e.data.size > 0) {
            chunks.push(e.data);
            onDataAvailable(e.data);
        } else {
            console.warn("Received empty or invalid chunk.");
        }
    };

    mediaRecorder.onstop = () => {
        console.log("Chunks collected:", chunks);

        if (!Array.isArray(chunks) || chunks.length === 0) {
            console.error("No data chunks available.");
            onStop(null);
            return;
        }

        try {
            const blob = new Blob(chunks, { type: selectedMimeType });
            console.log("Blob created successfully:", blob);
            onStop(blob);
            chunks = [];
        } catch (error) {
            console.error("Error during Blob creation:", error);
            onStop(null);
        }
    };

    return mediaRecorder;
}
