const Overlay = ({ children, className }) => (
  <div className="position-relative">
    {children}
    <span
      className="z-n1 position-absolute top-0 start-0 end-0 bottom-0 rounded-top rounded-5"
      style={{
        background: `linear-gradient(0deg, rgba(1, 20, 53, 0.4), rgba(1, 20, 53, 0.4))`,
      }}
    ></span>
  </div>
);

export default Overlay;
