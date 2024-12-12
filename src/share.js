export async function sharePhoto(canvasElement, title = "webAR sample", text = "Check out my AR capture") {
    const canvasData = canvasElement.toDataURL("image/png");

    try {
        if (navigator.canShare && navigator.canShare({files: []})) {
            const file = new File([canvasData], "capture.png", {type:"imge/png"});
            await navigator.share({
                files: [file],
                title,
                text,
            });
        } else {
            alert("web share API is not supported on this device");
        }
    } catch (err) {
        console.error("Share failed:", err);
    }
}