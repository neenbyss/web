'use client';
import { NeenbyssIcon } from "@/icons/neenbyss-icon";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/breadcrumbs";
import { cn } from "@nextui-org/theme";
import { usePathname, useRouter } from "next/navigation";

const parsePathame = (pathname: string) => {
    const parseName = {
      route: "NameRoute",
      "services-order": "Orden de servicio",
      "contact": "Contáctanos",
      "faqs": "Preguntas Frecuentes"
    };
    const split_slice = pathname.split("/").slice(1);
    const result = split_slice.map((segment) => ({
      href: `/${segment}`,
      label: parseName[segment as keyof typeof parseName] || segment,
    }));
  
    return result;
};

type Props = {
    className?: string;
    removeStyle?: boolean;
}
export function BreadCrumb({className, removeStyle}: Props) {

    const pathname = usePathname();
    const route = useRouter();

    return (
        <Breadcrumbs className={cn(className, removeStyle ? "" : "bg-white/15 w-fit px-4 py-2 rounded-lg ")}>
            <BreadcrumbItem 
                onPress={() => void route.push("/")}
                className="capitalize"
                classNames={{
                     item: "!text-foreground-foreground/80"
                }}
                startContent={
                    <NeenbyssIcon className="size-5" />
                }
            >
                Neenbyss
            </BreadcrumbItem>
            {parsePathame(pathname).map(({ href, label }, i) => (
                <BreadcrumbItem
                key={`${i}-${href}`}
                onPress={() => void route.push(href)}
                className="capitalize"
                >
                {label}
                </BreadcrumbItem>
            ))}
        </Breadcrumbs>
    )
}