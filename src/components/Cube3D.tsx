interface Cube3DProps {
    label: string;
    color: string;
}

export const Cube3D = ({ label, color }: Cube3DProps) => {
    return (
        <div style={{ perspective: '1000px' }} className="w-24 h-24 mx-auto my-8 cursor-pointer group">
            <div
                className="relative w-full h-full transition-transform duration-[3s] ease-in-out"
                style={{
                    transformStyle: 'preserve-3d',
                    animation: 'slowSpin 10s linear infinite',
                }}
            >
                {/* Front */}
                <div
                    className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl border-2 border-white/20 shadow-lg"
                    style={{
                        backgroundColor: color,
                        transform: 'translateZ(48px)'
                    }}
                >
                    {label}
                </div>
                {/* Back */}
                <div
                    className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl border-2 border-white/20 shadow-lg"
                    style={{
                        backgroundColor: color,
                        transform: 'rotateY(180deg) translateZ(48px)'
                    }}
                >
                    {label}
                </div>
                {/* Left */}
                <div
                    className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl border-2 border-white/20 shadow-lg"
                    style={{
                        backgroundColor: color,
                        filter: 'brightness(90%)',
                        transform: 'rotateY(-90deg) translateZ(48px)'
                    }}
                >
                </div>
                {/* Right */}
                <div
                    className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl border-2 border-white/20 shadow-lg"
                    style={{
                        backgroundColor: color,
                        filter: 'brightness(90%)',
                        transform: 'rotateY(90deg) translateZ(48px)'
                    }}
                >
                </div>
                {/* Top */}
                <div
                    className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl border-2 border-white/20 shadow-lg"
                    style={{
                        backgroundColor: color,
                        filter: 'brightness(110%)',
                        transform: 'rotateX(90deg) translateZ(48px)'
                    }}
                >
                </div>
                {/* Bottom */}
                <div
                    className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl border-2 border-white/20 shadow-lg"
                    style={{
                        backgroundColor: color,
                        filter: 'brightness(80%)',
                        transform: 'rotateX(-90deg) translateZ(48px)'
                    }}
                >
                </div>
            </div>
            <style>{`
        @keyframes slowSpin {
          0% { transform: rotateX(0deg) rotateY(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg); }
        }
        .group:hover .relative {
          animation-play-state: paused !important;
        }
      `}</style>
        </div>
    );
};
