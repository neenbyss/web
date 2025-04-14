import { useFormContext, Controller } from 'react-hook-form';
import { TextareaProps, Textarea } from '@/components/ui/textarea';

export const FieldTextarea = ({
  name,
  errorMessage,
  ...props
}: TextareaProps & { name: string }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, formState }) => (
        <Textarea
          value={field.value ?? ''}
          onChange={field.onChange}
          {...props}
          errorMessage={formState.errors[name]?.message?.toString()}
        />
      )}
    />
  );
};
