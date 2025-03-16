import React, { useContext } from 'react';
import { FiMenu } from "react-icons/fi";
import { NicknameContext } from '../context/context';

interface HeaderProps {
    toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
    const nicknameContext = useContext(NicknameContext);
    const nickname = "Browsing as: " + (nicknameContext?.nickname ?? "Anonymous");

    return (
        <header className="w-full flex items-center justify-between p-4 bg-[#df8f28] position: fixed">
            <div className="header__icon" onClick={toggleSidebar}>
            <FiMenu />
            </div>
            <h1>Community Board</h1>
            {nickname}
        </header>
    );
};

export default Header;