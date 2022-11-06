import React from 'react';
import Slider from 'rc-slider';
import Humanize from 'humanize-plus';
import { moneyFormatInNaira } from '@/utils/helpers';
import Button from '../forms/Button';
import NumberFormat from 'react-number-format';
import { toast } from 'react-toastify';
import { ProgrammingArrows } from 'iconsax-react';

const PaymentPlanSlider = ({
  min,
  max,
  month,
  defaultValue,
  updateInitialPayment,
}) => {
  const maximum = parseInt(max, 10);
  const minimum = parseInt(min, 10);
  const [value, setValue] = React.useState(defaultValue);
  const [error, setError] = React.useState(null);
  const monthlyPayment = (maximum - value) / month;

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
    <div className="overflow-hidden">
      <div className="py-2 px-4 py-md-2 text-center">
        {error ? (
          <h6 className="text-danger">Invalid initial payment</h6>
        ) : (
          <h6>With an initial payment of</h6>
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
        <p
          className={`${
            error ? 'text-danger' : 'text-gray-700'
          } text-sm font-secondary fw-medium`}
        >
          {error ? (
            error
          ) : (
            <>
              you will pay{' '}
              <span className="text-secondary">
                ₦ {Humanize.intComma(monthlyPayment)}
              </span>{' '}
              monthly for {month} months
            </>
          )}
        </p>

        <Slider
          defaultValue={minimum}
          min={minimum}
          max={maximum}
          value={value}
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

      <div className="dotted-border-muted mb-5"></div>

      <div className="text-center mb-4">
        <Button
          color={!!error ? 'danger' : 'info'}
          className="btn-wide"
          onClick={() => (!error ? updateInitialPayment(value) : null)}
          disabled={!!error}
        >
          Update Initial Payment
        </Button>
        {value !== minimum && (
          <div
            className={`mt-4 text-sm text-link`}
            onClick={() => setValue(minimum)}
          >
            Reset this Plan
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPlanSlider;
