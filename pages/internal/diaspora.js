import { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import {
  Badge,
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Modal,
  Pagination,
  Row,
  Spinner,
  Table,
} from 'react-bootstrap';
import {
  FiCalendar,
  FiCheckCircle,
  FiCopy,
  FiDownload,
  FiGlobe,
  FiInbox,
  FiMessageSquare,
  FiRefreshCw,
  FiSearch,
  FiUserCheck,
  FiUsers,
} from 'react-icons/fi';
import Footer from '@/components/common/Footer';
import Navigation from '@/components/layouts/Navigation';
import SeoHead from '@/components/utils/SeoHead';

const FUNNEL_NAME = 'Blissville Terraces Diaspora';
const DATABASE_PAGE_SIZE = 100;
const ITEMS_PER_PAGE = 20;

const parseContent = (content) => {
  if (!content) return {};
  if (typeof content === 'object') return content;
  try {
    return JSON.parse(content);
  } catch (error) {
    return {};
  }
};

const getInitials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'BT';

const escapeCSV = (value = '') =>
  `"${String(value ?? '').replace(/"/g, '""').replace(/\n/g, ' ')}"`;

export default function DiasporaDashboard() {
  const router = useRouter();
  const isAdmin = router.query.admin !== undefined;

  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [copiedKey, setCopiedKey] = useState('');

  const fetchRegistrations = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const fetchPage = (page) =>
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/funnels`, {
          params: {
            'filters[funnel][$in][0]': 'Blissville Terraces Diaspora',
            'filters[funnel][$in][1]': 'Diaspora Virtual Consultation',
            'sort[0]': 'createdAt:desc',
            'pagination[page]': page,
            'pagination[pageSize]': DATABASE_PAGE_SIZE,
          },
        });

      const firstResponse = await fetchPage(1);
      const pageCount = firstResponse.data.meta?.pagination?.pageCount || 1;
      const remainingPages = Array.from(
        { length: Math.max(0, pageCount - 1) },
        (_, index) => fetchPage(index + 2),
      );
      const remainingResponses = await Promise.all(remainingPages);
      const allRegistrations = [firstResponse, ...remainingResponses].flatMap(
        (response) => response.data.data || [],
      );

      setRegistrations(allRegistrations);
      setCurrentPage(1);
    } catch (requestError) {
      console.error(requestError);
      setError('Unable to load diaspora registrations. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  const maskEmail = (email = '') => {
    if (!email || isAdmin) return email || '-';
    const [name, domain] = email.split('@');
    if (!domain) return email;
    return `${name.slice(0, 2)}***@${domain}`;
  };

  const normalizePhone = (phone = '') => {
    let digits = String(phone).replace(/\D/g, '');
    if (digits.startsWith('0')) digits = `234${digits.slice(1)}`;
    if (digits && !digits.startsWith('234') && digits.length === 10) {
      digits = `234${digits}`;
    }
    return digits;
  };

  const formatPhone = (phone = '') => {
    if (!phone || phone === 'N/A') return '-';
    if (!isAdmin) {
      if (phone.length <= 6) return phone;
      return `${phone.slice(0, 4)}****${phone.slice(-3)}`;
    }
    const digits = normalizePhone(phone);
    if (digits.length >= 12) {
      return `+${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)} ${digits.slice(9)}`;
    }
    return phone;
  };

  const copyToClipboard = async (value, key = '') => {
    if (navigator.clipboard && value) {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(''), 2000);
    }
  };

  const stats = useMemo(() => {
    const now = new Date();
    const today = now.toDateString();
    const weekStart = new Date(now);
    weekStart.setHours(0, 0, 0, 0);
    weekStart.setDate(now.getDate() - 6);

    return registrations.reduce(
      (summary, registration) => {
        const createdAt = new Date(registration.attributes.createdAt);
        if (createdAt.toDateString() === today) summary.today += 1;
        if (createdAt >= weekStart) summary.thisWeek += 1;
        return summary;
      },
      { today: 0, thisWeek: 0 },
    );
  }, [registrations]);

  const filteredRegistrations = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return registrations;

    return registrations.filter(({ attributes }) => {
      const extra = parseContent(attributes.content);
      const fields = [
        attributes.name,
        attributes.email,
        attributes.phone,
        extra.country,
        extra.homePurpose,
        extra.contactChannel,
      ];
      return fields.some((value) =>
        String(value || '')
          .toLowerCase()
          .includes(query),
      );
    });
  }, [registrations, search]);

  const totalPages = Math.ceil(filteredRegistrations.length / ITEMS_PER_PAGE);
  const pageStart = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedRegistrations = filteredRegistrations.slice(
    pageStart,
    pageStart + ITEMS_PER_PAGE,
  );

  const visiblePages = useMemo(() => {
    const start = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
    const end = Math.min(totalPages, start + 4);
    return Array.from(
      { length: Math.max(0, end - start + 1) },
      (_, index) => start + index,
    );
  }, [currentPage, totalPages]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const exportCSV = () => {
    const header = [
      'Name',
      'Email',
      'Phone',
      'Country',
      'Home Purpose',
      'Preferred Channel',
      'Consent',
      'Date Submitted',
    ];

    const rows = filteredRegistrations.map(({ attributes }) => {
      const extra = parseContent(attributes.content);
      return [
        attributes.name,
        attributes.email,
        attributes.phone,
        extra.country || '',
        extra.homePurpose || '',
        extra.contactChannel || '',
        extra.consent !== undefined ? String(extra.consent) : '',
        new Date(attributes.createdAt).toLocaleString(),
      ];
    });

    const csv = [header, ...rows]
      .map((row) => row.map(escapeCSV).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `blissville-diaspora-consultations-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const statCards = [
    {
      label: 'Total registrations',
      value: registrations.length,
      icon: FiGlobe,
      className:
        'internal-realtors-stat--primary bg-primary-50 border-primary-200 text-primary-800',
    },
    {
      label: 'Registered today',
      value: stats.today,
      icon: FiUserCheck,
      className:
        'internal-realtors-stat--secondary bg-secondary-50 border-secondary-200 text-secondary-800',
    },
    {
      label: 'Last 7 days',
      value: stats.thisWeek,
      icon: FiCalendar,
      className:
        'internal-realtors-stat--neutral bg-body border-gray-300 text-primary-800',
    },
  ];

  return (
    <>
      <SeoHead
        title="Blissville Terraces Diaspora | Blissville Internal"
        description="Internal dashboard for Blissville Terraces Diaspora landing page registrations."
        canonical="https://www.blissville.com.ng/internal/diaspora"
        robots="noindex, nofollow"
      />
      <Navigation />

      <main className="internal-realtors-dashboard bg-gray-100 py-5 min-vh-100">
        <Container>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-4">
            <div>
              <div className="d-flex align-items-center gap-2 mb-2">
                <Badge bg="success" className="text-uppercase">
                  Blissville Terraces Diaspora
                </Badge>
                {isAdmin ? (
                  <Badge bg="success" className="text-uppercase">
                    <FiCheckCircle className="me-1" /> Admin mode
                  </Badge>
                ) : (
                  <Badge bg="light" text="dark" className="border text-uppercase">
                    Masked view
                  </Badge>
                )}
              </div>
              <h1 className="h2 fw-bold text-primary-800 mb-1">
                Blissville Terraces Diaspora
              </h1>
              <p className="text-gray-700 mb-0">
                Lead registrations and inquiries submitted via the Blissville Terraces Diaspora landing page (/diaspora).
              </p>
            </div>

            <div className="d-flex align-items-center gap-2">
              <Button
                variant="outline-secondary"
                className="d-inline-flex align-items-center gap-2"
                onClick={fetchRegistrations}
                disabled={loading}
              >
                <FiRefreshCw className={loading ? 'fa-spin' : ''} />
                Refresh
              </Button>

              {isAdmin && (
                <Button
                  variant="primary"
                  className="d-inline-flex align-items-center justify-content-center gap-2"
                  onClick={exportCSV}
                  disabled={loading || registrations.length === 0}
                >
                  <FiDownload />
                  Export CSV ({filteredRegistrations.length})
                </Button>
              )}
            </div>
          </div>

          <Row className="g-3 mb-4">
            {statCards.map(({ label, value, icon: Icon, className }) => (
              <Col md={4} key={label}>
                <div
                  className={`internal-realtors-stat border rounded-3 p-4 h-100 d-flex align-items-center justify-content-between ${className}`}
                >
                  <div>
                    <small className="d-block fw-semibold text-uppercase mb-2">
                      {label}
                    </small>
                    {loading ? (
                      <span className="placeholder col-5 d-block" />
                    ) : (
                      <strong className="display-6 lh-1">{value}</strong>
                    )}
                  </div>
                  <div className="internal-realtors-stat__icon bg-body rounded-3 p-3 d-flex">
                    <Icon size={22} />
                  </div>
                </div>
              </Col>
            ))}
          </Row>

          <section className="internal-realtors-panel bg-body border border-gray-200 rounded-3 overflow-hidden shadow-sm">
            <div className="p-3 p-md-4 border-bottom d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3">
              <div>
                <h2 className="h5 fw-bold text-primary-800 mb-1">
                  Diaspora registrations
                </h2>
                <small className="text-muted">
                  {filteredRegistrations.length} of {registrations.length} registrations
                </small>
              </div>

              <InputGroup
                className="internal-realtors-search"
                style={{ maxWidth: 360 }}
              >
                <InputGroup.Text className="bg-body border-end-0">
                  <FiSearch aria-hidden="true" />
                </InputGroup.Text>
                <Form.Control
                  type="search"
                  value={search}
                  placeholder="Search name, country or contact..."
                  aria-label="Search consultation inquiries"
                  className="border-start-0 ps-0"
                  onChange={(event) => setSearch(event.target.value)}
                />
                {search && (
                  <Button
                    variant="outline-secondary"
                    onClick={() => setSearch('')}
                    className="border-start-0"
                  >
                    &times;
                  </Button>
                )}
              </InputGroup>
            </div>

            {error ? (
              <div className="text-center p-5">
                <p className="text-danger mb-3">{error}</p>
                <Button variant="outline-primary" onClick={fetchRegistrations}>
                  Try again
                </Button>
              </div>
            ) : loading ? (
              <div className="text-center p-5 text-muted">
                <Spinner animation="border" size="sm" className="me-2 text-primary" />
                Loading consultation inquiries...
              </div>
            ) : (
              <>
                <Table
                  responsive
                  hover
                  className="internal-realtors-table align-middle mb-0"
                >
                  <thead className="internal-realtors-table__head bg-primary-50 text-primary-800">
                    <tr>
                      <th className="ps-4 py-3">Lead / Client</th>
                      <th className="py-3">Country</th>
                      <th className="py-3">Home Purpose</th>
                      <th className="py-3">Preferred Channel</th>
                      <th className="py-3">Submitted</th>
                      <th className="py-3 text-end pe-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRegistrations.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center text-muted py-5">
                          <FiInbox size={28} className="mb-2 text-secondary" />
                          <div className="fw-semibold">No consultation requests found.</div>
                        </td>
                      </tr>
                    ) : (
                      paginatedRegistrations.map(({ id, attributes }) => {
                        const extra = parseContent(attributes.content);
                        return (
                          <tr key={id}>
                            <td className="ps-4 py-3">
                              <div className="d-flex align-items-center gap-3">
                                <div
                                  className="internal-realtors-avatar bg-success text-white rounded-circle d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
                                  style={{ width: 40, height: 40, fontSize: '0.85rem' }}
                                >
                                  {getInitials(attributes.name)}
                                </div>
                                <div className="min-w-0">
                                  <div className="fw-semibold text-body text-truncate">
                                    {attributes.name}
                                  </div>
                                  <small className="text-muted d-block text-truncate">
                                    {maskEmail(attributes.email)}
                                  </small>
                                </div>
                              </div>
                            </td>
                            <td>
                              <Badge bg="light" text="dark" className="border text-uppercase px-2">
                                <FiGlobe className="me-1" />
                                {extra.country || 'N/A'}
                              </Badge>
                            </td>
                            <td>{extra.homePurpose || '-'}</td>
                            <td>
                              <div className="d-flex align-items-center gap-2">
                                <span>{formatPhone(attributes.phone)}</span>
                                {extra.contactChannel && (
                                  <Badge bg="secondary-subtle" text="dark" className="border">
                                    {extra.contactChannel}
                                  </Badge>
                                )}
                              </div>
                            </td>
                            <td className="text-nowrap">
                              <div>{new Date(attributes.createdAt).toLocaleDateString()}</div>
                              <small className="text-muted">
                                {new Date(attributes.createdAt).toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </small>
                            </td>
                            <td className="text-end pe-4">
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => setSelectedRegistration({ id, attributes })}
                              >
                                View details
                              </Button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </Table>

                {totalPages > 1 && (
                  <div className="internal-realtors-pagination border-top p-3 p-md-4 d-flex flex-column flex-sm-row align-items-center justify-content-between gap-3">
                    <small className="text-muted">
                      Showing {pageStart + 1}-
                      {Math.min(pageStart + ITEMS_PER_PAGE, filteredRegistrations.length)} of{' '}
                      {filteredRegistrations.length}
                    </small>

                    <Pagination className="mb-0" size="sm">
                      <Pagination.Prev
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                      />
                      {visiblePages[0] > 1 && (
                        <>
                          <Pagination.Item onClick={() => setCurrentPage(1)}>1</Pagination.Item>
                          {visiblePages[0] > 2 && <Pagination.Ellipsis disabled />}
                        </>
                      )}
                      {visiblePages.map((page) => (
                        <Pagination.Item
                          active={page === currentPage}
                          key={page}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </Pagination.Item>
                      ))}
                      {visiblePages[visiblePages.length - 1] < totalPages && (
                        <>
                          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                            <Pagination.Ellipsis disabled />
                          )}
                          <Pagination.Item onClick={() => setCurrentPage(totalPages)}>
                            {totalPages}
                          </Pagination.Item>
                        </>
                      )}
                      <Pagination.Next
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                      />
                    </Pagination>
                  </div>
                )}
              </>
            )}
          </section>
        </Container>
      </main>

      <Modal
        show={Boolean(selectedRegistration)}
        onHide={() => setSelectedRegistration(null)}
        centered
        size="lg"
        dialogClassName="internal-realtors-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title className="h5 fw-bold text-primary-800">
            Diaspora Registration Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          {selectedRegistration && (() => {
            const { attributes } = selectedRegistration;
            const extra = parseContent(attributes.content);

            const detailRows = [
              { label: 'Full Name', value: attributes.name, copyValue: attributes.name, key: 'name' },
              { label: 'Email Address', value: maskEmail(attributes.email), copyValue: attributes.email, key: 'email' },
              { label: 'Mobile / WhatsApp', value: formatPhone(attributes.phone), copyValue: attributes.phone, key: 'phone' },
              { label: 'Country of Residence', value: extra.country || '-' },
              { label: 'What is the home for?', value: extra.homePurpose || '-' },
              { label: 'Preferred Contact Method', value: extra.contactChannel || '-' },
              { label: 'Consent Status', value: extra.consent ? 'Agreed' : 'No' },
              { label: 'Source', value: attributes.source || '-' },
            ];

            return (
              <>
                <div className="d-flex align-items-center gap-3 mb-4 p-3 bg-primary-50 rounded-3">
                  <div
                    className="internal-realtors-avatar bg-success text-white rounded-circle d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
                    style={{ width: 50, height: 50, fontSize: '1.1rem' }}
                  >
                    {getInitials(attributes.name)}
                  </div>
                  <div>
                    <h3 className="h5 fw-bold mb-1">{attributes.name}</h3>
                    <small className="text-muted">
                      Registered on {new Date(attributes.createdAt).toLocaleString()}
                    </small>
                  </div>
                </div>

                <div className="border rounded-3 overflow-hidden mb-3">
                  {detailRows.map(({ label, value, copyValue, key }, index) => (
                    <div
                      key={label}
                      className={`d-flex justify-content-between align-items-center gap-3 p-3 ${
                        index < detailRows.length - 1 ? 'border-bottom' : ''
                      }`}
                    >
                      <div>
                        <small className="text-muted d-block mb-1">{label}</small>
                        <span className="fw-semibold">{value}</span>
                      </div>
                      {isAdmin && copyValue && (
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          className="p-1 px-2"
                          onClick={() => copyToClipboard(copyValue, key)}
                        >
                          <FiCopy className="me-1" />
                          {copiedKey === key ? 'Copied!' : 'Copy'}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                {attributes.phone && attributes.phone !== 'N/A' && (
                  <div className="d-flex justify-content-end gap-2 mt-3">
                    <a
                      href={`https://wa.me/${normalizePhone(attributes.phone)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-success btn-sm d-inline-flex align-items-center gap-2"
                    >
                      <FiMessageSquare /> WhatsApp Client
                    </a>
                  </div>
                )}
              </>
            );
          })()}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelectedRegistration(null)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </>
  );
}
