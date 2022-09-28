import Image from 'next/image';
import React from 'react';
import Button from '../forms/Button';

const SingleProject = ({ id, attributes }) => {
  const { name, type, image, city, state, price, slug } = attributes;
  return (
    <div className="card rounded p-2 m-0 mb-5">
      <div className="row g-0">
        <div className="col-lg-7">
          <div className="img-fill">
            <Image
              src={image}
              alt="Hero Image"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <div className="col-lg-5 bg-gray-200">
          <aside className="px-5 py-5">
            <h4>{name}</h4>
            <ul className="list-dotted list-unstyled">
              <li>
                <span className="list-dotted__label">Property Type </span>
                <span className="list-dotted__value">{type}</span>
              </li>
              <li>
                <span className="list-dotted__label">Location </span>
                <span className="list-dotted__value">
                  {city}, {state}
                </span>
              </li>
              <li>
                <span className="list-dotted__label">Total Units </span>
                <span className="list-dotted__value">
                  {type === '1' ? 3 : 5} Units
                </span>
              </li>
              <li>
                <span className="list-dotted__label">Prices From </span>
                <span className="list-dotted__value">₦ 45 Million</span>
              </li>
              <li>
                <span className="list-dotted__label">Delivery </span>
                <span className="list-dotted__value">
                  {type === '1' ? 'April, 2022' : 'July, 2024'}
                </span>
              </li>
              <li>
                <span className="list-dotted__label">Status</span>
                <span className="list-dotted__value">
                  {type === '1' ? 'Completed' : 'In Progress'}
                </span>
              </li>
              <li>
                <Button href={`/our-projects/${slug}`} color="secondary">
                  View Project
                </Button>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default SingleProject;
