import { useState } from 'react';
import { motion } from 'framer-motion';

interface PortfolioItem {
    id?: number;
    title: string;
    category: string;
    img: string;
    desc: string;
    slug?: string;
}

interface PortfolioGridProps {
    items: PortfolioItem[];
    showAll?: boolean;
}

export const PortfolioGrid = ({ items, showAll = false }: PortfolioGridProps) => {

    const [activeCategory, setActiveCategory] = useState("Все");

    const categories = ["Все", ...Array.from(new Set(items.map(item => item.category)))];

    const filteredPortfolio = activeCategory === "Все"
        ? items
        : items.filter(item => item.category === activeCategory);

    const displayItems = showAll ? filteredPortfolio : filteredPortfolio.slice(0, 3);

    return (
        <>
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-4 mb-8">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat
                            ? "bg-terracotta text-white shadow-lg shadow-orange-500/30 scale-105"
                            : "bg-white text-brown hover:bg-sand border border-sand"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayItems.map((item) => (
                    <motion.div
                        layout
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="group"
                    >
                        <a href={`/portfolio/${item.slug}`}>
                            <div className="relative overflow-hidden rounded-2xl shadow-lg cursor-pointer">
                                <img src={item.img} alt={item.title} className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                                    <span className="text-orange-300 text-xs font-bold uppercase tracking-wider mb-1">{item.category}</span>
                                    <h3 className="text-xl font-bold">{item.title}</h3>
                                    <p className="text-sm opacity-80 mt-1">{item.desc}</p>
                                </div>
                            </div>
                        </a>
                    </motion.div>
                ))}
            </div>
        </>
    );
};
