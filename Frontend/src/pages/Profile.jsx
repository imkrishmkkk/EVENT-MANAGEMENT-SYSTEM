import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useRef, useState, useEffect } from "react";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOut,
} from "../redux/user/userSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);

  const [formData, setFormData] = useState({});

  const { currentUser ,loading ,error } = useSelector((state) => state.user);
  const [updateSuccess , setUpdateSuccess] = useState(false);
  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);
  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      async (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormData({ ...formData, profilePicture: downloadUrl });
        });
      }
    );
  };
  const handleChannge = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/backend/user/update/${currentUser._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
      console.log(data);

    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/backend/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);
      if(data.success === false){
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess());
    } catch (error) {
      console.log(error);
      dispatch(deleteUserFailure(error));
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch("/backend/auth/signout");
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={formData.profilePicture || currentUser.profilePicture}
          alt="profile"
          className="h-24 w-24 self-center rounded-full object-cover cursor-pointer "
          onClick={() => fileRef.current.click()}
        />
        <p className="text-sm self-center">
          {imageError ? (
            <span className="text-red-700">
              Error uploading image(file size must be less than 2 MB)
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className="text-slate-700">{`Uploading :  ${imagePercent}%`}</span>
          ) : imagePercent === 100 ? (
            <span className="text-green-700">image upload successfully</span>
          ) : (
            ""
          )}
        </p>
        <input
          className="bg-slate-100 rounded-lg p-3 "
          defaultValue={currentUser.name}
          type="text"
          id="name"
          placeholder="Name"
          onChange={handleChannge}
        />
        <input
          className="bg-slate-100 rounded-lg p-3 "
          defaultValue={currentUser.username}
          type="text"
          id="username"
          placeholder="Username"
          onChange={handleChannge}
        />
        <input
          className="bg-slate-100 rounded-lg p-3 "
          defaultValue={currentUser.email}
          type="email"
          id="email"
          placeholder="Email"
          onChange={handleChannge}
        />
        <input
          className="bg-slate-100 rounded-lg p-3 "
          type="password"
          id="password"
          placeholder="Password"
          onChange={handleChannge}
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
      <div className=" flex justify-between mt-5">
        <span onClick={handleDeleteAccount} className="text-red-700 cursor-pointer">Delete Account</span>

        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">Sign out</span>
      </div>
      <p className="text-red-700 mt-5">{error && "Something went wrong"}</p>
      <p className="text-green-700 text-center mt-5">{updateSuccess && "User is updated successfully"}</p>
      </div>
  );
}
