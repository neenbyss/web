'use client'
import { cn } from "@nextui-org/theme"
import { Loader } from "../common/loader"

export const Loading = ({className}: {
    className?: string
}) => {
    return (
        <div className={cn("flex", className)}>
            <div className="m-auto flex flex-col items-center gap-4">
                <Loader className="size-12" />
                <span> Carganddo... </span>
            </div>
        </div>
    )
}