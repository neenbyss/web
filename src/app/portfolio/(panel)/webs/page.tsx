'use client';

import { usePortfolio } from "@/store/portfolio-store";

export default function AllPortfolio() {

    const { search, mode_content } = usePortfolio();
    
    return (
        <div className="h-[1000px] [&_span]:block">
            WEBS

            <span>
                Buscar: {search}
            </span>
            <span>
                Modo: {mode_content}
            </span>
        </div>
    )
}