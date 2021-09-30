import React, { useRef, useState } from 'react'
import Image from 'next/image';
import { useSession } from 'next-auth/client';

import { EmojiHappyIcon } from "@heroicons/react/outline";
import { CameraIcon, VideoCameraIcon } from "@heroicons/react/solid";

function InputBox() {
    const [session] = useSession();
    const inputRef = useRef(null);
    const filePicker = useRef(null);
    const [imageToPost, setImageToPost] = useState(null);

    const sendPost = (e) => {
        e.preventDefault();

        if(!inputRef.current.value) return;

        const singleData = {
            message: inputRef.current.value,
            name: session.user.name,
            email: session.user.email,
            image: session.user.image,
            timestamp: new Date().toLocaleString()
        };

        if(imageToPost) {
            singleData['pic'] = imageToPost
        }

        fetch("http://localhost:8000/posts", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(singleData)
          }).then(
              inputRef.current.value = ""
          );
          filePicker.current.value = null;
          setImageToPost(null);
    }

    const addImageToPost = (e) => {
        const reader = new FileReader();
        if(e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = (readerEvent) => {
            setImageToPost(readerEvent.target.result);
        }
    }

    const removeImageFromPost = (e) => {
        setImageToPost(null);
    }

    return (
        <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6">
            <div className="flex space-x-4 p-4 items-center">
                <Image 
                    className="rounded-full"
                    src={session.user.image}
                    width={40}
                    height={40}
                    layout="fixed"
                />
                <form className="flex flex-1">
                    <input 
                        className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none"
                        type="text" 
                        ref={inputRef}
                        placeholder={`What's on your mind, ${session.user.name} ?`}/>
                    <button 
                        type="submit" 
                        hidden 
                        onClick={sendPost}>Submit</button>
                </form>

                {imageToPost && (
                    <div 
                        onClick={removeImageFromPost} 
                        className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer">
                        
                        <img src={imageToPost} className="h-10 object-contain"/>
                        <p className="text-xs text-red-500 text-center">Remove</p>
                    </div>
                )}

            </div>
            <div className="flex justify-evenly p-3 border-t-2">
                <div className="inputIcon">
                    <VideoCameraIcon className="h-7 text-red-500"/>
                    <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
                </div>
                <div 
                    onClick={() => filePicker.current.click()} 
                    className="inputIcon"
                >
                    <CameraIcon className="h-7 text-green-400"/>
                    <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
                    <input ref={filePicker} onChange={addImageToPost} type="file" hidden/>
                </div>
                <div className="inputIcon">
                    <EmojiHappyIcon className="h-7 text-yellow-300" />
                    <p className="text-xs sm:text-sm xl:text-base">Feeling?Activity</p>
                </div>
            </div>
        </div>
    )
}

export default InputBox
