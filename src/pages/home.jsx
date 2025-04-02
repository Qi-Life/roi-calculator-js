import { useRef, useState, useEffect } from 'react';
import { GoChevronUp } from 'react-icons/go';
import {
    getGroupCoreWellnessPrograms,
    getResultRoiCalculator,
    referalCommissions,
    getAnnualOverhead,
    getDirectProductSales,
    getQuiCoilRentals,
    getQuantumImmersionFilmRentals,
    getUnlimitedAccessMemberships,
    getSessionBundles,
} from '../utils/ROI';
import { styles } from './style';
import './styleRepons.css';
import AnimatedNumber from '../components/AnimatedNumber';
import ReusableInput from '../components/ReusableInput';
import ReusableSlider from '../components/ReusableSlider';
import maximize from '../assets/maximize-2.png';
import imageMobile from '../assets/imageMobile.png';
import imageWeb from '../assets/imageWeb.png';
import arrowDownIcon from '../assets/arrow_down.png';
import arrowUpIcon from '../assets/arrow_up.png';
import bgLinear from '../assets/bg-linear.png';
import { MdOutlineKeyboardDoubleArrowUp } from 'react-icons/md';
const Home = () => {
    // const [showScrollTop, setShowScrollTop] = useState(false);
    const formatCurrency = (
        value,
        isTyping = false,
        disableCurrency = false,
    ) => {
        if (value === '' || value === undefined || value === null)
            return disableCurrency ? '0' : '0';

        if (isTyping) {
            if (value === '.') return disableCurrency ? '.' : '.';
            return disableCurrency ? value : `${value}`;
        }

        if (value === '.') return disableCurrency ? '0' : '0';

        if (typeof value === 'string' && /^\d+\.\d{1}$/.test(value)) {
            const numberValue = parseFloat(value).toFixed(2);
            return disableCurrency ? numberValue : `${numberValue}`;
        }

        const numberValue = parseFloat(value);
        if (isNaN(numberValue)) return disableCurrency ? '0' : '0';

        const formattedValue = numberValue.toLocaleString('en-US', {
            minimumFractionDigits: numberValue % 1 === 0 ? 0 : 2,
            maximumFractionDigits: 2,
        });

        return disableCurrency ? formattedValue : `$${formattedValue}`;
    };
    const [isOpen, setIsOpen] = useState(false);
    const [showRightDiv, setShowRightDiv] = useState(false);

    const [isDragging, setIsDragging] = useState(false);
    const [activeSlider, setActiveSlider] = useState(null);
    //Monthly Overhead
    const [overhead, setOverhead] = useState(11000);

    // Initial
    const [initial, setInitial] = useState(120000);

    // Group session
    const [sessions, setSessions] = useState(94);
    const [peoplePerSession, setPeoplePerSession] = useState(6);
    const [pricePerSession, setPricePerSession] = useState(60);
    const [monthlyOverSession, setMonthlyOverSession] = useState(0);

    // Direct Product
    const [qiCoilSystem, setQiCoilSystem] = useState(30);

    //Referral Commissions
    const [referralNumber, setReferralNumber] = useState(20);
    const [referralCommission, setReferralCommission] = useState(50);

    // Qi Coil Rentals
    const [rentals, setRentals] = useState(10);
    const [pricePerRental, setPricePerRental] = useState(400);

    // Quantum Immersion Film Experience
    const [ticketsSold, setTicketsSold] = useState(200);
    const [pricePerTicket, setPricePerTicket] = useState(35);

    // Unlimited Access Memberships
    const [newMembers, setNewMembers] = useState(10);
    const [pricePerMembership, setPricePerMembership] = useState(600);

    // Session bundles
    const [bundlesSold, setBundlesSold] = useState(20);
    const [pricePerBundle, setPricePerBundle] = useState(600);

    const sliderRefs = {
        overhead: useRef(null),
        referralNumber: useRef(null),
        referralCommission: useRef(null),
        initial: useRef(null),
        sessions: useRef(null),
        peoplePerSession: useRef(null),
        pricePerSession: useRef(null),
        monthlyOverSession: useRef(null),
        qiCoilSystem: useRef(null),
        rentals: useRef(null),
        pricePerRental: useRef(null),
        ticketsSold: useRef(null),
        pricePerTicket: useRef(null),
        newMembers: useRef(null),
        pricePerMembership: useRef(null),
        bundlesSold: useRef(null),
        pricePerBundle: useRef(null),
    };

    const [valueAvgEvenue, setValueAvgEvenue] = useState(2440);
    const [valueRevenueDirec, setValueRevenueDirec] = useState(48800);
    const [valueTotalMembers, setValueTotalMembers] = useState(71.76);
    const [valueExpectedLifetime, setValueExpectedLifetime] = useState(20);
    const [isShowScrollBg, setIsShowScrollBg] = useState(true);

    //*ref */
    const scrollLeftDivRef = useRef(null);
    const scrollTopRef = useRef(null);


    const updateValue = (clientX, sliderType) => {
        const ref = sliderRefs[sliderType];
        if (!ref.current) return;

        const { min, max } = minMaxValues[sliderType];
        const rect = ref.current.getBoundingClientRect();
        const percent = (clientX - rect.left) / rect.width;

        let newValue = Math.round(min + percent * (max - min));
        newValue = Math.max(min, Math.min(max, newValue));

        const isCurrency = [
            'overhead',
            'initial',
            'pricePerSession',
            'pricePerRental',
            'pricePerTicket',
            'pricePerMembership',
            'pricePerBundle',
        ].includes(sliderType);

        if (isCurrency) {
            setTempValue(formatCurrency(newValue));
        }

        switch (sliderType) {
            case 'overhead':
                setOverhead(newValue);
                break;
            case 'referralNumber':
                setReferralNumber(newValue);
                break;
            case 'referralCommission':
                setReferralCommission(newValue);
                break;
            case 'initial':
                setInitial(newValue);
                break;
            case 'sessions':
                setSessions(newValue);
                break;
            case 'peoplePerSession':
                setPeoplePerSession(newValue);
                break;
            case 'pricePerSession':
                setPricePerSession(newValue);
                break;
            case 'monthlyOverSession':
                setMonthlyOverSession(newValue);
                break;
            case 'qiCoilSystem':
                setQiCoilSystem(newValue);
                break;
            case 'rentals':
                setRentals(newValue);
                break;
            case 'pricePerRental':
                setPricePerRental(newValue);
                break;
            case 'ticketsSold':
                setTicketsSold(newValue);
                break;
            case 'pricePerTicket':
                setPricePerTicket(newValue);
                break;
            case 'newMembers':
                setNewMembers(newValue);
                break;
            case 'pricePerMembership':
                setPricePerMembership(newValue);
                break;
            case 'pricePerBundle':
                setPricePerBundle(newValue);
                break;
            case 'bundlesSold':
                setBundlesSold(newValue);
                break;
            default:
                console.error(`Slider type "${sliderType}" không hợp lệ.`);
        }
    };

    const { monthlyRevenue, yearlyRevenue } = getGroupCoreWellnessPrograms(
        sessions,
        peoplePerSession,
        pricePerSession,
    );
    const { monthlyRevenueDirect, yearlyRevenueDirect } = getDirectProductSales(
        valueAvgEvenue,
        qiCoilSystem,
    );
    const { monthlyRevenueQuiCoil, yearlyRevenueQuiCoil } = getQuiCoilRentals(
        rentals,
        pricePerRental,
    );
    const { monthlyRevenueQuantum, yearlyRevenueQuantum } =
        getQuantumImmersionFilmRentals(ticketsSold, pricePerTicket);
    const { revenueOnMonth12, yearlyRevenueUnlimit } =
        getUnlimitedAccessMemberships(newMembers, pricePerMembership);
    const { monthlyRevenueSessionBundles, yearlyRevenueSessionBundles } =
        getSessionBundles(bundlesSold, pricePerBundle);
    const { monthlyReferalCommissions, yearlyReferalCommissions } =
        referalCommissions(referralNumber, referralCommission);
    const annualRevenue =
        yearlyRevenue +
        yearlyRevenueDirect +
        yearlyRevenueQuiCoil +
        yearlyRevenueQuantum +
        yearlyRevenueUnlimit +
        yearlyRevenueSessionBundles +
        yearlyReferalCommissions;
    const resultMonthlyOverhead = getAnnualOverhead(overhead);
    const { annualProfit, annualRoi, expectedLifeTimeRevenue, lifeRoi } =
        getResultRoiCalculator(
            initial,
            resultMonthlyOverhead,
            annualRevenue,
            valueExpectedLifetime,
        );

    // useEffect(() => {
    //     const handleScroll = () => {
    //         const scrollTop =
    //             document.documentElement.scrollTop || document.body.scrollTop;
    //         const windowHeight = window.innerHeight;
    //         const docHeight = document.documentElement.scrollHeight;
    //         const scrollPercentage = (scrollTop + windowHeight) / docHeight;
    //         const isMobile = window.innerWidth < 768;
    //         console.log(`Scroll: ${scrollPercentage}`);
    //         setShowScrollTop(isMobile && scrollPercentage > 0.9);
    //     };

    //     window.addEventListener('scroll', handleScroll);
    //     window.addEventListener('resize', handleScroll);

    //     handleScroll();

    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //         window.removeEventListener('resize', handleScroll);
    //     };
    // }, []);

    const scrollToTop = () => {
        window.parent.postMessage({ action: "scrollToIframe" }, "*");
    };

    useEffect(() => {
        const handleScroll = () => {
            if (scrollLeftDivRef.current) {
                console.log('__,', scrollLeftDivRef.current.scrollTop)
                setIsShowScrollBg(scrollLeftDivRef.current.scrollTop === 0);
                window.parent.postMessage({ action: "leftBarScroll" }, "*");
            }
        };
        const div = scrollLeftDivRef.current;
        if (div) {
            div.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (div) {
                div.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    const [isShowScrollTopDiv, setShowScrollTopDiv] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            const div = scrollLeftDivRef.current;
            if (!div) return;

            const isAtBottom =
                div.scrollTop > 0 &&
                div.scrollTop + div.clientHeight >= div.scrollHeight - 1;

            setShowScrollTopDiv(isAtBottom);
        };

        const div = scrollLeftDivRef.current;
        if (div) {
            div.addEventListener('scroll', handleScroll);
        }
        return () => {
            div.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const sendHeight = () => {
            if (window.parent !== window) {
                window.parent.postMessage(
                    { frameHeight: document.documentElement.scrollHeight },
                    '*',
                );
            }
        };

        sendHeight();
        const handleResize = () => {
            clearTimeout(window.__heightTimer);
            window.__heightTimer = setTimeout(sendHeight, 200);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="bg-[#F2EACE] md:bg-[#ffffff] flex flex-col justify-center items-center" ref={scrollTopRef}>
            {/* <img src={imageWeb} className="hidden 2xl:block h-[111px] mb-8" /> */}
            <div className="flex flex-col sm:mb-[43px] bg-[#F2EACE] md:rounded-3xl gap-5 mb:gap-10 2xl:gap-14 md:pt-8 2xl:pt-12 md:pr-[42px] 2xl:pb-8 2xl:pr-12 md:pl-5 2xl:pl-9 w-full md:m-w-[914px] lg:w-[914px]  2xl:w-[914px] md:mt-[20px]  2xl:my-[50px md:pb-[24px]">
                <div>
                    {/* <img src={imageMobile} className="2xl:hidden w-full h-20" /> */}
                    <h2 className="text-[#143E41] text-[24px]  md:text-[40px] my-[21px] md:my-[0px] h-[50px] sm:h-[100px] md:h-12 md:mb-12 font-bold text-center">
                        ROI Calculator
                    </h2>
                    <div className="flex flex-col md:flex-row md:gap-[22px] 2xl:gap-[36px] justify-between">
                        {/* div left */}
                        <div className="relative">
                            <div
                                ref={scrollLeftDivRef}
                                className="scrollbar-hide px-[10px] rounded-lg 2xl:pl-4 2xl:pr-4 text-white w-full sm:overflow-y-auto sm:pl-[22.1px] sm:pr-[20.1px] mb-20 md:mb-0 2xl:px-0 2xl:py-0  h-[full] md:h-[650px]  2xl:h-[770px]
                                 flex flex-col gap-4 sm:gap-8 md:w-[460px] 2xl:w-[442px] 2xl:mt-4 sm:!pb-[70px] 2xl:!pb-[100px]"
                            >
                                {/* Initial Investment */}
                                <div className="space-y-[12.2px] sm:space-y-[19.2px]md:space-y-4 2xl:space-y-6">
                                    <div>
                                        <div className="flex flex-row justify-between items-end ">
                                            <label className="block text-[16px] md:text-[20px] font-semibold text-[#297C82]">
                                                Initial Investment
                                            </label>
                                            <ReusableInput
                                                value={initial}
                                                setValue={setInitial}
                                                min={30000}
                                                step={5000}
                                                max={500000}
                                                formatCurrency={formatCurrency}
                                            />
                                        </div>

                                        {/* Slider */}
                                        <ReusableSlider
                                            value={initial}
                                            setValue={setInitial}
                                            step={5000}
                                            min={30000}
                                            max={500000}
                                        />
                                        <div className={styles.minMaxPrice}>
                                            <div>
                                                $
                                                {(30000).toLocaleString(
                                                    'en-US',
                                                )}
                                            </div>
                                            <div>
                                                $
                                                {(500000).toLocaleString(
                                                    'en-US',
                                                )}
                                            </div>
                                        </div>

                                        {/* Mô tả giá trị */}
                                        <div className="flex flex-col text-[11.2px]  2xl:text-[14px] text-[#0A1F20] mt-[0px] 2xl:mt-[16px] font-[400] leading-[25px]">
                                            <div>
                                                Qi Life Center License =
                                                $120,000
                                            </div>
                                            <div>
                                                Qi Life Center Master License =
                                                $250,000
                                            </div>
                                            <div>
                                                Qi Life Center Master Regional
                                                License = $500,000
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 1. Group Core Wellness Programs */}
                                <div className="space-y-[12.2px] sm:space-y-[19.2px]md:space-y-4 2xl:space-y-6">
                                    <div className="flex flex-row justify-between items-center m-0">
                                        <label
                                            className={`${styles.lableGroup}`}
                                        >
                                            Group Core Wellness
                                        </label>
                                    </div>

                                    <div>
                                        <div className="flex flex-row justify-between items-end ">
                                            <label
                                                className={`${styles.lableChildren}`}
                                            >
                                                Sessions per month
                                            </label>
                                            <ReusableInput
                                                value={sessions}
                                                setValue={setSessions}
                                                min={50}
                                                max={5000}
                                                formatCurrency={formatCurrency}
                                                disableCurrency={true}
                                            />
                                        </div>
                                        <ReusableSlider
                                            value={sessions}
                                            setValue={setSessions}
                                            min={50}
                                            max={5000}
                                        />
                                        <div className={styles.minMaxPrice}>
                                            <div>50</div>
                                            <div>
                                                {(5000).toLocaleString('en-US')}
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex flex-row justify-between items-end ">
                                            <label
                                                className={`${styles.lableChildren}`}
                                            >
                                                People per session
                                            </label>
                                            <ReusableInput
                                                value={peoplePerSession}
                                                setValue={setPeoplePerSession}
                                                min={1}
                                                max={30}
                                                formatCurrency={formatCurrency}
                                                disableCurrency={true}
                                            />
                                        </div>
                                        <ReusableSlider
                                            value={peoplePerSession}
                                            setValue={setPeoplePerSession}
                                            min={1}
                                            max={30}
                                        />
                                        <div className={styles.minMaxPrice}>
                                            <div>1</div>
                                            <div>30</div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex flex-row justify-between items-end">
                                            <label
                                                className={`${styles.lableChildren}`}
                                            >
                                                {' '}
                                                Price per session
                                            </label>
                                            <ReusableInput
                                                value={pricePerSession}
                                                setValue={setPricePerSession}
                                                min={10}
                                                max={100}
                                                formatCurrency={formatCurrency}
                                            />
                                        </div>
                                        <ReusableSlider
                                            value={pricePerSession}
                                            setValue={setPricePerSession}
                                            min={10}
                                            max={100}
                                        />
                                        <div className={styles.minMaxPrice}>
                                            <div>$10</div>
                                            <div>$100</div>
                                        </div>
                                    </div>
                                </div>

                                {/* 2. Direct Product Sales */}
                                <div className="space-y-[12.2px] sm:space-y-[19.2px]md:space-y-4 2xl:space-y-6">
                                    <div className="flex flex-row justify-between items-center m-0">
                                        <label
                                            className={`${styles.lableGroup}`}
                                        >
                                            Direct Product Sales
                                        </label>
                                    </div>

                                    <div>
                                        <div className="flex flex-row justify-between items-end">
                                            <label
                                                className={`${styles.lableChildren}`}
                                            >
                                                Qi Coil system sold
                                            </label>
                                            <ReusableInput
                                                value={qiCoilSystem}
                                                setValue={setQiCoilSystem}
                                                min={0}
                                                max={200}
                                                formatCurrency={formatCurrency}
                                                disableCurrency={true}
                                            />
                                        </div>
                                        <ReusableSlider
                                            value={qiCoilSystem}
                                            setValue={setQiCoilSystem}
                                            min={0}
                                            max={200}
                                        />
                                        <div className={styles.minMaxPrice}>
                                            <div>0</div>
                                            <div>200</div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row justify-between items-end mb-5">
                                        <label className="leading-[25px] text-[14px] font-normal text-[#0A1F20] flex items-end">
                                            {`Average Revenue per Qi Coil = $${valueAvgEvenue.toLocaleString()}`}
                                        </label>
                                        {/* <input
                                        type="text"
                                        value={valueAvgEvenue}
                                        readOnly
                                        className="py-[12.8px] 2xl:py-[12px] px-[9.6px] 2xl:px-[16px] w-[112px] 2xl:w-[140px] h-[35.2px] 2xl:h-[44px] text-center border border-black rounded-[8px] font-[590] text-[12.8px] 2xl:text-[16px] bg-white text-[#0A1F20] outline-none  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none leading-5 "
                                    /> */}
                                    </div>
                                </div>

                                {/* 3. Referal Commissions */}
                                <div className="space-y-[12.2px] sm:space-y-[19.2px]md:space-y-4 2xl:space-y-6">
                                    <div className="flex flex-row justify-between items-center m-0">
                                        <label
                                            className={`${styles.lableGroup}`}
                                        >
                                            Referral Commissions
                                        </label>
                                    </div>

                                    <div>
                                        <div className="flex flex-row justify-between items-end">
                                            <label
                                                className={`${styles.lableChildren}`}
                                            >
                                                Number of affiliate
                                            </label>
                                            <ReusableInput
                                                value={referralNumber}
                                                setValue={setReferralNumber}
                                                min={0}
                                                max={500}
                                                formatCurrency={formatCurrency}
                                                disableCurrency={true}
                                            />
                                        </div>
                                        <ReusableSlider
                                            value={referralNumber}
                                            setValue={setReferralNumber}
                                            min={0}
                                            max={500}
                                        />
                                        <div className={styles.minMaxPrice}>
                                            <div>0</div>
                                            <div>500</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex flex-row justify-between items-end">
                                            <label
                                                className={`${styles.lableChildren}`}
                                            >
                                                Commission override per
                                                affiliate
                                            </label>
                                            <ReusableInput
                                                value={referralCommission}
                                                setValue={setReferralCommission}
                                                min={10}
                                                max={200}
                                                formatCurrency={formatCurrency}
                                            />
                                        </div>
                                        <ReusableSlider
                                            value={referralCommission}
                                            setValue={setReferralCommission}
                                            min={10}
                                            max={200}
                                        />
                                        <div className={styles.minMaxPrice}>
                                            <div>$10</div>
                                            <div>$200</div>
                                        </div>
                                    </div>
                                </div>

                                {/* 4. Qi Coil Rentals */}
                                <div className="space-y-[12.2px] sm:space-y-[19.2px]md:space-y-4 2xl:space-y-6">
                                    <div className="flex flex-row justify-between items-center m-0">
                                        <label
                                            className={`${styles.lableGroup}`}
                                        >
                                            Qi Coil Rentals
                                        </label>
                                    </div>

                                    <div>
                                        <div className="flex flex-row justify-between items-end">
                                            <label
                                                className={`${styles.lableChildren}`}
                                            >
                                                Rentals
                                            </label>
                                            <ReusableInput
                                                value={rentals}
                                                setValue={setRentals}
                                                min={0}
                                                max={100}
                                                formatCurrency={formatCurrency}
                                                disableCurrency={true}
                                            />
                                        </div>
                                        <ReusableSlider
                                            value={rentals}
                                            setValue={setRentals}
                                            min={0}
                                            max={100}
                                        />
                                        <div className={styles.minMaxPrice}>
                                            <div>0</div>
                                            <div>100</div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex flex-row justify-between items-end">
                                            <label
                                                className={`${styles.lableChildren}`}
                                            >
                                                Price per rental
                                            </label>
                                            <ReusableInput
                                                value={pricePerRental}
                                                setValue={setPricePerRental}
                                                min={200}
                                                max={1000}
                                                formatCurrency={formatCurrency}
                                            />
                                        </div>
                                        <ReusableSlider
                                            value={pricePerRental}
                                            setValue={setPricePerRental}
                                            min={200}
                                            max={1000}
                                        />
                                        <div className={styles.minMaxPrice}>
                                            <div>$200</div>
                                            <div>
                                                $
                                                {(1000).toLocaleString('en-US')}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 5. Quantum Immersion Film Experience */}
                                <div className="space-y-[12.2px] sm:space-y-[19.2px]md:space-y-4 2xl:space-y-6">
                                    <div className="flex flex-row justify-between items-center m-0">
                                        <label
                                            className={`${styles.lableGroup}`}
                                        >
                                            Quantum Immersion Film Experience
                                        </label>
                                    </div>

                                    <div>
                                        <div className="flex flex-row justify-between items-end">
                                            <label
                                                className={`${styles.lableChildren}`}
                                            >
                                                Tickets sold
                                            </label>
                                            <ReusableInput
                                                value={ticketsSold}
                                                setValue={setTicketsSold}
                                                min={0}
                                                max={500}
                                                formatCurrency={formatCurrency}
                                                disableCurrency={true}
                                            />
                                        </div>
                                        <ReusableSlider
                                            value={ticketsSold}
                                            setValue={setTicketsSold}
                                            min={0}
                                            max={500}
                                        />
                                        <div className={styles.minMaxPrice}>
                                            <div>0</div>
                                            <div>500</div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex flex-row justify-between items-end">
                                            <label
                                                className={`${styles.lableChildren}`}
                                            >
                                                Price per ticket
                                            </label>
                                            <ReusableInput
                                                value={pricePerTicket}
                                                setValue={setPricePerTicket}
                                                min={30}
                                                max={100}
                                                formatCurrency={formatCurrency}
                                            />
                                        </div>
                                        <ReusableSlider
                                            value={pricePerTicket}
                                            setValue={setPricePerTicket}
                                            min={30}
                                            max={100}
                                        />
                                        <div className={styles.minMaxPrice}>
                                            <div>$30</div>
                                            <div>$100</div>
                                        </div>
                                    </div>
                                </div>

                                {/* 6. Unlimited Access Memberships */}
                                <div className="space-y-[12.2px] sm:space-y-[19.2px]md:space-y-4 2xl:space-y-6">
                                    <div className="flex flex-row justify-between items-center m-0">
                                        <label
                                            className={`${styles.lableGroup}`}
                                        >
                                            Unlimited Access Memberships
                                        </label>
                                    </div>

                                    <div>
                                        <div className="flex flex-row justify-between items-end">
                                            <label
                                                className={`${styles.lableChildren}`}
                                            >
                                                New members per month
                                            </label>
                                            <ReusableInput
                                                value={newMembers}
                                                setValue={setNewMembers}
                                                min={0}
                                                max={50}
                                                formatCurrency={formatCurrency}
                                                disableCurrency={true}
                                            />
                                        </div>
                                        <ReusableSlider
                                            value={newMembers}
                                            setValue={setNewMembers}
                                            min={0}
                                            max={50}
                                        />
                                        <div className={styles.minMaxPrice}>
                                            <div>0</div>
                                            <div>50</div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex flex-row justify-between items-end">
                                            <label
                                                className={`${styles.lableChildren}`}
                                            >
                                                Price per membership
                                            </label>
                                            <ReusableInput
                                                value={pricePerMembership}
                                                setValue={setPricePerMembership}
                                                min={300}
                                                max={1500}
                                                formatCurrency={formatCurrency}
                                            />
                                        </div>
                                        <ReusableSlider
                                            value={pricePerMembership}
                                            setValue={setPricePerMembership}
                                            min={300}
                                            max={1500}
                                        />
                                        <div className={styles.minMaxPrice}>
                                            <div>$300</div>
                                            <div>
                                                $
                                                {(1500).toLocaleString('en-US')}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 7. Session bundles */}
                                <div className="space-y-[12.2px] sm:space-y-[19.2px]md:space-y-4 2xl:space-y-6">
                                    <div className="flex flex-row justify-between items-center m-0">
                                        <label
                                            className={`${styles.lableGroup}`}
                                        >
                                            20 Session Bundles
                                        </label>
                                    </div>

                                    <div>
                                        <div className="flex flex-row justify-between items-end">
                                            <label
                                                className={`${styles.lableChildren}`}
                                            >
                                                Bundles sold
                                            </label>
                                            <ReusableInput
                                                value={bundlesSold}
                                                setValue={setBundlesSold}
                                                min={0}
                                                max={50}
                                                formatCurrency={formatCurrency}
                                                disableCurrency={true}
                                            />
                                        </div>
                                        <ReusableSlider
                                            value={bundlesSold}
                                            setValue={setBundlesSold}
                                            min={0}
                                            max={50}
                                        />
                                        <div className={styles.minMaxPrice}>
                                            <div>0</div>
                                            <div>50</div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex flex-row justify-between items-end">
                                            <label
                                                className={`${styles.lableChildren}`}
                                            >
                                                Price
                                            </label>
                                            <ReusableInput
                                                value={pricePerBundle}
                                                setValue={setPricePerBundle}
                                                min={300}
                                                max={1500}
                                                formatCurrency={formatCurrency}
                                            />
                                        </div>
                                        <ReusableSlider
                                            value={pricePerBundle}
                                            setValue={setPricePerBundle}
                                            min={300}
                                            max={1500}
                                        />
                                        <div className={styles.minMaxPrice}>
                                            <div>$300</div>
                                            <div>
                                                $
                                                {(1500).toLocaleString('en-US')}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-[12.2px] sm:space-y-[19.2px]md:space-y-4 2xl:space-y-6">
                                    <div>
                                        <div className="">
                                            <div className="flex flex-row justify-between items-end ">
                                                <label
                                                    className={`${styles.lableGroup}`}
                                                >
                                                    Monthly Overhead
                                                </label>
                                                <ReusableInput
                                                    value={overhead}
                                                    setValue={setOverhead}
                                                    min={99}
                                                    max={30000}
                                                    formatCurrency={
                                                        formatCurrency
                                                    }
                                                />
                                            </div>
                                            <ReusableSlider
                                                value={overhead}
                                                setValue={setOverhead}
                                                min={99}
                                                max={30000}
                                            />
                                            <div className={styles.minMaxPrice}>
                                                <div>
                                                    $
                                                    {(99).toLocaleString(
                                                        'en-US',
                                                    )}
                                                </div>
                                                <div>
                                                    $
                                                    {(30000).toLocaleString(
                                                        'en-US',
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <div className="flex flex-row justify-between items-end">
                                                <label
                                                    className={`${styles.lableGroup}`}
                                                >
                                                    Expected Lifetime (Years)
                                                </label>
                                                <ReusableInput
                                                    value={
                                                        valueExpectedLifetime
                                                    }
                                                    setValue={
                                                        setValueExpectedLifetime
                                                    }
                                                    min={0}
                                                    max={9999999999}
                                                    formatCurrency={
                                                        formatCurrency
                                                    }
                                                    disableCurrency={true}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {!isShowScrollTopDiv ? (
                                <div
                                    className={`hidden sm:flex justify-center items-end h-[40px] 2xl:h-[40px] inset-x-0 absolute bottom-0 bg-[#F2EACE] ${isShowScrollBg ? "bg-[url('/src/assets/bg-linear.png')] bg-[length:100%_100%] " : ''}`}
                                >
                                    <img
                                        src={arrowDownIcon}
                                        alt=""
                                        className="h-max"
                                    />
                                </div>
                            ) : (
                                <div
                                    className={`hidden sm:flex justify-center items-end h-[40px] 2xl:h-[40px] inset-x-0 absolute bottom-0 bg-[#F2EACE] ${isShowScrollBg ? "bg-[url('/src/assets/bg-linear.png')] bg-[length:100%_100%] " : ''} cursor-pointer`}
                                    onClick={() => {
                                        scrollLeftDivRef.current.scrollTo({
                                            top: 0,
                                            behavior: 'smooth',
                                        });
                                    }}
                                >
                                    <MdOutlineKeyboardDoubleArrowUp
                                        size={40}
                                        style={{ color: '#297c82' }}
                                    />
                                </div>
                            )}
                        </div>
                        {/* div right */}
                        <div
                            className={`p-6 rounded-[16px] text-center bg-[#297C82] 
                        w-full md:w-[354px] gap-[10px] text-white shadow-lg 
                         md:px-6 md:py-4 2xl:px-6 2xl:py-8 md:rounded-2xl md:max-h-[630px] 2xl:min-h-[740px]`}
                            style={{ zIndex: 49 }}
                        >
                            <div className="flex flex-col">
                                <div className="text-lg pt-4 mb-4 text-[#F2EACE] font-bold leading-[34px]">
                                    Expected Annual Revenue
                                </div>
                                <div className="text-3xl">
                                    <AnimatedNumber
                                        value={annualRevenue}
                                        prefix="$"
                                    />
                                </div>
                            </div>
                            <div className='opacity-30'>
                                <hr className="border-[#90B7B0] border-[2px] my-6" />
                            </div>
                            <div className="flex justify-between px-2 font-bold mt-[8px]">
                                <div className="flex flex-col items-start gap-0 text-xs text-[#F2EACE]">
                                    <div>Expected Annual</div>
                                    <div>Overhead</div>
                                </div>
                                <div className="text-base text-[#94BEC0]">
                                    $
                                    {resultMonthlyOverhead.toLocaleString(
                                        'en-US',
                                        {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        },
                                    )}
                                </div>
                            </div>
                            <div className='opacity-30'>
                                <hr className="border-[#90B7B0] border-[2px] my-6" />
                            </div>

                            <div className="flex flex-col gap-0 2xl:gap-[24px]">
                                <div className="flex flex-col py-[10.5px] ">
                                    <div className="text-lg text-[#F2EACE] font-bold leading-[34px]">
                                        Expected Annual Profit
                                    </div>
                                    <div className="text-2xl">
                                        <AnimatedNumber
                                            value={annualProfit}
                                            prefix="$"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col py-[10.5px] ">
                                    <div className="text-lg text-[#F2EACE] font-bold leading-[34px]">
                                        Annual ROI
                                    </div>
                                    <div className="text-2xl">
                                        <AnimatedNumber
                                            value={Number(annualRoi)}
                                            suffix="%"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col py-[10.5px] mb-5 md:mb-0">
                                    <div className="text-lg text-[#F2EACE] font-bold leading-[34px]">
                                        Lifetime ROI
                                    </div>
                                    <div className="text-2xl">
                                        <AnimatedNumber
                                            value={Number(lifeRoi)}
                                            suffix="%"
                                        />
                                    </div>
                                </div>
                            </div>
                            <p className='text-center text-[10px] mt-auto py-[22px]'>
                                The ROI Calculator illustrates potential earnings but does not guarantee income or financial results.
                            </p>
                        </div>
                    </div>
                    <div className="sm:hidden flex justify-end py-[20px]">
                        <button
                            id="backToTop"
                            className="w-[112px] h-[35px] bg-[#297C82] text-white text-[13px] font-w-[590] border-2 border-[#FFFBEB] rounded-[10px] cursor-pointer hover:opacity-85 "
                            onClick={scrollToTop}
                        >
                            Back to top
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
