import React, { useContext } from 'react';
import { FiMenu } from "react-icons/fi";
import { NicknameContext } from '../context/context';

interface HeaderProps {
    toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
    const nicknameContext = useContext(NicknameContext);
    const nickname = nicknameContext?.nickname 
        ? "Hello, " + nicknameContext.nickname 
        : "Hi!";
    console.log(nickname);

    return (
        <header className="w-full grid grid-cols-3 items-center p-4 bg-[#df8f28] fixed top-0 left-0 z-50">
            <div className="justify-self-start cursor-pointer" onClick={toggleSidebar}>
                <FiMenu />
            </div>
            <h1 className="justify-self-center">Community Board</h1>
            <span className="justify-self-end text-[14px]">{nickname}</span>
        </header>
    );
};

export default Header;