import { useEffect } from 'react';

export const useMousePosition = () => {
    useEffect(() => {
        let rafId: number;

        const handleMouseMove = (event: MouseEvent) => {
            rafId = requestAnimationFrame(() => {
                document.documentElement.style.setProperty('--mouse-x', `${event.clientX}px`);
                document.documentElement.style.setProperty('--mouse-y', `${event.clientY}px`);
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(rafId);
        };
    }, []);
};