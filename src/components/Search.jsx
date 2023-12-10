import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast, Toaster } from "react-hot-toast";
import { FaRegUserCircle } from "react-icons/fa";
import { db } from "../config/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };
  const handleSelect = async () => {
    // if (!user) {
    //   console.log("User is null. Cannot proceed with selection.");
    //   return;
    // }

    console.log("Selected user:", user);

    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    console.log("Combined ID:", combinedId);

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        console.log("Chat document does not exist. Creating...");

        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        console.log("Chat document and userChats updated successfully.");
      } else {
        console.log("Chat document already exists. No action taken.");
      }
    } catch (error) {
      console.error("Error during user selection:", error.message);
      toast.error("Error during user selection. Please try again.");
    }

    // Reset user and username after selection
    setUser(null);
    setUsername("");
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="border-b" id="search">
        <div className="" id="searchForm">
          <input
            type="text"
            placeholder="Find a user"
            className=" text-sm bg-gray-700 px-2 py-2 w-full border-none text-white outline-none"
            onKeyDown={handleKey}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        {user && (
          <div
            className=" p-3 flex items-center gap-2 text-white  cursor-pointer hover:bg-slate-700"
            id="userChat"
            onClick={handleSelect}
          >
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt="img"
                className="w-10 h-10 rounded-full object-cover text-sm"
              />
            ) : (
              <span className="text-white">
                <FaRegUserCircle size={25} />
              </span>
            )}

            <div id="userChatInfo">
              <span>{user.displayName}</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
