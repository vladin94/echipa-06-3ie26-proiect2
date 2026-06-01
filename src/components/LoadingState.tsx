import { Loader2 } from 'lucide-react';

export default function LoadingState({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <Loader2 className="w-8 h-8 text-amber-700 dark:text-amber-500 animate-spin" />
      <p className="font-accent italic text-stone-500 dark:text-stone-400 text-lg">{message}</p>
    </div>
  );
}
