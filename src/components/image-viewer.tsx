import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageViewerProps {
  images: { src: string; alt: string }[];
  initialIndex: number;
  onClose: () => void;
}

export function ImageViewer({
  images,
  initialIndex,
  onClose,
}: ImageViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft")
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
      if (e.key === "ArrowRight")
        setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images.length, onClose]);

  const navigate = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    } else {
      setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center p-4 sm:p-8"
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white hover:bg-white/20"
        onClick={onClose}
      >
        <X className="h-6 w-6" />
        <span className="sr-only">Close</span>
      </Button>

      <div className="relative w-full h-full flex items-center justify-center">
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 sm:left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
          onClick={() => navigate("prev")}
        >
          <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
          <span className="sr-only">Previous image</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 sm:right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
          onClick={() => navigate("next")}
        >
          <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
          <span className="sr-only">Next image</span>
        </Button>

        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            className="max-h-[80vh] max-w-full w-auto h-auto object-contain"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>
      </div>

      <div className="mt-4 bg-black bg-opacity-50 px-4 py-2 rounded-full">
        <p className="text-white text-sm">
          {currentIndex + 1} / {images.length}
        </p>
      </div>
    </motion.div>
  );
}
