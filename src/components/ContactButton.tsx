import { useState } from 'react';
import { Modal, ContactForm } from './Modal';
import { MessageCircle, Zap } from 'lucide-react';

interface ContactButtonProps {
    variant?: 'primary' | 'special';
    text?: string;
}

export const ContactButton = ({ variant = 'primary', text }: ContactButtonProps) => {
    const [isContactOpen, setContactOpen] = useState(false);

    if (variant === 'special') {
        return (
            <>
                <button
                    onClick={() => setContactOpen(true)}
                    className="bg-white text-terracotta px-8 py-4 rounded-xl font-bold hover:shadow-lg hover:bg-orange-50 transition-all flex items-center justify-center gap-2"
                >
                    {text || 'Забрать за 500₽'} <span className="text-xl">✓</span>
                </button>

                <Modal
                    isOpen={isContactOpen}
                    onClose={() => setContactOpen(false)}
                    title="Связаться со мной"
                >
                    <ContactForm />
                </Modal>
            </>
        );
    }

    return (
        <>
            <button
                onClick={() => setContactOpen(true)}
                className="bg-terracotta text-white p-2 md:px-6 md:py-2 rounded-full font-medium hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
            >
                <MessageCircle size={20} />
                <span className="hidden md:inline">{text || 'Связаться'}</span>
            </button>

            <Modal
                isOpen={isContactOpen}
                onClose={() => setContactOpen(false)}
                title="Связаться со мной"
            >
                <ContactForm />
            </Modal>
        </>
    );
};

export const HeroContactButton = () => {
    const [isContactOpen, setContactOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setContactOpen(true)}
                className="bg-terracotta hover:bg-terracottaHover text-white text-lg px-8 py-4 rounded-xl font-bold shadow-xl hover:shadow-orange-500/20 transition-all flex items-center gap-2"
            >
                Заказать дизайн <Zap size={20} />
            </button>

            <Modal
                isOpen={isContactOpen}
                onClose={() => setContactOpen(false)}
                title="Связаться со мной"
            >
                <ContactForm />
            </Modal>
        </>
    );
};
