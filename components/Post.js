import React from 'react'

function Post({name, email, message, pic, timestamp, image}) {
    return (
        <div className="flex flex-col">
            <div className="p-5 bg-white mt-5 shadow-sm rounded-t-2xl">
                <div className="flex items-center space-x-2">
                    <img
                        className="rounded-full" 
                        src={image} 
                        height={40} 
                        width={40}
                    />
                    <div>
                        <p className="font-medium">{name}</p>
                        <p className="text-xs text-gray-400">
                            {timestamp}
                        </p>
                    </div>
                </div>
                <p className="pt-4">{message}</p>
            </div>
        </div>
    )
}

export default Post
