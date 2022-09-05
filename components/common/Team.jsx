import React from 'react';
import Section from './Section';
import Image from 'next/image';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import { team } from '@/data/team';

const Team = () => (
  <Section noPaddingTop>
    <div className="container">
      <h3 className="font-secondary text-color-dark-1">Meet Our Team</h3>
      <Tab.Container id="team-tab" defaultActiveKey={team[0]['name']}>
        <div className="row gx-0">
          <div className="col-12 col-lg-4 pr-lg-0">
            <Nav className="flex-column">
              {team.map(({ name, image, title }) => (
                <Nav.Link eventKey={name} className="team-tab-link" key={name}>
                  <div>
                    <Image
                      src={`/assets/img/team/${image}`}
                      alt={name}
                      width={50}
                      height={50}
                      className="img-cover rounded-circle border"
                    />
                  </div>
                  <div className="ms-3">
                    <h6 className="mb-0">{name}</h6>
                    <p className="text-muted text-xs">{title}</p>
                  </div>
                </Nav.Link>
              ))}
            </Nav>
          </div>
          <div className="col-12 col-lg-8 pl-lg-0 mt-lg-0 d-flex bg-primary-50 p-5">
            <Tab.Content>
              {team.map(({ name, image, title, description }) => (
                <Tab.Pane eventKey={name} key={name}>
                  <div className="row">
                    <div className="col-12 col-sm-5">
                      <div className="img-fill border-1">
                        <Image
                          src={`/assets/img/team/${image}`}
                          alt={name}
                          width="400"
                          height="400"
                          objectFit="cover"
                          className="me-3 rounded-3 border"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-7 mt-sm-0">
                      <h3>{name}</h3>
                      <h6 className="text-secondary">{title}</h6>
                      <p className="mt-3">{description}</p>
                    </div>
                  </div>
                </Tab.Pane>
              ))}
            </Tab.Content>
          </div>
        </div>
      </Tab.Container>
    </div>
  </Section>
);

const SingleTeam = ({ name, image, title, description }) => (
  <div className="col-md-3 text-center my-6">
    <div className="team-section h-100">
      <div className="img-fill">
        <Image
          className="img-cover"
          src={`/assets/img/team/${image}`}
          alt={name}
          layout="fill"
        />
      </div>
      <h6 className="text-uppercase mt-3 text-color-1">
        {name} ({title})
      </h6>
    </div>
  </div>
);
export default Team;
