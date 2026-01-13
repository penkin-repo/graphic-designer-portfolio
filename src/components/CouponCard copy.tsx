import React from 'react';
import { motion } from 'framer-motion';
import { ContactButton } from './ContactButton';

export const CouponCard = () => {
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Using mask-image to truly cut out the semi-circles from the background
    // This allows the drop-shadow filter to follow the custom shape
    const maskLeft = isMobile ? {
        mask: 'radial-gradient(circle at 0 100%, transparent 16px, black 16.5px) bottom left / 51% 100% no-repeat, radial-gradient(circle at 100% 100%, transparent 16px, black 16.5px) bottom right / 51% 100% no-repeat',
        WebkitMask: 'radial-gradient(circle at 0 100%, transparent 16px, black 16.5px) bottom left / 51% 100% no-repeat, radial-gradient(circle at 100% 100%, transparent 16px, black 16.5px) bottom right / 51% 100% no-repeat',
    } : {
        mask: 'radial-gradient(circle at 100% 0, transparent 16px, black 16.5px) top right / 100% 51% no-repeat, radial-gradient(circle at 100% 100%, transparent 16px, black 16.5px) bottom right / 100% 51% no-repeat',
        WebkitMask: 'radial-gradient(circle at 100% 0, transparent 16px, black 16.5px) top right / 100% 51% no-repeat, radial-gradient(circle at 100% 100%, transparent 16px, black 16.5px) bottom right / 100% 51% no-repeat',
    };

    const maskRight = isMobile ? {
        mask: 'radial-gradient(circle at 0 0, transparent 16px, black 16.5px) top left / 51% 100% no-repeat, radial-gradient(circle at 100% 0, transparent 16px, black 16.5px) top right / 51% 100% no-repeat',
        WebkitMask: 'radial-gradient(circle at 0 0, transparent 16px, black 16.5px) top left / 51% 100% no-repeat, radial-gradient(circle at 100% 0, transparent 16px, black 16.5px) top right / 51% 100% no-repeat',
    } : {
        mask: 'radial-gradient(circle at 0 0, transparent 16px, black 16.5px) top left / 100% 51% no-repeat, radial-gradient(circle at 0 100%, transparent 16px, black 16.5px) bottom left / 100% 51% no-repeat',
        WebkitMask: 'radial-gradient(circle at 0 0, transparent 16px, black 16.5px) top left / 100% 51% no-repeat, radial-gradient(circle at 0 100%, transparent 16px, black 16.5px) bottom left / 100% 51% no-repeat',
    };

    const stubVariants = {
        initial: { rotate: 0 },
        hover: {
            rotate: isMobile ? 2 : 4,
            transition: { type: "spring", stiffness: 300, damping: 20 }
        }
    };

    return (
        <motion.div
            initial="initial"
            whileHover="hover"
            className="group relative w-full max-w-5xl mx-auto overflow-visible p-4"
        >
            {/* Container that applies the shadow to the overall shape of children */}
            <div className="flex flex-col md:flex-row items-stretch w-full filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.2)]">

                {/* Left Part: Main Offer */}
                <div
                    style={maskLeft}
                    className={`relative flex-[2.5] bg-gradient-to-br from-terracotta to-[#E88D67] p-8 lg:p-12 overflow-hidden ${isMobile ? 'rounded-t-3xl' : 'rounded-l-3xl'}`}
                >
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>

                    <div className="relative z-10">
                        <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-bold mb-4 border border-white/30 text-white uppercase tracking-wider">
                            Спецпредложение 🔥
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-bold ibm-plex-serif-semibold-italic mb-6 text-white leading-tight">
                            Нужен дизайн «вчера»?
                        </h2>
                        <p className="text-white/90 text-lg mb-8 max-w-xl leading-relaxed">
                            Разработаю 1 макет средней сложности (визитка, флаер, пост для соцсетей) всего за 500₽.
                            Идеально для первого знакомства.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <ContactButton variant="special" text="Забрать за 500₽" />
                            <span className="text-xs text-white/50 italic">
                                *Только для новых клиентов
                            </span>
                        </div>
                    </div>
                </div>

                {/* Perforation Divider - hidden on small screens or styled differently */}
                <div className="relative w-0 hidden md:flex items-center justify-center z-20">
                    <div className="absolute inset-y-6 left-0 border-l-2 border-dashed border-white/40"></div>
                </div>

                {/* Right Part: The Tear-off Stub */}
                <motion.div
                    style={maskRight}
                    variants={stubVariants}
                    className={`relative flex-1 bg-gradient-to-br from-[#E88D67] to-terracotta p-8 lg:p-12 flex flex-col items-center justify-center overflow-hidden origin-bottom-left ${isMobile ? 'rounded-b-3xl' : 'rounded-r-3xl'}`}
                >
                    {/* Inner Shadow for "stub" feel */}
                    <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>

                    <div className="relative z-10 text-center">
                        <div
                            className="bg-white text-terracotta w-36 h-36 md:w-44 md:h-44 rounded-full flex items-center justify-center font-black text-4xl md:text-5xl shadow-2xl border-8 border-terracotta/10"
                        >
                            500₽
                        </div>
                    </div>

                    {/* Diagonal Lines Texture */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff, #fff 1px, transparent 1px, transparent 10px)' }}></div>
                </motion.div>
            </div>
        </motion.div>
    );
};
