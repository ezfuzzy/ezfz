import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <div className="text-center inline-block mb-8">
          <a href="https://github.com/ezfuzzy" target="_blank" rel="noopener noreferrer">
            <img src="/images/ezfuzzy.png" alt="Fuzzy Logo" className="mx-auto w-96" />
          </a>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mt-8">
          {/* Omok Game */}
          <li className="list-none">
            <a
              href="/omok"
              className="block border-2 border-green-900 rounded-lg p-4 hover:shadow-2xl hover:scale-105 transform transition duration-300 ease-in-out min-h-[300px] flex flex-col justify-between"
            >
              <span className="block flex-grow mb-2">
                <img src="/images/omok-thumbnail.png" alt="Omok Thumbnail" className="w-full h-auto rounded" />
              </span>
              <span className="block text-center text-lg font-semibold mt-auto">Omok</span>
            </a>
          </li>

          {/* Tic Tac Toe Game */}
          <li className="list-none">
            <a
              href="/tictactoe"
              className="block border-2 border-green-900 rounded-lg p-4 hover:shadow-2xl hover:scale-105 transform transition duration-300 ease-in-out min-h-[300px] flex flex-col justify-between"
            >
              <span className="block flex-grow mb-2">
                <img
                  src="/images/tictactoe-thumbnail.png"
                  alt="Tic Tac Toe Thumbnail"
                  className="w-full h-auto rounded"
                />
              </span>
              <span className="block text-center text-lg font-semibold mt-auto">Tic Tac Toe</span>
            </a>
          </li>

          {/* CatchMind Game */}
          <li className="list-none">
            <a
              href="/catchMind"
              className="block border-2 border-green-900 rounded-lg p-4 hover:shadow-2xl hover:scale-105 transform transition duration-300 ease-in-out min-h-[300px] flex flex-col justify-between"
            >
              <span className="block flex-grow mb-2">
                <img src="/images/ezfz.png" alt="CatchMind Thumbnail" className="w-full h-auto rounded" />
              </span>
              <span className="block text-center text-lg font-semibold mt-auto">CatchMind</span>
            </a>
          </li>

          {/* Graph Visualizer */}
          <li className="list-none">
            <a
              href="/graph-visualizer"
              className="block border-2 border-green-900 rounded-lg p-4 hover:shadow-2xl hover:scale-105 transform transition duration-300 ease-in-out min-h-[300px] flex flex-col justify-between"
            >
              <span className="block flex-grow mb-2">
                <img
                  src="/images/graph-visualizer-thumbnail.png"
                  alt="Graph Visualizer Thumbnail"
                  className="w-full h-auto rounded"
                />
              </span>
              <span className="block text-center text-lg font-semibold mt-auto">Graph Visualizer</span>
            </a>
          </li>

          {/* Memory Allocate Simulator */}
          <li className="list-none">
            <a
              href="/memory-simulator"
              className="block border-2 border-green-900 rounded-lg p-4 hover:shadow-2xl hover:scale-105 transform transition duration-300 ease-in-out min-h-[300px] flex flex-col justify-between"
            >
              <span className="block flex-grow mb-2">
                <img src="/images/ezfz.png" alt="Memory Simulator Thumbnail" className="w-full h-auto rounded" />
              </span>
              <span className="block text-center text-lg font-semibold mt-auto">Memory Simulator</span>
            </a>
          </li>

          {/* Matrix Simulator */}
          <li className="list-none">
            <a
              href="/memory-simulator"
              className="block border-2 border-green-900 rounded-lg p-4 hover:shadow-2xl hover:scale-105 transform transition duration-300 ease-in-out min-h-[300px] flex flex-col justify-between"
            >
              <span className="block flex-grow mb-2">
                <img src="/images/ezfz.png" alt="Matrix Simulator Thumbnail" className="w-full h-auto rounded" />
              </span>
              <span className="block text-center text-lg font-semibold mt-auto">Matrix Simulator</span>
            </a>
          </li>

          {/* Matrix Simulator */}
          <li className="list-none">
            <a
              href="/memory-simulator"
              className="block border-2 border-green-900 rounded-lg p-4 hover:shadow-2xl hover:scale-105 transform transition duration-300 ease-in-out min-h-[300px] flex flex-col justify-between"
            >
              <span className="block flex-grow mb-2">
                <img src="/images/ezfz.png" alt="Thumbnail" className="w-full h-auto rounded" />
              </span>
              <span className="block text-center text-lg font-semibold mt-auto">Matrix Simulator</span>
            </a>
          </li>
        </div>{" "}
        {/* end of item div */}
      </div>
    </div>
  );
};

export default Home;
