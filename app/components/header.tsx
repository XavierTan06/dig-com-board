import React from 'react';
import { FiMenu } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";

interface HeaderProps {
    toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
    return (
        <header className="flex items-center justify-between p-4 bg-blue-300 w-full">
            <div className="header__icon">
                <button onClick={toggleSidebar}>
                <FiMenu />
                </button>
            </div>
            <div className="header__title text-center flex-grow">
                <h1>Title Name</h1>
            </div>
            <div className="header__icon">
                <IoSearchOutline />
            </div>
        </header>
    );
};

export default Header;