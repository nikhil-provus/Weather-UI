import { useState, useEffect, useRef } from "react";
import { getClimateResponse } from "../api/aiChat";

export default function ChatPanel({
  city,
  weather,
}: {
  city: string;
  weather: any;
}) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; text: string }[]>(
    [],
  );
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    const aiResponse = await getClimateResponse(input, city, weather);
    setMessages((prev) => [...prev, { role: "ai", text: aiResponse }]);
  };

  return (
    <div className="bento-item chat-tile">
      <span className="stat-label">Climate Assistant</span>
      <div className="messages-container" ref={scrollRef}>
        {messages.length === 0 && (
          <p className="chat-placeholder">
            Ask me about the weather in {city}...
          </p>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`chat-bubble ${m.role}`}>
            {m.text}
          </div>
        ))}
      </div>
      <div className="chat-input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Ask anything..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}
