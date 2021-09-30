import React, { useEffect, useState } from 'react'
import Post from './Post';

function Posts() {

    const [allData, setAllData] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {

        fetch("http://localhost:8000/posts")
        .then(res => res.json())
        .then(result => { 
            console.log("here")
            setLoaded(true);
            setAllData(result)
        })
        .catch(console.log);

    }, [])

    return (
        <div>
            {allData.map(post => (
                <Post 
                    key={post.id}
                    name={post.name}
                    email={post.email}
                    message={post.message}
                    image={post.image}
                    pic={post.pic ? post.pic : ''}
                    timestamp={post.timestamp}
                    image={post.image}
                />
            ))}
        </div>
    )
}

export default Posts
