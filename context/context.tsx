import { createContext, useState, useEffect, ReactNode } from "react";

interface NicknameContextType {
  nickname: string;
  setNickname: (name: string) => void;
}

export const NicknameContext = createContext<NicknameContextType | undefined>(undefined);

export const NicknameProvider = ({ children }: { children: ReactNode }) => {
  const [nickname, setNickname] = useState<string>("");

  // Load nickname from sessionStorage when the app starts
  useEffect(() => {
    const savedNickname = sessionStorage.getItem("nickname");
    if (savedNickname) {
      setNickname(savedNickname);
    }
  }, []);

  // Save nickname to sessionStorage whenever it changes
  const updateNickname = (name: string) => {
    setNickname(name);
    sessionStorage.setItem("nickname", name);
  };

  return (
    <NicknameContext.Provider value={{ nickname, setNickname: updateNickname }}>
      {children}
    </NicknameContext.Provider>
  );
};
