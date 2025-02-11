import React from 'react';
import { FaThumbsUp, FaHeart } from 'react-icons/fa';

interface PostProps {
    title: string;
    thumbsUp: number;
    likes: number;
}

const Post: React.FC<PostProps> = ({ title, thumbsUp, likes }) => {
    return (
        <div style={styles.postContainer}>
            <h2>{title}</h2>
            <div style={styles.iconsContainer}>
                <div style={styles.iconItem}>
                    <FaThumbsUp /> {thumbsUp}
                </div>
                <div style={styles.iconItem}>
                    <FaHeart /> {likes}
                </div>
            </div>
        </div>
    );
};

const styles = {
    postContainer: {
        border: '1px solid #ccc',
        padding: '16px',
        borderRadius: '8px',
        marginBottom: '16px',
    },
    iconsContainer: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '8px',
    },
    iconItem: {
        display: 'flex',
        alignItems: 'center',
        marginRight: '16px',
    },
};

export default Post;