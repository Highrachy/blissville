import React from 'react';
import Section from './Section';
import Image from 'next/image';
import { team } from '@/data/team';

const Team = () => (
  <Section>
    <div className="container">
      <div className="row">
        <h3 className="font-secondary text-color-dark-1">Management Team</h3>
        {team.map((member, index) => (
          <SingleTeam key={index} {...member} />
        ))}
      </div>
    </div>
  </Section>
);

const SingleTeam = ({ name, image, title, description }) => (
  <div className="col-md-6 text-center my-6">
    <div className="team-section h-100">
      <div className="image-container rounded-circle">
        <Image
          className="image-cover rounded-circle"
          src={`/assets/img/team/${image}`}
          alt={name}
          width={120}
          height={120}
        />
      </div>
      <h6 className="text-uppercase mt-3 text-color-1">
        {name} ({title})
      </h6>
      <p className="px-5 pb-4 text-color-dark-2">{description}</p>
    </div>
  </div>
);
export default Team;
