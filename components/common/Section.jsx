import classNames from 'classnames';

const Section = ({
  children,
  className,
  centered,
  title,
  altBg,
  altBg2,
  noPaddingTop,
  noPaddingBottom,
  id,
  ...props
}) => {
  return (
    <section
      className={classNames(className, 'position-relative', {
        'bg-gray': altBg,
        'bg-light': altBg2,
        'py-5 py-lg-7': !noPaddingBottom && !noPaddingTop,
        'pt-5 pt-lg-7': noPaddingBottom,
        'pb-5 pb-lg-7': noPaddingTop,
      })}
      id={id}
      {...props}
    >
      {title && <h4>{title}</h4>}
      {children}
    </section>
  );
};

export default Section;
