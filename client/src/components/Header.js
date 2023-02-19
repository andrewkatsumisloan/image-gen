import React from "react";

const Header = () => {
  return (
    <div className="">
      <header className="mt-4">
        <div className="mb-4">
          <p className="text-3xl italic shadow font-[400] w-fit px-20 py-2 rounded-3xl mx-auto bg-gradient-to-r from-orange-400 to-red-700 text-slate-200 font-semibold my-8">
            Text to Image Generator
          </p>
        </div>
        {/* <nav className="flex justify-center">
          <ul className="flex">
            <li className="mr-6">
              <a className="text-blue-500 hover:text-blue-800" href="/">
                Image Generation
              </a>
            </li>
            <li>
              <a className="text-blue-500 hover:text-blue-800" href="/textgen">
                Text Completion
              </a>
            </li>
          </ul>
        </nav> */}
      </header>
    </div>
  );
};

export default Header;
