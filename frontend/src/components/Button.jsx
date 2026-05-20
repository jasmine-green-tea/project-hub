import React from 'react';
import { clsx } from 'clsx';

/**
 * @param {string} variant - primary | secondary | tertiary
 * @param {ReactNode} iconLeft - иконка слева от текста
 * @param {ReactNode} iconRight - иконка справа от текста
 * @param {ReactNode} icon - иконка по центру
 * @param {boolean} isIconOnly - если true, кнопка только с иконкой (без текста)
 * @param {boolean} disabled - состояние disabled
 * @param {function} onClick - обработчик клика
 * @param {string} type - button | submit | reset
 * @param {ReactNode} children - текст кнопки
 * @param {string} className - дополнительные CSS-классы
 */

const Button = ({
    variant = 'primary',
    iconLeft,
    iconRight,
    icon,
    isIconOnly = false,
    disabled = false,
    onClick,
    type = 'button',
    children,
    className = '',
    ...props
}) => {
    // Базовые стили для всех кнопок
    const baseClasses =
            'inline-flex items-center justify-center rounded-lg test-base font-semibold transition-colors duration-200 focus:outline-none';

    // Варианты цвета
    const variants = {
        primary: {
            default: 'bg-blue-600 text-white',
            hover: 'hover:bg-blue-700',
            active: 'active:bg-blue-800',
            disabled: 'disabled:bg-slate-300 disabled:cursor-not-allowed',
        },
        secondary: {
            default: 'bg-white text-slate-900 ring-1 ring-inset ring-slate-400',
            hover: 'hover:bg-slate-200 hover:ring-transparent',
            active: 'active:bg-slate-300',
            disabled: 'disabled:bg-white disabled:ring-slate-300 disabled:text-slate-300 disabled:cursor-not-allowed',
        },
        tertiary: {
            default: 'bg-transparent text-slate-900 leading-1',
            hover: 'hover:text-blue-600',
            active: 'active:text-blue-700',
            disabled: 'disabled:text-slate-300 disabled:cursor-not-allowed',
        },
    };

    const sizeClasses = isIconOnly
        ? 'px-3 py-2' // отступы для кнопки только с иконкой
        : 'px-4 py-2' // стандартные отступы

    const variantClasses = variants[variant];
    const classes = clsx(
        baseClasses,
        sizeClasses,
        variantClasses.default,
        variantClasses.hover,
        variantClasses.active,
        variantClasses.disabled,
        className
    );

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={classes}
            {...props}
        >
            {iconLeft && <span className='mr-2'>{iconLeft}</span>}
            {!isIconOnly && children}
            {isIconOnly && icon && <span>{icon}</span>}
            {iconRight && <span className='ml-2'>{iconRight}</span>}
        </button>
    );
};

export default Button;