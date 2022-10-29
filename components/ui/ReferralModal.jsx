import { storeReferral } from '@/utils/localStorage';
import axios from 'axios';
import { CloseCircle, CloseSquare } from 'iconsax-react';
import Link from 'next/link';
import React from 'react';
import Button from '../forms/Button';
import Modal from './Modal';

const ReferralModal = ({ referralCode, inviteCode }) => {
  const [showReferralModal, setShowReferralModal] = React.useState(false);
  const [referral, setReferral] = React.useState(null);

  React.useEffect(() => {
    referralCode &&
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users?filters[referralCode][$eq]=${referralCode}`
        )
        .then((response) => {
          const { status, data } = response;
          if (status === 200) {
            if (data.length > 0) {
              setReferral(data[0]);
              setShowReferralModal(true);
              storeReferral(data[0]);
            }
          }
        })
        .catch((error) => {
          setReferral({});
        });
  }, [referralCode]);
  React.useEffect(() => {
    console.log('in use effect');
    inviteCode &&
      // Axios.get(`${BASE_API_URL}/referral/${inviteCode}`)
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/referrals/${inviteCode}?populate=*`
        )
        .then((response) => {
          const {
            status,
            data: { data },
          } = response;
          console.log('response -', response);
          if (status === 200) {
            const output = {
              ...data.attributes.user.data.attributes,
              referred: {
                id: data.attributes.id,
                name: data.attributes.referralName,
                emai: data.attributes.email,
              },
            };
            console.log('result', output);
            setReferral(output);
            setShowReferralModal(true);
            storeReferral(output);
          }
        })
        .catch((error) => {
          setReferral({});
        });
  }, [inviteCode]);
  return referral ? (
    <Modal
      show={showReferralModal}
      onHide={() => setShowReferralModal(false)}
      showFooter={false}
    >
      <section className="row">
        <div className="text-end text-muted">
          <span
            className="icon-sm link-text link-danger"
            onClick={() => setShowReferralModal(false)}
          >
            <CloseSquare />
          </span>
        </div>
        <div className="col-md-12 text-center">
          <h3 className="my-4">
            Hello
            {referral?.referred?.name ? ` ${referral.referred.name}` : ''},
          </h3>
          <p className="lead">
            <span className="text-primary fw-semibold">
              {referral.firstName}{' '}
            </span>
            has invited you to join <strong>Blissville</strong>
          </p>
          <Link href="/register" passHref>
            <a className="btn btn-secondary my-4">Register Now</a>
          </Link>{' '}
          &nbsp;&nbsp;
        </div>
      </section>
    </Modal>
  ) : null;
};

export default ReferralModal;
