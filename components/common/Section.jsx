import classNames from 'classnames';

const Section = ({
  children,
  className,
  centered,
  title,
  altBg,
  altBg2,
  altBg3,
  noPaddingTop,
  noPaddingBottom,
  biggerPadding,
  id,
  ...props
}) => {
  return (
    <section
      className={classNames(className, 'position-relative', {
        'bg-gray-50': altBg,
        'bg-light': altBg2,
        'bg-light2': altBg3,
        'py-5 py-lg-7': !noPaddingBottom && !noPaddingTop && !biggerPadding,
        'pt-5 pt-lg-7': noPaddingBottom && !biggerPadding,
        'pb-5 pb-lg-7': noPaddingTop && !biggerPadding,
        'py-6 py-lg-8': biggerPadding,
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
