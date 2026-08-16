"use client"

import { IconCloudUpload, IconList } from "@tabler/icons-react"

import { cn } from "@/lib/utils"
import type { UploadCategory } from "@/lib/upload/categories"
import type { UploadMetadata } from "@/lib/upload/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UploadsProvider } from "./uploads-context"
import { UploadDropzone } from "./upload-dropzone"
import { UploadsList } from "./uploads-list"

export interface UploadsPanelProps {
  category: UploadCategory
  initialItems?: UploadMetadata[]
  folderId?: string | null
  className?: string
}

/** Panel con pestañas Subir / Lista para una categoría, conectado a la API. */
export function UploadsPanel({ category, initialItems, folderId, className }: UploadsPanelProps) {
  return (
    <UploadsProvider category={category} initialItems={initialItems} folderId={folderId}>
      <Tabs defaultValue="upload" className={cn("w-full", className)}>
        <TabsList className="w-full">
          <TabsTrigger value="upload">
            <IconCloudUpload />
            Subir
          </TabsTrigger>
          <TabsTrigger value="list">
            <IconList />
            Lista
          </TabsTrigger>
        </TabsList>
        <TabsContent value="upload" className="pt-2">
          <UploadDropzone />
        </TabsContent>
        <TabsContent value="list" className="pt-2">
          <UploadsList />
        </TabsContent>
      </Tabs>
    </UploadsProvider>
  )
}
