import React from 'react';
import Slider from 'rc-slider';
import Humanize from 'humanize-plus';
import Image from 'next/image';

const PaymentPlanSlider = () => {
  const defaultValue = 100_000_000;
  const [value, setValue] = React.useState(defaultValue);

  return (
    <div className="overflow-hidden bg-gray-50">
      <div className="p-4 py-md-5 text-center">
        <h6>You will get up to</h6>
        <h3 className="text-primary">
          ₦ {Humanize.intComma(value + value * 0.45)}
        </h3>
        <p className="text-gray-700 text-sm font-secondary fw-medium">
          when you invest{' '}
          <span className="text-secondary">₦ {Humanize.intComma(value)}</span>
        </p>
        <Slider
          defaultValue={defaultValue}
          min={5_000_000}
          max={500_000_000}
          step={1_000_000}
          onChange={(value) => setValue(value)}
        />
        <div className="d-flex justify-content-between mt-4">
          <span className="text-gray-700 text-sm font-secondary fw-medium">
            ₦ 5,000,000
          </span>
          <span className="text-gray-700 text-sm font-secondary fw-medium">
            ₦ 500,000,000
          </span>
        </div>
      </div>
    </div>
  );
};

export default PaymentPlanSlider;
