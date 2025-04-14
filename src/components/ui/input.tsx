'use client';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { AlertIcon } from '@/icons/alert';

export type InputProps = {
  label?: string;
  errorMessage?: string;
  startContent?: React.JSX.Element;
  endContent?: React.JSX.Element;
  inputClassName?: string;
  classNames?: {
    container?: string;
    input?: string;
  };
} & React.ComponentProps<'input'>;

export const Input = ({
  ref,
  className,
  label,
  startContent,
  endContent,
  errorMessage,
  classNames,
  onChange,
  ...props
}: InputProps) => {
  const [focused, setFocused] = React.useState(false);

  const [length, setLength] = React.useState(props.value?.toString().length);

  const handleLength = React.useCallback((value: number) => {
    setLength(value);
  }, []);

  const onFocus = () => {
    if (!focused) {
      setFocused(true);
      inputRef.current?.focus();
    }
  };
  const onBlur = () => setFocused(false);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleChange = React.useCallback(
    (t: React.ChangeEvent<HTMLInputElement>) => {
      if (props.readOnly) {
        return;
      }
      if (props.disabled) {
        return;
      }
      if (onChange) {
        onChange(t);
      }
      if (props.maxLength) {
        handleLength(t.target.value.length);
      }
    },
    [handleLength, onChange, props.disabled, props.maxLength, props.readOnly],
  );

  React.useImperativeHandle(
    ref,
    () =>
      ({
        focus: onFocus,
        focused: focused,
        ...inputRef.current,
      }) as HTMLInputElement,
  );

  return (
    <div
      className={cn(
        'w-full',
        props.disabled && 'pointer-events-none opacity-60',
        classNames?.container,
      )}
    >
      {label && (
        <label className='mb-1.5 flex w-full max-w-full items-end justify-between gap-3'>
          {' '}
          <span className='flex max-w-full gap-1 overflow-hidden'>
            <span className='text-foreground truncate'>{label}</span>
            {props.required && <span className='text-danger'> * </span>}
          </span>{' '}
          {props.maxLength && (
            <span className='text-foreground/50 text-xs text-nowrap'>
              {' '}
              {length} / {props.maxLength}{' '}
            </span>
          )}
        </label>
      )}
      <div
        onClick={() => {
          inputRef.current?.focus();
        }}
        className={cn(
          'rounded-md transition-all duration-150',
          'flex items-center gap-2',
          'bg-default hover:bg-default/80 w-full max-w-full p-3',
          'outline-ring outline-1',
          'data-[focus=true]:bg-default data-[focus=true]:ring-primary/50 data-[focus=true]:ring-2 data-[focus=true]:outline-none',
          'data-[error=true]:!outline-danger/20 data-[error=true]:data-[focus=true]:!outline-danger [&_*]:data-[error=true]:!text-danger',
          className,
        )}
        data-disabled={props.disabled}
        data-focus={focused}
        data-error={Boolean(errorMessage)}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {startContent}
        <input
          ref={inputRef}
          className={cn(
            'placeholder:text-foreground/50 data-[error=true]:placeholder:!text-danger/60 w-full bg-transparent text-sm transition outline-none',
            props.disabled && 'pointer-events-none',
            classNames?.input,
          )}
          onChange={handleChange}
          data-error={Boolean(errorMessage)}
          {...props}
        />
        {endContent}
      </div>
      {errorMessage && (
        <span className='text-danger mt-1.5 flex items-center gap-1.5 text-xs font-normal'>
          {' '}
          <AlertIcon className='size-3.5' /> {errorMessage}{' '}
        </span>
      )}
    </div>
  );
};
