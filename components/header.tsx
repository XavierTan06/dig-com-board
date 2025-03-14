import React, { useContext } from 'react';
import { FiMenu } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import { NicknameContext } from '../context/context';

interface HeaderProps {
    toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
    const nicknameContext = useContext(NicknameContext);
    const nickname = "Browsing as: " + (nicknameContext?.nickname ?? "Anonymous");

    return (
        <header className="w-full flex items-center justify-between p-4 bg-blue-300">
            <div className="header__icon" onClick={toggleSidebar}>
                <FiMenu />
            </div>
            <div className="header__title text-center flex-grow">
                <h1>Community Board</h1>
            </div>
            <div className="header__icon">
                {nickname}
            </div>
        </header>
    );
};

export default Header;