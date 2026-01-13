import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Mail, ExternalLink } from 'lucide-react';
import { type ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { CONTACTS } from '../data/constants';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] overflow-y-auto">
                    <div className="flex min-h-screen items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                            onClick={onClose}
                            aria-hidden="true"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative bg-cream p-8 rounded-2xl shadow-2xl max-w-md w-full border border-sand z-10 my-8"
                        >
                            <button onClick={onClose} className="absolute top-4 right-4 text-brown hover:text-terracotta transition-colors">
                                <X size={24} />
                            </button>
                            <h3 className="text-2xl font-bold mb-6 text-brown">{title}</h3>
                            {children}
                        </motion.div>
                    </div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export const ContactForm = () => (
    <div className="space-y-4">
        <a href={CONTACTS.telegram} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 bg-white border border-sand rounded-xl hover:shadow-md transition-all group cursor-pointer">
            <div className="bg-blue-50 p-3 rounded-full group-hover:bg-blue-100 transition-colors">
                <MessageCircle className="text-blue-500" size={24} />
            </div>
            <div>
                <p className="font-bold text-brown">Telegram</p>
                <p className="text-sm text-gray-500">Быстрый ответ в чате</p>
            </div>
            <ExternalLink size={16} className="ml-auto text-gray-400" />
        </a>

        {/* <a href={`mailto:${CONTACTS.email}`} className="flex items-center gap-4 p-4 bg-white border border-sand rounded-xl hover:shadow-md transition-all group cursor-pointer">
            <div className="bg-orange-50 p-3 rounded-full group-hover:bg-orange-100 transition-colors">
                <Mail className="text-terracotta" size={24} />
            </div>
            <div>
                <p className="font-bold text-brown">Email {CONTACTS.email}</p>
                <p className="text-sm text-gray-500">Альтернатива</p>
            </div>
            <ExternalLink size={16} className="ml-auto text-gray-400" />
        </a> */}
        <div className="flex items-center gap-4 p-4 bg-white border border-sand rounded-xl">
            <div className="bg-orange-50 p-3 rounded-full group-hover:bg-orange-100 transition-colors">
                <Mail className="text-terracotta" size={24} />
            </div>
            <div>
                <a href={`mailto:${CONTACTS.email}`} className="font-bold text-brown">{CONTACTS.email}</a>
            </div>
        </div>

    </div>
);
