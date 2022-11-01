import Backend from '@/components/admin/Backend';
import Button from '@/components/forms/Button';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Input from '@/components/forms/Input';
import Sharer from '@/components/ui/Sharer';
import {
  Check,
  ClipboardTick,
  Direct,
  DocumentCopy,
  UserAdd,
  WalletAdd,
} from 'iconsax-react';
import React, { useContext } from 'react';
import { UserContext } from 'context/user';
import { DashboardTable } from './dashboard';
import FormikButton from '@/components/forms/FormikButton';
import FormikForm from '@/components/forms/FormikForm';
import { referralSchema } from '@/components/forms/schemas/page-schema';
import axios from 'axios';
import { getTokenFromStore } from '@/utils/localStorage';
import {
  getError,
  moneyFormatInNaira,
  statusIsSuccessful,
} from '@/utils/helpers';
import { toast } from 'react-toastify';
import { useSWRQuery } from '@/hooks/useSWRQuery';
import { REFERRAL_STATUS_COLOR, REFERRAL_STATUS_NAME } from '@/utils/constants';

const Referrals = () => {
  const { user } = useContext(UserContext);
  const [copied, setCopied] = React.useState(false);
  const id = user?.id;

  const [query, result] = useSWRQuery({
    name: id ? ['referrals', id] : id,
    endpoint: `api/referrals`,
    axiosOptions: {
      params: {
        'filters[user][id][$eq]': id,
      },
    },
  });

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [copied]);

  const handleSubmit = async (values, actions) => {
    const payload = {
      ...values,
      user: user.id,
    };
    try {
      axios({
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/referrals`,
        data: { data: payload },
        headers: { Authorization: getTokenFromStore() },
      })
        .then(function (response) {
          const { status } = response;
          if (statusIsSuccessful(status)) {
            toast.success('Referral has been successfully invited');
            actions.resetForm({});
            actions.setSubmitting(false);
            query.mutate();
          }
        })
        .catch(function (error) {
          toast.error(getError(error));
        });
    } catch (error) {
      toast.error(getError(error));
    }
  };

  const referralURL = `${process.env.NEXT_PUBLIC_PAGE_URL}?ref=${user?.referralCode}`;

  return (
    <Backend title="Referrals">
      <div className="row">
        <div className="col-md-6">
          {/* invite via link */}
          <section className="card p-4 mb-4">
            <div className="card-body">
              <h5 className="card-title fw-semibold">Invite People via Link</h5>
              <p>
                Refer your friends and earn. We will also give your friends
                rewards because we value your friendship.
              </p>
              <div className="input-group my-3">
                <input
                  type="text"
                  className="form-control text-sm"
                  value={referralURL}
                  aria-label="Recipient's username"
                  aria-describedby="copy-text"
                  disabled
                />
                <CopyToClipboard
                  text={referralURL}
                  onCopy={() => setCopied(true)}
                >
                  {copied ? (
                    <span
                      className="input-group-text text-success disabled"
                      id="copy-text"
                    >
                      <ClipboardTick />
                    </span>
                  ) : (
                    <span
                      className="input-group-text btn btn-light"
                      id="copy-text"
                    >
                      <DocumentCopy />
                    </span>
                  )}
                </CopyToClipboard>
              </div>
              {copied && (
                <div className="mb-3 text-xs text-success">
                  Your referral link has been successfully copied!
                </div>
              )}
              <CopyToClipboard
                text={referralURL}
                onCopy={() => setCopied(true)}
              >
                <Button color="info" className="btn-sm">
                  {copied ? 'Copied' : 'Copy Text'}
                </Button>
              </CopyToClipboard>

              <div className="share">
                <h6 className="mb-0 mt-5">Share via</h6>
                <Sharer />
              </div>
            </div>
          </section>

          {/* invite via email */}
          <section className="card p-4 mb-4">
            <div className="card-body">
              <h5 className="card-title fw-semibold">
                Invite People via email
              </h5>
              <p>
                Enter the name and email address of the person you want to
                refer.
              </p>
              <FormikForm
                schema={referralSchema}
                name="referral-form"
                handleSubmit={handleSubmit}
              >
                <Input
                  type="email"
                  floatingLabel
                  label="Email"
                  name="email"
                  formGroupClassName="mb-2"
                />
                <Input
                  name="referralName"
                  floatingLabel
                  label="Name"
                  optional
                />
                <FormikButton color="secondary" className="btn-sm">
                  Invite Friend
                </FormikButton>
              </FormikForm>
            </div>
          </section>

          {/* referral Rewards */}
          {/* <DashboardTable title="Referral Rewards">
            <tr>
              <th width="300">
                <span className="fw-semibold">JJ Okocha</span>
                <br />
                <span className="fw-semibold text-success text-xs">
                  Rewarded
                </span>
              </th>
              <td className="text-end">
                <span className="fw-semibold">₦ 50,000</span>
              </td>
            </tr>
          </DashboardTable> */}
        </div>
        <div className="col-md-6">
          {/* summary */}
          <section className="card p-4 mb-4">
            <div className="card-body">
              <h5 className="card-title fw-semibold">Summary</h5>
              <div className="bg-gray p-3 d-flex justify-content-between">
                <span className="text-gray-700">Total Received</span>
                <span className="text-gray-900 fw-bold">₦ 50,000</span>
              </div>
            </div>
          </section>
          {/* How it works */}
          <section className="card p-4 mb-4">
            <div className="card-body">
              <h5 className="card-title fw-semibold">How it works</h5>
              <aside className="d-flex mt-4">
                <span className="text-gray-700 me-3">
                  <UserAdd variant="Bulk" size={32} />
                </span>
                <div>
                  <h6 className="mb-0">1. Send Invitation</h6>
                  <p>Invite a friend to check out Blissville</p>
                </div>
              </aside>
              <aside className="d-flex mt-4">
                <span className="text-gray-700 me-3">
                  <Direct variant="Bulk" size={32} />
                </span>
                <div>
                  <h6 className="mb-0">2. Registration</h6>
                  <p>
                    They’ll need to register a with our team via your referral
                    link
                  </p>
                </div>
              </aside>
              <aside className="d-flex mt-4">
                <span className="text-gray-700 me-3">
                  <WalletAdd variant="Bulk" size={32} />
                </span>
                <div>
                  <h6 className="mb-0">3. Earn Rewards</h6>
                  <p>
                    You&apos;ll receive 1.5% of their first property price after
                    they have made their first payment.
                  </p>
                </div>
              </aside>
            </div>
          </section>

          {/* Invite History */}
          {result.length > 0 && (
            <DashboardTable title="Invite History">
              {result.map(({ attributes: referral }, index) => (
                <tr key={index}>
                  <th width="300">
                    <span className="fw-semibold">{referral.email}</span>
                    <br />
                    <span
                      className={`fw-semibold text-${
                        REFERRAL_STATUS_COLOR[referral.status]
                      } text-xs`}
                    >
                      {REFERRAL_STATUS_NAME[referral.status]}
                    </span>
                  </th>
                  <td className="text-end">
                    <span className="fw-semibold">
                      {referral.totalReward > 0
                        ? moneyFormatInNaira(referral.totalReward)
                        : '-'}
                    </span>
                  </td>
                </tr>
              ))}
            </DashboardTable>
          )}
        </div>
      </div>
    </Backend>
  );
};

export default Referrals;
