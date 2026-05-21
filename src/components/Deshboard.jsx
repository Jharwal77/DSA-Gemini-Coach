import { useState, useRef } from "react"

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY

export default function Dashboard() {

const [question,setQuestion] = useState("")
const [response,setResponse] = useState("")
const [loading,setLoading] = useState(false)

const lastRequestRef = useRef(0)

async function askAI() {
  if (loading || !question.trim()) return;

  const now = Date.now();
  // Increase cooldown to 10 seconds for the Free Tier to be safe
  if (now - lastRequestRef.current < 10000) {
    setResponse("Slow down! Please wait about 10 seconds between questions.");
    return;
  }

  lastRequestRef.current = now;
  setLoading(true);
  setResponse("AI is thinking...");

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Explain DSA concept:\n${question}` }] }]
        })
      }
    );

    // Handle Rate Limit specifically
    if (res.status === 429) {
      setResponse("Rate limit hit. Google's free tier is busy. Please try again in 30 seconds.");
      return;
    }

    const data = await res.json();

    if (data.error) {
       throw new Error(data.error.message);
    }

    const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    setResponse(aiText || "AI returned an empty response.");

  } catch (err) {
    setResponse("Connection Error: " + err.message);
  } finally {
    // This runs whether the try succeeds OR the catch runs
    setLoading(false);
  }
}

return(

<div className="flex-1 p-10 text-white">

<h2 className="text-2xl font-bold mb-6">
Ask a DSA Question
</h2>

<div className="bg-slate-800 p-6 rounded-xl">

<textarea
className="w-full bg-slate-900 p-4 rounded-lg h-32 outline-none"
placeholder="Ask about arrays, linked lists, stacks..."
value={question}
onChange={(e)=>setQuestion(e.target.value)}

onKeyDown={(e)=>{
if(e.key === "Enter" && !e.shiftKey){
e.preventDefault()
askAI()
}
}}
/>

<button
onClick={askAI}
disabled={loading}
className="mt-5 w-full bg-purple-600 py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50"
>

{loading ? "Thinking..." : "Ask AI"}

</button>

</div>

<div className="bg-slate-800 mt-8 p-6 rounded-xl">

<h3 className="text-xl mb-4">
Instructor Response
</h3>

<p className="text-gray-300 whitespace-pre-line">
{response || "AI response will appear here"}
</p>

</div>

</div>

)

}