import ExcuseForm from "@/components/ExcuseForm";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-950 p-4">
      <div className="max-w-lg w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Excuse Generator
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Get the perfect excuse for any situation ✨
          </p>
        </div>
        <ExcuseForm />
      </div>
    </main>
  );
}
