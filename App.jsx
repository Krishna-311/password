import { useCallback, useState } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setPassword] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const passGen = useCallback(() => {
    let pass = "";
    let str =
      "ABCDEFGHIJKLMONPQRSTUVWXYZqwertyuiopasdfghjklzxcvbnm";
    if (number) str += "0123456789";
    if (char) str += "!@#$%^&*()-+=<>?,./;";

    for (let i = 0; i < length; i++) {
      let randomChar = Math.floor(Math.random() * str.length);
      pass += str.charAt(randomChar);
    }
    setPassword(pass);
  }, [number, length, char, setPassword]);

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000); // Reset the button color after 1 second
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="w-full max-w-md bg-gray-800 rounded-lg px-6 py-8 shadow-lg">
          <h1 className="text-white text-center text-2xl font-semibold mb-6">Password Generator</h1>
          
          <div className="flex shadow rounded-lg overflow-hidden mb-4">
            <input
              type="text"
              value={password}
              className="outline-none w-full py-1 px-3 text-gray-800"
              placeholder="Password"
              readOnly
            />
            <button
              className={`outline-none px-3 py-0.5 shrink-0 ${isCopied ? 'bg-green-500' : 'bg-blue-500'} text-white`}
              onClick={handleCopy}
            >
              {isCopied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          <div className="mb-4">
            <label className="text-white block mb-2">Length: {length}</label>
            <input
              type="range"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              min={4}
              max={20}
              className="w-full h-2 bg-gray-300 rounded-lg"
            />
          </div>

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              checked={number}
              onChange={() => setNumber(!number)}
              className="mr-2"
            />
            <label className="text-white">Include Numbers</label>
          </div>

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              checked={char}
              onChange={() => setChar(!char)}
              className="mr-2"
            />
            <label className="text-white">Include Special Characters</label>
          </div>

          <div className="text-center">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded"
              onClick={passGen}
            >
              Generate Password
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
