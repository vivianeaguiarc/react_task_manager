import { useState } from "react"
import Header from "./Header"

function Tasks() {
  const [inputValue, setInputValue] = useState("teste")
  const [messages, setMessages] = useState([
    "Hello, how can I help you?",
    "What is your name?",
  ])
  function handleButtonClick() {
    setMessages([...messages, inputValue])
  }
  return (
    <div>
      <Header>
        <h1>Add Task</h1>
      </Header>

      <input
        type="text"
        value={inputValue}
        placeholder="Create you task..."
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleButtonClick}>Add Task</button>

      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  )
}
export default Tasks
