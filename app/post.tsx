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
        <div style={styles.postContainer}>
            <h2 style={styles.title}>{title}</h2>
            <p style={styles.text}>{text}</p>
            <div style={styles.iconsContainer}>
                <div style={styles.iconItem}>
                    <FaThumbsUp /> {like_count}
                </div>
                <div style={styles.iconItem}>
                    <FaHeart /> {reply_count}
                </div>
            </div>
            <small style={styles.date}>{date}</small>
        </div>
    );
};

const styles = {
    postContainer: {
        border: '1px solid red',
        backgroundColor: 'grey',
        color: 'blue',
        padding: '16px',
        borderRadius: '8px',
        marginBottom: '16px',
    },
    title: {
        color: 'blue',
    },
    text: {
        color: 'blue',
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
        color: 'blue',
    },
    date: {
        color: 'blue',
    },
};

export default Post;