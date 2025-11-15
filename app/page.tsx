
export default function Home() {
  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-white dark:bg-black">
      <main className="w-full max-w-4xl px-6 md:px-12 py-20 flex flex-col items-center md:items-start gap-6">

        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white text-center md:text-left">
          Khalid Chouhan
        </h1>

        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 text-center md:text-left max-w-xl">
          Frontend Developer | React | Next.js | JavaScript
        </p>

        <div className="flex gap-4 mt-4">
          <button className="px-6 py-3 rounded-xl bg-black text-white dark:bg-white dark:text-black font-medium hover:opacity-80 transition">
            View Portfolio
          </button>

          <button className="px-6 py-3 rounded-xl border border-gray-400 text-gray-700 dark:text-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            Contact Me
          </button>
        </div>

      </main>
    </div>
  );
}
