export async function setupCamera(videoElement) {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({video :true});
        videoElement.srcObject = stream;
        await videoElement.play();
        return stream;
    } catch (err) {
        console.error("camera access error:", err);
        throw err;
    }
}