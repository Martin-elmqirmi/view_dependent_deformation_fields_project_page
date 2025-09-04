document.addEventListener("DOMContentLoaded", function () {
    const meshContainer = document.getElementById("mesh-videos");
    const gsplatContainer = document.getElementById("gsplat-videos");

    const modal = document.getElementById("videoModal");
    const modalMedia = document.getElementById("modalMedia");
    const modalDescription = document.getElementById("videoDescription");

    const leftButton = document.getElementById("modalLeft");
    const rightButton = document.getElementById("modalRight");

    let currentGallery = [];
    let currentIndex = 0;

    async function loadVideos(folder, container) {
        try {
            const response = await fetch(folder + "/index.json");
            const videos = await response.json();

            videos.forEach(video => {
                const column = document.createElement("div");
                column.classList.add("column", "is-one-third");

                const card = document.createElement("div");
                card.classList.add("video-card");

                const videoElement = document.createElement("video");
                videoElement.src = `${folder}/${video.file}`;
                videoElement.muted = true;
                videoElement.loop = true;
                videoElement.autoplay = true;
                videoElement.classList.add("video-preview");

                videoElement.addEventListener("click", () => {
                    currentGallery = [];

                    // Add the video to gallery
                    currentGallery.push({
                        type: "video",
                        src: `${folder}/${video.file}`
                    });

                    // Add image if available
                    if (video.pdfImage) {
                        currentGallery.push({
                            type: "image",
                            src: `${folder}/${video.pdfImage}`
                        });
                    }

                    currentIndex = 0;
                    openGallery(video.description || "");
                });

                card.appendChild(videoElement);

                if (video.description) {
                    const caption = document.createElement("p");
                    caption.classList.add("video-caption");

                    const typeBold = document.createElement("strong");
                    typeBold.textContent = video.type + ". ";
                    caption.appendChild(typeBold);

                    const descriptionText = document.createTextNode(video.description);
                    caption.appendChild(descriptionText);

                    const figureText = document.createElement("strong");
                    figureText.textContent = " (Figure. " + video.figure + ")";
                    figureText.style.fontStyle = "italic";
                    caption.appendChild(figureText);

                    card.appendChild(caption);
                }

                column.appendChild(card);
                container.appendChild(column);
            });
        } catch (error) {
            console.error("Could not load videos from", folder, error);
        }
    }

    function openGallery(description) {
        modal.classList.add("is-active");
        modalDescription.textContent = description;
        showCurrentMedia();
    }

    function showCurrentMedia() {
        const item = currentGallery[currentIndex];
        modalMedia.innerHTML = "";

        if (item.type === "video") {
            const video = document.createElement("video");
            video.src = item.src;
            video.controls = true;
            video.autoplay = true;
            video.classList.add("modal-video");
            modalMedia.appendChild(video);
        } else if (item.type === "image") {
            const img = document.createElement("img");
            img.src = item.src;
            img.classList.add("modal-image");
            modalMedia.appendChild(img);
        }

        // Show/hide arrows depending on gallery length
        leftButton.style.display = currentGallery.length > 1 ? "inline-block" : "none";
        rightButton.style.display = currentGallery.length > 1 ? "inline-block" : "none";

        // === Create Dots ===
        const indicatorsContainer = document.getElementById("mediaIndicators");
        indicatorsContainer.innerHTML = ""; // Clear existing dots

        currentGallery.forEach((_, index) => {
            const dot = document.createElement("div");
            dot.classList.add("dot");
            if (index === currentIndex) {
                dot.classList.add("active");
            }
            indicatorsContainer.appendChild(dot);
        });
    }

    leftButton.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
        showCurrentMedia();
    });

    rightButton.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % currentGallery.length;
        showCurrentMedia();
    });

    modal.querySelector(".modal-background").addEventListener("click", () => {
        modal.classList.remove("is-active");
        modalMedia.innerHTML = "";
    });

    modal.querySelector(".modal-close").addEventListener("click", () => {
        modal.classList.remove("is-active");
        modalMedia.innerHTML = "";
    });

    loadVideos("static/videos/mesh", meshContainer);
    loadVideos("static/videos/gsplat", gsplatContainer);
});
