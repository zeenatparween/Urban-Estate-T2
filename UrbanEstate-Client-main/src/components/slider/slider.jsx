import { useState } from "react";
import "./slider.scss";

function Slider({ images }) {
    const [imageIndex, setImageIndex] = useState(null);

    const changeSlide = (direction) => {
        const imagesArrLength = images.length;

        if (direction === "left") {
            if (imageIndex === 0) setImageIndex(imagesArrLength - 1);
            else setImageIndex((prev) => prev - 1);
        } else if (direction === "right") {
            if (imageIndex === imagesArrLength - 1) setImageIndex(0);
            else setImageIndex((prev) => prev + 1);
        }
    };

    return (
        <div className="slider">
            {imageIndex !== null && (
                <div className="fullSlider">
                    <div className="arrow">
                        <img src="/arrow.png" alt="" onClick={() => changeSlide("left")} />
                    </div>
                    <div className="imageContainer">
                        <img src={import.meta.env.VITE_POST_IMAGES_URL + images[imageIndex]} alt="" />
                    </div>
                    <div className="arrow flip">
                        <img src="/arrow.png" className="right" alt="" onClick={() => changeSlide("right")} />
                    </div>
                    <div className="close" onClick={() => setImageIndex(null)}>
                        X
                    </div>
                </div>
            )}
            <div className="bigImage">
                <img src={import.meta.env.VITE_POST_IMAGES_URL + images[0]} alt="" onClick={() => setImageIndex(0)} />
            </div>
            <div className="smallImages">
                {images.slice(1).map((image, index) => {
                    if (index < 3) {
                        return (
                            <div key={index} style={{ position: "relative" }}>
                                <img
                                    src={import.meta.env.VITE_POST_IMAGES_URL + image}
                                    alt=""
                                    key={index}
                                    onClick={() => setImageIndex(index + 1)}
                                />
                                {images.length > 4 && index === 2 ? (
                                    <div className="overlay" onClick={() => setImageIndex(index + 1)}>
                                        + {images.length - 4}
                                    </div>
                                ) : null}
                            </div>
                        );
                    } else {
                        return null;
                    }
                })}
            </div>
        </div>
    );
}

export default Slider;
