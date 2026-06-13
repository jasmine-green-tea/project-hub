import React, { forwardRef } from 'react';
import { clsx } from 'clsx';

const Input = forwardRef(({
    label,
    iconLeft,
    iconRight,
    error,
    disabled = false,
    className = '',
    type ='text',
    multiline = false,
    rows = 3,
    ...props
}, ref) => {
    // Базовые классы для поля
    const baseClasses = `w-full rounded-lg border
                        text-base font-normal text-slate-900
                        placeholder:text-slate-400
                        transition-colors duration-200
                        focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-600
                        disabled:bg-white disabled:text-slate-400 disabled:border-slate-200 disabled:placeholder-slate-300 disabled:cursor-not-allowed
                        `;

    const borderColor = error
        ? 'border-rose-600'
        : 'border-slate-400 hover:border-slate-900';

    const paddingLeft = iconLeft ? 'pl-10' : 'pl-3';
    const paddingRight = iconRight ? 'pr-10' : 'pr-3';

    const inputClasses = clsx(
        baseClasses,
        borderColor,
        paddingLeft,
        paddingRight,
        'py-2',      // 8px вертикальные отступы
    );

    const Component = multiline ? 'textarea' : 'input';

    return (
        <div className={clsx('w-full', className)}>
            {label && (
                <label className="block text-sm font-semibold text-slate-900 mb-1">
                    {label}
                </label>
            )}
            <div className="relative">
                {iconLeft && !multiline && (
                    <div className='absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none'>
                        {iconLeft}
                    </div>
                )}
                <Component
                    ref={ref}
                    type={multiline ? undefined : type}
                    disabled={disabled}
                    rows={multiline ? rows : undefined}
                    className={clsx(
                        inputClasses,
                        multiline && 'resize-y'
                    )}
                    {...props}
                />
                {iconRight && !multiline && (
                    <div className='absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none'>
                        {iconRight}
                    </div>
                )}
            </div>
            {error && (
                <p className="mt-1 text-sm text-rose-600">{error}</p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;