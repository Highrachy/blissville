import Backend from '@/components/admin/Backend';
import FormikForm from '@/components/forms/FormikForm';
import Input from '@/components/forms/Input';
import { contactUsSchema } from '@/components/forms/schemas/page-schema';
import Textarea from '@/components/forms/Textarea';
import React from 'react';
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
  const handleSubmit = async (values, actions) => {
    const fetchOptions = {
      /**
       * The default method for a request with fetch is GET,
       * so we must tell it to use the POST HTTP method.
       */
      method: 'POST',
      /**
       * These headers will be added to the request and tell
       * the API that the request body is JSON and that we can
       * accept JSON responses.
       */
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      /**
       * The body of our POST request is the JSON string that
       * we created above.
       */
      body: JSON.stringify({ data: values }),
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/contacts`,
      fetchOptions
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      toast.error(errorMessage);
    } else {
      toast.success('Information sent successfully');
    }
    actions.setSubmitting(false);
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
            schema={contactUsSchema}
            handleSubmit={handleSubmit}
            name="support-us-form"
            buttonText="Send Message"
            persistForm
          >
            <Input name="subject" label="Subject" />
            <Textarea name="message" label="Your Message" />
          </FormikForm>
        </div>
      </div>
    </>
  );
};

export default Support;
