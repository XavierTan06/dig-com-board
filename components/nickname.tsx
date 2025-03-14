import { useContext, useState } from "react";
import { NicknameContext } from "../context/context";

export default function NicknameInput() {
  const nicknameContext = useContext(NicknameContext);
  const [inputValue, setInputValue] = useState("Anonymous");

  if (!nicknameContext) {
    throw new Error("NicknameInput must be used within a NicknameProvider");
  }

  const { nickname, setNickname } = nicknameContext;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setNickname(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h2 className="text-lg font-bold">Enter Your Nickname</h2>
      <form onSubmit={handleSave} className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter nickname..."
          className="border p-2 rounded"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Save
        </button>
      </form>
      {nickname && <p className="text-green-600">Your nickname: {nickname}</p>}
    </div>
  );
}
