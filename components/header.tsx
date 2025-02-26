import React from 'react';
import { FiMenu } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";

interface HeaderProps {
    toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
    return (
        <header className="w-full flex items-center justify-between p-4 bg-blue-300">
            <div className="header__icon" onClick={toggleSidebar}>
                <FiMenu />
            </div>
            <div className="header__title text-center flex-grow">
                <h1>Community Board</h1>
            </div>
            <div className="header__icon">
                <IoSearchOutline />
            </div>
        </header>
    );
};

export default Header;