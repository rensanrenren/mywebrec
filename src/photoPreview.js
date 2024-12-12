export function createPhotoPreview(imgData, container) {
    // 画像要素を作成
    const photoPreview = document.createElement("img");
    photoPreview.src = imgData;
    photoPreview.style.width = "100%";
    photoPreview.style.maxHeight = "300px";
    photoPreview.style.objectFit = "contain";

    // プレビュー用のコンテナに挿入
    container.innerHTML = ""; // 前のプレビューをクリア
    container.appendChild(photoPreview);

    return photoPreview;
}
