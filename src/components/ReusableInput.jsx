import { styles } from "@/pages/style";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ReusableInput = ({
    value,
    setValue,
    min,
    max,
    step = 1,
    disableCurrency = false,
    formatCurrency,
}) => {
    const [tempValue, setTempValue] = useState(
        formatCurrency(value, false, disableCurrency),
    );
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (!isEditing) {
            setTempValue(formatCurrency(value, false, disableCurrency));
        }
    }, [value, disableCurrency, isEditing, formatCurrency]);

    const handleChange = (e) => {
        let newValue = e.target.value;

        if (!disableCurrency && newValue.startsWith('$')) {
            newValue = newValue.slice(1);
        }

        // if (newValue.trim() === "") {
        //     if (disableCurrency) {
        //         setTempValue(min, false, disableCurrency);
        //     } else {
        //         setTempValue(min, false, !disableCurrency);
        //     }
        //     setValue(min);
        //     return;
        // }

        if (newValue === '.' || newValue === '$.') {
            setTempValue(disableCurrency ? '.' : '$.');
            return;
        }

        newValue = newValue.replace(/[^0-9.]/g, '');

        if (/^0[0-9]/.test(newValue)) {
            newValue = newValue.replace(/^0+/, '');
            if (newValue === '') {
                newValue = '0';
            }
        }

        let numValue = parseFloat(newValue);
        if (!isNaN(numValue) && numValue >= max) {
            newValue = max.toString();
        }

        const dotCount = (newValue.match(/\./g) || []).length;
        if (
            dotCount > 1 ||
            (parseFloat(newValue) >= max && newValue.includes('.'))
        ) {
            return;
        }

        if (newValue.includes('.')) {
            const [intPart, decimalPart] = newValue.split('.');
            if (decimalPart.length > 2) {
                newValue = `${intPart}.${decimalPart.slice(0, 2)}`;
            }
        }

        setTempValue(disableCurrency ? newValue : `${newValue}`);
        setValue(Math.max(min, parseFloat(newValue) || min));
    };

    const handleBlur = () => {
        setIsEditing(false);

        let processValue = tempValue;
        if (!disableCurrency && processValue.startsWith('$')) {
            processValue = processValue.slice(1);
        }

        if (processValue === '' || processValue === '.') {
            setTempValue(formatCurrency(min, false, disableCurrency));
            setValue(min);
            return;
        }

        let validatedValue = parseFloat(processValue.replace(/,/g, ''));
        if (isNaN(validatedValue) || validatedValue < min) {
            validatedValue = min;
        } else if (validatedValue > max) {
            validatedValue = max;
        }

        validatedValue = Math.round(validatedValue / step) * step;

        setValue(validatedValue);
        setTempValue(formatCurrency(validatedValue, false, disableCurrency));
    };

    const handleFocus = (e) => {
        setIsEditing(true);
        let focusValue = tempValue;
        if (!disableCurrency && focusValue.startsWith('$')) {
            focusValue = focusValue.slice(1);
        }
        setTempValue(focusValue.replace(/,/g, ''));
        e.target.select();
    };

    return (
        <motion.input
            type="text"
            value={tempValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="py-[12.8px] 2xl:py-[12px] px-[9.6px] 2xl:px-[16px] w-[112px] 2xl:w-[140px] h-[35.2px] 2xl:h-[44px] text-center border border-[#0A1F20] rounded-[6.4px] 2xl:rounded-[8px] font-[590] text-[12.8px] 2xl:text-[16px] bg-white text-[#0A1F20] outline-none  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none leading-5 "
        />
    );
};

export default ReusableInput;