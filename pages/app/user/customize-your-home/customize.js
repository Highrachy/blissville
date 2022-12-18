import Backend from '@/components/admin/Backend';
import Button from '@/components/forms/Button';
import { ContentLoader } from '@/components/utils/LoadingItems';
import { useSWRQuery } from '@/hooks/useSWRQuery';
import { UserContext } from 'context/user';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import { getLocationFromAddress, moneyFormatInNaira } from '@/utils/helpers';
import MakePayment from '@/components/utils/MakePayment';
import { differenceInDays, isPastDate } from '@/utils/date-helpers';
import Humanize from 'humanize-plus';
import { Buildings } from 'iconsax-react';
import classNames from 'classnames';
import PaginatedContent from '@/components/admin/PaginatedContent';
import { userMenu } from '@/data/admin/sideMenu';
import SingleProperty from '@/components/common/SinglePropertyNew';
import Section from '@/components/common/Section';
import { DashboardTable } from '../dashboard';
import { LocalImage } from '@/components/common/Image';
import Separator from '@/components/common/Separator';
import { Tab } from 'react-bootstrap';
import { BiCheckCircle } from 'react-icons/bi';
import Overlay from '@/components/common/Overlay';

const MyProperties = () => {
  const { user } = useContext(UserContext);
  const id = user?.id;

  const [query, result] = useSWRQuery({
    name: id ? ['assigned-properties', id] : id,
    endpoint: `api/assigned-properties`,
    axiosOptions: {
      params: {
        'filters[user][id][$eq]': id,
        populate: '*',
      },
    },
  });
  const item = result?.[0] || null;

  const [selectedItems, setSelectedItems] = React.useState({});

  console.log('selectedItems', selectedItems);

  return (
    <Backend title="Customize your Living Room">
      <ContentLoader
        Icon={<Buildings size="24" variant="Bulk" />}
        query={query}
        results={result}
        name={'Property'}
        noContentText={'You have not been assigned any property yet'}
      >
        <Header {...item} userId={id} />
        <Summary
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
        <TabInformation
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
      </ContentLoader>
    </Backend>
  );
};

export default MyProperties;

const TabInformation = ({ selectedItems, setSelectedItems }) => {
  const tabs = [
    {
      name: 'Tiles',
      slug: 'tiles',
      description: `Tiles are usually thin, square or rectangular coverings manufactured from hard-wearing material such as ceramic, stone, metal, baked clay, or even glass. `,
      images: [
        { name: 'Polished Concrete', price: 0, image: '1' },
        { name: 'Ply Wood Finishes', price: 0, image: '2' },
        { name: 'Carpet', price: 0, image: '3' },
        { name: 'Hard Wood', price: 30_000, image: '4' },
        { name: 'Vinyl', price: 50_000, image: '5' },
      ],
    },
    {
      name: 'POP',
      slug: 'pop',
      description: `POP or Plaster of Paris is a commonly used material used to make false ceiling, accent decors and wall trims. This lightweight and heat-resistant material is mixed at the site and makes for a stunning POP design for ceilings.`,
      images: [
        { name: 'Square Wonder', price: 0, image: '1' },
        { name: 'Circle in the Middle', price: 0, image: '2' },
        { name: 'Sandwish Gold', price: 0, image: '3' },
        { name: 'Around the Rosie', price: 30_000, image: '4' },
        { name: 'Designer Bracker', price: 30_000, image: '5' },
      ],
    },
    {
      name: 'Wall Paint',
      slug: 'paint',
      description: `Tiles are usually thin, square or rectangular coverings manufactured from hard-wearing material such as ceramic, stone, metal, baked clay, or even glass. `,
      images: [
        { name: 'City Blue (Emulsion)', price: 0, image: '1' },
        { name: 'Tomato (Emulsion)', price: 0, image: '2' },
        { name: 'Golden Orange (Emulsion)', price: 0, image: '3' },
        { name: 'City Blue (Silk)', price: 40_000, image: '1' },
        { name: 'Tomato (Silk)', price: 40_000, image: '2' },
        { name: 'Golden Orange (Silk)', price: 40_000, image: '3' },
      ],
    },
  ];

  const [currentTab, setCurrentTab] = React.useState(tabs[0].name);

  return (
    <section>
      <div className="container">
        <div className="row">
          <Tab.Container
            activeKey={currentTab}
            id="single-tenant-profile"
            className="mb-3"
          >
            <ul className="nav nav-tab gap-1 nav-fill p-0">
              {tabs.map(({ name }) => (
                <li
                  key={name}
                  className={classNames('nav-item position-relative', {
                    active: currentTab === name,
                  })}
                  onClick={() => setCurrentTab(name)}
                >
                  <span className="active-indicator"></span>
                  <div
                    className={classNames('nav-link py-4', {
                      active: currentTab === name,
                    })}
                  >
                    {name}
                  </div>
                </li>
              ))}
            </ul>
            <Tab.Content className="bg-white">
              {tabs.map(({ name, description, images, slug }) => (
                <Tab.Pane eventKey={name} key={name}>
                  <div className="p-5">
                    <h3>{name}</h3>
                    <p className="">{description}</p>
                    <div className="row">
                      {images.map((item, index) => (
                        <CustomizeCard
                          {...item}
                          type={name}
                          key={index}
                          slug={slug}
                          selectedItems={selectedItems}
                          setSelectedItems={setSelectedItems}
                        />
                      ))}
                    </div>
                  </div>
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Tab.Container>
        </div>
      </div>
    </section>
  );
};
export const Summary = ({ selectedItems, setSelectedItems }) => {
  // convert selectedItems to array
  const selectedItemsArray = Object.values(selectedItems);
  console.log('selectedItemsArray: ', selectedItemsArray);
  // calculate total price
  const totalPrice = selectedItemsArray.reduce(
    (acc, item) => acc + item.price,
    0
  );

  return (
    <DashboardTable title="Summary">
      {selectedItemsArray && selectedItemsArray.length > 0 ? (
        <>
          <tr>
            <th>S/N</th>
            <th>Type</th>
            <th>Location</th>
            <th className="text-center">Price</th>
            <th></th>
          </tr>
          {selectedItemsArray.map(
            ({ name, type, image, price, location, slug }, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {' '}
                  <LocalImage
                    src={`${process.env.NEXT_PUBLIC_PAGE_URL}/assets/img/customize/${slug}/${image}.png`}
                    name={'tiles'}
                    alt="tiles"
                    className="rounded img-md2 me-2"
                    serveImageFromCloud={false}
                  />
                  {type} - {name}
                </td>
                <td>{location}</td>
                <td className="text-center fw-bold text-primary">
                  {moneyFormatInNaira(price)}
                </td>
                <td>
                  <Button
                    color="danger"
                    className="mt-md-3 mt-2 btn-sm px-4 py-2 text-white text-xs fw-medium btn-xs"
                    onClick={() => {
                      const { [slug]: value, ...rest } = selectedItems;
                      setSelectedItems(rest);
                    }}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            )
          )}
          <tr>
            <th></th>
            <th>Customization Fee:</th>
            <th></th>
            <th className="text-center fw-bold text-xl text-primary">
              {moneyFormatInNaira(totalPrice)}
            </th>
            <th></th>
          </tr>
        </>
      ) : (
        <tr>
          <td colSpan={6} className="text-center">
            No item selected
          </td>
        </tr>
      )}
    </DashboardTable>
  );
};

const Header = ({ attributes }) => {
  const {
    price,
    initialPayment,
    expectedNextPayment,
    paymentDueDate,
    totalAmountPaid,
  } = attributes;
  const property = {
    ...attributes?.property?.data?.attributes,
    id: attributes?.property?.data?.id,
  };
  const project = {
    ...attributes?.project?.data?.attributes,
    id: attributes?.project?.data?.id,
  };
  const now = 0;
  const stillHasPendingPayment = now < 100;
  return (
    <section className="card mb-3">
      <div className="card-body p-5">
        <div className="d-flex flex-wrap flex-sm-nowrap">
          <div className="">
            <div className="d-block me-3 position-relative">
              <LocalImage
                src={property.image}
                name={name}
                className="img-xl"
                rounded
                responsiveImage={false}
              />
            </div>
          </div>
          <div className="flex-grow-1">
            <div className="d-flex justify-content-between align-items-start flex-wrap">
              <div className="d-flex flex-column">
                <h5 className="d-flex align-items-center mt-n2">
                  {property.name}
                </h5>
                <div className="d-flex text-sm flex-wrap align-items-center mb-2 pe-2">
                  <Link href={`/our-projects/${project.slug}`} passHref>
                    <a className="text-reset">{project.name}</a>
                  </Link>{' '}
                  &nbsp;- {getLocationFromAddress(project, true)}
                </div>
                <div className="d-flex text-sm flex-wrap align-items-center pe-2 text-primary fw-bold">
                  <span className="text-muted">Customization Price: </span>
                  &nbsp; {moneyFormatInNaira(0)} &nbsp;
                </div>
                <div className="my-2 text-muted">
                  {/* <Link
                    href={`/our-properties/${project?.slug || 'project-name'}/${
                      property?.slug || 'property-name'
                    }/${property.id}`}
                    passHref
                  >
                    <a className="text-underline text-muted text-sm me-3">
                      View on Website
                    </a>
                  </Link>
                  <Separator /> */}
                  <div
                    className={classNames('text-xs', {
                      'text-success': !stillHasPendingPayment,
                      'text-info': stillHasPendingPayment,
                    })}
                    style={{
                      marginLeft: `${
                        now > 10 ? (now < 92 ? Math.max(now - 4, 10) : 92) : now
                      }%`,
                    }}
                  >
                    {now}%
                  </div>
                  <div className="progress" style={{ height: '6px' }}>
                    <div
                      className={classNames('progress-bar', {
                        'bg-success': !stillHasPendingPayment,
                        'bg-info': stillHasPendingPayment,
                      })}
                      role="progressbar"
                      aria-label="Payment Progress"
                      style={{ width: `${now}%` }}
                      aria-valuenow={now}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CustomizeCard = ({
  name,
  image,
  price,
  slug,
  type,
  setSelectedItems,
  selectedItems,
}) => {
  const handleSelect = (item) => {
    const { [slug]: value, ...rest } = selectedItems;
    setSelectedItems({ [slug]: item, ...rest });
  };

  const handleRemove = () => {
    const { [slug]: value, ...rest } = selectedItems;
    setSelectedItems(rest);
  };

  const itemIsSelected = selectedItems[slug]?.name === name;
  return (
    <div className="col-md-4 col-sm-12 mt-4">
      <div className="property-listing overflow-hidden bg-gray-50 card">
        <div className="img-wrapper">
          {itemIsSelected ? (
            <Overlay>
              <Image
                src={`/assets/img/customize/${slug}/${image}.png`}
                alt="Hero Image"
                width={636}
                height={432}
                objectFit="cover"
                className="card-img-top"
              />
            </Overlay>
          ) : (
            <Image
              src={`/assets/img/customize/${slug}/${image}.png`}
              alt="Hero Image"
              width={636}
              height={432}
              objectFit="cover"
              className="card-img-top"
            />
          )}
        </div>
        <div className="card-body p-3">
          <div className="row">
            <h6
              className={`card-title ${
                itemIsSelected ? 'text-success' : ''
              } fw-medium mb-0`}
            >
              {name}{' '}
              {itemIsSelected && (
                <span className="text-success">
                  <BiCheckCircle />
                </span>
              )}
            </h6>
            <div
              className={`text-md ${
                price > 0 ? 'text-primary' : 'text-muted'
              } fw-bold`}
            >
              {price > 0 && '+ '} {moneyFormatInNaira(price)}
            </div>
          </div>
          {!itemIsSelected ? (
            <Button
              className="mt-md-3 mt-2 btn-sm px-4 py-2 text-white text-xs fw-medium btn-xs"
              onClick={() =>
                handleSelect({
                  name,
                  image,
                  price,
                  slug,
                  type,
                  location: 'Living Room',
                })
              }
            >
              Select Item
            </Button>
          ) : (
            <Button
              color="danger"
              className="mt-md-3 mt-2 btn-sm px-4 py-2 text-white text-xs fw-medium btn-xs"
              onClick={handleRemove}
            >
              Remove Item
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
