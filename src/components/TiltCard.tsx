import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { ReactNode } from 'react';

interface TiltCardProps {
    children: ReactNode;
    className?: string;
}

export const TiltCard = ({ children, className = "" }: TiltCardProps) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

    const shadowX = useTransform(mouseX, [-0.5, 0.5], [20, -20]);
    const shadowY = useTransform(mouseY, [-0.5, 0.5], [20, -20]);
    const shadowBlur = useTransform(mouseX, [-0.5, 0.5], [30, 30]);
    const shadowOpacity = useTransform(mouseX, [-0.5, 0.5], [0.1, 0.1]);

    const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
    const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);
    const glareOpacity = useTransform(mouseX, [-0.5, 0.5], [0, 0.6]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXFromCenter = e.clientX - rect.left - width / 2;
        const mouseYFromCenter = e.clientY - rect.top - height / 2;
        x.set(mouseXFromCenter / width);
        y.set(mouseYFromCenter / height);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div style={{ perspective: "1500px" }} className="w-full h-full">
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                whileHover={{ scale: 1.02 }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={`relative w-full h-full ${className}`}
            >
                {/* Dynamic Shadow - moves opposite to the tilt */}
                <motion.div
                    style={{
                        translateX: shadowX,
                        translateY: shadowY,
                        translateZ: -60,
                        filter: "blur(25px)",
                        opacity: 0.2, // Darker shadow for more depth
                        backgroundColor: "#000",
                    }}
                    className="absolute inset-4 rounded-[2rem] -z-10 pointer-events-none"
                />

                {/* Glare Effect - follows the mouse */}
                <motion.div
                    style={{
                        background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.3) 0%, transparent 80%)`,
                        translateZ: 1,
                        borderRadius: "inherit",
                    }}
                    className="absolute inset-0 pointer-events-none z-10"
                />

                {/* Content Container with translateZ for depth */}
                <div
                    style={{
                        transform: "translateZ(40px)",
                        transformStyle: "preserve-3d",
                        height: "100%"
                    }}
                    className="relative z-0"
                >
                    {children}
                </div>
            </motion.div>
        </div>
    );
};
