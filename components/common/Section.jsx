import classNames from 'classnames';

const Section = ({
  children,
  className,
  centered,
  altBg,
  altBg2,
  noPaddingTop,
  noPaddingBottom,
  ...props
}) => {
  return (
    <section
      className={classNames(className, 'position-relative', {
        'bg-light': altBg,
        'bg-light-2': altBg2,
        'py-5 py-lg-6': !noPaddingBottom && !noPaddingTop,
        'pt-5 pt-lg-6': noPaddingBottom,
        'pb-5 pb-lg-6': noPaddingTop,
      })}
      {...props}
    >
      {children}
    </section>
  );
};

export default Section;
