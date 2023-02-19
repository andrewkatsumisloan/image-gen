import React, { useState, useEffect } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import SizeButtonGroup from "./SizeButtonGroup";

const ImageGen = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState(null);
  const [imageSize, setImageSize] = useState("small");
  const [submitted, setSubmitted] = useState("");
  const [base64String, setBase64String] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    // setOutput(localStorage.getItem("output"));
    // console.log("This is the output set from localstorage...: ", output);

    setSubmitted(localStorage.getItem("submitted"));
    console.log("This is the submitted set from localstorage...: ", submitted);

    setBase64String(localStorage.getItem("base64String"));
  }, []);

  useEffect(() => {
    if (base64String) {
      //   console.log(base64String);
    }
  }, [base64String]);

  // Render page when output is updated
  useEffect(() => {
    console.log("Output updated: ", output);
  }, [output]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const mappedSize = {
      small: "256x256",
      medium: "512x512",
      large: "1024x1024",
    };

    console.log("Submit button clicked, input: ", input);

    const payload = {
      input: input,
      size: mappedSize[imageSize],
    };

    try {
      setIsLoading(true);
      const response = await axios.post("/imagegen", payload);
      setIsLoading(false);
      console.log("Response: ", response);
      setBase64String(response["data"]["base64"]);
      localStorage.setItem("base64String", response["data"]["base64"]);
      console.log("This is the base64string: ", base64String);
      setSubmitted(input);
      localStorage.setItem("submitted", input);
      setInput("");
      setOutput(response["data"]["data"][0]["url"]);
      localStorage.setItem("output", response["data"]["data"][0]["url"]);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const sizeHandler = (e) => {
    e.preventDefault();
    // Get Button ID
    const size = e.target.id;
    setImageSize(size);
  };

  const downloadHandler = (e) => {
    e.preventDefault();
    console.log("Download button clicked");

    // Download base64string as image file
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "image/png" });
    saveAs(blob, "image.png");
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    const val = e.target.value;
    setPassword(val);
  };

  //   This is basically fake auth that anyone can see on the frontend lol
  const handleSubmit = () => {
    const val = password;
    console.log("auth attempteed");
    if (val === "thiscostsmetwocents") {
      setIsAuthenticated(true);
    }
  };

  return (
    // Render app if user is authenticated, otherwise render login page
    <div>
      {isAuthenticated ? (
        <div className="w-[full] h-[45%]">
          <form onSubmit={submitHandler}>
            <div className="w-3/5 bg-blue mt-4 rounded-2xl mx-auto md:w-4/5 sm:w-full">
              <textarea
                className="w-4/5 resize-none shadow-xl text-start placeholder-[#57494997] text-slate-700 py-12 px-16 md:px-8 md:py-8 mt-[2%] mb-[1.5%] rounded-2xl text-lg focus:outline-none"
                placeholder="Interact with OpenAI's DALL-E image generation model."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <SizeButtonGroup sizeHandler={sizeHandler} size={imageSize} />
            </div>
            <button className="bg-gradient-to-r from-red-400 to-orange-600 text-slate-100 shadow-md rounded-xl px-6 py-2 mx-2 mb-8 mt-4">
              Generate Image!
            </button>
          </form>

          {isLoading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-slate-100">
                Loading!
              </div>
            </div>
          ) : (
            submitted &&
            base64String && (
              <div>
                <div>
                  <p className="text-xl text-slate-100 italic font-[400] bg-gradient-to-r from-orange-300 to-red-700 w-fit mx-auto px-8 py-2 rounded-lg ">
                    {submitted}
                  </p>
                </div>
                <div className="flex-col my-4">
                  <img
                    className="rounded-md w-[70%] mx-auto"
                    src={`data:image/png;base64,${base64String}`}
                    alt="OPEN AI RESPONSE"
                  />
                  <button
                    className="mt-4 text-3xl mb-8 bg-gradient-to-r from-orange-400 to-red-700 text-slate-100 shadow-md px-4 py-2 rounded-lg"
                    onClick={(e) => downloadHandler(e)}
                  >
                    Download
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      ) : (
        <div>
          <p className="text-xl mx-auto text-slate-100 italic font-[400] bg-gradient-to-r from-orange-300 to-red-700 w-fit px-8 py-2 rounded-3xl ">
            What's the secret password, dumbass?
          </p>
          <form onSubmit={handleSubmit}>
            <input
              className="rounded-2xl p-3"
              placeholder="Password please retard"
              value={password}
              onChange={handlePasswordChange}
            />
            <button
              type="submit"
              className="rounded-md text-xl mx-4 mt-4 px-6 py-1 bg-slate-400 text-slate-50"
            >
              Enter
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ImageGen;
