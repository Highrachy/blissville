const Parallax = ({ bgImage, children }) => (
  <section
    className="parallax z-n2"
    style={{
      backgroundImage: `linear-gradient(0deg, rgba(1, 20, 53, 0.84), rgba(1, 20, 53, 0.84)), url(${bgImage})`,
    }}
  >
    {children}
  </section>
);

export default Parallax;
