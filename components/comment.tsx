import React, { useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { incrementLike } from '../app/actions';
import DOMPurify from 'dompurify';

interface CommentProps {
  text: string;
  like_count: number;
  date: string;
  reply_id: string;
  author: string;
}

function Comment({ text, like_count, date, reply_id, author }: CommentProps) {
    const [likes, setLikes] = useState(like_count);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const handleLikeClick = async () => {
        if (isButtonDisabled) return;
        setLikes(likes + 1);
        setIsButtonDisabled(true);
        await incrementLike(reply_id, true);
        alert('Liked! ' + reply_id);
        setTimeout(() => {
            setIsButtonDisabled(false);
        }, 10000);
    };    

    const sanitizedText = DOMPurify.sanitize(text);

    return (
        <div className="bg-gray-200 p-0 rounded-lg mb-1 border border-gray-300 md:p-6 lg:p-8">
            <p className="italic text-gray-600">{author}</p>
            <p className="text-blue-500 mt-2 md:mt-4 lg:mt-6" dangerouslySetInnerHTML={{ __html: sanitizedText }} />
            <div className="flex items-center mt-3 md:mt-4 lg:mt-6">
                <div className="flex items-center text-blue-500 mr-6">
                    <FaThumbsUp 
                        className={`mr-2 cursor-pointer ${isButtonDisabled ? 'opacity-50' : ''} z-10`} 
                        onClick={handleLikeClick} 
                    /> 
                    {likes}
                </div>
            </div>
            <small className="text-blue-400 mt-2 block md:mt-4 lg:mt-6">{date}</small>
        </div>
    );
}

export default Comment;