import React from 'react';
import { getTinyDate } from 'utils/date-helpers';
import {
  getFormattedAddress,
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
import { Wallet } from 'iconsax-react';
import ScheduleVisit from '@/components/common/ScheduleVisit';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { PAYMENT_SOURCE, PHONE_NUMBER } from '@/utils/constants';

const Invoice = () => {
  const { query } = useRouter();
  const [transaction, setTransaction] = React.useState(null);
  const { reference } = query || null;

  const confirmTransaction = async (payment, assignedProperty) => {
    try {
      const payload = {
        assignedProperty: assignedProperty.id,
        amount: payment.amount / 100,
        reference: payment.reference,
        paymentSource: PAYMENT_SOURCE.PAYSTACK,
      };
      const { data: transactionExists } = await Axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/transactions`,
        {
          params: {
            'filters[reference][$eq]': payload.reference,
          },
        }
      );
      if (transactionExists.data.length === 0) {
        await Axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/transactions`,
          { data: payload }
        );
      }
    } catch (error) {
      toast.error(getError(error));
    }
  };

  React.useEffect(() => {
    reference &&
      Axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payment/verify/${reference}`
      )
        .then(function (response) {
          const { status, data } = response;

          if (statusIsSuccessful(status)) {
            const payment = data?.data;
            const { value } =
              payment.metadata.custom_fields[
                payment.metadata.custom_fields.length - 1
              ];
            const assignedPropertyId = JSON.parse(value)?.assignedPropertyId;

            Axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/api/assigned-properties/${assignedPropertyId}?populate=*`
            )
              .then(async function (response) {
                const { status, data } = response;
                if (statusIsSuccessful(status)) {
                  const assignedProperty = {
                    id: data?.data?.id,
                    ...data?.data?.attributes,
                  };
                  setTransaction({
                    payment,
                    property: assignedProperty?.property?.data?.attributes,
                  });
                  await confirmTransaction(payment, assignedProperty);
                }
              })
              .catch(function (error) {
                toast.error(getError(error));
              });
          }
        })
        .catch(function (error) {
          toast.error(getError(error));
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reference]);

  console.log('transaction', transaction);

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
            <InvoiceContent transaction={transaction} />
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

export const InvoiceContent = ({ transaction }) => {
  const userName = `Test`;

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
                          <h6 className="mb-2 mb-sm-3 invoice__email">
                            {userName}
                          </h6>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="mb-2">
                            Date Issued:{' '}
                            <strong>
                              {getTinyDate(transaction.payment.paidOn)}
                            </strong>
                          </p>
                        </td>
                        <td className="text-end">
                          <p className="mb-2">
                            {PHONE_NUMBER.WITH_COUNTRY_CODE}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="mb-0">
                            Receipt No: <strong>BA21001</strong>
                          </p>
                        </td>
                        <td className="text-end">
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
                      <p className="mt-2 mt-sm-3">
                        {transaction.property.name}
                      </p>
                    </td>
                    <td className="text-end text-amount strong">
                      <p className="mt-2 mt-sm-3">
                        {moneyFormatInNaira(transaction.payment.amount / 100)}
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
                      <small>Via {transaction.payment.paymentSource}</small>
                      <br />
                      {/* <small>Payment for {paymentInfo.paymentType}</small> */}
                    </td>
                    <td>
                      <h4 className="my-4">
                        {getTinyDate(transaction.payment.paidOn)}
                      </h4>
                    </td>
                    <td className="text-end text-green">
                      <h4 className="text-amount">
                        {' '}
                        {moneyFormatInNaira(transaction.payment.amount / 100)}
                      </h4>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="3">
                      <span className="text-small mt-3 text-muted">
                        Ref: {transaction.payment.additionalInfo} /{' '}
                        {transaction.id}
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
                <div className="text-center text-muted text-smaller w-100">
                  This receipt is automatically generated at Blissville
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
