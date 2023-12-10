import React, { useContext, useState } from "react";
import { FaRegFileLines } from "react-icons/fa6";
import { FaFileImage } from "react-icons/fa6";
import { Toaster, toast } from "react-hot-toast";
import { IoSend } from "react-icons/io5";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../config/firebase";
import { v4 as uuid } from "uuid";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytesResumable,
} from "firebase/storage";
const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [file, setFile] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img || file) {
      let fileToUpload = img || file;
      const storageRef2 = storageRef(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef2, fileToUpload);

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          toast.error(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: img ? downloadURL : null,
                pdf: file ? downloadURL : null,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    setText("");
    setImg(null);
    setFile(null);
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="h-[50px] bg-[#202c33] p-3 flex items-center justify-between">
        <input
          type="text"
          placeholder="enter a message"
          className="w-full outline-none bg-[#202c33] text-white"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <div className="flex items-center gap-3 text-white" id="send">
          <input
            type="file"
            style={{ display: "none" }}
            id="image"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
          />
          <label
            htmlFor="image"
            className="hover:text-green-800 cursor-pointer"
          >
            <FaFileImage size={20} />
          </label>
          <input
            type="file"
            id="pdf"
            className="hidden "
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label htmlFor="pdf" className=" hover:text-green-800 cursor-pointer">
            <FaRegFileLines size={20} />
          </label>
          <button onClick={handleSend} className="hover:text-green-800">
            <IoSend size={25} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Input;
