import { useState } from "react";
import "./createPostPage.scss";
import MapMarkerOne from "../../components/map/mapMarkerOne.jsx";

function PostPage() {
    const [error, setError] = useState(null);
    const [errorImages, setErrorImages] = useState("");
    const [postImages, setPostImages] = useState([]);
    const [dragging, setDragging] = useState(false);
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    const validFileTypes = ["image/png", "image/jpeg", "image/jpg"];
    const MAX_FILE_SIZE = 5 * 1024 * 1024;

    const handleSubmit = async (e) => {
        setError(null);
        e.preventDefault();

        if (document.getElementById("postImages").files.length < 4) {
            setError("Please upload atleast four images.");
            return;
        }

        const formData = new FormData(e.target);
        console.log(formData);
        try {
            const post = await fetch(import.meta.env.VITE_SERVER_URL + "/posts/", {
                method: "POST",
                body: formData,
                credentials: "include",
            });

            const postJson = await post.json();

            console.log(postJson);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleOnDrop = (e) => {
        setErrorImages("");
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
        let isError = false;
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            Array.from(e.dataTransfer.files).map((file) => {
                console.log(file);
                if (!validFileTypes.includes(file.type)) {
                    setErrorImages("Please upload a valid .png, .jpg, or .jpeg file");
                    isError = true;
                    return;
                }

                if (file.size > MAX_FILE_SIZE) {
                    setErrorImages("Maximum file size allowed is 5 MB");
                    isError = true;
                    return;
                }
            });

            if (!isError) {
                Array.from(e.dataTransfer.files).map((file) => {
                    createImagePreview(file);
                });

                document.getElementById("postImages").files = e.dataTransfer.files;
            }
        }
    };

    const createImagePreview = (file) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            setPostImages((prev) => [...prev, reader.result]);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="newPostPage">
            <h1>Create New Post</h1>
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    <div className="item scale-full">
                        <label htmlFor="title">Title</label>
                        <input id="title" name="title" type="text" required />
                    </div>
                    <div className="item scale-full">
                        <label htmlFor="description">Description</label>
                        <textarea id="description" name="description" rows="10" required></textarea>
                    </div>
                    <div className="item">
                        <label htmlFor="price">Price</label>
                        <input id="price" name="price" type="number" required />
                    </div>

                    <div className="item">
                        <label htmlFor="city">City</label>
                        <input id="city" name="city" type="text" />
                    </div>
                    <div className="item">
                        <label htmlFor="bedroom">Bedroom Number</label>
                        <input min={0} max={20} id="bedroom" name="bedroom" type="number" />
                    </div>
                    <div className="item">
                        <label htmlFor="bathroom">Bathroom Number</label>
                        <input min={0} max={20} id="bathroom" name="bathroom" type="number" />
                    </div>
                    <div className="item">
                        <label htmlFor="latitude">Latitude</label>
                        <input
                            id="latitude"
                            name="latitude"
                            type="text"
                            required
                            value={latitude}
                            onChange={(e) => setLatitude(e.target.value)}
                        />
                    </div>
                    <div className="item">
                        <label htmlFor="longitude">Longitude</label>
                        <input
                            id="longitude"
                            name="longitude"
                            type="text"
                            required
                            value={longitude}
                            onChange={(e) => setLongitude(e.target.value)}
                        />
                    </div>
                    <div className="item">
                        <label htmlFor="ServiceType">Type</label>
                        <select name="ServiceType">
                            <option value="rent" defaultChecked>
                                Rent
                            </option>
                            <option value="buy">Buy</option>
                        </select>
                    </div>
                    <div className="item">
                        <label htmlFor="propertyType">Property</label>
                        <select name="propertyType">
                            <option value="apartment">Apartment</option>
                            <option value="house">House</option>
                            <option value="condo">Condo</option>
                            <option value="land">Land</option>
                        </select>
                    </div>

                    <div className="item">
                        <label htmlFor="utilities">Utilities Policy</label>
                        <select name="utilities">
                            <option value="owner">Owner is responsible</option>
                            <option value="tenant">Tenant is responsible</option>
                            <option value="shared">Shared</option>
                        </select>
                    </div>
                    <div className="item">
                        <label htmlFor="pet">Pet Policy</label>
                        <select name="pet">
                            <option value="allowed">Allowed</option>
                            <option value="not-allowed">Not Allowed</option>
                        </select>
                    </div>
                    <div className="item">
                        <label htmlFor="income">Income Policy</label>
                        <input id="income" name="income" type="text" placeholder="Income Policy" maxLength={500} />
                    </div>
                    <div className="item">
                        <label htmlFor="size">Total Size (sqft)</label>
                        <input min={0} id="size" name="size" type="number" />
                    </div>
                    <div className="item">
                        <label htmlFor="school">School</label>
                        <input min={0} id="school" name="school" type="number" placeholder="Disatance in KM" />
                    </div>
                    <div className="item">
                        <label htmlFor="bus">bus</label>
                        <input min={0} id="bus" name="bus" type="number" placeholder="Disatance in KM" />
                    </div>
                    <div className="item">
                        <label htmlFor="restaurant">Restaurant</label>
                        <input min={0} id="restaurant" name="restaurant" type="number" placeholder="Disatance in KM" />
                    </div>
                    <div className="item scale-full">
                        <label htmlFor="address">Address</label>
                        <input id="address" name="address" type="text" required />
                    </div>

                    <div className="mapContainer">
                        <MapMarkerOne setLatitude={setLatitude} setLongitude={setLongitude} />
                    </div>

                    <div className="imagesContainer">
                        <div className="uploadedImage">
                            {postImages.map((image, index) => (
                                <img src={image} key={index} alt="" />
                            ))}
                        </div>
                        <div className="imagesUpload">
                            <div
                                className={`uploadContainer ${dragging ? "dragging" : ""}`}
                                onClick={() => document.getElementById("postImages").click()}
                                onDragOver={(e) => {
                                    e.preventDefault();
                                    setDragging(true);
                                }}
                                onDragLeave={() => setDragging(false)}
                                onDrop={handleOnDrop}
                            >
                                <img src="/upload.svg"></img>
                                <input
                                    type="file"
                                    id="postImages"
                                    name="postImages"
                                    accept=".png, .jpg, .jpeg"
                                    multiple
                                />
                                <p>Click to upload or drag and drop</p>
                                {errorImages && <span className="error">{errorImages}</span>}
                            </div>
                        </div>
                    </div>

                    <div className="sendButton">
                        <button className="sendButton">Create Post</button>
                        {error && <span className="error">{error}</span>}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PostPage;
