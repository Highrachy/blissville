import React from 'react';
import Slider from 'rc-slider';
import Humanize from 'humanize-plus';
import Image from 'next/image';
import { Zoom } from 'react-reveal';
import FormTooltip from '../forms/FormToolTip';
import { moneyFormatInNaira } from '@/utils/helpers';
import NumberFormat from 'react-number-format';

const InvestorSlider = () => {
  const defaultValue = 50_000_000;
  const maximum = 200_000_000;
  const minimum = 25_000_000;
  const investmentRate = 0.5;
  const bankRate = 0.075;
  const [value, setValue] = React.useState(defaultValue);
  const [error, setError] = React.useState(null);

  const bankAmount = value * bankRate;
  const investmentAmount = value * investmentRate;
  const differenceAmount = investmentAmount - bankAmount;

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
        <div className="px-4 pt-5 pt-md-6 pb-4 text-center">
          {error ? (
            <h6 className="text-danger mb-0">Invalid initial payment</h6>
          ) : (
            <h6 className="mb-0 text-gray-700">When you invest</h6>
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
          <div className="my-3">
            <Slider
              defaultValue={defaultValue}
              min={minimum}
              max={maximum}
              step={5_000_000}
              onChange={(value) => setValue(value)}
            />
            <div className="d-flex justify-content-between">
              <span className="text-gray-600 text-xs fw-semibold">
                ₦ {Humanize.compactInteger(minimum)}
              </span>
              <span className="text-gray-600 text-xs fw-semibold">
                ₦ {Humanize.compactInteger(maximum)}
              </span>
            </div>
          </div>

          <h6 className="text-gray-800 mb-2">You will get up to</h6>
          <span className="text-secondary price-format text-xl">
            {moneyFormatInNaira(value + investmentAmount)}
          </span>
        </div>

        <Image
          src="/assets/svg/skyline.svg"
          alt="Skyline"
          height="189"
          width="576"
          className="opacity-25"
        />
      </div>
      <div className="text-gray-700 text-sm text-center mt-2">
        * Compared to a bank&apos;s ROI of{' '}
        <span className="text-nowrap fw-bold">
          {moneyFormatInNaira(bankAmount)}
        </span>
        , ours offers up to{' '}
        <span className="text-nowrap fw-bold">
          {moneyFormatInNaira(differenceAmount)} more.
        </span>
        <FormTooltip
          text="These calculations are based on the average performance of our previous investments compared to typical bank savings rates over an 18-month period."
          position="top"
        />
      </div>
    </Zoom>
  );
};

export default InvestorSlider;
