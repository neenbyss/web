'use client';
import {
    Dropdown as NextUIDropdown,
    DropdownMenu as NextUIDropdownMenu,
    DropdownItem as NextUIDropdownItem, 
    DropdownTrigger as NextUIDropdownTrigger,
    type DropdownProps
} from '@nextui-org/dropdown';
import { HTMLMotionProps } from "framer-motion";
import { cn } from "@nextui-org/theme";

const motionProps : HTMLMotionProps<"div"> = {
    initial: { opacity: 0, y: -8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
    transition: { duration: 0.3, ease: "circInOut" },
}

export const Dropdown = (props: DropdownProps) => {
    const {
        motionProps: motion, 
        className,
        shouldBlockScroll,
        ...rest
    } = props;

    return (
        <NextUIDropdown 
            motionProps={motion ?? motionProps} 
            className={cn(className, "shadow-none border border-foreground/5")}
            shouldBlockScroll={shouldBlockScroll ?? false}
            {...rest} 
        />
    )
}

export const DropdownMenu = NextUIDropdownMenu;
export const DropdownItem = NextUIDropdownItem;
export const DropdownTrigger = NextUIDropdownTrigger;

