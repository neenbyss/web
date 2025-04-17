// hooks/use-server-action.ts
import { useState, useTransition } from 'react';

type StatusType = 'idle' | 'success' | 'error';

type Options = {
  onSuccess?: () => void;
  onError?: () => void;
  onPending?: () => void;
};

export function useServerAction<
  T extends (...args: any[]) => Promise<{ success: boolean; message: string }>,
>(action: T, options?: Options) {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<StatusType>('idle');
  const [message, setMessage] = useState<string>('');

  const execute = (...args: Parameters<T>) => {
    setStatus('idle');
    setMessage('');

    if (options?.onPending) options.onPending();

    startTransition(() => {
      action(...args)
        .then((result) => {
          const wasSuccess = result.success;

          setStatus(wasSuccess ? 'success' : 'error');
          setMessage(result.message);

          if (wasSuccess) {
            options?.onSuccess?.();
          } else {
            options?.onError?.();
          }
        })
        .catch((error) => {
          console.error('[useServerAction] Error:', error);
          setStatus('error');
          setMessage('Ha ocurrido un error inesperado.');

          options?.onError?.();
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
