import React from 'react';
import PropTypes from 'prop-types';
import Button from '@/components/forms/Button';
import Modal from '@/components/ui/Modal';
import FormikForm from '../forms/FormikForm';

const FormikModalButton = ({
  color,
  className,
  children,
  handleSubmit,
  initialValues,
  modalContent,
  modalClassName,
  modalTitle,
  name,
  schema,
  size,
  showAllFormikState,
  showFormikState,
}) => {
  const [showModal, setShowModal] = React.useState(false);

  const processSubmit = async (values, actions) => {
    await handleSubmit(values, actions);
    setShowModal(false);
  };

  return (
    <>
      <Button
        color={color}
        className={className}
        onClick={() => setShowModal(true)}
      >
        {children}
      </Button>

      {/* Modals */}
      <Modal
        title={modalTitle || children}
        show={showModal}
        size={size}
        onHide={() => setShowModal(false)}
        className={modalClassName}
      >
        <section className="row">
          <div className="col-md-12 my-3">
            <div>
              <FormikForm
                schema={schema}
                handleSubmit={processSubmit}
                initialValues={initialValues}
                name={name}
                showFormikState={showFormikState}
                showAllFormikState={showAllFormikState}
              >
                {modalContent}
              </FormikForm>
            </div>
          </div>
        </section>
      </Modal>
    </>
  );
};

FormikModalButton.defaultProps = {
  color: 'primary',
  className: 'btn-xs',
  initialValues: {},
  modalClassName: '',
  modalContent: 'Are you sure you want to continue?',
  modalTitle: '',
  schema: {},
  size: 'md',
  showAllFormikState: false,
  showFormikState: false,
};

FormikModalButton.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  modalClassName: PropTypes.string,
  modalContent: PropTypes.node,
  modalTitle: PropTypes.string,
  name: PropTypes.string.isRequired,
  schema: PropTypes.object,
  size: PropTypes.string,
  showAllFormikState: PropTypes.bool,
  showFormikState: PropTypes.bool,
};

export default FormikModalButton;
