import React, { useState } from "react";
import axios from "axios";

export default function UserInterface() {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");
  const [endpoint, setEndpoint] = useState("top_band");

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`http://localhost:8000/${endpoint}`, {
        text: text,
      });
      setOutput(res.data.output || JSON.stringify(res.data, null, 2));
    } catch (err) {
      setOutput("❌ Error: " + err.message);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Kannada Content Generator</h1>
      
      <select
        className="border p-2 rounded w-full"
        onChange={(e) => setEndpoint(e.target.value)}
      >
        <option value="top_band">Top Band</option>
        <option value="package_writer">Package Writer</option>
        <option value="speed_50">Speed 50</option>
      </select>

      <textarea
        className="border w-full p-3 rounded"
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter Kannada sentence"
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handleSubmit}
      >
        Generate
      </button>

      <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap">
        {output}
      </pre>
    </div>
  );
}
