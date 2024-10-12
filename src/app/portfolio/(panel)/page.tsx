import { ProjectCard } from "@/components/cards/project-card";
import type { PortofolioMetadata } from "@/types/portfolio-metadata";
import { getAllMDX } from "@/utils/getMdx";

export default async function AllPortfolio() {

  const all = await getAllMDX<PortofolioMetadata>("/src/app/portfolio/_mdx");


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      {all.map(({img, url, date, ...rest},i) =>
        <ProjectCard
          key={i}
          date={new Date(date)}
          imageSrc={img}
          {...rest}
        />
      )}
    </div>
  );
}
