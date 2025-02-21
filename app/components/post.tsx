import React, { useState } from 'react';
import { FaThumbsUp, FaHeart } from 'react-icons/fa';
import { incrementLike } from '../actions';

interface PostProps {
    title: string;
    text: string;
    like_count: number;
    reply_count: number;
    date: string;
    id: string;
}

const Post: React.FC<PostProps> = ({ title, text, like_count, reply_count, date, id }) => {
    const [likes, setLikes] = useState(like_count);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const handleLikeClick = async () => {
        if (isButtonDisabled) return;
        setLikes(likes + 1);
        setIsButtonDisabled(true);
        await incrementLike(id);
        alert('Liked!');
        setTimeout(() => {
            setIsButtonDisabled(false);
        }, 10000);
    };

    return (
        <div className="bg-gray-200 p-0 rounded-lg mb-1 border border-gray-300 md:p-6 lg:p-8">
            <h2 className="text-blue-600 text-xl font-semibold md:text-2xl lg:text-3xl">{title}</h2>
            <p className="text-blue-500 mt-2 md:mt-4 lg:mt-6">{text}</p>
            <div className="flex items-center mt-3 md:mt-4 lg:mt-6">
                <div className="flex items-center text-blue-500 mr-6">
                    <FaThumbsUp 
                        className={`mr-2 cursor-pointer ${isButtonDisabled ? 'opacity-50' : ''} z-10`} 
                        onClick={handleLikeClick} 
                    /> 
                    {likes}
                </div>
                <div className="flex items-center text-blue-500">
                    <FaHeart className="mr-2" /> {reply_count}
                </div>
            </div>
            <small className="text-blue-400 mt-2 block md:mt-4 lg:mt-6">{date}</small>
        </div>
    );
};

export default Post;
