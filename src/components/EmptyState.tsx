import { Inbox } from 'lucide-react';

export default function EmptyState({ message = 'No content found.' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <Inbox className="w-10 h-10 text-stone-300 dark:text-stone-600" />
      <p className="font-accent italic text-stone-400 dark:text-stone-500 text-lg">{message}</p>
    </div>
  );
}
