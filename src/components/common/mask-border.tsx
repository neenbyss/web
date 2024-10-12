"use client";
import { cn } from "@nextui-org/theme";

type AsProp<T extends React.ElementType> = {
  as?: T;
} & React.ComponentPropsWithoutRef<T>;

type MaskProps<T extends React.ElementType> = AsProp<T> & {
  children: React.ReactNode;
};

export function MaskBorder<T extends React.ElementType = "div">({
  as,
  className,
  ...rest
}: MaskProps<T>) {
  const Component = as || "div";

  return (
    <>
      <style jsx global>
        {`
          
          .__mask_border {
            mask-image: linear-gradient(
              to right,
              transparent 0%,
              black 25%,
              black 75%,
              transparent 100%
            );
            -webkit-mask-image: linear-gradient(
              to right,
              transparent 0%,
              black 25%,
              black 75%,
              transparent 100%
            );
          }
        `}
      </style>
      <Component className={cn("__mask_border", className)} {...rest} />

    </>
  );
}
