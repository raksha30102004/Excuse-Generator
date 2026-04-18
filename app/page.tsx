import ExcuseForm from "@/components/ExcuseForm";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-100 via-pink-50 to-rose-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 p-4">
      {/* Decorative blobs */}
      <div className="fixed top-[-10%] left-[-5%] w-72 h-72 bg-pink-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-5%] w-96 h-96 bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed top-[30%] right-[10%] w-48 h-48 bg-pink-300/20 rounded-full blur-2xl pointer-events-none" />

      <div className="relative max-w-lg w-full bg-white/70 dark:bg-gray-900/80 backdrop-blur-md rounded-3xl shadow-2xl border border-pink-100/50 dark:border-gray-800 p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="text-4xl mb-1">🙈</div>
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 bg-clip-text text-transparent tracking-tight">
            Excuse Generator
          </h1>
          <p className="text-rose-400 dark:text-rose-300/70 text-sm font-medium">
            Get the perfect excuse for any situation ✨
          </p>
        </div>
        <ExcuseForm />
      </div>
    </main>
  );
}
