import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {format} from "date-fns";
const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const formattedDate =
    message.date && format(message.date.toDate(), "MMMM d, yyyy h:mm a");

  return (
    <div
      ref={ref}
      className={`flex gap-5 mb-2 font-openSans ${
        message.senderId === currentUser.uid ? " flex-row-reverse" : ""
      } `}
    >
      <div id="messageInfo" className="text-white">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className=" text-[8px]">{formattedDate}</span>
      </div>
      <div
        id="messageContent"
        className="max-w-[80%] flex flex-col items-center  gap-3"
      >
        <p
          className={` ${
            message.senderId === currentUser.uid
              ? "bg-[#005c4b] text-white "
              : "bg-white text-black"
          }  font-semibold px-3 rounded`}
        >
          {message.text}
        </p>
        {message.img && (
          <img
            src={message.img}
            alt="pdf file"
            className="w-40 h-40 rounded-md object-cover text-white"
          />
        )}
        {message.pdf && (
          <div>
            <embed
              src={message.pdf}
              type="application/pdf"
              className="w-60 h-36"
            />
            <a
              href={message.pdf}
              target="_blank"
              rel="noopener noreferrer"
              download
              className=" text-xs text-blue-500 underline"
            >
              View PDF
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
