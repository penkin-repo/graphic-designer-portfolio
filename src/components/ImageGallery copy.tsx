import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface ImageGalleryProps {
    images: string[];
    title: string;
}

export const ImageGallery = ({ images, title }: ImageGalleryProps) => {
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (currentIndex === null) return;
            if (e.key === 'Escape') setCurrentIndex(null);
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'ArrowRight') handleNext();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex]);

    // Prevent scroll when lightbox is open
    useEffect(() => {
        if (currentIndex !== null) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [currentIndex]);

    const handleNext = () => {
        if (currentIndex === null) return;
        setCurrentIndex((currentIndex + 1) % images.length);
    };

    const handlePrev = () => {
        if (currentIndex === null) return;
        setCurrentIndex((currentIndex - 1 + images.length) % images.length);
    };

    return (
        <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Галерея проекта</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((image, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 gallery-trigger"
                        onClick={() => setCurrentIndex(index)}
                    >
                        <img
                            src={image}
                            alt={`${title} - изображение ${index + 1}`}
                            className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <Maximize2 className="text-white" size={24} />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {currentIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-10"
                        onClick={() => setCurrentIndex(null)}
                    >
                        <motion.button
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute top-6 right-6 z-[110] bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors border border-white/20"
                            onClick={(e) => {
                                e.stopPropagation();
                                setCurrentIndex(null);
                            }}
                        >
                            <X className="text-white" size={24} />
                        </motion.button>

                        <button
                            className="absolute left-4 md:left-8 z-[110] bg-white/10 hover:bg-white/20 p-4 rounded-full transition-colors border border-white/20 hidden md:block"
                            onClick={(e) => {
                                e.stopPropagation();
                                handlePrev();
                            }}
                        >
                            <ChevronLeft className="text-white" size={32} />
                        </button>

                        <button
                            className="absolute right-4 md:right-8 z-[110] bg-white/10 hover:bg-white/20 p-4 rounded-full transition-colors border border-white/20 hidden md:block"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleNext();
                            }}
                        >
                            <ChevronRight className="text-white" size={32} />
                        </button>

                        <div className="relative w-full h-full flex flex-col items-center justify-center" onClick={e => e.stopPropagation()}>
                            <motion.img
                                key={currentIndex}
                                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.9, x: -20 }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                src={images[currentIndex]}
                                alt={`${title} full size`}
                                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                            />

                            <div className="mt-6 flex items-center gap-6">
                                <span className="text-white/60 font-medium">
                                    {currentIndex + 1} / {images.length}
                                </span>
                                <div className="flex gap-2 md:hidden">
                                    <button
                                        className="bg-white/10 p-3 rounded-full border border-white/20"
                                        onClick={handlePrev}
                                    >
                                        <ChevronLeft className="text-white" size={24} />
                                    </button>
                                    <button
                                        className="bg-white/10 p-3 rounded-full border border-white/20"
                                        onClick={handleNext}
                                    >
                                        <ChevronRight className="text-white" size={24} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
