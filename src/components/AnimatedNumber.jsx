import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const AnimatedNumber = ({ value, suffix = "", prefix = "" }) => {
    const [displayValue, setDisplayValue] = useState(value);

    useEffect(() => {
        const duration = 100; // Total animation time
        const steps = 200; // Fixed number of animation steps
        const stepTime = duration / steps; // Time per step
        const stepSize = (value - displayValue) / steps; // Size per step

        if (value !== displayValue) {
            let currentStep = 0;
            const intervalId = setInterval(() => {
                setDisplayValue((prev) => {
                    currentStep++;
                    if (currentStep >= steps) {
                        clearInterval(intervalId);
                        return value;
                    }
                    return prev + stepSize;
                });
            }, stepTime);

            return () => clearInterval(intervalId);
        }
    }, [value]);

    const formattedValue = displayValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return (
      <motion.div
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="leading-[45px] font-bold"
      >
        {prefix}
        {formattedValue}
        {suffix}
      </motion.div>
    );
};

export default AnimatedNumber;