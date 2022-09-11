import Backend from '@/components/admin/Backend';
import Button from '@/components/forms/Button';
import Input from '@/components/forms/Input';
import Sharer from '@/components/ui/Sharer';
import classNames from 'classnames';
import { Direct, DocumentCopy, UserAdd, WalletAdd } from 'iconsax-react';
import React from 'react';
import { Tab } from 'react-bootstrap';
import { DashboardTable } from './dashboard';

const Referrals = () => {
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
                  className="form-control"
                  placeholder="https://blissvile.com/referrals/Haruna-r50EGBRA"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text" id="basic-addon2">
                  <DocumentCopy />
                </span>
              </div>
              <Button color="secondary" className="btn-sm">
                Copy Link
              </Button>

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
                Press enter or type comma to invite multiple email addresses
              </p>
              <input
                type="text"
                className="form-control"
                placeholder="Emails"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <Button color="light" className="btn-sm mt-3">
                Invite Friends
              </Button>
            </div>
          </section>

          {/* referral Rewards */}
          <DashboardTable title="Referral Rewards">
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
          </DashboardTable>
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
          <DashboardTable title="Invite History">
            <tr>
              <th width="300">
                <span className="fw-semibold">sherlock.holmes@awesome.com</span>
                <br />
                <span className="fw-semibold text-danger text-xs">
                  Invite Sent
                </span>
              </th>
              <td className="text-end">
                <span className="fw-semibold">-</span>
              </td>
            </tr>

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

            <tr>
              <th width="300">
                <span className="fw-semibold">Daniel Omokachi</span>
                <br />
                <span className="fw-semibold text-warning text-xs">
                  Registered
                </span>
              </th>
              <td className="text-end">
                <span className="fw-semibold">-</span>
              </td>
            </tr>
          </DashboardTable>
        </div>
      </div>
    </Backend>
  );
};

export default Referrals;
