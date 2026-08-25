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
  FiCopy,
  FiDownload,
  FiSearch,
  FiUserCheck,
  FiUsers,
} from 'react-icons/fi';
import Footer from '@/components/common/Footer';
import Navigation from '@/components/layouts/Navigation';
import SeoHead from '@/components/utils/SeoHead';

const FUNNEL_NAME = 'Blissville Realtors Network';
const DATABASE_PAGE_SIZE = 100;
const ITEMS_PER_PAGE = 20;

const parseContent = (content) => {
  if (!content) return {};

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
    .toUpperCase();

const escapeCSV = (value = '') =>
  `"${String(value).replace(/"/g, '""').replace(/\n/g, ' ')}"`;

export default function RealtorsDashboard() {
  const router = useRouter();
  const isAdmin = router.query.admin !== undefined;
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRegistration, setSelectedRegistration] = useState(null);

  const fetchRegistrations = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const fetchPage = (page) =>
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/funnels`, {
          params: {
            'filters[funnel][$eq]': FUNNEL_NAME,
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
      console.log(requestError);
      setError('Unable to load realtor registrations. Please try again.');
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
    let digits = phone.replace(/\D/g, '');
    if (digits.startsWith('0')) digits = `234${digits.slice(1)}`;
    if (digits && !digits.startsWith('234')) digits = `234${digits}`;
    return digits;
  };

  const formatPhone = (phone = '') => {
    if (!phone) return '-';
    if (!isAdmin) return `${phone.slice(0, 4)}****${phone.slice(-3)}`;

    const digits = normalizePhone(phone);
    return `+${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)} ${digits.slice(9)}`;
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

    return registrations.filter(({ attributes }) =>
      [attributes.name, attributes.email, attributes.phone].some((value) =>
        String(value || '')
          .toLowerCase()
          .includes(query),
      ),
    );
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

  const copyToClipboard = async (value) => {
    if (navigator.clipboard && value) {
      await navigator.clipboard.writeText(value);
    }
  };

  const exportCSV = () => {
    const header = [
      'Name',
      'First Name',
      'Last Name',
      'Email',
      'Phone',
      'Date',
    ];
    const rows = registrations.map(({ attributes }) => {
      const extra = parseContent(attributes.content);
      return [
        attributes.name,
        extra.firstName,
        extra.lastName,
        attributes.email,
        attributes.phone,
        new Date(attributes.createdAt).toLocaleString(),
      ];
    });
    const csv = [header, ...rows]
      .map((row) => row.map(escapeCSV).join(','))
      .join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'blissville-realtor-registrations.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  const statCards = [
    {
      label: 'Total registrations',
      value: registrations.length,
      icon: FiUsers,
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
        title="Realtor Registrations | Blissville Internal"
        description="Internal dashboard for Blissville Realtors Network registrations."
        canonical="https://www.blissville.com.ng/internal/realtors"
        robots="noindex, nofollow"
      />
      <Navigation />

      <main className="internal-realtors-dashboard bg-gray-100 py-5 min-vh-100">
        <Container>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-4">
            <div>
              <Badge bg="secondary" className="mb-2 text-uppercase">
                Internal dashboard
              </Badge>
              <h1 className="h2 fw-bold text-primary-800 mb-1">
                Realtor Registrations
              </h1>
              <p className="text-gray-700 mb-0">
                Review and manage Blissville realtor network applications.
              </p>
            </div>

            {isAdmin && (
              <Button
                variant="primary"
                className="d-inline-flex align-items-center justify-content-center gap-2"
                onClick={exportCSV}
                disabled={loading || registrations.length === 0}
              >
                <FiDownload />
                Export CSV
              </Button>
            )}
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
                      <span className="placeholder col-5 d-block"></span>
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

          <section className="internal-realtors-panel bg-body border border-gray-200 rounded-3 overflow-hidden">
            <div className="p-3 p-md-4 border-bottom d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3">
              <div>
                <h2 className="h5 fw-bold text-primary-800 mb-1">
                  Network applications
                </h2>
                <small className="text-muted">
                  {filteredRegistrations.length} of {registrations.length}{' '}
                  registrations
                </small>
              </div>

              <InputGroup
                className="internal-realtors-search"
                style={{ maxWidth: 360 }}
              >
                <InputGroup.Text className="bg-body">
                  <FiSearch aria-hidden="true" />
                </InputGroup.Text>
                <Form.Control
                  type="search"
                  value={search}
                  placeholder="Search name, email or phone"
                  aria-label="Search registrations"
                  onChange={(event) => setSearch(event.target.value)}
                />
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
                <Spinner animation="border" size="sm" className="me-2" />
                Loading registrations...
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
                      <th className="ps-4 py-3">Realtor</th>
                      <th className="py-3">Mobile</th>
                      <th className="py-3">Registered</th>
                      <th className="py-3 text-end pe-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRegistrations.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="text-center text-muted py-5">
                          <FiUsers size={28} className="mb-2" />
                          <div>No matching registrations found.</div>
                        </td>
                      </tr>
                    ) : (
                      paginatedRegistrations.map(({ id, attributes }) => (
                        <tr key={id}>
                          <td className="ps-4 py-3">
                            <div className="d-flex align-items-center gap-3">
                              <div
                                className="internal-realtors-avatar bg-primary-100 text-primary-700 rounded-circle d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
                                style={{ width: 40, height: 40 }}
                              >
                                {getInitials(attributes.name)}
                              </div>
                              <div>
                                <div className="fw-semibold text-body">
                                  {attributes.name}
                                </div>
                                <small className="text-muted">
                                  {maskEmail(attributes.email)}
                                </small>
                              </div>
                            </div>
                          </td>
                          <td>{formatPhone(attributes.phone)}</td>
                          <td className="text-nowrap">
                            <div>
                              {new Date(
                                attributes.createdAt,
                              ).toLocaleDateString()}
                            </div>
                            <small className="text-muted">
                              {new Date(
                                attributes.createdAt,
                              ).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </small>
                          </td>
                          <td className="text-end pe-4">
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() =>
                                setSelectedRegistration({ id, attributes })
                              }
                            >
                              View details
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>

                {totalPages > 1 && (
                  <div className="internal-realtors-pagination border-top p-3 p-md-4 d-flex flex-column flex-sm-row align-items-center justify-content-between gap-3">
                    <small className="text-muted">
                      Showing {pageStart + 1}-
                      {Math.min(
                        pageStart + ITEMS_PER_PAGE,
                        filteredRegistrations.length,
                      )}{' '}
                      of {filteredRegistrations.length}
                    </small>

                    <Pagination className="mb-0" size="sm">
                      <Pagination.Prev
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                      />
                      {visiblePages[0] > 1 && (
                        <>
                          <Pagination.Item onClick={() => setCurrentPage(1)}>
                            1
                          </Pagination.Item>
                          {visiblePages[0] > 2 && (
                            <Pagination.Ellipsis disabled />
                          )}
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
                          {visiblePages[visiblePages.length - 1] <
                            totalPages - 1 && <Pagination.Ellipsis disabled />}
                          <Pagination.Item
                            onClick={() => setCurrentPage(totalPages)}
                          >
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
        dialogClassName="internal-realtors-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title className="h5 fw-bold text-primary-800">
            Realtor details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          {selectedRegistration && (
            <>
              <div className="d-flex align-items-center gap-3 mb-4">
                <div
                  className="internal-realtors-avatar bg-primary-100 text-primary-700 rounded-circle d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
                  style={{ width: 48, height: 48 }}
                >
                  {getInitials(selectedRegistration.attributes.name)}
                </div>
                <div>
                  <h3 className="h5 fw-bold mb-1">
                    {selectedRegistration.attributes.name}
                  </h3>
                  <small className="text-muted">
                    Registered{' '}
                    {new Date(
                      selectedRegistration.attributes.createdAt,
                    ).toLocaleString()}
                  </small>
                </div>
              </div>

              <div className="border rounded-3 overflow-hidden">
                {[
                  {
                    label: 'Email address',
                    value: maskEmail(selectedRegistration.attributes.email),
                    copyValue: selectedRegistration.attributes.email,
                  },
                  {
                    label: 'Mobile number',
                    value: formatPhone(selectedRegistration.attributes.phone),
                    copyValue: selectedRegistration.attributes.phone,
                  },
                  {
                    label: 'Source',
                    value: selectedRegistration.attributes.source || '-',
                  },
                ].map(({ label, value, copyValue }, index) => (
                  <div
                    className={`d-flex justify-content-between align-items-center gap-3 p-3 ${index < 2 ? 'border-bottom' : ''}`}
                    key={label}
                  >
                    <div>
                      <small className="text-muted d-block mb-1">{label}</small>
                      <span className="fw-semibold">{value}</span>
                    </div>
                    {isAdmin && copyValue && (
                      <Button
                        variant="link"
                        className="p-2"
                        aria-label={`Copy ${label.toLowerCase()}`}
                        onClick={() => copyToClipboard(copyValue)}
                      >
                        <FiCopy />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setSelectedRegistration(null)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </>
  );
}
