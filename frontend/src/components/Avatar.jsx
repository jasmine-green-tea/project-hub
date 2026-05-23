import React from 'react';
import { UserCircleIcon } from '@heroicons/react/24/outline';

/**
 * Универсальный компонент аватара
 * @param {string} src - URL изображения (avatar_path)
 * @param {string} alt - альтернативный текст
 * @param {string} name - имя пользователя (для инициалов, если нет картинки)
 * @param {string} size - размер Tailwind: 'h-8 w-8' (32px), 'h-10 w-10' (40px) и т.д.
 * @param {boolean} withFallbackIcon - показывать иконку вместо инициалов (по умолчанию true)
 */

const Avatar = ({
    src,
    alt = 'Аватар',
    name = '',
    size = 'h-10 w-10',
    withFallbackIcon = true
}) => {
    // Если есть src, показываем изображение
    if (src) {
        return (
            <img
                src={src}
                alt={alt}
                className={`${size} rounded-full object-cover border border-gray-200`}
            />
        );
    }

    // Если есть имя,показываем инициалы
     if (name && name.trim()) {
            const initials = name
                .split(' ')
                .map(part => part[0]?.toUpperCase())
                .slice(0, 2)
                .join('');
            return (
                <div
                     className={`${size} rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-semibold text-sm border border-gray-200`}
                >
                    {initials}
                </div>
            );
        }

    // Fallback – иконка пользователя
    if (withFallbackIcon) {
        return <UserCircleIcon className={`${size} text-gray-400`} />;
    }

    return null;
}

export default Avatar;