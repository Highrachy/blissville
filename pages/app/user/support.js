import Backend from '@/components/admin/Backend';
import FormikButton from '@/components/forms/FormikButton';
import FormikForm from '@/components/forms/FormikForm';
import Input from '@/components/forms/Input';
import { supportSchema } from '@/components/forms/schemas/page-schema';
import Textarea from '@/components/forms/Textarea';
import { getFullName } from '@/utils/helpers';
import { UserContext } from 'context/user';
import React, { useContext } from 'react';
import { DashboardTable } from './dashboard';

const Support = () => {
  return (
    <Backend title="Support">
      <div className="row">
        <div className="col-md-8">
          {/* invite via link */}
          <section className="card p-4 mb-4">
            <SupportForm />
          </section>
        </div>
        <div className="col-md-4">
          {/* referral Rewards */}
          <div className="mt-n5">
            <DashboardTable title="Help Center">
              <tr>
                <th width="300">
                  <span className="fw-semibold">Creating a Ticket</span>
                </th>
              </tr>
              <tr>
                <th width="300">
                  <span className="fw-semibold">Making Payments</span>
                </th>
              </tr>
              <tr>
                <th width="300">
                  <span className="fw-semibold">Subscribing to Blissville</span>
                </th>
              </tr>
              <tr>
                <th width="300">
                  <span className="fw-semibold">Becoming an Investor</span>
                </th>
              </tr>
            </DashboardTable>
          </div>
        </div>
      </div>
    </Backend>
  );
};

const SupportForm = () => {
  const { user } = useContext(UserContext);
  const handleSubmit = async (values, actions) => {
    const payload = {
      ...values,
      name: getFullName(user),
      email: user.email,
      source: 'Support Page',
    };
    try {
      axios({
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/contacts`,
        data: { data: payload },
        headers: { Authorization: getTokenFromStore() },
      })
        .then(function (response) {
          const { status } = response;
          if (statusIsSuccessful(status)) {
            toast.success('Information sent successfully');
            actions.resetForm();
            actions.setSubmitting(false);
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
    <>
      <h5>Send Us a Message</h5>
      <hr className="dotted-border" />
      <p>
        Have a question, comment, suggestion, feedback or complaints, send us a
        quick message below:
      </p>
      <div className="row">
        <div className="col-md-10">
          <FormikForm
            schema={supportSchema}
            handleSubmit={handleSubmit}
            name="support-us-form"
            buttonText="Send Message"
            persistForm
          >
            <Input name="subject" label="Subject" />
            <Textarea name="message" label="Your Message" />

            <FormikButton color="info" className="mt-3 text-white btn-wide">
              Submit
            </FormikButton>
          </FormikForm>
        </div>
      </div>
    </>
  );
};

export default Support;
