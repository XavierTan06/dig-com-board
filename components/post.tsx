import React, { useState } from 'react';
import { FaThumbsUp, FaComment } from 'react-icons/fa';
import { incrementLike } from '../app/actions';
import DOMPurify from 'dompurify';

interface PostProps {
    title: string;
    text: string;
    like_count: number;
    reply_count: number;
    date: string;
    id: string;
    author: string;
}

const Post: React.FC<PostProps> = ({ title, text, like_count, reply_count, date, id, author }) => {
    const [likes, setLikes] = useState(like_count);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const isDisabledOnPage = window.location.pathname === `/post/${id}`; // Adjust the URL check here

    const handleLikeClick = async (event: React.MouseEvent) => {
        event.stopPropagation(); // Stop the click event from propagating to the parent
        if (isButtonDisabled) return;
        setLikes(likes + 1);
        setIsButtonDisabled(true);
        await incrementLike(id);
        alert('Liked!');
        setTimeout(() => {
            setIsButtonDisabled(false);
        }, 10000);
    };

    const handleClick = (id: string) => {
        if (isDisabledOnPage) return;
        window.location.href = `/post/${id}`;
        alert('Redirecting to post page...');
    }

    // Sanitize the HTML text content before rendering
    const sanitizedText = DOMPurify.sanitize(text);

    return (
        <div 
            className="bg-gray-200 p-0 rounded-lg mb-1 border border-gray-300 md:p-6 lg:p-8 cursor-pointer z-40" 
            onClick={() => handleClick(id)}
            style={{
                cursor: isDisabledOnPage ? 'default' : 'pointer', // Change cursor based on condition
              }}
        >
            <p className="text-blue-400 italic">{author}</p> {/* Added author in italics */}
            <h2 className="text-blue-600 text-xl font-semibold md:text-2xl lg:text-3xl">{title}</h2>
            <p
                className="text-blue-500 mt-2 md:mt-4 lg:mt-6"
                dangerouslySetInnerHTML={{ __html: sanitizedText }}
            />
            <div className="flex items-center mt-3 md:mt-4 lg:mt-6">
                <div className="flex items-center text-blue-500 mr-6">
                    <FaThumbsUp 
                        className={`mr-2 cursor-pointer ${isButtonDisabled ? 'opacity-50' : ''} z-50`} 
                        onClick={handleLikeClick} 
                    /> 
                    {likes}
                </div>
                <div className="flex items-center text-blue-500">
                    <FaComment className="mr-2" /> {reply_count}
                </div>
            </div>
            <small className="text-blue-400 mt-2 block md:mt-4 lg:mt-6">{date}</small>
        </div>
    );
};

export default Post;
