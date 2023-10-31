import React, { useState } from "react";
import { Configuration, OpenAIApi } from "openai";

import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/css/openai.css';

function OpenAi() {
    const {VITE_OPEN_AI_API_KEY} = import.meta.env;
    const configuration = new Configuration({
        apiKey: VITE_OPEN_AI_API_KEY,
    });

    const openAi = new OpenAIApi(configuration);

    const [prompt, setPrompt] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        try {
            const response = await openAi.createCompletion({
                model: "text-davinci-003",
                // model: "gpt-3.5-turbo",
                prompt: prompt,
                temperature: 0.5,
                max_tokens: 100,
            });
            setResult(response.data.choices[0].text);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    return (
        <main className="main-openai mt-3">
            <div className="w-2/4 mx-auto">
                <textarea
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Write your prompt.."
                    className="form-control"
                ></textarea><br />

                <div>
                    <button
                        onClick={handleClick}
                        disabled={loading || prompt.length === 0}
                        className="btn-openai"
                    >
                        {loading ? "Generating..." : "Generate"}
                    </button>
                </div><br />

                <p className="result">{result}</p>
            </div>
        </main>
    );
}

export default OpenAi