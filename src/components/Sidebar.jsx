import { Home, Clock, BookOpen, Code, Settings } from "lucide-react"

export default function Sidebar(){

return(

<div className="w-64 bg-[#020617] border-r border-gray-800 p-6">

<h1 className="text-xl font-bold text-blue-400 mb-10">
Code Mentor AI
</h1>

<nav className="space-y-6">

<div className="flex items-center gap-3 cursor-pointer hover:text-blue-400">
<Home size={18}/> Dashboard
</div>

<div className="flex items-center gap-3 cursor-pointer hover:text-blue-400">
<Clock size={18}/> History
</div>

<div className="flex items-center gap-3 cursor-pointer hover:text-blue-400">
<BookOpen size={18}/> Tutorials
</div>

<div className="flex items-center gap-3 cursor-pointer hover:text-blue-400">
<Code size={18}/> Playground
</div>

<div className="flex items-center gap-3 cursor-pointer hover:text-blue-400">
<Settings size={18}/> Settings
</div>

</nav>

</div>

)

}