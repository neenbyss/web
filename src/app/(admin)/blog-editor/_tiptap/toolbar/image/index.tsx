import { MediaProvider } from './provider';
import { ImageMain } from './image';

export function InsertImage() {
  return (
    <MediaProvider>
      <ImageMain />
    </MediaProvider>
  );
}
