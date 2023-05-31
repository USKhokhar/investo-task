import React, { useState } from 'react'
// import "./index.css"

const App = () => {
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

    // handling billing period
    const handleBillingPeriod = () => {
        setIsMonthly(!isMonthly)
    }

    // handling price change
    const handlePriceChange = (e) => {
        setPriceValue(parseInt(e.target.value))
    }
  return (
    <main>
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
                <div className='sliderDiv'>
                    <input 
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
                    <progress className='progressBar' max={priceOptions.length-1} value={priceValue} />
                </div>
            </article>


            <br />
            {/* Toggle */}
            <span>Toggle</span> 
            <input 
            type="checkbox" 
            name="priceToggle" 
            id="priceToggle" 
            checked={!isMonthly}
            onChange={handleBillingPeriod}
            />
        </section>
    </main>
  )
}

export default App