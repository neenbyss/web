/* eslint-disable @next/next/no-img-element */
'use client';
import { Image as ImageUI } from "@nextui-org/image";
import { DateIcon } from "@/icons/date-icon";
import { Button } from "../common/button";
import { ArrowRightIcon } from "@/icons/arrow-right-icon";

import dayjs from 'dayjs';
import Link from "next/link";

export type ProjectCardProps = {
    title: string;
    description: string;
    slug: string;
    imageSrc: string;
    date: Date | number;
    tag: string;
    images: string[];
}
export function ProjectCard(props: ProjectCardProps) {

    const {title, description, tag, slug, images, imageSrc, date} = props
    const now = dayjs(new Date(date)).format('DD/MM/YYYY');

    const href = `/portfolio/${slug}`

    return (
        <div className="bg-content1 p-5 rounded-2xl w-full">
            <ImageUI
                alt="PROJECT-IMAGE"
                classNames={{
                    zoomedWrapper: "aspect-video w-full"
                }}
                className="size-full object-cover"
                src={imageSrc}
                loading="lazy"
                width={"100%"}
                isZoomed
            />

            <div className="mt-4 flex flex-col">
                <h2 className="text-xl font-bold uppercase">
                    {title}
                </h2>

                <p className="block pt-1 line-clamp-5 h-20">
                    {description}
                </p>

                <span className="block mt-4 text-secondary"> # {tag} </span>

                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-foreground/15 w-fit mt-4">
                    <DateIcon />
                    {now}
                </span>

                <div className="mt-4 flex justify-end">
                    <Button
                        as={Link}
                        href={href}
                        className='[&[data-hover="true"]_svg]:pl-1'
                        endContent={<ArrowRightIcon className="duration-300" />}
                    >
                        Ver 
                    </Button>
                </div>
            </div>
        </div>
    )
}