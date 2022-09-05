import React from 'react';
import PropTypes from 'prop-types';
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';

const CONTENT_BODY = `Hi there! I am sure you would love this`;

const Sharer = ({ shareUrl, content }) => (
  <ul className="list-unstyled list-inline d-flex flex-row mt-4 list-sharer">
    <li>
      <FacebookShareButton quote={content} url={shareUrl}>
        <FacebookIcon round width="48" />
      </FacebookShareButton>
    </li>
    <li>
      <TwitterShareButton title={CONTENT_BODY} url={shareUrl}>
        <TwitterIcon round width="48" />
      </TwitterShareButton>
    </li>
    <li>
      <LinkedinShareButton
        source={shareUrl}
        summary={content}
        title="Blissville"
      >
        <LinkedinIcon round width="48" />
      </LinkedinShareButton>
    </li>
    <li>
      <WhatsappShareButton separator=":: " title={content} url={shareUrl}>
        <WhatsappIcon round width="48" />
      </WhatsappShareButton>
    </li>
    <li>
      <EmailShareButton
        body={content}
        subject={`Hey Friend! Check out Ballers ${shareUrl}`}
      >
        <EmailIcon round width="48" />
      </EmailShareButton>
    </li>
  </ul>
);

Sharer.propTypes = {
  content: PropTypes.string,
  shareUrl: PropTypes.string,
};

Sharer.defaultProps = {
  content: CONTENT_BODY,
  shareUrl: 'https://blissville.com',
};
export default Sharer;
