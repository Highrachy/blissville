import React, { useState } from 'react';
import Slider from 'rc-slider';
import NumberFormat from 'react-number-format';
import { FaMoneyBillWave, FaHome } from 'react-icons/fa';
import Section from '../common/Section';

const ExitStrategies = () => {
  const MIN = 19_125_000;
  const MAX = 500_000_000;

  const [value, setValue] = useState(MIN);
  const [inputValue, setInputValue] = useState(MIN);

  const ROI = 0.504;

  const profit = Math.round(value * ROI);
  const total = value + profit;

  const formatReadable = (val) => {
    const million = val / 1_000_000;
    return `₦${Number(million.toFixed(million % 1 === 0 ? 0 : 3))} Million`;
  };

  const handleInputChange = (val) => {
    setInputValue(val || '');
    const num = Number(val);
    if (num >= MIN && num <= MAX) setValue(num);
  };

  const handleInputBlur = () => {
    let num = Number(inputValue);
    if (!num || num < MIN) num = MIN;
    if (num > MAX) num = MAX;
    setValue(num);
    setInputValue(num);
  };

  const handleSliderChange = (val) => {
    const normalized =
      val <= MIN ? MIN : Math.round(val / 1_000_000) * 1_000_000;
    setValue(normalized);
    setInputValue(normalized);
  };

  return (
    <Section className="exit-strategies-section py-6 py-lg-7">
      <div className="container">
        <div className="row align-items-center g-5">
          {/* LEFT */}
          <div className="col-lg-6">
            <h2 className="display-6 fw-semibold text-dark-900 mb-3">
              Exit Strategies
            </h2>

            <p className="text-dark-700 mb-4">
              We provide a clear path to liquidity. Investors can choose between
              a direct cash exit upon completion or converting their equity into
              physical property.
            </p>

            {/* CASH */}
            <div className="exit-item d-flex gap-3 mb-4 align-items-start">
              <div className="exit-icon">
                <FaMoneyBillWave />
              </div>
              <div>
                <h6 className="fw-semibold mb-1">Cash Exit</h6>
                <small className="text-dark-700">
                  Capital + Profit returned upon unit sale post-construction.
                </small>
              </div>
            </div>

            {/* PROPERTY */}
            <div className="exit-item d-flex gap-3 align-items-start">
              <div className="exit-icon">
                <FaHome />
              </div>
              <div>
                <h6 className="fw-semibold mb-1">Property Conversion</h6>
                <small className="text-dark-700">
                  Equity credited towards the purchase of a physical unit.
                </small>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-lg-6">
            <div className="calculator-card">
              <div className="calculator-badge">ROI CALCULATOR</div>

              <h4 className="fw-semibold text-dark-900 mb-4">
                Investment Calculator
              </h4>

              <label className="calculator-label">Initial Investment</label>

              {/* IMPORTANT: keep your class (no Bootstrap override) */}
              <NumberFormat
                value={inputValue}
                onValueChange={(v) => handleInputChange(v.value)}
                onBlur={handleInputBlur}
                thousandSeparator
                prefix="₦ "
                className="calculator-input"
              />

              <div className="slider-wrapper">
                <Slider
                  min={MIN}
                  max={MAX}
                  step={1_000_000}
                  value={value}
                  onChange={handleSliderChange}
                  trackStyle={{ backgroundColor: '#198754', height: 4 }}
                  railStyle={{ backgroundColor: '#dee2e6', height: 4 }}
                  handleStyle={{
                    height: 18,
                    width: 18,
                    marginTop: -7,
                    backgroundColor: '#fff',
                    border: '2px solid #ced4da',
                  }}
                />
              </div>

              <div className="slider-range">
                <span>₦19,125,000</span>
                <span>₦500,000,000</span>
              </div>

              <hr className="divider" />

              <div className="invest-text py-4">
                When you invest <strong>{formatReadable(value)}</strong>
              </div>

              {/* RESULTS */}
              <div className="results-row">
                <div className="result-box profit">
                  <small>ESTIMATED PROFIT</small>
                  <h5>₦{profit.toLocaleString()}</h5>
                </div>

                <div className="result-box total">
                  <small>TOTAL RETURN</small>
                  <h5>₦{total.toLocaleString()}</h5>
                </div>
              </div>

              {/* ROI */}
              <div className="roi-box">
                <div className="roi-header">
                  <span>PROJECTED ANNUALIZED ROI</span>
                  <span className="roi-value">{(ROI * 100).toFixed(1)}%</span>
                </div>

                <div className="roi-bar">
                  <div
                    className="roi-fill"
                    style={{ width: `${ROI * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ExitStrategies;
