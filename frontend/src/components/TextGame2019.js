import NavBar from './NavBar.js';
import { useGameLogic } from '../TextGame2019/gameController.js';
import { useRef, useEffect } from 'react';

export default function TextGame2019() {
    const messageEndRef = useRef(null);
    const {
            messages,
            inputValue,
            setInputValue,
            sendMessage,
            handleKeyDown,
    } = useGameLogic();

    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return(
        <div>
            <NavBar />
            
            <div className="page-tailwind">
                <div className="bg-blue-100 max-w-5xl overflow-y-auto h-dvh">
                    {messages.map((msg, index) => (
                        <div key={index} className={`message${msg.startsWith('>') ? ' user-command-tailwind' : ''}`}>
                            {msg.split('\n').map((line, i) => (
                                <div key={i}>{line}</div>
                            ))}
                        </div>
                    ))}
                    <div ref={messageEndRef} />
                </div>

                <div>
                    <input
                        id="input-box"
                        className="input-field"
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoComplete='off'
                        placeholder="Enter a command..."
                    />
                    <button className='btn-primary' onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
    )
}