import React from 'react';
import { getTinyDate } from 'utils/date-helpers';
import {
  getFormattedAddress,
  getFullName,
  moneyFormatInNaira,
  statusIsSuccessful,
} from 'utils/helpers';
import * as queryString from 'query-string';
import Axios from 'axios';
import { getError } from 'utils/helpers';
import { Loading } from 'components/utils/LoadingItems';
import Navigation from '@/components/layouts/Navigation';
import Footer from '@/components/common/Footer';
import { PageHeader } from '@/components/common/Header';
import { Lovely, Wallet } from 'iconsax-react';
import ScheduleVisit from '@/components/common/ScheduleVisit';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import {
  PAYMENT_SOURCE,
  PAYMENT_SOURCE_NAME,
  PHONE_NUMBER,
} from '@/utils/constants';

const Invoice = () => {
  const { query } = useRouter();
  const [transaction, setTransaction] = React.useState(null);
  const { reference } = query || null;

  React.useEffect(() => {
    reference &&
      Axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payment/verify/${reference}`
      )
        .then(function (response) {
          const { status, data } = response;

          if (statusIsSuccessful(status)) {
            setTransaction(data);
          }
        })
        .catch(function (error) {
          toast.error(getError(error));
        });
  }, [reference]);

  return (
    <>
      <Navigation />
      <PageHeader
        title="Payment Verification"
        bgImage="/assets/img/bg/about-us.jpeg"
      />
      <section className="py-5">
        <div className="container">
          {transaction ? (
            <InvoiceContent data={transaction} />
          ) : (
            <div className="blissville-invoice">
              <div className="mt-8">
                <Loading text="Loading Payment Information" Icon={<Wallet />} />
              </div>
            </div>
          )}
        </div>
      </section>

      <ScheduleVisit />
      <Footer />
    </>
  );
};

export const InvoiceContent = ({ data: { property, transaction, user } }) => {
  if (!transaction?.receiptNo) {
    return (
      <div className="blissville-invoice">
        <div className="mt-7 text-danger h3 text-center">
          <span className="icon-lg">
            <Wallet />
          </span>
          <br />
          Payment not successful
        </div>
      </div>
    );
  }
  const userName = getFullName(user) || 'Unknown';
  const receiptNo = transaction.receiptNo;

  console.log('transaction', transaction);

  return (
    <div className="blissville-invoice">
      <section className="invoice__page">
        <div className="row">
          <div className="col-sm-12 mb-1 mb-sm-4 invoice__content">
            {/* Logo */}
            <Image
              src="/assets/img/logo.png"
              alt="blissville logo"
              width={147}
              height={46}
            />
            <div className="card-body d-flex flex-column">
              {/* Header Details */}
              <div className="invoice__separator">
                <div className="d-flex flex-column">
                  <table>
                    <tbody>
                      <tr className="tr-content">
                        <td colSpan={2}>
                          <h6 className="mb-3 mb-sm-4 invoice__email font-secondary">
                            {userName}
                          </h6>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="mb-2 text-sm">
                            Date Issued:{' '}
                            <strong>
                              {getTinyDate(transaction.createdAt)}
                            </strong>
                          </p>
                        </td>
                        <td className="text-end text-sm">
                          <p className="mb-2">
                            {PHONE_NUMBER.WITH_COUNTRY_CODE}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="mb-0 text-sm">
                            Receipt No: <strong>{receiptNo}</strong>
                          </p>
                        </td>
                        <td className="text-end text-sm">
                          <p className="mb-0">info@blissville.com</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Receipt Details */}
              <table className="invoice__separator invoice__table">
                <thead>
                  <tr className="tr-header tr-border-bottom">
                    <th>DESCRIPTION</th>
                    <th className="text-end">TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="tr-content">
                    <td>
                      <p className="mt-2 mt-sm-3">{property.name}</p>
                    </td>
                    <td className="text-end text-amount strong">
                      <p className="mt-2 mt-sm-3">
                        {moneyFormatInNaira(transaction.amount)}
                      </p>
                    </td>
                  </tr>
                  <tr className="tr-content">
                    {/* <td>{paymentInfo.description}</td> */}
                    <td>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              <div className="invoice__separator"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Details */}
      <section className="invoice__page invoice__footer">
        <div className="row">
          <div className="col-sm-12">
            <div className="d-flex flex-column">
              <table className="mt-3 mt-sm-5 invoice__table">
                <thead>
                  <tr className="tr-header tr-border-bottom">
                    <th>PAYMENT INFO</th>
                    <th>PAID ON</th>
                    <th className="text-end">TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="tr-content tr-border-bottom">
                    <td>
                      <small>
                        Via {PAYMENT_SOURCE_NAME[transaction.paymentSource]}
                      </small>
                    </td>
                    <td>
                      <h4 className="my-4">
                        {getTinyDate(transaction.createdAt)}
                      </h4>
                    </td>
                    <td className="text-end text-green">
                      <h4 className="text-amount">
                        {' '}
                        {moneyFormatInNaira(transaction.amount)}
                      </h4>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="3">
                      <span className="text-xs text-uppercase mt-3 text-muted">
                        Ref: {transaction.receiptNo} / {transaction.reference}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="row invoice__separator">
                <div className="col-6">
                  <h5>Thank You!</h5>
                </div>
                <div className="col-6 text-end">
                  <h5 className="text-uppercase invoice__tag-line"></h5>
                </div>
              </div>

              <div className="row invoice__separator">
                <div className="text-center text-muted text-xs w-100">
                  Generated with{' '}
                  <span className="text-secondary">
                    <Lovely variant="Bold" />
                  </span>{' '}
                  from <span className="fw-bold">Blissville.com.ng</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Invoice;
