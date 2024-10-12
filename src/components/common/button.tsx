'use client';
import { extendVariants } from "@nextui-org/system";
import { Button as NextUIButton } from '@nextui-org/button';

export const Button = extendVariants(NextUIButton, {
    variants: {
        isDisabled: {
            true: "opacity-40 cursor-not-allowed",
        },
        placement: {
            start: "justify-start",
            center: "justify-center",
            end: "justify-end"
        },
    },
    defaultVariants: {
        color: "primary",
        radius: "sm",
    },
})

