export function setupPreviewActions(container, downloadBtn, shareBtn, closeBtn) {
    const previewActions = container.querySelector(".preview-actions");

    // ボタンを強制的に表示
    if (previewActions) {
        previewActions.style.display ="flex";
    }


    // ダウンロードボタンの設定
    downloadBtn.onclick = () => {
        const mediaElement = container.querySelector("img, video");
        if (mediaElement) {
            const url = mediaElement.src;
            const fileType = mediaElement.tagName === "IMG" ? "image/png" : "video/webm";
            const fileName = mediaElement.tagName === "IMG" ? "capture.png" : "recording.webm";

            const link = document.createElement("a");
            link.href = url;
            link.download = fileName;
            link.click();
        }
    };

    // シェアボタンの設定
    shareBtn.onclick = async () => {
        const mediaElement = container.querySelector("img, video");
        if (mediaElement && navigator.share) {
            try {
                const url = mediaElement.src;
                const fileType = mediaElement.tagName === "IMG" ? "image/png" : "video/webm";
                const blob = await fetch(url).then((res) => res.blob());
                const file = new File([blob], fileType === "image/png" ? "capture.png" : "recording.webm", { type: fileType });

                await navigator.share({
                    files: [file],
                    title: "Check out my media!",
                });
            } catch (err) {
                console.error("Error sharing media:", err);
                alert("Failed to share the media.");
            }
        } else {
            alert("Web Share API is not supported on this device.");
        }
    };

    // 閉じるボタンの設定
    closeBtn.onclick = () => {
        container.style.display = "none"; // プレビューを非表示
    };
}
