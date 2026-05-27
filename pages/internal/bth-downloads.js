import { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import Navigation from '@/components/layouts/Navigation';
import Footer from '@/components/common/Footer';
import { Container, Row, Col, Table, Button, Badge } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { FaDownload, FaCalendarDay, FaInbox } from 'react-icons/fa';
import { FaCopy } from 'react-icons/fa6';
import SeoHead from '@/components/utils/SeoHead';

export default function Dashboard() {
  const router = useRouter();
  const isAdmin = router.query.admin !== undefined;

  const [data, setData] = useState([]);
  const [daily, setDaily] = useState({});
  const [todayCount, setTodayCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const API = `${process.env.NEXT_PUBLIC_API_URL}/api/funnels?filters[funnel][$eq]=Beyond the Hype Guide&sort[0]=createdAt:desc&pagination[pageSize]=1000`;

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(API);
      const items = res.data.data;

      setData(items);
      processStats(items);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [API]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const processStats = (items) => {
    const grouped = {};
    const today = new Date().toISOString().split('T')[0];
    let todayTotal = 0;

    items.forEach((i) => {
      const date = i.attributes.createdAt.split('T')[0];

      if (!grouped[date]) grouped[date] = 0;
      grouped[date]++;

      if (date === today) todayTotal++;
    });

    setDaily(grouped);
    setTodayCount(todayTotal);
  };

  /* ================= HELPERS ================= */

  const getInitials = (name = '') =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

  const getDateLabel = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const isSameDay = (d1, d2) => d1.toDateString() === d2.toDateString();

    if (isSameDay(date, today)) return 'Today';
    if (isSameDay(date, yesterday)) return 'Yesterday';

    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const maskEmail = (email = '') => {
    if (!email) return '-';
    if (isAdmin) return email;

    const [name, domain] = email.split('@');
    if (!domain) return email;

    return name.slice(0, 2) + '***@' + domain;
  };

  const normalizePhone = (phone) => {
    if (!phone) return '';
    let digits = phone.replace(/\D/g, '');

    if (digits.startsWith('0')) digits = '234' + digits.slice(1);
    else if (!digits.startsWith('234')) digits = '234' + digits;

    return digits;
  };

  const formatPhone = (phone) => {
    if (!phone) return '-';
    const n = normalizePhone(phone);

    if (isAdmin) {
      return `+${n.slice(0, 3)} ${n.slice(3, 6)} ${n.slice(6, 9)} ${n.slice(9)}`;
    }

    return phone.slice(0, 4) + '****' + phone.slice(-3);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const exportCSV = () => {
    const rows = data.map((i) => ({
      name: i.attributes.name,
      email: maskEmail(i.attributes.email),
      phone: formatPhone(i.attributes.phone),
      date: new Date(i.attributes.createdAt).toLocaleString(),
    }));

    const csv =
      'Name,Email,Phone,Date\n' +
      rows.map((r) => `${r.name},${r.email},${r.phone},${r.date}`).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'downloads.csv';
    a.click();
  };

  const sortedDates = useMemo(() => {
    return Object.keys(daily).sort((a, b) => new Date(b) - new Date(a));
  }, [daily]);

  return (
    <>
      <SeoHead
        title="Internal Dashboard | Blissville by Highrachy"
        description="Internal dashboard."
        canonical="https://www.blissville.com.ng/internal/bth-downloads"
        robots="noindex, nofollow"
      />
      <Navigation />

      <section className="bg-gray-100 py-5">
        <Container>
          {/* HEADER */}
          <div className="mb-5">
            <h1 className="fw-bold text-primary-700">
              Beyond the Hype Dashboard
            </h1>
            <p className="text-gray-700">Track downloads and user activity</p>
          </div>

          {/* STATS */}
          <Row className="g-4 mb-4">
            <Col md={6}>
              <div className="bg-primary-50 border border-primary-200 p-4 rounded-4 d-flex justify-content-between align-items-center">
                <div>
                  <small className="text-primary-700 text-uppercase">
                    Total Downloads
                  </small>
                  {loading ? (
                    <span className="placeholder col-4"></span>
                  ) : (
                    <h2 className="fw-bold text-primary-800 mt-2 mb-0">
                      {data.length}
                    </h2>
                  )}
                </div>
                <div className="bg-primary-100 p-3 rounded-3">
                  <FaDownload />
                </div>
              </div>
            </Col>

            <Col md={6}>
              <div className="bg-secondary-50 border border-secondary-200 p-4 rounded-4 d-flex justify-content-between align-items-center">
                <div>
                  <small className="text-secondary-700 text-uppercase">
                    Today
                  </small>
                  {loading ? (
                    <span className="placeholder col-3"></span>
                  ) : (
                    <h2 className="fw-bold text-secondary-800 mt-2 mb-0">
                      {todayCount}
                    </h2>
                  )}
                </div>
                <div className="bg-secondary-100 p-3 rounded-3">
                  <FaCalendarDay />
                </div>
              </div>
            </Col>
          </Row>

          <Row className="g-4">
            {/* DAILY */}
            <Col lg={4}>
              <div className="bg-body p-3 rounded-4 border border-gray-200">
                <h6 className="fw-semibold text-primary-700 mb-3">
                  Daily Activity
                </h6>

                <div style={{ maxHeight: 400, overflowY: 'auto' }}>
                  {loading ? (
                    Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className="d-flex justify-content-between py-2"
                      >
                        <span className="placeholder col-6"></span>
                        <span className="placeholder col-2"></span>
                      </div>
                    ))
                  ) : sortedDates.length === 0 ? (
                    <div className="text-center text-muted py-4">
                      <FaCalendarDay size={24} />
                      <div>No activity yet</div>
                    </div>
                  ) : (
                    sortedDates.map((date) => (
                      <div
                        key={date}
                        className="d-flex justify-content-between py-2 border-bottom"
                      >
                        <div>
                          <div className="fw-semibold">
                            {getDateLabel(date)}
                          </div>
                          <small className="text-muted">
                            {new Date(date).toLocaleDateString('en-US', {
                              weekday: 'long',
                            })}
                          </small>
                        </div>
                        <strong>{daily[date]}</strong>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </Col>

            {/* TABLE */}
            <Col lg={8}>
              <div className="bg-body p-3 rounded-4 border border-gray-200">
                <div className="d-flex justify-content-between mb-3">
                  <h6 className="fw-semibold text-primary-700">
                    Recent Downloads
                  </h6>

                  <Button
                    size="sm"
                    variant="primary"
                    onClick={exportCSV}
                    disabled={loading}
                  >
                    Export CSV
                  </Button>
                </div>

                <div style={{ maxHeight: 400, overflowY: 'auto' }}>
                  <Table hover responsive className="align-middle">
                    <thead className="bg-primary-50">
                      <tr>
                        <th>#</th>
                        <th>User</th>
                        <th>Contact</th>
                        <th>Date</th>
                      </tr>
                    </thead>

                    <tbody>
                      {loading ? (
                        Array.from({ length: 6 }).map((_, i) => (
                          <tr key={i}>
                            <td colSpan="4">
                              <span className="placeholder col-12"></span>
                            </td>
                          </tr>
                        ))
                      ) : data.length === 0 ? (
                        <tr>
                          <td
                            colSpan="4"
                            className="text-center py-4 text-muted"
                          >
                            <FaInbox size={28} />
                            <div>No downloads yet</div>
                          </td>
                        </tr>
                      ) : (
                        data.map((i, index) => (
                          <tr key={i.id}>
                            <td>{index + 1}</td>

                            {/* USER CELL */}
                            <td>
                              <div className="d-flex align-items-center gap-2">
                                <div
                                  className="bg-primary-100 text-primary-700 rounded-circle d-flex align-items-center justify-content-center fw-semibold"
                                  style={{ width: 36, height: 36 }}
                                >
                                  {getInitials(i.attributes.name)}
                                </div>

                                <div className="flex-grow-1">
                                  <div className="fw-semibold">
                                    {i.attributes.name}
                                  </div>

                                  <small className="text-muted">
                                    {maskEmail(i.attributes.email)}
                                    {isAdmin && (
                                      <Button
                                        variant="link"
                                        className="p-0"
                                        onClick={() =>
                                          copyToClipboard(i.attributes.email)
                                        }
                                      >
                                        <FaCopy />
                                      </Button>
                                    )}
                                  </small>
                                </div>
                              </div>
                            </td>

                            <td>{formatPhone(i.attributes.phone)}</td>

                            <td>
                              {new Date(
                                i.attributes.createdAt,
                              ).toLocaleDateString()}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />
    </>
  );
}
