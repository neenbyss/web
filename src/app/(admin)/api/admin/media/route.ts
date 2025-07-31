import { mkdir, writeFile, readdir, readFile, unlink } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import { existsSync } from 'fs';
import path from 'path';
import sharp from 'sharp';
import { ImageMetadata, ImagesDatabase } from '@/app/(admin)/blog-editor/_tiptap/types/image';

const config = {
  maxUploadSize: 8 * 1024 * 1024, // 8MB
  allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  storeMetadata: 'json', // o 'db'
};

const uploadsDir = path.join(process.cwd(), 'public/uploads');
const IMAGES_DB_PATH = path.join(uploadsDir, 'images-database.json');

function getExtension(fileName: string): string {
  return fileName.split('.').pop()?.toLowerCase() || '';
}

function isImage(file: File): boolean {
  return config.allowedImageTypes.includes(file.type);
}

async function getUniqueFilename(base: string, ext: string): Promise<string> {
  const files = await readdir(uploadsDir);
  let name = base;
  let counter = 1;

  while (files.includes(`${name}.${ext}`)) {
    name = `${base}_${counter}`;
    counter++;
  }

  return `${name}.${ext}`;
}

async function compressImage(
  buffer: Buffer,
  format: string,
): Promise<{ buffer: Buffer; ext: string }> {
  const image = sharp(buffer);

  switch (format.toLowerCase()) {
    case 'jpeg':
    case 'jpg':
      const jpegBuffer = await image.jpeg({ quality: 85, progressive: true }).toBuffer();
      return { buffer: jpegBuffer, ext: 'jpg' };

    case 'png':
      const pngBuffer = await image.png({ compressionLevel: 8, progressive: true }).toBuffer();
      return { buffer: pngBuffer, ext: 'png' };

    case 'webp':
      const webpBuffer = await image.webp({ quality: 85, effort: 4 }).toBuffer();
      return { buffer: webpBuffer, ext: 'webp' };

    case 'gif':
      const gifBuffer = await image.gif().toBuffer();
      return { buffer: gifBuffer, ext: 'gif' };

    case 'avif':
      const avifBuffer = await image.avif({ quality: 85, effort: 4 }).toBuffer();
      return { buffer: avifBuffer, ext: 'avif' };

    default:
      const fallback = await image.webp({ quality: 85, effort: 4 }).toBuffer();
      return { buffer: fallback, ext: 'webp' };
  }
}

async function loadImagesDatabase(): Promise<ImagesDatabase> {
  try {
    if (existsSync(IMAGES_DB_PATH)) {
      const content = await readFile(IMAGES_DB_PATH, 'utf8');
      return JSON.parse(content);
    }
  } catch (error) {
    console.warn('Error al leer la base de datos de imágenes:', error);
  }

  return {
    images: [],
    lastUpdated: new Date().toISOString(),
    totalImages: 0,
  };
}

async function saveImagesDatabase(database: ImagesDatabase): Promise<void> {
  database.lastUpdated = new Date().toISOString();
  database.totalImages = database.images.length;

  await writeFile(IMAGES_DB_PATH, JSON.stringify(database, null, 2), 'utf8');
}

async function addImageToDatabase(metadata: ImageMetadata): Promise<void> {
  const database = await loadImagesDatabase();

  // Verificar si la imagen ya existe (por nombre)
  const existingIndex = database.images.findIndex((img) => img.name === metadata.name);

  if (existingIndex >= 0) {
    // Actualizar imagen existente
    database.images[existingIndex] = metadata;
  } else {
    // Agregar nueva imagen al inicio del array (más recientes primero)
    database.images.unshift(metadata);
  }

  await saveImagesDatabase(database);
}

async function removeImageFromDatabase(imageName: string): Promise<boolean> {
  const database = await loadImagesDatabase();
  const initialLength = database.images.length;

  database.images = database.images.filter((img) => img.name !== imageName);

  if (database.images.length < initialLength) {
    await saveImagesDatabase(database);
    return true;
  }

  return false;
}

// Función para migrar JSONs individuales al nuevo formato (ejecutar una vez)
async function migrateOldJsonFiles(): Promise<void> {
  try {
    const files = await readdir(uploadsDir);
    const jsonFiles = files.filter(
      (file) => file.endsWith('.json') && file !== 'images-database.json',
    );

    if (jsonFiles.length === 0) return;

    const database = await loadImagesDatabase();

    for (const jsonFile of jsonFiles) {
      try {
        const jsonPath = path.join(uploadsDir, jsonFile);
        const data = await readFile(jsonPath, 'utf8');
        const metadata = JSON.parse(data);

        // Verificar si ya existe en la base de datos
        const exists = database.images.some((img) => img.name === metadata.name);
        if (!exists) {
          database.images.push(metadata);
        }

        // Eliminar el archivo JSON individual
        await unlink(jsonPath);
      } catch (error) {
        console.warn(`Error al migrar ${jsonFile}:`, error);
      }
    }

    await saveImagesDatabase(database);
    console.log(`Migración completada: ${jsonFiles.length} archivos procesados`);
  } catch (error) {
    console.warn('Error durante la migración:', error);
  }
}

export async function GET(req: NextRequest) {
  await mkdir(uploadsDir, { recursive: true });

  // Migrar archivos JSON individuales si existen
  await migrateOldJsonFiles();

  const database = await loadImagesDatabase();

  // Opcional: agregar paginación
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get('page') || '1');
  const limit = parseInt(url.searchParams.get('limit') || '50');
  const search = url.searchParams.get('search') || '';

  let filteredImages = database.images;

  // Filtrar por búsqueda si se proporciona
  if (search) {
    filteredImages = database.images.filter((img) =>
      img.name.toLowerCase().includes(search.toLowerCase()),
    );
  }

  // Paginación
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedImages = filteredImages.slice(startIndex, endIndex);

  return NextResponse.json({
    data: paginatedImages,
    pagination: {
      page,
      limit,
      total: filteredImages.length,
      totalPages: Math.ceil(filteredImages.length / limit),
    },
    metadata: {
      lastUpdated: database.lastUpdated,
      totalImages: database.totalImages,
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'Archivo no válido' }, { status: 400 });
    }

    if (!isImage(file)) {
      return NextResponse.json({ error: 'Tipo de archivo no permitido' }, { status: 400 });
    }

    if (file.size > config.maxUploadSize) {
      return NextResponse.json({ error: 'Archivo demasiado grande' }, { status: 413 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const originalExt = getExtension(file.name);
    const nameBase = file.name.replace(/\.[^/.]+$/, '').replaceAll(' ', '_');

    const { buffer: optimized, ext: finalExt } = await compressImage(buffer, originalExt);
    const uniqueName = await getUniqueFilename(nameBase, finalExt);
    const filepath = path.join(uploadsDir, uniqueName);

    await mkdir(uploadsDir, { recursive: true });
    await writeFile(filepath, optimized);

    const metadata = await sharp(optimized).metadata();
    const meta: ImageMetadata = {
      url: `/uploads/${uniqueName}`,
      name: uniqueName,
      width: metadata.width || 0,
      height: metadata.height || 0,
      sizeKB: Math.round(optimized.length / 1024),
      date: new Date().toISOString(),
      metadata: {},
    };

    if (config.storeMetadata === 'json') {
      // Agregar al archivo JSON único en lugar de crear archivos individuales
      await addImageToDatabase(meta);
    } else if (config.storeMetadata === 'db') {
      console.log('[DB] Guardar metadata:', meta);
      // Aquí puedes usar Prisma u otro ORM
    }

    return NextResponse.json({ data: meta }, { status: 200, statusText: 'Creado Exitosamente' });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Error al subir la imagen' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, metadata: newMetadata } = body;

    if (!name) {
      return NextResponse.json({ error: 'Nombre de imagen requerido' }, { status: 400 });
    }

    const database = await loadImagesDatabase();
    const imageIndex = database.images.findIndex((img) => img.name === name);

    if (imageIndex === -1) {
      return NextResponse.json({ error: 'Imagen no encontrada' }, { status: 404 });
    }

    // Actualizar metadata
    database.images[imageIndex].metadata = {
      ...database.images[imageIndex].metadata,
      ...newMetadata,
    };

    await saveImagesDatabase(database);

    return NextResponse.json(
      {
        data: database.images[imageIndex],
      },
      { status: 200, statusText: 'Metadata actualizada exitosamente' },
    );
  } catch (error) {
    console.error('Error al actualizar metadata:', error);
    return NextResponse.json({ error: 'Error al actualizar la metadata' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const name = body.name;

    if (!name) {
      return NextResponse.json({ error: 'Nombre de imagen requerido' }, { status: 400 });
    }

    const imagePath = path.join(uploadsDir, name);

    // Eliminar archivo físico
    try {
      await unlink(imagePath);
    } catch (err) {
      return NextResponse.json({ error: 'Archivo no encontrado' }, { status: 404 });
    }

    // Eliminar de la base de datos JSON
    const removed = await removeImageFromDatabase(name);

    if (!removed) {
      return NextResponse.json(
        { error: 'Imagen no encontrada en la base de datos' },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { data: true },
      { status: 200, statusText: 'Eliminado Correctamente' },
    );
  } catch (error) {
    console.error('Error al eliminar imagen:', error);
    return NextResponse.json({ error: 'Error al eliminar la imagen' }, { status: 500 });
  }
}
