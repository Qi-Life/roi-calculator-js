import React, { useRef, useEffect } from "react";

const ReusableSlider = ({
    value,
    setValue,
    min,
    max,
    step = 1, // Mặc định nhảy 1 đơn vị nếu không truyền vào
    formatCurrency,
    disableCurrency = false,
}) => {
    const sliderRef = useRef(null);
    const handleRef = useRef(null);

    const updateValue = (clientX) => {
        if (!sliderRef.current) return;
        const rect = sliderRef.current.getBoundingClientRect();
        const percent = (clientX - rect.left) / rect.width;

        let newValue = Math.round((min + percent * (max - min)) / step) * step;
        newValue = Math.max(min, Math.min(max, newValue));
        setValue(newValue);
    };

    const handleStart = (event) => {
        const clientX = event.touches
            ? event.touches[0].clientX
            : event.clientX;
        updateValue(clientX);

        const handleMove = (e) => {
            const moveX = e.touches ? e.touches[0].clientX : e.clientX;
            updateValue(moveX);
        };

        const handleEnd = () => {
            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('mouseup', handleEnd);
            document.removeEventListener('touchmove', handleMove);
            document.removeEventListener('touchend', handleEnd);
        };

        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', handleEnd);
        document.addEventListener('touchmove', handleMove);
        document.addEventListener('touchend', handleEnd);
    };

    useEffect(() => {
        if (sliderRef.current && handleRef.current) {
            const percent = ((Math.max(value, min) - min) / (max - min)) * 100;
            sliderRef.current.style.setProperty(
                '--slider-width',
                `${percent}%`,
            );
            handleRef.current.style.left = `${percent}%`;
        }
    }, [value, min, max]);

    return (
        <div className="2xl:h-9 h-[28.8px] flex items-center">
            <div
                className="relative w-full h-[6.4px] 2xl:h-2 rounded-[24px] bg-[#DDDCE0] cursor-pointer shadow-[inset_0px_1px_4px_#9F9DA1]"
                ref={sliderRef}
                onMouseDown={handleStart}
                onTouchStart={handleStart}
                onClick={(e) => updateValue(e.clientX)}
            >
                <div
                    className="absolute h-[6.4px] 2xl:h-2.5 rounded bg-[#297C82]"
                    style={{
                        width: `${((Math.max(value, min) - min) / (max - min)) * 100}%`,
                    }}
                />
                <div
                    className="absolute top-1/2 w-[19.2px] 2xl:w-6 h-[19.2px] 2xl:h-6 bg-[#FFFFFF] border border-[#297C82] rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-grab"
                    ref={handleRef}
                    style={{
                        left: `${Math.max(0, Math.min(((Math.max(value, min) - min) / (max - min)) * 100, 100))}%`,
                    }}
                    onMouseDown={handleStart}
                    onTouchStart={handleStart}
                />
            </div>
        </div>
    );
};

export default ReusableSlider;
