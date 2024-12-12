// script.js

import { setupCamera } from "../src/camera";
import { createMediaRecorder } from "../src/mediaRecorder";
import { capturePhoto } from "../src/photoCapture";
import { setupRecordingEvents } from "../src/events.js";
import { createVideoPreview } from "../src/videoPreview.js";
import { setupPreviewActions } from "../src/previewManager.js";

const video = document.getElementById("camera-stream");
const canvas = document.getElementById("capture-canvas");
const recordBtn = document.getElementById("record-btn");
const shareBtn = document.getElementById("share-btn");
const previewContainer = document.getElementById("preview-container"); // プレビューを表示するコンテナ要素
const downloadBtn = document.getElementById("download-btn");
const closePreviewBtn = document.getElementById("close-preview-btn");
const progressCircle = document.querySelector('.progress-ring__circle');
const timerElement = document.getElementById("timer");

let mediaRecorder;
let chunks = [];
let startTime;
let timerInterval;

// 計算用
const radius = progressCircle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;
progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
progressCircle.style.strokeDashoffset = circumference;

// タイマーとプログレスの更新
function setProgress(percent) {
    const offset = circumference - (percent / 100) * circumference;
    progressCircle.style.strokeDashoffset = offset;
}

function updateTimer() {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = String(Math.floor(elapsed / 60)).padStart(2, '0');
    const seconds = String(elapsed % 60).padStart(2, '0');
    timerElement.textContent = `${minutes}:${seconds}`;

    // 進捗割合を計算（最大録画時間60秒として）
    const MAX_RECORD_TIME = 60; // 最大録画時間（秒）
    const percent = Math.min((elapsed / MAX_RECORD_TIME) * 100, 100);
    setProgress(percent);

    // 最大録画時間に達したら自動停止
    if (elapsed >= MAX_RECORD_TIME) {
        stopRecording();
    }
}

// 録画開始処理
function startRecording() {
    if (mediaRecorder && mediaRecorder.state === "inactive") {
        mediaRecorder.start();
        startTime = Date.now();
        timerInterval = setInterval(updateTimer, 1000);
        recordBtn.classList.add("recording");
        recordBtn.innerHTML = '<i class="fas fa-stop-circle"></i>'; // 停止アイコンに変更
    }
}

// 録画停止処理
function stopRecording() {
    if (mediaRecorder && mediaRecorder.state === "recording") {
        mediaRecorder.stop();
        clearInterval(timerInterval);
        timerElement.textContent = "00:00";
        setProgress(circumference); // プログレスをリセット
        recordBtn.classList.remove("recording");
        recordBtn.innerHTML = '<i class="fas fa-circle"></i>'; // 録画アイコンに戻す
    }
}

// 録画ボタンがタップされた時にカメラをセットアップ
async function handleRecordButtonPress() {
    if (!mediaRecorder) {
        try {
            const stream = await setupCamera(video);
            mediaRecorder = createMediaRecorder(
                stream,
                (data) => chunks.push(data),
                (blob) => { // onStop: 録画終了時に処理を実行
                    if (blob) {
                        // 動画プレビューの生成
                        createVideoPreview(blob, previewContainer);
                        previewContainer.style.display = "flex";
                    } else {
                        alert("録画データの取得に失敗しました。");
                    }
                    // データをリセット
                    chunks = [];
                },
                { mimeType: "video/webm" } // "video/webm" を指定（修正）
            );

            // 録画・静止画イベントの設定
            setupRecordingEvents(
                recordBtn, 
                mediaRecorder, 
                () => capturePhoto(video, canvas), // 静止画撮影
                previewContainer,
                downloadBtn,
                closePreviewBtn,
                startRecording, // 録画開始関数を追加
                stopRecording   // 録画停止関数を追加
            );
        } catch (error) {
            console.error("カメラのセットアップに失敗しました:", error);
            alert("カメラへのアクセスが拒否されました。");
            return;
        }
    }
}

recordBtn.addEventListener("click", handleRecordButtonPress);

// プレビュー操作の設定
setupPreviewActions(previewContainer, downloadBtn, shareBtn, closePreviewBtn);
