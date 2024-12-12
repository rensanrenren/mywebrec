export function capturePhoto(videoElement, canvasElement) {
    const ctx = canvasElement.getContext("2d");
    canvasElement.width = videoElement.videoWidth;
    canvasElement.height = videoElement.videoHeight;
    ctx.drawImage(videoElement,0,0,canvasElement.width, canvasElement.height);

    //静止画を取得
    return canvasElement.toDataURL("image/png");
}

export function downloadPhoto(imgData, filename = "capture.png") {
    const link = document.createElement("a");
    link.href =imgData;
    link.download = filename;
    link.click();
}