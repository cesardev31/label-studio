/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Image {
  src: string;
  alt: string;
  category: string;
}

const categories = ["Todas", "Alturas", "Autos", "Banglain", "Carton"];

const imageImports = {
  alturas: Object.entries(
    import.meta.glob("@/assets/Gallery/Alturas/*.{jpg,png,jpeg,webp}", {
      eager: true,
    })
  ),
  autos: Object.entries(
    import.meta.glob("@/assets/Gallery/Autos/*.{jpg,png,jpeg,webp}", {
      eager: true,
    })
  ),
  banglain: Object.entries(
    import.meta.glob("@/assets/Gallery/Banglain/*.{jpg,png,jpeg,webp}", {
      eager: true,
    })
  ),
  carton: Object.entries(
    import.meta.glob("@/assets/Gallery/Carton/*.{jpg,png,jpeg,webp}", {
      eager: true,
    })
  ),
};

export function ProjectGallery() {
  const [images, setImages] = useState<Image[]>([]);
  const [visibleImages, setVisibleImages] = useState<Image[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadImages = () => {
      const loadedImages: Image[] = [];

      Object.entries(imageImports).forEach(([category, files]) => {
        files.forEach(([, /* path */ module]: [string, any]) => {
          loadedImages.push({
            src: module.default,
            alt: `Imagen de ${category}`,
            category: category.charAt(0).toUpperCase() + category.slice(1),
          });
        });
      });

      setImages(loadedImages);
      setVisibleImages(loadedImages);
    };

    loadImages();
  }, []);

  useEffect(() => {
    if (selectedCategory === "Todas") {
      setVisibleImages(images);
    } else {
      setVisibleImages(
        images.filter((img) => img.category === selectedCategory)
      );
    }
  }, [selectedCategory, images]);

  const openImage = (image: Image, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const navigate = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setCurrentIndex((prev) =>
        prev > 0 ? prev - 1 : visibleImages.length - 1
      );
    } else {
      setCurrentIndex((prev) =>
        prev < visibleImages.length - 1 ? prev + 1 : 0
      );
    }
    setSelectedImage(visibleImages[currentIndex]);
  };

  return (
    <div className="container mx-auto px-4 py-16 sm:py-20">
      <motion.h2
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Galería de Proyectos
      </motion.h2>

      <motion.div
        className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => setSelectedCategory(category)}
            variant={selectedCategory === category ? "default" : "outline"}
            className={`text-sm sm:text-base ${
              selectedCategory === category
                ? "bg-pink-600 hover:bg-pink-700 text-white"
                : "bg-white/10 hover:bg-white/20 text-white border-white/20"
            }`}
          >
            {category}
          </Button>
        ))}
      </motion.div>

      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4"
      >
        <AnimatePresence>
          {visibleImages.map((image, index) => (
            <motion.div
              key={image.src}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="aspect-square overflow-hidden rounded-lg cursor-pointer"
              onClick={() => openImage(image, index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition duration-300 hover:scale-110"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
            onClick={closeImage}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                closeImage();
              }}
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Cerrar</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                navigate("prev");
              }}
            >
              <ChevronLeft className="h-8 w-8" />
              <span className="sr-only">Imagen anterior</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                navigate("next");
              }}
            >
              <ChevronRight className="h-8 w-8" />
              <span className="sr-only">Siguiente imagen</span>
            </Button>

            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-h-[90vh] max-w-[90vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 px-4 py-2 rounded-full">
              <p className="text-white text-sm">
                {currentIndex + 1} / {visibleImages.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
