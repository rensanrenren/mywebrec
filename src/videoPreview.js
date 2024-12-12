// src/videoPreview.js

export function createVideoPreview(blob, container) {
    if (!blob || !(blob instanceof Blob) || blob.size === 0) {
        console.error("Blob is invalid or undefined. Cannot create video preview.");
        console.error("Received blob:", blob);
        return;
    }

    if (!container) {
        console.error("Preview container is not defined or missing in the DOM.");
        return;
    }

    const url = URL.createObjectURL(blob);

    let videoBox = container.querySelector(".video-box");
    if (!videoBox) {
        videoBox = document.createElement("div");
        videoBox.className = "video-box";
        container.appendChild(videoBox);
    }

    videoBox.innerHTML = ""; // 前のプレビューをクリア
    const videoPreview = document.createElement("video");
    videoPreview.src = url;
    videoPreview.controls = true;
    videoPreview.loop = true;
    videoPreview.autoplay = true; // 自動再生を有効化
    videoPreview.playsInline = true; // 全画面再生を防ぐ（iOS対応）

    Object.assign(videoPreview.style, {
        width: "100%",
        maxHeight: "300px",
        display: "block",
    });

    videoBox.appendChild(videoPreview);

    // プレビュー操作ボタンの表示
    const previewActions = container.querySelector(".preview-actions");
    if (previewActions) {
        previewActions.style.display = "flex";
    } else {
        console.warn("No .preview-actions element found in container.");
    }

    container.style.display = "flex";
}
