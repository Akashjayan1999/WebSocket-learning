"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
require("./App.css");
function App() {
    const [socket, setSocket] = (0, react_1.useState)(null);
    const [message, setMessage] = (0, react_1.useState)("");
    (0, react_1.useEffect)(() => {
        const ws = new WebSocket("ws://localhost:8080");
        ws.onopen = () => {
            console.log("connected");
            setSocket(ws);
        };
        ws.onmessage = (event) => {
            console.log("received: %s", event.data);
            setMessage(event.data);
        };
        ws.onclose = () => {
            console.log("disconnected");
        };
    }, []);
    if (!socket) {
        return <div>Connecting...</div>;
    }
    return (<>
    <input></input>
    <button onClick={() => {
            if (socket) {
                socket.send("Hello from client");
            }
        }}>Send Message</button>
    {message && <div className="message">Message from server: {message}</div>}
      
    </>);
}
exports.default = App;
