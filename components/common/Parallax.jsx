const Parallax = ({ bgImage, className, children, bgColor }) => (
  <section
    className={`parallax ${className} z-n2`}
    style={{
      backgroundImage: `linear-gradient(0deg, ${bgColor}, ${bgColor}), url(${bgImage})`,
    }}
  >
    {children}
  </section>
);

Parallax.defaultProps = {
  bgColor: 'rgba(1, 20, 53, 0.84)',
};
export default Parallax;
