import Sidebar from "./components/Sidebar"
import Deshboard from "./components/Deshboard"

function App() {
  return (
    <div className="flex min-h-screen text-white">
      <Sidebar/>
      <Deshboard/>
    </div>
  )
}

export default App