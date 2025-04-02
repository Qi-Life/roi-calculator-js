import { useRef, useState, useEffect } from 'react';

const ROIExample = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [activeSlider, setActiveSlider] = useState<string | null>(null); // Track which slider is being dragged

    const [initial, setInitial] = useState(70000);
    const [price, setPrice] = useState(35);
    const [hours, setHours] = useState(400);
    const [monthly, setMonthly] = useState(6000);

    const minMaxValues = {
        initial: { min: 30000, max: 250000 },
        price: { min: 10, max: 60 },
        hours: { min: 50, max: 5000 },
        monthly: { min: 99, max: 30000 },
    };

    const sliderRefs = {
        initial: useRef<HTMLDivElement>(null),
        price: useRef<HTMLDivElement>(null),
        hours: useRef<HTMLDivElement>(null),
        monthly: useRef<HTMLDivElement>(null),
    };

    // Calculate financial metrics
    const monthlyRevenue = price * hours;
    const annualRevenue = monthlyRevenue * 12;
    const annualOverhead = monthly * 12;
    const annualProfit = annualRevenue - annualOverhead;
    const annualROI = (annualProfit / initial) * 100;
    const lifetimeROI = annualROI * 20; // 20 year lifespan

    const updateValue = (clientX: number, sliderType: string) => {
        const ref = sliderRefs[sliderType as keyof typeof sliderRefs];
        if (!ref.current) return;

        const { min, max } = minMaxValues[sliderType as keyof typeof minMaxValues];
        const rect = ref.current.getBoundingClientRect();
        const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));

        let newValue = Math.round(min + percent * (max - min));
        newValue = Math.max(min, Math.min(max, newValue));

        // Update state based on slider type
        switch (sliderType) {
            case "initial": setInitial(newValue); break;
            case "price": setPrice(newValue); break;
            case "hours": setHours(newValue); break;
            case "monthly": setMonthly(newValue); break;
            default: console.error(`Invalid slider type: "${sliderType}"`);
        }
    };

    const handleMouseDown = (sliderType: string) => {
        setIsDragging(true);
        setActiveSlider(sliderType);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging || !activeSlider) return;
        updateValue(e.clientX, activeSlider);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setActiveSlider(null);
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        } else {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        }
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging, activeSlider]);

    // Helper function to format currency
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
        }).format(value);
    };

    return (
        <div className="bg-[#1a1a1a] flex justify-center items-center p-10">
            <div className="flex flex-col items-center bg-[#292929] text-white p-10 w-full max-w-[800px] h-auto rounded-[40px] gap-10">
                <div className="text-center flex flex-col gap-2 max-w-[680px]">
                    <div className="text-4xl font-bold leading-tight">ROI Calculator for The Light System™</div>
                    <div className="text-[15px]">For Public Centers</div>
                </div>

                <div className="flex flex-wrap justify-between gap-10">
                    <div className="rounded-lg text-white max-w-[340px]">
                        <div>
                            <div>
                                <div className="flex flex-row justify-between items-center mb-2">
                                    <label className="block leading-5 text-sm font-normal">Initial Investment</label>
                                    <input
                                        type="number"
                                        value={initial}
                                        onChange={(e) => {
                                            let newValue = parseInt(e.target.value) || 0;
                                            newValue = Math.max(minMaxValues.initial.min, Math.min(minMaxValues.initial.max, newValue));
                                            setInitial(newValue);
                                        }}
                                        className="py-3 px-4 text-center border border-white/30 rounded font-bold text-lg w-2/5 bg-transparent text-white mt-1 outline-none focus:border-[#0cd1e5] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                </div>
                                <div
                                    className="relative w-full h-2.5 max-h-2.5 rounded bg-[#343434] cursor-pointer mb-0.5 mt-1"
                                    ref={sliderRefs.initial}
                                    onMouseDown={() => handleMouseDown("initial")}
                                >
                                    <div
                                        className="absolute h-2.5 rounded bg-[#0cd1e5]"
                                        style={{ width: `${((initial - minMaxValues.initial.min) / (minMaxValues.initial.max - minMaxValues.initial.min)) * 100}%` }}
                                    />
                                    <div
                                        className="absolute top-1/2 w-5 h-5 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-grab"
                                        style={{ left: `${((initial - minMaxValues.initial.min) / (minMaxValues.initial.max - minMaxValues.initial.min)) * 100}%` }}
                                    />
                                </div>
                                <div className="text-xs flex justify-between items-center text-white/70 mb-2">
                                    <div>30,000</div>
                                    <div>250,000</div>
                                </div>
                            </div>
                            <div className="text-[13px] text-white/70 mb-2">
                                <div>Technology Cost + Start Up Business Cost (location, furniture, business subscriptions, etc.)</div>
                                <br />
                                <div>12 Unit System = $37,500</div>
                                <br />
                                <div>24 Unit System = $75,000</div>
                                <br />
                                <div>32 Unit System = $100,000</div>
                            </div>
                        </div>

                        <div>
                            <div className="flex flex-row justify-between items-center mb-2">
                                <label className="block leading-5 text-sm font-normal">Price Per Hour (Average)</label>
                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => {
                                        let newValue = parseInt(e.target.value) || 0;
                                        newValue = Math.max(minMaxValues.price.min, Math.min(minMaxValues.price.max, newValue));
                                        setPrice(newValue);
                                    }}
                                    className="py-3 px-4 text-center border border-white/30 rounded font-bold text-lg w-2/5 bg-transparent text-white mt-1 outline-none focus:border-[#0cd1e5] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                            </div>
                            <div
                                className="relative w-full h-2.5 max-h-2.5 rounded bg-[#343434] cursor-pointer mb-0.5 mt-1"
                                ref={sliderRefs.price}
                                onMouseDown={() => handleMouseDown("price")}
                            >
                                <div
                                    className="absolute h-2.5 rounded bg-[#0cd1e5]"
                                    style={{ width: `${((price - minMaxValues.price.min) / (minMaxValues.price.max - minMaxValues.price.min)) * 100}%` }}
                                />
                                <div
                                    className="absolute top-1/2 w-5 h-5 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-grab"
                                    style={{ left: `${((price - minMaxValues.price.min) / (minMaxValues.price.max - minMaxValues.price.min)) * 100}%` }}
                                />
                            </div>
                            <div className="text-xs flex justify-between items-center text-white/70 mb-2">
                                <div>$10</div>
                                <div>$60</div>
                            </div>
                        </div>
                        <div>
                            <div className="flex flex-row justify-between items-center mb-2">
                                <label className="block leading-5 text-sm font-normal">Hours Sold Per Month
                                </label>
                                <input
                                    type="number"
                                    value={hours}
                                    onChange={(e) => {
                                        let newValue = parseInt(e.target.value) || 0;
                                        newValue = Math.max(minMaxValues.hours.min, Math.min(minMaxValues.hours.max, newValue));
                                        setHours(newValue);
                                    }}
                                    className="py-3 px-4 text-center border border-white/30 rounded font-bold text-lg w-2/5 bg-transparent text-white mt-1 outline-none focus:border-[#0cd1e5] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                            </div>
                            <div
                                className="relative w-full h-2.5 max-h-2.5 rounded bg-[#343434] cursor-pointer mb-0.5 mt-1"
                                ref={sliderRefs.hours}
                                onMouseDown={() => handleMouseDown("hours")}
                            >
                                <div
                                    className="absolute h-2.5 rounded bg-[#0cd1e5]"
                                    style={{ width: `${((hours - minMaxValues.hours.min) / (minMaxValues.hours.max - minMaxValues.hours.min)) * 100}%` }}
                                />
                                <div
                                    className="absolute top-1/2 w-5 h-5 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-grab"
                                    style={{ left: `${((hours - minMaxValues.hours.min) / (minMaxValues.hours.max - minMaxValues.hours.min)) * 100}%` }}
                                />
                            </div>
                            <div className="text-xs flex justify-between items-center text-white/70 mb-2">
                                <div>50</div>
                                <div>5,000</div>
                            </div>
                        </div>
                        <div>
                            <div className="flex flex-row justify-between items-center mb-2">
                                <label className="block leading-5 text-sm font-normal">Monthly Overhead</label>
                                <input
                                    type="number"
                                    value={monthly}
                                    onChange={(e) => {
                                        let newValue = parseInt(e.target.value) || 0;
                                        newValue = Math.max(minMaxValues.monthly.min, Math.min(minMaxValues.monthly.max, newValue));
                                        setMonthly(newValue);
                                    }}
                                    className="py-3 px-4 text-center border border-white/30 rounded font-bold text-lg w-2/5 bg-transparent text-white mt-1 outline-none focus:border-[#0cd1e5] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                            </div>
                            <div
                                className="relative w-full h-2.5 max-h-2.5 rounded bg-[#343434] cursor-pointer mb-0.5 mt-1"
                                ref={sliderRefs.monthly}
                                onMouseDown={() => handleMouseDown("monthly")}
                            >
                                <div
                                    className="absolute h-2.5 rounded bg-[#0cd1e5]"
                                    style={{ width: `${((monthly - minMaxValues.monthly.min) / (minMaxValues.monthly.max - minMaxValues.monthly.min)) * 100}%` }}
                                />
                                <div
                                    className="absolute top-1/2 w-5 h-5 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-grab"
                                    style={{ left: `${((monthly - minMaxValues.monthly.min) / (minMaxValues.monthly.max - minMaxValues.monthly.min)) * 100}%` }}
                                />
                            </div>
                            <div className="text-xs flex justify-between items-center text-white/70 mb-2">
                                <div>99</div>
                                <div>30,000</div>
                            </div>
                        </div>
                        <div>
                            <div className="text-[15px] mb-2">
                                Expected Lifespan of The Light System (Years)
                            </div>
                            <input
                                type="number"
                                value={20}
                                readOnly
                                className="p-3 border border-white/30 rounded font-bold text-lg bg-transparent text-white mt-1 outline-none focus:border-[#0cd1e5]"
                            />
                            <div className="text-[13px] text-white/70 mb-2">Included in your purchase is an unlimited 3-year parts and labor warranty (this can be extended after your warranty is over for $100/month)</div>
                        </div>
                    </div>
                    <div className="h-fit max-w-[340px] flex flex-wrap flex-col gap-6 text-white bg-[#0cd1e5] rounded-2xl p-10">
                        <div className="flex flex-col gap-0">
                            <div className="text-xl font-bold leading-[26px]">Expected Annual Revenue</div>
                            <div className="text-3xl font-bold leading-10">{formatCurrency(annualRevenue)}</div>
                        </div>

                        <div className="text-[13px] text-white/70">
                            <div>Price Per Hour x Hours Sold Per Month = </div>
                            <span>Expected Monthly Revenue</span>
                        </div>

                        <div className="w-full h-px bg-current opacity-30 border-none m-0 flex-shrink-0"></div>

                        <div className="flex justify-between text-[15px] font-bold">
                            <div className="flex flex-col gap-0">
                                <div>Expected Annual</div>
                                <div>Overhead</div>
                            </div>
                            <div>{formatCurrency(annualOverhead)}</div>
                        </div>

                        <div className="w-full h-px bg-current opacity-30 border-none m-0 flex-shrink-0"></div>

                        <div className="flex flex-col gap-0">
                            <div className="text-xl font-bold leading-[26px]">Expected Annual Profit</div>
                            <div className="text-3xl font-bold leading-10">{formatCurrency(annualProfit)}</div>
                        </div>

                        <div className="text-[13px] text-white/70">Net profit after covering all expenses.</div>

                        <div className="flex flex-col gap-0">
                            <div className="text-xl font-bold leading-[26px]">Annual ROI</div>
                            <div className="text-3xl font-bold leading-10">{annualROI.toFixed(2)}%</div>
                        </div>

                        <div className="text-[13px] text-white/70">The return on investment expressed as a percentage.</div>

                        <div className="flex flex-col gap-0">
                            <div className="text-xl font-bold leading-[26px]">Lifetime ROI</div>
                            <div className="text-3xl font-bold leading-10">{lifetimeROI.toFixed(2)}%</div>
                        </div>

                        <div className="w-full text-xl font-bold break-words">
                            Are you ready to bring your wellness center to the next level?
                        </div>

                        <button className="rounded bg-black text-white font-light text-lg py-3 px-8 cursor-pointer">
                            Get Started Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ROIExample;