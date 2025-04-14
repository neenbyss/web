'use client';
import { ComponentProps } from 'react';
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Select,
  SelectSeparator,
} from '@/components/ui/select';

import { Controller, useFormContext } from 'react-hook-form';

export type FieldSelectProps = {
  name: string;
  label?: string;
  placeholder?: string;
  itemsGroup?: {
    groupLabel?: string | React.JSX.Element;
    items: {
      value: string;
      label: string;
    }[];
  }[];
  disabled?: boolean;
} & ComponentProps<typeof SelectTrigger>;

export function FieldSelect({ ...props }: FieldSelectProps) {
  const { name, label, placeholder, itemsGroup, disabled, ...rest } = props;

  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, formState }) => {
        return (
          <Select value={field.value ?? ''} onValueChange={field.onChange} disabled={disabled}>
            <SelectTrigger
              label={label}
              errorMessage={formState.errors[name]?.message?.toString()}
              required={props.required}
              {...rest}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent>
              {itemsGroup?.map(({ groupLabel, items }, i) => (
                <SelectGroup key={i}>
                  {groupLabel && <SelectLabel> {groupLabel} </SelectLabel>}
                  {items.map(({ value, label }, j) => (
                    <SelectItem key={`${i}-${j}`} value={value}>
                      {' '}
                      {label}{' '}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
        );
      }}
    />
  );
}
