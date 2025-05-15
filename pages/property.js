export default function PropertyDetail() {
  return (
    <div className="container my-5 property-detail">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="fw-bold">Comfortable Villa Green</h2>
          <p className="text-muted">178 Broadway, Brooklyn</p>
        </div>
        <h3 className="fw-semibold text-dark">$5,800</h3>
      </div>

      {/* Images */}
      <div className="row g-2 align-items-stretch">
        <div className="col-md-8 position-relative">
          <span className="badge bg-danger position-absolute top-0 start-0 m-2">
            FEATURED
          </span>
          <img
            src="https://blissville-staging.s3.us-east-1.amazonaws.com/bvt/type-3-night.jpg"
            alt="Main view"
            className="img-fluid rounded h-100 w-100 object-fit-cover"
          />
        </div>

        <div className="col-md-4 d-flex flex-column gap-2">
          <img
            src="https://blissville-staging.s3.us-east-1.amazonaws.com/bvt/type-2.jpg"
            alt="Living Room"
            className="img-fluid rounded object-fit-cover flex-fill"
            style={{ height: '50%' }}
          />
          <div
            className="position-relative flex-fill"
            style={{ height: '50%' }}
          >
            <img
              src="https://blissville-staging.s3.us-east-1.amazonaws.com/bvt/type-1-night.jpg"
              alt="Kitchen"
              className="img-fluid rounded object-fit-cover h-100 w-100"
            />
            <button className="btn btn-light btn-sm position-absolute bottom-0 start-0 m-2">
              See All 3 Photos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
