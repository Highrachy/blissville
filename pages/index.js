import Navigation from '@/components/layouts/Navigation';

export default function Home() {
  return (
    <section>
      <Navigation />
      <div className="container mt-5">
        <div className="row">
          <div className="col-6">
            <h1 className="text-primary text-title">
              Start planning your dream home with us
            </h1>
            <p className="text-muted">
              Actualize the dream of buying a home readily tailored to suit your
              peculiar taste.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
