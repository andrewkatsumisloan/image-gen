import React, { useState, useEffect } from "react";
import axios from "axios";
import TextCompleteOutput from "./TextCompleteOutput";

const TextCompleteEntry = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [submitted, setSubmitted] = useState("");

  // Render page when output is updated
  useEffect(() => {
    console.log("Output updated: ", output);
  }, [output]);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("Submit button clicked, input: ", input);

    try {
      const response = await axios.post("/textgen", { input: input });
      console.log("Response: ", response);
      setSubmitted(input);
      setInput("");
      setOutput(response.data.choices[0].text);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="w-[full] h-[45%]">
      <form onSubmit={submitHandler}>
        <input
          className="w-1/3 h-[12.5%] border-2 border-gray-300 bg-white h-10 px-4 my-[5%] rounded-2xl text-sm focus:outline-none"
          placeholder="Interact with OpenAI's Ada language model."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="bg-red-200 border-2 text-slate-600 rounded-xl px-6 py-2 mx-2">
          Generate
        </button>
      </form>
      <div>
        {/* Text input */}
        <h2> {submitted} </h2>
      </div>
      <TextCompleteOutput output={output} />

      {/* <div>
        <img src="https://oaidalleapiprodscus.blob.core.windows.net/private/org-9MkJkx8JLPjvNrmF2EJqSOhz/user-xecZG378uhqMnzlbUk2qWzBc/img-7u93jdy7wsDT8rTiKDhcrtSu.png?st=2023-02-18T06%3A21%3A12Z&se=2023-02-18T08%3A21%3A12Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-02-17T19%3A33%3A57Z&ske=2023-02-18T19%3A33%3A57Z&sks=b&skv=2021-08-06&sig=CKQRcf9vJOp/6hVGPS9UtFczyGPZ36fuAZKS3Dg3WCw%3D" />
      </div> */}
      {/* Render image at S3 endpoint */}
      {/* <img
        src="https://aks-textgen.s3.us-west-1.amazonaws.com/PalindromePartitioning"
        alt="Image from S3"
      /> */}
    </div>
  );
};

export default TextCompleteEntry;
