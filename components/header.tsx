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
        <header className="w-full grid grid-cols-3 items-center p-4 bg-[#df8f28] fixed">
            <div className="justify-self-start cursor-pointer" onClick={toggleSidebar}>
                <FiMenu />
            </div>
            <h1 className="justify-self-center">Community Board</h1>
            <span className="justify-self-end">{nickname}</span>
        </header>
    );
};

export default Header;