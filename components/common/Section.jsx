import classNames from 'classnames';

const Section = ({
  children,
  className,
  centered,
  altBg,
  noPaddingTop,
  noPaddingBottom,
  ...props
}) => {
  return (
    <section
      className={classNames(className, 'position-relative', {
        'bg-light': altBg,
        'py-6 py-lg-7': !noPaddingBottom && !noPaddingTop,
        'pt-6 pt-lg-7': noPaddingBottom,
        'pb-6 pb-lg-7': noPaddingTop,
      })}
      {...props}
    >
      {children}
    </section>
  );
};

export default Section;
