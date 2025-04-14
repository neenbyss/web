'use client';
import { useFormContext, Controller } from 'react-hook-form';
import { InputProps, Input } from '@/components/ui/input';

export const FieldInput = ({ name, ...props }: InputProps & { name: string }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, formState }) => {
        return (
          <Input
            value={field.value ?? ''}
            onChange={field.onChange}
            errorMessage={formState.errors[name]?.message?.toString()}
            {...props}
          />
        );
      }}
    />
  );
};
