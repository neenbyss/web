import { cn } from "@/lib/utils"
import { ComponentProps } from "react"
import { TextStyle } from "./text-style"
import { Bold } from "./bold"
import { Italic } from "./italic"
import { Strike } from "./strike"
import { Underline } from "./underline"
import { Code } from "./code"
import { LinkButton } from "./link"
import { Superscript } from "./superscript"
import { Subscript } from "./subscript"
import { ColorMenu } from "./color"
import { TextTransform } from "./text-transform"
import { Align } from "./align"
import { ImageButton } from "./image"
import { EmbedButton } from "./embed"
import { FileButton } from "./file"
import { TableButton } from "./table"
import { SeparatorButton } from "./separator"
import { Blockquote } from "./blockquote"
import { BulletList } from "./bullet-list"
import { OrderedList } from "./ordered-list"
import { TaskList } from "./task-list"
import { Undo } from "./undo"
import { Redo } from "./redo"

export function Toolbar({ className, ...props }: ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-wrap gap-0.5 items-center", className)} {...props}>
      <Undo />
      <Redo />
      <div className="w-px h-5 bg-border mx-0.5" />
      <TextStyle />
      <div className="w-px h-5 bg-border mx-0.5" />
      <Bold />
      <Italic />
      <Strike />
      <Underline />
      <Code />
      <LinkButton />
      <div className="w-px h-5 bg-border mx-0.5" />
      <Superscript />
      <Subscript />
      <div className="w-px h-5 bg-border mx-0.5" />
      <ColorMenu />
      <TextTransform />
      <div className="w-px h-5 bg-border mx-0.5" />
      <Align />
      <div className="w-px h-5 bg-border mx-0.5" />
      <Blockquote />
      <BulletList />
      <OrderedList />
      <TaskList />
      <div className="w-px h-5 bg-border mx-0.5" />
      <ImageButton />
      <EmbedButton />
      <FileButton />
      <TableButton />
      <SeparatorButton />
    </div>
  )
}
