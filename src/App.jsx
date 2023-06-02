import React, { useEffect, useState } from 'react'
// import "./index.css"

const App = () => {
    const CHECK_ICON = "/assets/images/icon-check.svg"
    const DISCOUNT_RATE = 0.25
    const priceOptions = [
    { pageViews: '10K', billingPrice: 8 },
    { pageViews: '50K', billingPrice: 12 },
    { pageViews: '100K', billingPrice: 16 },
    { pageViews: '500K', billingPrice: 24 },
    { pageViews: '1M', billingPrice: 36 },
  ];

    const [ priceValue, setPriceValue ] = useState(0)
    const [ isMonthly, setIsMonthly ] = useState(true)
    const [isDarkMode, setIsDarkMode] = useState(false);

    // handling screen change via react
    const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

    // handling billing period
    const handleBillingPeriod = () => {
        setIsMonthly(!isMonthly)
    }

    // handling price change
    const handlePriceChange = (e) => {
        setPriceValue(parseInt(e.target.value))
    }

    const calculateBackground = () => {
        const gradientPercentage = (priceValue / (priceOptions.length - 1)) * 100;
        return `linear-gradient(90deg, var(--cyan-sm) ${gradientPercentage}%, var(--greyblue-sm) ${100 - gradientPercentage}%)`;
    };

    const handleRotateElement = () => {
        const rotateAngle = (priceValue / (priceOptions.length - 1)) * 360
        return `rotate(${rotateAngle})`
    }

    const handleModeToggle = () => {
        setIsDarkMode(!isDarkMode);
    };

  return (
    <main className={isDarkMode ? "dark-mode" : ""}>
        <button onClick={handleModeToggle} className='themeToggleButton'>
            {
                isDarkMode ? '🔆' : '🌙'
            }
        </button>
        {/* Banner section */}
        <section className='bannerSection'>
            <h1>
                Simple, traffic-based pricing
            </h1>
            <sub>
                Sign-up for our 30-day trial.
                <br />
                No credit card required.
            </sub>
        </section>
        {/* Pricing Section */}
        <section className='pricingSection'>
            {/* Price Indication */}
            <article className='sliderPart'>
                <span className='pageViews'>{priceOptions[priceValue].pageViews} Pageviews</span>
                
                <p  className='billingPeriod'>
                    <span className='billPrice'>
                        ${
                            isMonthly 
                            ? priceOptions[priceValue].billingPrice
                            : priceOptions[priceValue].billingPrice - (priceOptions[priceValue].billingPrice * DISCOUNT_RATE)
                        }.00
                    </span>
                    <span className='month'>
                        / month
                    </span>
                </p>
                {/* Progress slider */}
            
                <input 
                    style={{
                        
                        // background: calculateBackground(),
                    }}
                    className='slider'
                    type="range" 
                    name="slider" 
                    id="slider" 
                    min={0} 
                    max={4} 
                    value={priceValue}
                    onChange={handlePriceChange} 
                    step={1}
                />
            </article>

            <article className='priceToggleSection'>
                <span>monthly billing</span>
                <div>
                    <input 
                        type="checkbox" 
                        name="priceToggle" 
                        id="priceToggle" 
                        checked={!isMonthly}
                        onChange={handleBillingPeriod}
                    />

                    <label htmlFor="priceToggle" className='priceToggleLabel'>Toggle</label>
                </div>
                <span>yearly billing</span>

                <span className="discount">
                    {
                        isMobile ? '-25%' : '25% discount'
                    }
                </span>
            </article>

            <article className='staticElements'>
                <ul>
                    <li>
                        <img src={CHECK_ICON} alt="check_icon" />
                        <span className='listItem'>Unlimited websites</span>
                    </li>
                    <li>
                        <img src={CHECK_ICON} alt="check_icon" />
                        <span className='listItem'>100% data ownership</span>
                    </li>
                    <li>
                        <img src={CHECK_ICON} alt="check_icon" />
                        <span className='listItem'>Email reports</span>
                    </li>
                </ul>

                <button>
                    Start my trial
                </button>
            </article>
        </section>
    </main>
  )
}

export default App