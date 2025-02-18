import React from 'react';
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
    const handleLikeClick = async () => {
        await incrementLike(id);
        alert('Like count incremented for' + id);
        // Optionally, you can add code to update the UI after incrementing the like count
    };

    return (
        <div className="bg-gray-200 p-4 rounded-lg mb-4 border border-gray-300 md:p-6 lg:p-8">
            <h2 className="text-blue-600 text-xl font-semibold md:text-2xl lg:text-3xl">{title}</h2>
            <p className="text-blue-500 mt-2 md:mt-4 lg:mt-6">{text}</p>
            <div className="flex items-center mt-3 md:mt-4 lg:mt-6">
                <div className="flex items-center text-blue-500 mr-6">
                    <FaThumbsUp className="mr-2 cursor-pointer" onClick={handleLikeClick} /> {like_count}
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
