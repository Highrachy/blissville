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
  Nav,
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
  FiExternalLink,
  FiFilter,
  FiGlobe,
  FiInbox,
  FiMessageSquare,
  FiPhone,
  FiRefreshCw,
  FiSearch,
  FiUserCheck,
  FiUsers,
} from 'react-icons/fi';
import Footer from '@/components/common/Footer';
import Navigation from '@/components/layouts/Navigation';
import SeoHead from '@/components/utils/SeoHead';

const DATABASE_PAGE_SIZE = 100;
const ITEMS_PER_PAGE = 20;

const KNOWN_FUNNELS = [
  'Blissville Terraces Diaspora',
  'Blissville Realtors Network',
  'Blissville Walk & Wellness',
  'Beyond the Hype Guide',
];

const parseContent = (content) => {
  if (!content) return {};
  if (typeof content === 'object') return content;
  try {
    return JSON.parse(content);
  } catch (error) {
    return { raw: content };
  }
};

const getInitials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'BV';

const escapeCSV = (value = '') =>
  `"${String(value ?? '').replace(/"/g, '""').replace(/\n/g, ' ')}"`;

export default function AllRegistrationsDashboard() {
  const router = useRouter();
  const isAdmin = router.query.admin !== undefined;

  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [activeFunnel, setActiveFunnel] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [copiedKey, setCopiedKey] = useState('');

  // Sync funnel filter from URL query if provided (e.g. ?funnel=Diaspora+Virtual+Consultation)
  useEffect(() => {
    if (router.isReady && router.query.funnel) {
      setActiveFunnel(String(router.query.funnel));
    }
  }, [router.isReady, router.query.funnel]);

  const fetchRegistrations = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const fetchPage = (page) =>
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/funnels`, {
          params: {
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
      console.error('Failed to load registrations:', requestError);
      setError('Unable to load registrations from the database. Please try again.');
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

  // Funnel category tabs with counts
  const funnelTabs = useMemo(() => {
    const counts = registrations.reduce((acc, { attributes }) => {
      let funnel = attributes.funnel || 'General';
      if (funnel === 'Diaspora Virtual Consultation') {
        funnel = 'Blissville Terraces Diaspora';
      }
      acc[funnel] = (acc[funnel] || 0) + 1;
      return acc;
    }, {});

    const uniqueFunnels = Array.from(
      new Set([
        ...KNOWN_FUNNELS,
        ...Object.keys(counts),
      ]),
    ).filter((f) => Boolean(f) && f !== 'Diaspora Virtual Consultation');

    return [
      { key: 'ALL', label: 'All Registrations', count: registrations.length },
      ...uniqueFunnels.map((funnel) => ({
        key: funnel,
        label: funnel === 'Blissville Terraces Diaspora' ? 'Terraces Diaspora' : funnel,
        count: counts[funnel] || 0,
      })),
    ];
  }, [registrations]);

  // Overall statistics
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
        if (
          registration.attributes.funnel === 'Blissville Terraces Diaspora' ||
          registration.attributes.funnel === 'Diaspora Virtual Consultation'
        ) {
          summary.diaspora += 1;
        }
        return summary;
      },
      { today: 0, thisWeek: 0, diaspora: 0 },
    );
  }, [registrations]);

  // Filtered registrations
  const filteredRegistrations = useMemo(() => {
    let result = registrations;

    // Filter by Funnel
    if (activeFunnel !== 'ALL') {
      if (activeFunnel === 'General') {
        result = result.filter(
          ({ attributes }) => !attributes.funnel || attributes.funnel === 'General',
        );
      } else if (
        activeFunnel === 'Blissville Terraces Diaspora' ||
        activeFunnel === 'Diaspora Virtual Consultation'
      ) {
        result = result.filter(
          ({ attributes }) =>
            attributes.funnel === 'Blissville Terraces Diaspora' ||
            attributes.funnel === 'Diaspora Virtual Consultation',
        );
      } else {
        result = result.filter(
          ({ attributes }) => attributes.funnel === activeFunnel,
        );
      }
    }

    // Filter by Search Query
    const query = search.trim().toLowerCase();
    if (!query) return result;

    return result.filter(({ attributes }) => {
      const extra = parseContent(attributes.content);
      const searchableFields = [
        attributes.name,
        attributes.email,
        attributes.phone,
        attributes.funnel,
        attributes.source,
        extra.country,
        extra.homePurpose,
        extra.contactChannel,
        extra.firstName,
        extra.lastName,
      ];

      return searchableFields.some((field) =>
        String(field || '')
          .toLowerCase()
          .includes(query),
      );
    });
  }, [registrations, activeFunnel, search]);

  // Pagination
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
  }, [search, activeFunnel]);

  // CSV Export
  const exportCSV = () => {
    const headers = [
      'ID',
      'Name',
      'Email',
      'Phone',
      'Funnel',
      'Source',
      'Country',
      'Home Purpose',
      'Preferred Channel',
      'Consent',
      'Date Created',
    ];

    const rows = filteredRegistrations.map(({ id, attributes }) => {
      const extra = parseContent(attributes.content);
      return [
        id,
        attributes.name,
        attributes.email,
        attributes.phone,
        attributes.funnel || 'General',
        attributes.source || '',
        extra.country || '',
        extra.homePurpose || '',
        extra.contactChannel || '',
        extra.consent !== undefined ? String(extra.consent) : '',
        new Date(attributes.createdAt).toLocaleString(),
      ];
    });

    const csv = [headers, ...rows]
      .map((row) => row.map(escapeCSV).join(','))
      .join('\n');

    const funnelSlug =
      activeFunnel === 'ALL'
        ? 'all'
        : activeFunnel.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const dateStamp = new Date().toISOString().slice(0, 10);
    const filename = `blissville-${funnelSlug}-registrations-${dateStamp}.csv`;

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getFunnelBadgeVariant = (funnel = '') => {
    switch (funnel) {
      case 'Blissville Terraces Diaspora':
      case 'Diaspora Virtual Consultation':
        return { bg: 'success', label: 'Terraces Diaspora' };
      case 'Blissville Realtors Network':
        return { bg: 'primary', label: 'Realtors Network' };
      case 'Blissville Walk & Wellness':
        return { bg: 'info', label: 'Walk & Wellness' };
      case 'Beyond the Hype Guide':
        return { bg: 'warning', label: 'Beyond The Hype' };
      default:
        return { bg: 'secondary', label: funnel || 'General' };
    }
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
      label: 'Terraces Diaspora',
      value: stats.diaspora,
      icon: FiGlobe,
      className:
        'internal-realtors-stat--secondary bg-secondary-50 border-secondary-200 text-secondary-800',
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
        title="All Registrations | Blissville Internal"
        description="Internal master dashboard for all Blissville registrations, lead funnels, and marketing campaigns."
        canonical="https://www.blissville.com.ng/internal/registrations"
        robots="noindex, nofollow"
      />
      <Navigation />

      <main className="internal-realtors-dashboard bg-gray-100 py-5 min-vh-100">
        <Container>
          {/* Header */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-4">
            <div>
              <div className="d-flex align-items-center gap-2 mb-2">
                <Badge bg="secondary" className="text-uppercase">
                  Internal Dashboard
                </Badge>
                {isAdmin ? (
                  <Badge bg="success" className="text-uppercase">
                    <FiCheckCircle className="me-1" /> Admin mode (Unmasked)
                  </Badge>
                ) : (
                  <Badge bg="light" text="dark" className="border text-uppercase">
                    Masked view
                  </Badge>
                )}
              </div>
              <h1 className="h2 fw-bold text-primary-800 mb-1">
                All Registrations
              </h1>
              <p className="text-gray-700 mb-0">
                Centralized dashboard to view and manage leads across all Blissville funnels.
              </p>
            </div>

            <div className="d-flex align-items-center gap-2">
              <Button
                variant="outline-secondary"
                className="d-inline-flex align-items-center gap-2"
                onClick={fetchRegistrations}
                disabled={loading}
                title="Refresh registrations"
              >
                <FiRefreshCw className={loading ? 'fa-spin' : ''} />
                Refresh
              </Button>

              {isAdmin && (
                <Button
                  variant="primary"
                  className="d-inline-flex align-items-center justify-content-center gap-2"
                  onClick={exportCSV}
                  disabled={loading || filteredRegistrations.length === 0}
                >
                  <FiDownload />
                  Export CSV ({filteredRegistrations.length})
                </Button>
              )}
            </div>
          </div>

          {/* Stats Row */}
          <Row className="g-3 mb-4">
            {statCards.map(({ label, value, icon: Icon, className }) => (
              <Col xs={6} lg={3} key={label}>
                <div
                  className={`internal-realtors-stat border rounded-3 p-3 p-md-4 h-100 d-flex align-items-center justify-content-between ${className}`}
                >
                  <div>
                    <small className="d-block fw-semibold text-uppercase mb-2 text-truncate" style={{ fontSize: '0.72rem' }}>
                      {label}
                    </small>
                    {loading ? (
                      <span className="placeholder col-6 d-block" />
                    ) : (
                      <strong className="display-6 lh-1">{value}</strong>
                    )}
                  </div>
                  <div className="internal-realtors-stat__icon bg-body rounded-3 p-3 d-flex flex-shrink-0">
                    <Icon size={22} />
                  </div>
                </div>
              </Col>
            ))}
          </Row>

          {/* Main Panel */}
          <section className="internal-realtors-panel bg-body border border-gray-200 rounded-3 overflow-hidden shadow-sm">
            {/* Filter Tabs & Search Header */}
            <div className="p-3 p-md-4 border-bottom">
              <div className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3 mb-3">
                <div>
                  <h2 className="h5 fw-bold text-primary-800 mb-1">
                    Registrations &amp; Inquiries
                  </h2>
                  <small className="text-muted">
                    Showing {filteredRegistrations.length} of {registrations.length} total entries
                    {activeFunnel !== 'ALL' && ` in "${activeFunnel}"`}
                  </small>
                </div>

                <InputGroup
                  className="internal-realtors-search"
                  style={{ maxWidth: 380 }}
                >
                  <InputGroup.Text className="bg-body border-end-0">
                    <FiSearch aria-hidden="true" />
                  </InputGroup.Text>
                  <Form.Control
                    type="search"
                    value={search}
                    placeholder="Search name, email, phone, country..."
                    aria-label="Search registrations"
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

              {/* Funnel Filter Pills */}
              <div className="d-flex flex-wrap align-items-center gap-2 pt-2">
                <span className="text-muted small fw-semibold me-1 d-inline-flex align-items-center gap-1">
                  <FiFilter size={13} /> Filter Funnel:
                </span>
                {funnelTabs.map(({ key, label, count }) => {
                  const isActive = activeFunnel === key;
                  return (
                    <Button
                      key={key}
                      variant={isActive ? 'primary' : 'outline-secondary'}
                      size="sm"
                      className="rounded-pill px-3 py-1 d-inline-flex align-items-center gap-2 text-nowrap"
                      onClick={() => setActiveFunnel(key)}
                      style={{ fontSize: '0.82rem' }}
                    >
                      <span>{label}</span>
                      <span
                        className={`badge rounded-pill ${
                          isActive
                            ? 'bg-light text-primary'
                            : 'bg-secondary-subtle text-secondary-emphasis'
                        }`}
                        style={{ fontSize: '0.72rem' }}
                      >
                        {count}
                      </span>
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Content Area */}
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
                      <th className="ps-4 py-3">Lead / Registrant</th>
                      <th className="py-3">Funnel</th>
                      <th className="py-3">Phone / Contact</th>
                      <th className="py-3">Submitted</th>
                      <th className="py-3 text-end pe-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRegistrations.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center text-muted py-5">
                          <FiInbox size={32} className="mb-2 text-secondary" />
                          <div className="fw-semibold">No matching registrations found.</div>
                          <small className="text-muted">
                            {search
                              ? 'Try adjusting your search criteria or clear the funnel filter.'
                              : 'No entries currently recorded in this funnel.'}
                          </small>
                        </td>
                      </tr>
                    ) : (
                      paginatedRegistrations.map(({ id, attributes }) => {
                        const extra = parseContent(attributes.content);
                        const badgeInfo = getFunnelBadgeVariant(attributes.funnel);

                        return (
                          <tr key={id}>
                            {/* Registrant / Name */}
                            <td className="ps-4 py-3">
                              <div className="d-flex align-items-center gap-3">
                                <div
                                  className="internal-realtors-avatar bg-primary-100 text-primary-700 rounded-circle d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
                                  style={{ width: 42, height: 42, fontSize: '0.85rem' }}
                                >
                                  {getInitials(attributes.name)}
                                </div>
                                <div className="min-w-0">
                                  <div className="fw-semibold text-body text-truncate d-flex align-items-center gap-2">
                                    <span>{attributes.name || 'Anonymous Lead'}</span>
                                    {extra.country && (
                                      <Badge
                                        bg="light"
                                        text="dark"
                                        className="border text-uppercase px-2"
                                        style={{ fontSize: '0.68rem' }}
                                      >
                                        <FiGlobe className="me-1" />
                                        {extra.country}
                                      </Badge>
                                    )}
                                  </div>
                                  <small className="text-muted d-block text-truncate">
                                    {maskEmail(attributes.email)}
                                  </small>
                                </div>
                              </div>
                            </td>

                            {/* Funnel */}
                            <td className="py-3">
                              <Badge
                                bg={badgeInfo.bg}
                                className="px-2 py-1 text-wrap"
                                style={{ fontSize: '0.75rem', fontWeight: 600 }}
                              >
                                {badgeInfo.label}
                              </Badge>
                              {extra.homePurpose && (
                                <div className="small text-muted mt-1 text-truncate" style={{ maxWidth: 180 }}>
                                  Purpose: {extra.homePurpose}
                                </div>
                              )}
                            </td>

                            {/* Mobile / Contact */}
                            <td className="py-3 text-nowrap">
                              <div className="d-flex align-items-center gap-2">
                                <span>{formatPhone(attributes.phone)}</span>
                                {extra.contactChannel && (
                                  <Badge
                                    bg="light"
                                    text="dark"
                                    className="border"
                                    style={{ fontSize: '0.68rem' }}
                                  >
                                    {extra.contactChannel}
                                  </Badge>
                                )}
                              </div>
                            </td>

                            {/* Timestamp */}
                            <td className="text-nowrap py-3">
                              <div className="fw-medium">
                                {new Date(attributes.createdAt).toLocaleDateString()}
                              </div>
                              <small className="text-muted">
                                {new Date(attributes.createdAt).toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </small>
                            </td>

                            {/* Actions */}
                            <td className="text-end pe-4 py-3">
                              <Button
                                variant="outline-primary"
                                size="sm"
                                className="px-3"
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

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="internal-realtors-pagination border-top p-3 p-md-4 d-flex flex-column flex-sm-row align-items-center justify-content-between gap-3">
                    <small className="text-muted">
                      Showing {pageStart + 1}-
                      {Math.min(pageStart + ITEMS_PER_PAGE, filteredRegistrations.length)}{' '}
                      of {filteredRegistrations.length} registrations
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

      {/* Details Modal */}
      <Modal
        show={Boolean(selectedRegistration)}
        onHide={() => setSelectedRegistration(null)}
        centered
        size="lg"
        dialogClassName="internal-realtors-modal"
      >
        <Modal.Header closeButton className="border-bottom">
          <Modal.Title className="h5 fw-bold text-primary-800 d-flex align-items-center gap-2">
            Registration Details
            {selectedRegistration?.attributes?.funnel && (
              <Badge
                bg={getFunnelBadgeVariant(selectedRegistration.attributes.funnel).bg}
                className="ms-2"
                style={{ fontSize: '0.72rem' }}
              >
                {getFunnelBadgeVariant(selectedRegistration.attributes.funnel).label}
              </Badge>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          {selectedRegistration && (() => {
            const { attributes } = selectedRegistration;
            const extra = parseContent(attributes.content);

            const detailRows = [
              {
                label: 'Full Name',
                value: attributes.name || 'Not provided',
                copyValue: attributes.name,
                key: 'name',
              },
              {
                label: 'Email Address',
                value: maskEmail(attributes.email),
                copyValue: attributes.email,
                key: 'email',
              },
              {
                label: 'Phone Number',
                value: formatPhone(attributes.phone),
                copyValue: attributes.phone,
                key: 'phone',
              },
              {
                label: 'Funnel / Campaign',
                value: attributes.funnel || 'General Submission',
                key: 'funnel',
              },
              {
                label: 'Source / Page',
                value: attributes.source || '-',
                key: 'source',
              },
            ];

            // Diaspora-specific entries
            if (extra.country) {
              detailRows.push({
                label: 'Country of Residence',
                value: extra.country,
                key: 'country',
              });
            }
            if (extra.homePurpose) {
              detailRows.push({
                label: 'What is the home for?',
                value: extra.homePurpose,
                key: 'homePurpose',
              });
            }
            if (extra.contactChannel) {
              detailRows.push({
                label: 'Preferred Contact Method',
                value: extra.contactChannel,
                key: 'contactChannel',
              });
            }
            if (extra.consent !== undefined) {
              detailRows.push({
                label: 'Consent Given',
                value: extra.consent ? 'Yes (Opted in)' : 'No',
                key: 'consent',
              });
            }
            if (extra.firstName || extra.lastName) {
              detailRows.push({
                label: 'Parsed Name',
                value: `${extra.firstName || ''} ${extra.lastName || ''}`.trim(),
                key: 'parsedName',
              });
            }

            return (
              <>
                {/* Registrant Highlight Header */}
                <div className="d-flex align-items-center gap-3 mb-4 p-3 bg-primary-50 rounded-3 border border-primary-100">
                  <div
                    className="internal-realtors-avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
                    style={{ width: 54, height: 54, fontSize: '1.1rem' }}
                  >
                    {getInitials(attributes.name)}
                  </div>
                  <div>
                    <h3 className="h5 fw-bold mb-1 text-primary-900">
                      {attributes.name || 'Anonymous Lead'}
                    </h3>
                    <small className="text-muted">
                      Registered on {new Date(attributes.createdAt).toLocaleString()}
                    </small>
                  </div>
                </div>

                {/* Detail Table */}
                <div className="border rounded-3 overflow-hidden mb-4">
                  {detailRows.map(({ label, value, copyValue, key }, index) => (
                    <div
                      key={label}
                      className={`d-flex justify-content-between align-items-center gap-3 p-3 ${
                        index < detailRows.length - 1 ? 'border-bottom' : ''
                      }`}
                    >
                      <div className="min-w-0">
                        <small className="text-muted d-block mb-1">{label}</small>
                        <span className="fw-semibold text-break">{value}</span>
                      </div>
                      {isAdmin && copyValue && (
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          className="p-1 px-2 flex-shrink-0"
                          title={`Copy ${label.toLowerCase()}`}
                          onClick={() => copyToClipboard(copyValue, key)}
                        >
                          <FiCopy className="me-1" />
                          {copiedKey === key ? 'Copied!' : 'Copy'}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Quick Outreach Action */}
                {attributes.phone && attributes.phone !== 'N/A' && (
                  <div className="d-flex flex-wrap gap-2 justify-content-end">
                    <a
                      href={`https://wa.me/${normalizePhone(attributes.phone)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-success btn-sm d-inline-flex align-items-center gap-2"
                    >
                      <FiMessageSquare /> Chat on WhatsApp
                    </a>
                    {attributes.email && (
                      <a
                        href={`mailto:${attributes.email}`}
                        className="btn btn-outline-primary btn-sm d-inline-flex align-items-center gap-2"
                      >
                        Send Email
                      </a>
                    )}
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
