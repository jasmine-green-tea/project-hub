import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const Select = forwardRef(({
    label,
    iconLeft,
    error,
    disabled = false,
    options = [],
    placeholder,
    className = '',
    value,
    ...props
}, ref) => {
    const isPlaceholderSelected = !value || value === '';
    const selectTextColor = isPlaceholderSelected ? 'text-slate-400' : 'text-slate-900';

    const baseClasses = `w-full rounded-lg border
                        text-base font-normal
                        placeholder:text-slate-400
                        transition-colors duration-200
                        focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-600
                        disabled:bg-white disabled:border-slate-200 disabled:text-slate-300 disabled:cursor-not-allowed
                        appearance-none`;

    const borderColor = error
        ? 'border-rose-600'
        : 'border-slate-400 hover:border-slate-900';

    const paddingLeft = iconLeft ? 'pl-10' : 'pl-3';
    const paddingRight = 'pr-10';

    const selectClasses = clsx(
            baseClasses,
            borderColor,
            paddingLeft,
            paddingRight,
            'py-2',
            selectTextColor
        );

    return (
        <div className={clsx('w-full', className)}>
            <label className="block text-sm font-semibold text-slate-900 mb-1">
                {label}
            </label>
            <div className="relative">
                {iconLeft && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        {iconLeft}
                    </div>
                )}
                <select
                    ref={ref}
                    disabled={disabled}
                    className={selectClasses}
                    value={value}
                    {...props}
                >
                    {placeholder && (
                        <option value="" disabled hidden>
                            {placeholder}
                        </option>
                    )}
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <ChevronDownIcon className="h-5 w-5 text-slate-400" />
                </div>
            </div>
            {error && (
                <p className="mt-1 text-sm text-rose-600">{error}</p>
            )}
        </div>
    );
});

Select.displayName = 'Select';

export default Select;