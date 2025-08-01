// hooks/use-server-action.ts
import { useState, useTransition } from 'react';

type StatusType = 'idle' | 'success' | 'error';

type ResultType = { status: StatusType; message: string };

type Options = {
  onSuccess?: (data: ResultType) => void;
  onError?: (data: ResultType) => void;
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

          const _status = wasSuccess ? 'success' : 'error';
          const _msg = result.message;

          setStatus(_status);
          setMessage(_msg);

          if (wasSuccess) {
            options?.onSuccess?.({ status: _status, message: _msg });
          } else {
            options?.onError?.({ status: _status, message: _msg });
          }
        })
        .catch((error) => {
          console.error('[useServerAction] Error:', error);
          const _status = 'error';
          const _msg = `Ha ocurrido un error inesperado. ${error}`;
          setStatus(_status);
          setMessage(`Ha ocurrido un error inesperado. ${error}`);

          options?.onError?.({ status: _status, message: _msg });
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
