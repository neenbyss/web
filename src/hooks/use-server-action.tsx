// hooks/use-server-action.ts
import { useState, useTransition } from 'react';

type StatusType = 'idle' | 'success' | 'error';

export function useServerAction<
  T extends (...args: any[]) => Promise<{ success: boolean; message: string }>,
>(action: T) {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<StatusType>('idle');
  const [message, setMessage] = useState<string>('');

  const execute = (...args: Parameters<T>) => {
    setStatus('idle');
    setMessage('');

    startTransition(() => {
      action(...args)
        .then((result) => {
          setStatus(result.success ? 'success' : 'error');
          setMessage(result.message);
        })
        .catch((error) => {
          console.error('[useServerAction] Error:', error);
          setStatus('error');
          setMessage('Ha ocurrido un error inesperado.');
        });
    });
  };

  return {
    execute,
    isPending,
    status,
    message,
    isSuccess: status === 'success',
    isError: status === 'error',
  };
}
