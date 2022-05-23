import { home } from '@/data/navigation';
import Link from 'next/link';
import React from 'react';
import Parallax from '../common/Parallax';
import Section from '../common/Section';
import { SectionHeader as SHeader } from '../common/Section';

export const SectionHeader = (props) => <SHeader {...props} />;

export const PageHeader = ({ title, breadcrumb, bgImage, subHeader }) => {
  const currentBreadCrumb = breadcrumb || [{ title }];
  return (
    <>
      <Parallax bgImage={bgImage}>
        <Section noPaddingBottom className="pb-5">
          <div className="container mt-7">
            <h3 className="text-page-header">{title}</h3>
            <h4 className="text-page-subheader">
              {subHeader || 'Powered By Highrachy'}
            </h4>
            {false && <BreadCrumb breadcrumb={currentBreadCrumb} />}
          </div>
        </Section>
      </Parallax>
    </>
  );
};

export const BreadCrumb = ({ breadcrumb }) => {
  const paths = [home, ...breadcrumb];
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {paths.map(({ title, url }, index) => {
          const isLast = index === paths.length - 1;
          return (
            <li
              key={title}
              className={`breadcrumb-item text-white ${isLast ? 'active' : ''}`}
              {...(isLast ? {} : { 'aria-current': 'page' })}
            >
              {isLast ? (
                title
              ) : (
                <Link href={`/${url}`} passHref>
                  <a className="text-reset">{title}</a>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
