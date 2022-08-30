const Parallax = ({ bgImage, className, children, isDark }) => {
  const bgColor = isDark ? 'rgba(15, 17, 20, 0.8)' : 'rgba(23, 36, 59, 0.95)';

  return (
    <section
      className={`parallax ${className} z-n2`}
      style={{
        backgroundImage: `linear-gradient(0deg, ${bgColor}, ${bgColor}), url(${bgImage})`,
      }}
    >
      {children}
    </section>
  );
};

Parallax.defaultProps = {
  isDark: true,
};

export default Parallax;
