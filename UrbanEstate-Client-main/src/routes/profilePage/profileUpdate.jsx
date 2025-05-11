import { useEffect, useState } from "react";
import "./profileUpdate.scss";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../store/auth/authSlice.js";

function ProfileUpdate() {
    const [profilePreview, setProfilePreview] = useState(null);
    const [dragging, setDragging] = useState(false);
    const [error, setError] = useState(null);
    const validFileTypes = ["image/png", "image/jpeg", "image/jpg"];

    const userData = useSelector((state) => state.auth.userData);
    const dispatch = useDispatch();

    const handleOnDrop = (e) => {
        setError(null);
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];

            if (validFileTypes.includes(file.type)) {
                createImagePreview(file);
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(file);
                document.getElementById("avatar").files = dataTransfer.files;
            } else {
                setError("Please upload a valid .png, .jpg, or .jpeg file");
            }
        }
    };

    const createImagePreview = (file) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            setProfilePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData(e.target);

            const avatarInput = document.getElementById("avatar");

            if (avatarInput && avatarInput.files.length === 0) {
                formData.delete("avatar");
            }

            const updatedUser = await fetch(import.meta.env.VITE_SERVER_URL + `/users/${userData.id}`, {
                method: "PATCH",
                headers: {
                    Accept: "application/json",
                },
                body: formData,
                credentials: "include",
            });

            const user = await updatedUser.json();

            dispatch(updateUser(user.data));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="profileUpdate">
                <div className="formContainer">
                    <div className="leftForm">
                        <h1>Update Profile</h1>
                        <div className="item">
                            <label htmlFor="username">Username</label>
                            <input id="username" name="username" type="text" defaultValue={userData.username} />
                        </div>
                        <div className="item">
                            <label htmlFor="email">Email</label>
                            <input id="email" name="email" type="email" defaultValue={userData.email} />
                        </div>
                        <div className="item">
                            <label htmlFor="password">Password</label>
                            <input id="password" name="password" type="password" />
                        </div>
                        <button>Update</button>
                    </div>
                </div>
                <div className="sideContainer">
                    <img src={profilePreview || userData.avatar || "/userIcon.png"} alt="" className="avatar" />
                    <div className="avatarUpload">
                        <div
                            className={`profileUpload ${dragging ? "dragging" : ""}`}
                            onClick={() => document.getElementById("avatar").click()}
                            onDragOver={(e) => {
                                e.preventDefault();
                                setDragging(true);
                            }}
                            onDragLeave={() => setDragging(false)}
                            onDrop={handleOnDrop}
                        >
                            <img src="/upload.svg"></img>
                            <input type="file" id="avatar" name="avatar" accept=".png, .jpg, .jpeg" />
                            <p>Click to upload or drag and drop</p>
                            {error && <span className="error">{error}</span>}
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default ProfileUpdate;
