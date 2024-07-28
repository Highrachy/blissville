import { allClients } from '@/data/clients';
import Image from 'next/image';
import React from 'react';
import Section from '../common/Section';

const StrategicRelationships = () => {
  return (
    <Section id="business-relationships" noPaddingTop>
      <div className="container">
        <h3 className="text-color-dark-1">Strategic Relationships</h3>
        <div className="row">
          {allClients.map((client) => (
            <ClientCard key={client} client={client} />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default StrategicRelationships;

const ClientCard = ({ client }) => (
  <div className="col-sm-3 col-6 g-1">
    <div className="card-client pb-4 px-4 mx-2 mb-3">
      <Image
        src={`/assets/img/clients/${client}.png`}
        className="d-block mx-auto my-2"
        width="320"
        height="240"
        alt={client}
      />
    </div>
  </div>
);
