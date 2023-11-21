import { useEffect, useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Author({ authorId }) {
    const [author, setAuthor] = useState(null);
    const navigate = useNavigate()

    const defaultImage = 'https://r2.starryai.com/results/280439566/b2af7633-b240-469e-8a0b-8967ca847fc1.webp';

    useEffect(() => {
        axios.get(`http://localhost:4000/user/${authorId}`)
            .then(response => setAuthor(response.data))
            .catch(error => console.error('Error fetching author: ', error));
    }, [authorId]);
    const handleClick = (e) => {
        navigate(`/profile/${authorId}`);

    }
    if (!author) return null;
    return (
        <div className="authorHeader" >
            <img src={author.imgSrc || defaultImage}
                className='imgProfilefeed'
                alt={author.username}
                onClick={handleClick} />
            <h2>{author.username}</h2>
        </div>
    );
}

export default Author;