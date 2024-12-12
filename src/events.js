// src/events.js

export function setupRecordingEvents(
    recordBtn, 
    mediaRecorder, 
    capturePhotoFn, 
    previewContainer,
    downloadBtn,
    closePreviewBtn,
    startRecording,
    stopRecording
) {
    let isLongPress = false;
    let recordingTimeout;

    function handlePressStart(e) {
        e.preventDefault(); // デフォルトのタッチ動作を無効化
        isLongPress = false;
        recordingTimeout = setTimeout(() => {
            isLongPress = true;
            if (mediaRecorder && mediaRecorder.state === "inactive") {
                startRecording(); // 録画開始
            } else {
                console.warn("MediaRecorder is not inactive:", mediaRecorder?.state);
            }
        }, 500); // 長押し判定
    }

    function handlePressEnd(e) {
        e.preventDefault(); // デフォルトのタッチ動作を無効化
        clearTimeout(recordingTimeout);
        if (isLongPress) {
            // 動画録画の終了
            if (mediaRecorder && mediaRecorder.state === "recording") {
                stopRecording(); // 録画停止
            } else {
                console.warn("MediaRecorder is not recording:", mediaRecorder?.state);
            }
        } else {
            // 静止画キャプチャの処理
            const imgData = capturePhotoFn();
            previewContainer.style.display = "flex"; // プレビューを表示
            const photoPreview = previewContainer.querySelector("img");
            const videoPreview = previewContainer.querySelector("video");

            // 静止画をプレビュー表示
            photoPreview.src = imgData;
            photoPreview.style.display = "block";
            videoPreview.style.display = "none";

            // ダウンロードボタン設定
            downloadBtn.onclick = () => {
                const link = document.createElement("a");
                link.href = imgData;
                link.download = "capture.png";
                link.click();
            };
        }
    }

    function handlePressCancel(e) {
        e.preventDefault(); // デフォルトのタッチ動作を無効化
        clearTimeout(recordingTimeout);
        if (isLongPress && mediaRecorder && mediaRecorder.state === "recording") {
            stopRecording(); // 録画停止
        }
    }

    // イベント登録
    recordBtn.addEventListener("mousedown", handlePressStart);
    recordBtn.addEventListener("mouseup", handlePressEnd);
    recordBtn.addEventListener("mouseleave", handlePressCancel);
    recordBtn.addEventListener("touchstart", handlePressStart, { passive: false }); // passive: false を指定
    recordBtn.addEventListener("touchend", handlePressEnd, { passive: false }); 
    recordBtn.addEventListener("touchcancel", handlePressCancel, { passive: false });

    // プレビューを閉じるボタン
    closePreviewBtn.onclick = () => {
        previewContainer.style.display = "none";
    };
}
