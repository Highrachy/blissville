import React from 'react';
import PropTypes from 'prop-types';
import { Card, Accordion } from 'react-bootstrap';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import AccordionContext from 'react-bootstrap/AccordionContext';

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
    <>
      <h5 onClick={decoratedOnClick}>
        {children}
        {isCurrentEventKey ? (
          <span className="accordion-icon accordion-icon-open pull-right">
            {iconOpen}
          </span>
        ) : (
          <span className="accordion-icon accordion-icon-close pull-right">
            {iconClose}
          </span>
        )}
      </h5>
    </>
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
  iconClose: '+',
  iconOpen: '-',
};

const FAQsAccordion = ({ faqs }) => {
  return (
    <Accordion defaultActiveKey={0}>
      {faqs.map((faq, index) => (
        <Card key={index + 1}>
          <Accordion defaultActiveKey="0">
            <Card>
              <ContextAwareToggle eventKey={index + 1}>
                <Card.Header>{faq.question}</Card.Header>
              </ContextAwareToggle>
              <Accordion.Collapse eventKey={index + 1}>
                <Card.Body>{faq.answer}</Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Card>
      ))}
    </Accordion>
  );
};

FAQsAccordion.propTypes = {
  faqs: PropTypes.array.isRequired,
};

export default FAQsAccordion;
