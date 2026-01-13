import { useState, useEffect, useRef } from 'react';
import { ArrowLeftRight } from 'lucide-react';

interface BeforeAfterSliderProps {
    beforeImage: string;
    afterImage: string;
}

export const BeforeAfterSlider = ({ beforeImage, afterImage }: BeforeAfterSliderProps) => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = (clientX: number) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
            const percentage = (x / rect.width) * 100;
            setSliderPosition(percentage);
        }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        handleMove(e.clientX);
    };

    useEffect(() => {
        const handleGlobalMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                handleMove(e.clientX);
            }
        };

        const handleGlobalMouseUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            window.addEventListener('mousemove', handleGlobalMouseMove);
            window.addEventListener('mouseup', handleGlobalMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleGlobalMouseMove);
            window.removeEventListener('mouseup', handleGlobalMouseUp);
        };
    }, [isDragging]);

    const handleTouchMove = (e: React.TouchEvent) => {
        handleMove(e.touches[0].clientX);
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-3xl select-none cursor-ew-resize shadow-2xl"
            onMouseDown={handleMouseDown}
            onTouchStart={() => setIsDragging(true)}
            onTouchMove={handleTouchMove}
            onTouchEnd={() => setIsDragging(false)}
        >
            {/* After Image (Background) */}
            <img
                src={afterImage}
                alt="After"
                className="absolute top-0 left-0 w-full h-full object-cover"
                draggable={false}
            />

            {/* Before Image (Foreground - Clipped) */}
            <div
                className="absolute top-0 left-0 h-full w-full overflow-hidden"
                style={{
                    clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                }}
            >
                <img
                    src={beforeImage}
                    alt="Before"
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    draggable={false}
                />

                {/* Labels - pointer-events-none to allow dragging through them */}
                <span className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded-md text-sm font-bold backdrop-blur-sm pointer-events-none">ДО</span>
            </div>

            {/* Slider Handle Divider */}
            <div
                className="absolute top-0 bottom-0 w-1 bg-white z-20"
                style={{
                    left: `${sliderPosition}%`,
                }}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-terracotta pointer-events-none">
                    <ArrowLeftRight size={20} />
                </div>
            </div>

            <span className="absolute top-4 right-4 bg-terracotta/90 text-white px-3 py-1 rounded-md text-sm font-bold backdrop-blur-sm pointer-events-none">ПОСЛЕ</span>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 transition-opacity duration-300">
                {/* Helper text opacity logic can be added here if needed */}
            </div>
        </div>
    );
};
