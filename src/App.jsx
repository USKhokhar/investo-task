import React, { useState } from 'react'

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
        {/* Pricing Section */}
        <section>
            {/* Price Indication */}
            <article>
                <span>{priceOptions[priceValue].pageViews} Pageviews</span>
                <br />
                <span>
                    {
                        isMonthly 
                        ? priceOptions[priceValue].billingPrice
                        : priceOptions[priceValue].billingPrice - (priceOptions[priceValue].billingPrice * DISCOUNT_RATE)
                    } $/Month
                </span>
            </article>

            {/* Progress slider */}
            <input 
            type="range" 
            name="slider" 
            id="slider" 
            min={0} 
            max={4} 
            value={priceValue}
            onChange={handlePriceChange} 
            step={1}
            />

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