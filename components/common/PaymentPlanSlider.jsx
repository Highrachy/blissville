import React from 'react';
import Slider from 'rc-slider';
import Humanize from 'humanize-plus';
import Image from 'next/image';
import { moneyFormatInNaira } from '@/utils/helpers';

const PaymentPlanSlider = ({ min, max, month }) => {
  const maximum = parseInt(max, 10);
  const minimum = parseInt(min, 10);
  const defaultValue = minimum;
  const [value, setValue] = React.useState(defaultValue);
  const monthlyPayment = (maximum - value) / month;

  return (
    <div className="overflow-hidden bg-gray-50">
      <div className="p-4 py-md-5 text-center">
        <h6>With an initial payment of</h6>
        <h3 className="text-primary">₦ {Humanize.intComma(value)}</h3>
        <p className="text-gray-700 text-sm font-secondary fw-medium">
          you will pay{' '}
          <span className="text-secondary">
            ₦ {Humanize.intComma(monthlyPayment)}
          </span>{' '}
          monthly for {month} months
        </p>
        <Slider
          defaultValue={defaultValue}
          min={minimum}
          max={maximum}
          step={100_000}
          onChange={(value) => setValue(value)}
        />
        <div className="d-flex justify-content-between mt-4">
          <span className="text-gray-700 text-sm font-secondary fw-medium">
            {moneyFormatInNaira(minimum)}
          </span>
          <span className="text-gray-700 text-sm font-secondary fw-medium">
            {moneyFormatInNaira(maximum)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PaymentPlanSlider;
