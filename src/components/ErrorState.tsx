import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({ message = 'Something went wrong.', onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-6">
      <div className="text-center">
        <AlertTriangle className="w-10 h-10 text-amber-600 mx-auto mb-4" />
        <h3 className="font-display text-xl font-bold text-stone-900 dark:text-stone-100 mb-2">Unable to load content</h3>
        <p className="text-stone-500 dark:text-stone-400 text-sm max-w-xs mx-auto font-body">{message}</p>
        <p className="text-stone-400 dark:text-stone-500 text-xs mt-2 font-body">Showing fallback content instead.</p>
      </div>
      {onRetry && (
        <button onClick={onRetry} className="btn-outline">
          <RefreshCw size={14} />
          Try again
        </button>
      )}
    </div>
  );
}
