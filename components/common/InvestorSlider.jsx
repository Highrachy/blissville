import React from 'react';
import Slider from 'rc-slider';
import Humanize from 'humanize-plus';
import Image from 'next/image';
import { Zoom } from 'react-reveal';
import FormTooltip from '../forms/FormToolTip';
import { moneyFormatInNaira } from '@/utils/helpers';
import NumberFormat from 'react-number-format';

const InvestorSlider = () => {
  const defaultValue = 100_000_000;
  const maximum = 500_000_000;
  const minimum = 5_000_000;
  const [value, setValue] = React.useState(defaultValue);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const price = parseInt(value, 10) || 0;
    if (price < minimum) {
      setError(
        `You can't pay less than the minimum amount of ${moneyFormatInNaira(
          minimum
        )}`
      );
    } else if (price > maximum) {
      setError(
        `You can't pay more than the maximum amount of ${moneyFormatInNaira(
          maximum
        )}`
      );
    } else {
      setError(null);
      setValue(price);
    }
  }, [maximum, minimum, value]);

  return (
    <Zoom>
      <div className="card overflow-hidden bg-gray-50">
        <div className="px-4 py-5 py-md-6 text-center">
          {error ? (
            <h6 className="text-danger">Invalid initial payment</h6>
          ) : (
            <h6>
              When you invest
              <FormTooltip
                text="Move the Slider below or type your estimated investment directly"
                header="How to use"
                position="top"
              />
            </h6>
          )}
          <NumberFormat
            id="initial-payment"
            name="initial-payment"
            onValueChange={(number) => setValue(number.value)}
            prefix="₦ "
            thousandSeparator={true}
            placeholder="Set initial payment"
            value={value}
            className="price-input-format"
          />
          <p className="text-gray-700 text-sm font-secondary fw-medium">
            you will get up to{' '}
            <span className="text-secondary">
              {moneyFormatInNaira(value + value * 0.45)}
            </span>
          </p>
          <Slider
            defaultValue={defaultValue}
            min={minimum}
            max={maximum}
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
        <Image
          src="/assets/svg/skyline.svg"
          alt="Skyline"
          height="189"
          width="576"
          className="opacity-25"
        />
      </div>
    </Zoom>
  );
};

export default InvestorSlider;
