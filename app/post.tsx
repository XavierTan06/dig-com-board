import React from 'react';
import { FaThumbsUp, FaHeart } from 'react-icons/fa';

interface PostProps {
    title: string;
    text: string;
    like_count: number;
    reply_count: number;
    date: string;
}

const Post: React.FC<PostProps> = ({ title, text, like_count, reply_count, date }) => {
    return (
        <div className="bg-gray-200 p-4 rounded-lg mb-4 border border-gray-300">
            <h2 className="text-blue-600 text-xl font-semibold">{title}</h2>
            <p className="text-blue-500 mt-2">{text}</p>
            <div className="flex items-center mt-3">
                <div className="flex items-center text-blue-500 mr-6">
                    <FaThumbsUp className="mr-2" /> {like_count}
                </div>
                <div className="flex items-center text-blue-500">
                    <FaHeart className="mr-2" /> {reply_count}
                </div>
            </div>
            <small className="text-blue-400 mt-2 block">{date}</small>
        </div>
    );
};

export default Post;
