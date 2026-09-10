import * as React from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/shared/lib/utils";

export interface MediaItem {
  id: string;
  url: string;
  alt?: string;
}

export interface MediaGridProps extends React.HTMLAttributes<HTMLDivElement> {
  items: MediaItem[];
}

export function MediaGrid({ items, className, ...props }: MediaGridProps) {
  const [selectedIdx, setSelectedIdx] = React.useState<number | null>(null);

  if (!items || items.length === 0) return null;

  const count = items.length;

  const openLightbox = (index: number) => setSelectedIdx(index);
  const closeLightbox = () => setSelectedIdx(null);

  const prevImage = () => {
    if (selectedIdx === null) return;
    setSelectedIdx((prev) => (prev! > 0 ? prev! - 1 : items.length - 1));
  };

  const nextImage = () => {
    if (selectedIdx === null) return;
    setSelectedIdx((prev) => (prev! < items.length - 1 ? prev! + 1 : 0));
  };

  return (
    <>
      <div
        className={cn(
          "overflow-hidden rounded-xl border border-border bg-muted/20",
          className
        )}
        {...props}
      >
        {count === 1 && (
          <div
            className="aspect-[16/9] w-full cursor-pointer overflow-hidden"
            onClick={() => openLightbox(0)}
          >
            <img
              src={items[0].url}
              alt={items[0].alt || "Ảnh bài viết"}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
            />
          </div>
        )}

        {count === 2 && (
          <div className="grid grid-cols-2 gap-1 aspect-[16/9]">
            {items.map((item, idx) => (
              <div
                key={item.id}
                className="h-full w-full cursor-pointer overflow-hidden"
                onClick={() => openLightbox(idx)}
              >
                <img
                  src={item.url}
                  alt={item.alt || `Ảnh ${idx + 1}`}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                />
              </div>
            ))}
          </div>
        )}

        {count === 3 && (
          <div className="grid grid-cols-3 gap-1 aspect-[16/9]">
            <div
              className="col-span-2 h-full w-full cursor-pointer overflow-hidden"
              onClick={() => openLightbox(0)}
            >
              <img
                src={items[0].url}
                alt={items[0].alt || "Ảnh chính"}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
              />
            </div>
            <div className="grid grid-rows-2 gap-1 h-full">
              {items.slice(1, 3).map((item, idx) => (
                <div
                  key={item.id}
                  className="h-full w-full cursor-pointer overflow-hidden"
                  onClick={() => openLightbox(idx + 1)}
                >
                  <img
                    src={item.url}
                    alt={item.alt || `Ảnh ${idx + 2}`}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {count >= 4 && (
          <div className="grid grid-cols-2 gap-1 aspect-[16/10]">
            {items.slice(0, 3).map((item, idx) => (
              <div
                key={item.id}
                className="h-full w-full cursor-pointer overflow-hidden"
                onClick={() => openLightbox(idx)}
              >
                <img
                  src={item.url}
                  alt={item.alt || `Ảnh ${idx + 1}`}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                />
              </div>
            ))}
            <div
              className="relative h-full w-full cursor-pointer overflow-hidden"
              onClick={() => openLightbox(3)}
            >
              <img
                src={items[3].url}
                alt={items[3].alt || "Ảnh thứ 4"}
                className="h-full w-full object-cover"
              />
              {count > 4 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 font-bold text-white text-xl backdrop-blur-xs transition-colors hover:bg-black/70">
                  +{count - 3}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {selectedIdx !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Đóng xem ảnh"
          >
            <X className="h-6 w-6" />
          </button>

          {count > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors cursor-pointer"
                aria-label="Ảnh trước"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors cursor-pointer"
                aria-label="Ảnh kế tiếp"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          <div
            className="max-h-[85vh] max-w-[90vw] overflow-hidden rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={items[selectedIdx].url}
              alt={items[selectedIdx].alt || "Ảnh phóng to"}
              className="max-h-[85vh] max-w-[90vw] object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
