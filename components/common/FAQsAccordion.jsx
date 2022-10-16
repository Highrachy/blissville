import React from 'react';
import PropTypes from 'prop-types';
import { Card, Accordion } from 'react-bootstrap';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import AccordionContext from 'react-bootstrap/AccordionContext';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export const ContextAwareToggle = ({
  children,
  eventKey,
  callback,
  iconClose,
  iconOpen,
}) => {
  const { activeEventKey } = React.useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <h6 className="m-0 p-4" onClick={decoratedOnClick}>
      {children}
      <span className="icon-sm float-end">
        {isCurrentEventKey ? iconOpen : iconClose}
      </span>
    </h6>
  );
};

ContextAwareToggle.propTypes = {
  children: PropTypes.any.isRequired,
  eventKey: PropTypes.any.isRequired,
  callback: PropTypes.func,
  iconClose: PropTypes.any,
  iconOpen: PropTypes.any,
};

ContextAwareToggle.defaultProps = {
  callback: () => {},
  iconClose: <FaChevronDown />,
  iconOpen: <FaChevronUp />,
};

const FAQsAccordion = ({ faqs }) => {
  if (faqs.length === 0) return null;
  return (
    <Accordion defaultActiveKey={0}>
      {faqs.map((faq, index) => (
        <div key={index + 1} className="mb-3">
          <Accordion defaultActiveKey="0">
            <Card className="mb-0 rounded">
              <Card.Header className="m-0 p-0 w-100 rounded border-0 cursor">
                <ContextAwareToggle eventKey={index + 1}>
                  {faq.question}
                </ContextAwareToggle>
              </Card.Header>
              <Accordion.Collapse eventKey={index + 1}>
                <Card.Body className="pb-5">{faq.answer}</Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
      ))}
    </Accordion>
  );
};

FAQsAccordion.propTypes = {
  faqs: PropTypes.array.isRequired,
};

export default FAQsAccordion;
