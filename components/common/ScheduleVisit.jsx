import { PHONE_NUMBER } from '@/utils/constants';
import { getError, statusIsSuccessful, valuesToOptions } from '@/utils/helpers';
import { getTokenFromStore } from '@/utils/localStorage';
import axios from 'axios';
import Image from 'next/image';
import React from 'react';
import { toast } from 'react-toastify';
import DatePicker from '../forms/DatePicker';
import FormikButton from '../forms/FormikButton';
import Input from '../forms/Input';
import { visitationSchema } from '../forms/schemas/page-schema';
import { EmailIcon, PhoneIcon } from '../Icons/Icons';
import FormikModalButton from '../utils/FormikModalButton';
import Parallax from './Parallax';
import Section from './Section';

const ScheduleVisit = () => (
  <Parallax bgImage="/assets/img/bg/schedule-a-visit.jpg" isDark={false}>
    <Section noPaddingBottom className="investor-section pb-8">
      <div className="container">
        <div className="row">
          <div className="col-md-9 text-white">
            <h3 className="pt-5 text-white">Schedule a Visit</h3>
            <p className="pb-3 pe-md-5 lead">
              Our designs respond imaginatively to the cultural, climatic and
              environmental conditions; as such, only the most suitable
              materials are employed.
            </p>

            <div className="row mb-4 schedule-visit">
              <div className="d-flex flex-row align-items-md-center">
                <div className="flex-shrink-0">
                  <Image
                    src={`/assets/img/team/sales-manager.jpg`}
                    alt="Sales Manager"
                    width={150}
                    height={150}
                    objectFit="cover"
                    className="rounded pe-3"
                  />
                </div>
                <div className="flex-grow-1 ms-md-3">
                  <h5 className="text-white mb-2 mb-md-3 schedule-visit__name">
                    Sandra Holyfield
                  </h5>
                  <p className="text-white mb-2 mb-md-3 schedule-visit__title">
                    SALES MANAGER
                  </p>
                  <p className=" schedule-visit__phone mb-2 mb-md-3">
                    <PhoneIcon />
                    &nbsp;
                    <a className="text-white" href={PHONE_NUMBER.HREF}>
                      {PHONE_NUMBER.WITH_COUNTRY_CODE}
                    </a>
                  </p>
                  <p className="mb-2 mb-md-3 schedule-visit__email">
                    <a
                      href="mailto:blissville@highrachy.com"
                      className="text-white"
                    >
                      <EmailIcon />
                      &nbsp; blissville@highrachy.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <ScheduleVisitationButton
              visiting="General Visitation"
              wideButton={true}
            />
          </div>
        </div>
      </div>
    </Section>
  </Parallax>
);

export const ScheduleVisitationButton = ({ visiting, wideButton = false }) => {
  const handleSubmit = async (values, actions) => {
    const payload = {
      ...values,
      visitDate: values.visitDate.date,
      visiting: `${visiting}`,
    };
    try {
      axios({
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/visitations`,
        data: { data: payload },
      })
        .then(function (response) {
          const { status } = response;
          if (statusIsSuccessful(status)) {
            toast.success('Visitation has been successfully scheduled');
            actions.resetForm({ values: {} });
            actions.setSubmitting(false);
            return true;
          }
        })
        .catch(function (error) {
          toast.error(getError(error));
        });
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <FormikModalButton
      color="info"
      className={`btn text-white ${wideButton ? 'btn-wide' : ''}`}
      name="schedule-visit"
      schema={visitationSchema}
      initialValues={{}}
      modalContent={<VisitationForm />}
      handleSubmit={handleSubmit}
    >
      Schedule Visit
    </FormikModalButton>
  );
};

const VisitationForm = () => {
  return (
    <>
      <Input
        isValidMessage="Name looks good"
        label="Name"
        name="name"
        placeholder="Name"
      />
      <Input
        isValidMessage="Email address seems valid"
        label="Email"
        name="email"
        placeholder="Email Address"
      />
      <Input
        isValidMessage="Phone number looks good"
        label="Phone"
        name="phone"
        placeholder="Phone"
      />
      <DatePicker
        label="Visitation Date"
        name="visitDate"
        minDate={new Date()}
        placeholder="Visit Date"
      />

      <FormikButton color="info" className="mt-3 text-white btn-wide">
        Schedule Visit
      </FormikButton>
    </>
  );
};

export default ScheduleVisit;
