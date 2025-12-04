/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { Toaster } from "sonner"
import SideBar from "./components/SideBar"
import Tasks from "./components/Tasks"

function App() {
  return (
    <div className="flex">
      <Toaster
        toastOptions={{
          style: {
            color: "#35383e",
          },
        }}
      />
      <SideBar />
      <Tasks />
    </div>
  )
}

export default App
