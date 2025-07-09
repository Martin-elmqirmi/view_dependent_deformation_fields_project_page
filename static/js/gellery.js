function VideoCarousel({ title, videos }) {
    const trackRef = React.useRef(null);

    const scrollLeft = () => {
        if (trackRef.current) {
            trackRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (trackRef.current) {
            trackRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    const handleMouseEnter = (e) => e.target.pause();
    const handleMouseLeave = (e) => e.target.play();

    return (
        <div className="carousel-wrapper">
            <h3 className="carousel-title">{title}</h3>

            <div className="carousel-container">
                <button className="scroll-button left" onClick={scrollLeft}>❮</button>

                <div className="carousel-track" ref={trackRef}>
                    {videos.map((video, idx) => (
                        <video
                            key={idx}
                            src={video}
                            autoPlay
                            muted
                            playsInline
                            loop
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        />
                    ))}
                </div>

                <button className="scroll-button right" onClick={scrollRight}>❯</button>
            </div>
        </div>
    );
}

const meshes = [
    "static/videos/house_final.mp4",
    "static/videos/charlie_final.mp4",
    "static/videos/einstein_final.mp4",
    "static/videos/bunny_final.mp4",
    "static/videos/cezanne_final.mp4",
    "static/videos/dress_final.mp4",
    "static/videos/rodin_final.mp4",
    "static/videos/viking_final.mp4",
];

const splats = [
    "static/videos/crocodile_final.mp4",
    "static/videos/plane_final.mp4",
    "static/videos/tractor_final.mp4",
    "static/videos/castle_final.mp4",
    "static/videos/anime_girl_final.mp4",
];

function App() {
    return (
        <div>
            <VideoCarousel title="Meshes" videos={meshes} />
            <VideoCarousel title="Gaussian Splats" videos={splats} />
        </div>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
