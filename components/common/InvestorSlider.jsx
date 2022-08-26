import React from 'react';
import Slider from 'rc-slider';
import Humanize from 'humanize-plus';
import Image from 'next/image';

const InvestorSlider = () => {
  const defaultValue = 10_000_000;
  const [value, setValue] = React.useState(defaultValue);

  return (
    <div className="card overflow-hidden bg-gray-50">
      <div className="px-5 py-7 text-center">
        <h6>You will get up to</h6>
        <h3>N {Humanize.intComma(value + value * 0.45)}</h3>
        <p className="text-gray-700 text-sm font-secondary fw-medium">
          when you invest N {Humanize.intComma(value)}
        </p>
        <Slider
          defaultValue={defaultValue}
          min={5_000_000}
          max={500_000_000}
          step={1_000_000}
          onChange={(value) => setValue(value)}
        />
      </div>
      <Image
        src="/assets/svg/skyline.svg"
        alt="Skyline"
        height="189"
        width="576"
      />
    </div>
  );
};

export default InvestorSlider;
