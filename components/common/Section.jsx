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
        'bg-gray': altBg,
        'py-5 py-lg-7': !noPaddingBottom && !noPaddingTop,
        'pt-5 pt-lg-7': noPaddingBottom,
        'pb-5 pb-lg-7': noPaddingTop,
      })}
      {...props}
    >
      {children}
    </section>
  );
};

export default Section;
