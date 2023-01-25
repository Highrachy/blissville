import Backend from '@/components/admin/Backend';
import Button from '@/components/forms/Button';
import { ContentLoader } from '@/components/utils/LoadingItems';
import { useSWRQuery } from '@/hooks/useSWRQuery';
import { UserContext } from 'context/user';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
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
import { BiCheckCircle } from 'react-icons/bi';
import Overlay from '@/components/common/Overlay';
import { MdCheckBox, MdClose } from 'react-icons/md';
import { Nav, Tab } from 'react-bootstrap';
import { AVAILABLE_ROOMS_FOR_CUSTOMIZATION } from '@/data/admin/customize_rooms';
import { getCustomization, storeCustomization } from '@/utils/localStorage';
import { RiCloseCircleFill } from 'react-icons/ri';
import { BsCheckCircleFill } from 'react-icons/bs';

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
        <CustomizeProperty />
      </ContentLoader>
    </Backend>
  );
};

export default MyProperties;

const DEFAULT_SELECTIONS = {
  'Living Room': {
    flooring: {
      name: 'Nigerian Tiles',
      image: '1',
      price: 0,
      slug: 'flooring',
      type: 'Flooring',
      location: 'Living Room',
    },
    pop: {
      name: 'Plain Design',
      image: '1',
      price: 0,
      slug: 'pop',
      type: 'POP',
      location: 'Living Room',
    },
    paint: {
      name: 'Emulsion',
      image: '1',
      price: 0,
      slug: 'paint',
      type: 'Wall Paint',
      location: 'Living Room',
    },
  },
  'Master Bedroom': {
    flooring: {
      name: 'Nigerian Tiles',
      image: '1',
      price: 0,
      slug: 'flooring',
      type: 'Flooring',
      location: 'Master Bedroom',
    },
    pop: {
      name: 'Plain Design',
      image: '1',
      price: 0,
      slug: 'pop',
      type: 'POP',
      location: 'Master Bedroom',
    },
    paint: {
      name: 'Emulsion',
      image: '1',
      price: 0,
      slug: 'paint',
      type: 'Wall Paint',
      location: 'Master Bedroom',
    },
  },
  'Children Room': {
    flooring: {
      name: 'Nigerian Tiles',
      image: '1',
      price: 0,
      slug: 'flooring',
      type: 'Flooring',
      location: 'Children Room',
    },
    pop: {
      name: 'Plain Design',
      image: '1',
      price: 0,
      slug: 'pop',
      type: 'POP',
      location: 'Children Room',
    },
    paint: {
      name: 'Emulsion',
      image: '1',
      price: 0,
      slug: 'paint',
      type: 'Wall Paint',
      location: 'Children Room',
    },
  },
  'Other Rooms': {
    flooring: {
      name: 'Nigerian Tiles',
      image: '1',
      price: 0,
      slug: 'flooring',
      type: 'Flooring',
      location: 'Other Rooms',
    },
    pop: {
      name: 'Plain Design',
      image: '1',
      price: 0,
      slug: 'pop',
      type: 'POP',
      location: 'Other Rooms',
    },
    paint: {
      name: 'Emulsion',
      image: '1',
      price: 0,
      slug: 'paint',
      type: 'Wall Paint',
      location: 'Other Rooms',
    },
  },
  Kitchen: {
    flooring: {
      name: 'Nigerian Tiles',
      image: '1',
      price: 0,
      slug: 'flooring',
      type: 'Flooring',
      location: 'Kitchen',
    },
    pop: {
      name: 'Plain Design',
      image: '1',
      price: 0,
      slug: 'pop',
      type: 'POP',
      location: 'Kitchen',
    },
    'kitchen-sinks': {
      name: 'Sink Mixer Tap Flexible',
      image: '1',
      price: 0,
      slug: 'kitchen-sinks',
      type: 'Kitchen Sinks',
      location: 'Kitchen',
    },
    'wall-tiles': {
      name: 'Nigerian Tiles',
      image: '1',
      price: 0,
      slug: 'wall-tiles',
      type: 'Wall Tiles',
      location: 'Kitchen',
    },
    toilets: {
      name: 'Normal WC',
      image: '1',
      price: 0,
      slug: 'toilets',
      type: 'Toilets',
      location: 'Kitchen',
    },
  },
  'Master Toilet': {
    flooring: {
      name: 'Nigerian Tiles',
      image: '1',
      price: 0,
      slug: 'flooring',
      type: 'Flooring',
      location: 'Master Toilet',
    },
    pop: {
      name: 'Plain Design',
      image: '1',
      price: 0,
      slug: 'pop',
      type: 'POP',
      location: 'Master Toilet',
    },
    'wall-tiles': {
      name: 'Nigerian Tiles',
      image: '1',
      price: 0,
      slug: 'wall-tiles',
      type: 'Wall Tiles',
      location: 'Master Toilet',
    },
    toilets: {
      name: 'Normal WC',
      image: '1',
      price: 0,
      slug: 'toilets',
      type: 'Toilets',
      location: 'Master Toilet',
    },
    'bathroom-sinks': {
      name: 'Corner Wall Mount',
      image: '1',
      price: 0,
      slug: 'bathroom-sinks',
      type: 'Bathroom Sinks',
      location: 'Master Toilet',
    },
    shower: {
      name: 'Normal Shower',
      image: '1',
      price: 0,
      slug: 'shower',
      type: 'Shower',
      location: 'Master Toilet',
    },
  },
  'Children Toilet': {
    flooring: {
      name: 'Nigerian Tiles',
      image: '1',
      price: 0,
      slug: 'flooring',
      type: 'Flooring',
      location: 'Children Toilet',
    },
    pop: {
      name: 'Plain Design',
      image: '1',
      price: 0,
      slug: 'pop',
      type: 'POP',
      location: 'Children Toilet',
    },
    'wall-tiles': {
      name: 'Nigerian Tiles',
      image: '1',
      price: 0,
      slug: 'wall-tiles',
      type: 'Wall Tiles',
      location: 'Children Toilet',
    },
    toilets: {
      name: 'Normal WC',
      image: '1',
      price: 0,
      slug: 'toilets',
      type: 'Toilets',
      location: 'Children Toilet',
    },
    'bathroom-sinks': {
      name: 'Corner Wall Mount',
      image: '1',
      price: 0,
      slug: 'bathroom-sinks',
      type: 'Bathroom Sinks',
      location: 'Children Toilet',
    },
    shower: {
      name: 'Normal Shower',
      image: '1',
      price: 0,
      slug: 'shower',
      type: 'Shower',
      location: 'Children Toilet',
    },
  },
  'Other Rooms Toilet': {
    flooring: {
      name: 'Nigerian Tiles',
      image: '1',
      price: 0,
      slug: 'flooring',
      type: 'Flooring',
      location: 'Other Rooms Toilet',
    },
    pop: {
      name: 'Plain Design',
      image: '1',
      price: 0,
      slug: 'pop',
      type: 'POP',
      location: 'Other Rooms Toilet',
    },
    'wall-tiles': {
      name: 'Nigerian Tiles',
      image: '1',
      price: 0,
      slug: 'wall-tiles',
      type: 'Wall Tiles',
      location: 'Other Rooms Toilet',
    },
    toilets: {
      name: 'Normal WC',
      image: '1',
      price: 0,
      slug: 'toilets',
      type: 'Toilets',
      location: 'Other Rooms Toilet',
    },
    'bathroom-sinks': {
      name: 'Corner Wall Mount',
      image: '1',
      price: 0,
      slug: 'bathroom-sinks',
      type: 'Bathroom Sinks',
      location: 'Other Rooms Toilet',
    },
    shower: {
      name: 'Normal Shower',
      image: '1',
      price: 0,
      slug: 'shower',
      type: 'Shower',
      location: 'Other Rooms Toilet',
    },
  },
  'Visitor Toilet': {
    flooring: {
      name: 'Nigerian Tiles',
      image: '1',
      price: 0,
      slug: 'flooring',
      type: 'Flooring',
      location: 'Visitor Toilet',
    },
    pop: {
      name: 'Plain Design',
      image: '1',
      price: 0,
      slug: 'pop',
      type: 'POP',
      location: 'Visitor Toilet',
    },
    'wall-tiles': {
      name: 'Nigerian Tiles',
      image: '1',
      price: 0,
      slug: 'wall-tiles',
      type: 'Wall Tiles',
      location: 'Visitor Toilet',
    },
    toilets: {
      name: 'Normal WC',
      image: '1',
      price: 0,
      slug: 'toilets',
      type: 'Toilets',
      location: 'Visitor Toilet',
    },
    'bathroom-sinks': {
      name: 'Corner Wall Mount',
      image: '1',
      price: 0,
      slug: 'bathroom-sinks',
      type: 'Bathroom Sinks',
      location: 'Visitor Toilet',
    },
    shower: {
      name: 'Normal Shower',
      image: '1',
      price: 0,
      slug: 'shower',
      type: 'Shower',
      location: 'Visitor Toilet',
    },
  },
};

const CustomizeProperty = () => {
  const currentCustomization = getCustomization();
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState(
    currentCustomization?.selection?.rooms || []
  );
  const [customization, setCustomization] = useState(currentCustomization);
  const allowUserCustomization = customization?.[1].option === 'CUSTOMIZE_FEW';
  const showSelection =
    allowUserCustomization && !customization?.selection?.completed;

  const customizeAllRoomsForUser = customization?.[1].option === 'HELP_ME';
  const [selectedItems, setSelectedItems] = React.useState(
    customizeAllRoomsForUser ? DEFAULT_SELECTIONS : {}
  );

  const roomsToCustomize = (
    customization?.selection?.rooms?.length > 0 && allowUserCustomization
      ? customization?.selection?.rooms
      : Object.keys(AVAILABLE_ROOMS_FOR_CUSTOMIZATION)
  ).map((key) => ({
    name: key,
    ...AVAILABLE_ROOMS_FOR_CUSTOMIZATION[key],
  }));

  return (
    <>
      {showBreakdown ? (
        <Breakdown
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          setShowBreakdown={setShowBreakdown}
        />
      ) : (
        <div
          className="alert alert-info text-link"
          role="alert"
          onClick={() => setShowBreakdown(true)}
        >
          See the entire breakdown of your customization
        </div>
      )}
      <section className="card mb-3">
        {/* <small>{JSON.stringify(customization, null, 2)}</small> */}
        {showSelection ? (
          <div className="card-body p-6 pb-6">
            <h4>Select Rooms</h4>
            <ul className="d-flex flex-column list-unstyled w-100">
              {Object.keys(AVAILABLE_ROOMS_FOR_CUSTOMIZATION).map((room) => (
                <SelectRoomOption
                  key={room}
                  room={room}
                  selectedRooms={selectedRooms}
                  setSelectedRooms={setSelectedRooms}
                />
              ))}
            </ul>
            <div className="text-end">
              <span
                className="text-link text-sm text-secondary"
                onClick={() => {
                  const currentCustomization = {
                    ...customization,
                    selection: {
                      rooms: null,
                      completed: true,
                    },
                  };
                  storeCustomization(currentCustomization);
                  setCustomization(currentCustomization);
                }}
              >
                Select All Rooms
              </span>
            </div>
            <Button
              color="primary"
              className="mt-3"
              onClick={() => {
                const currentCustomization = {
                  ...customization,
                  selection: {
                    rooms: selectedRooms,
                    completed: true,
                  },
                };
                storeCustomization(currentCustomization);
                setCustomization(currentCustomization);
              }}
            >
              Save Selection
            </Button>
          </div>
        ) : (
          <TabCustomize
            customization={customization}
            roomsToCustomize={roomsToCustomize}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
        )}
      </section>
      {customization?.[1].option === 'CUSTOMIZE_FEW' && !showSelection && (
        <div
          className="text-link text-muted text-sm text-end mt-4 mb-6"
          onClick={() => {
            const currentCustomization = {
              ...customization,
              selection: {
                ...customization?.selection,
                completed: false,
              },
            };
            storeCustomization(currentCustomization);
            setCustomization(currentCustomization);
          }}
        >
          Manage Room Selection
        </div>
      )}
    </>
  );
};

const SelectRoomOption = ({ room, selectedRooms, setSelectedRooms }) => {
  const roomHasBeenSelected = selectedRooms?.includes(room);
  return (
    <li
      className={`custom-option ${roomHasBeenSelected ? 'active' : ''}`}
      onClick={() => {
        if (roomHasBeenSelected) {
          setSelectedRooms(selectedRooms.filter((r) => r !== room));
        } else {
          setSelectedRooms([...selectedRooms, room]);
        }
      }}
    >
      {room}
      <span className="custom-option__check">
        <MdCheckBox />
      </span>
    </li>
  );
};

export const TabCustomize = ({
  customization,
  roomsToCustomize,
  selectedItems,
  setSelectedItems,
}) => (
  <Tab.Container
    id="customize-tab"
    defaultActiveKey={roomsToCustomize[0]['name']}
  >
    <div className="row gx-0">
      <div className="col-12 col-lg-4 pr-lg-0">
        <Nav className="flex-column">
          {roomsToCustomize.map(({ name, image, options }) => {
            const selectedNo = Object.keys(selectedItems[name] || {}).length;
            const totalNo = options.length;
            return (
              <Nav.Link eventKey={name} className="team-tab-link" key={name}>
                <div>
                  <Image
                    src={`/assets/img/customize/${image}`}
                    alt={name}
                    width={50}
                    height={50}
                    className="img-cover rounded border"
                  />
                </div>
                <div className="ms-3">
                  <h6 className="mb-0">
                    {name}{' '}
                    {selectedNo === totalNo ? (
                      <span className="text-success">
                        <BsCheckCircleFill />
                      </span>
                    ) : (
                      ''
                    )}
                  </h6>
                  <p className="text-muted text-xs">
                    {selectedNo} / {totalNo}{' '}
                  </p>
                </div>
              </Nav.Link>
            );
          })}
        </Nav>
      </div>
      <div className="col-12 col-lg-8 pl-lg-0 mt-lg-0 d-flex bg-primary-50 p-5">
        <Tab.Content>
          {roomsToCustomize.map(({ name, image, description, options }) => {
            console.log('selectedItems', selectedItems);
            // find first option1 item not in selectedItem1 by using slug
            const option = options.find((o) => {
              const selectedItem = selectedItems?.[name]?.[o.slug];
              return !selectedItem;
            });

            return (
              <Tab.Pane eventKey={name} key={name}>
                <div className="row">
                  <div className="col-12">
                    <h3>{name}</h3>
                    <p>{description}</p>
                    <div className="img-fill border-1">
                      <Image
                        src={`/assets/img/customize/${image}`}
                        alt={name}
                        width="800"
                        height="400"
                        objectFit="cover"
                        className="rounded-3 border"
                      />
                    </div>
                  </div>

                  {Object.keys(selectedItems || {}).length > 0 && (
                    <div className="col-12">
                      <Summary
                        parent={name}
                        selectedItems={selectedItems}
                        setSelectedItems={setSelectedItems}
                      />
                    </div>
                  )}

                  {option ? (
                    <div className="col-12">
                      <section key={option.name}>
                        <h5 className="mt-4">{option.name}</h5>
                        <p className="">{option.description}</p>
                        <div className="row">
                          {option.note && (
                            <div className="col-12">
                              <div className="alert alert-dark text-sm">
                                {option.note}
                              </div>
                            </div>
                          )}
                          {option.images.map((item, index) => {
                            const priceSelection = customization?.[2].option;
                            if (
                              (priceSelection !== 'PREMIUM_COST' &&
                                item?.premium) ||
                              (priceSelection === 'NO_COST' && item?.price > 0)
                            ) {
                              return null;
                            }
                            return (
                              <CustomizeCard
                                {...item}
                                type={option.name}
                                key={index}
                                slug={option.slug}
                                parent={name}
                                selectedItems={selectedItems}
                                setSelectedItems={setSelectedItems}
                                isDefault={index === 0}
                              />
                            );
                          })}
                        </div>
                        <div className="my-5">
                          <div className="col-12">
                            <h5>
                              {' '}
                              Not sure what to choose? <br />
                            </h5>
                            <div className="alert alert-info text-sm">
                              Let&apos;s recommend a {option.name} option for
                              you
                              <Button
                                color="info"
                                className={`btn btn-xs ms-2 float-end`}
                                onClick={() => {
                                  setSelectedItems({
                                    ...selectedItems,
                                    [name]: {
                                      ...selectedItems[name],
                                      [option.slug]: {
                                        ...option.images[0],
                                        slug: option.slug,
                                        parent: name,
                                      },
                                    },
                                  });
                                }}
                              >
                                Recommend
                              </Button>
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                  ) : (
                    <div className="col-12">
                      <div className="alert alert-secondary" role="alert">
                        Great! Your customization for the{' '}
                        <strong>{name}</strong> is completed{' '}
                        <span>
                          <BiCheckCircle />
                        </span>{' '}
                      </div>
                    </div>
                  )}
                </div>
              </Tab.Pane>
            );
          })}
        </Tab.Content>
      </div>
    </div>
  </Tab.Container>
);

export const Summary = ({ parent, selectedItems, setSelectedItems }) => {
  const selectedItemsArray = Object.values(selectedItems[parent] || {});
  // calculate total price
  const totalPrice = selectedItemsArray.reduce(
    (acc, item) => acc + item.price,
    0
  );

  return (
    <DashboardTable title={`Summary`}>
      {selectedItemsArray && selectedItemsArray.length > 0 ? (
        <>
          <tr>
            <th>S/N</th>
            <th>Selection</th>
            <th>Category</th>
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
                  {name}
                </td>
                <td>{type}</td>
                <td className="text-center fw-bold text-primary">
                  {moneyFormatInNaira(price)}
                </td>
                <td>
                  <div
                    className="text-danger text-lg cursor-pointer opacity-50"
                    onClick={() => {
                      const { [slug]: value, ...rest } =
                        selectedItems?.[parent] || {};
                      setSelectedItems({
                        ...selectedItems,
                        [parent]: rest,
                      });
                    }}
                  >
                    <RiCloseCircleFill />
                  </div>
                </td>
              </tr>
            )
          )}
          <tr>
            <th colSpan={3}>Customization Fee:</th>
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

export const Breakdown = ({
  selectedItems,
  setSelectedItems,
  setShowBreakdown,
}) => {
  const selectedItemsArray = Object.values(selectedItems).reduce(
    (acc, item) => [...acc, ...Object.values(item)],
    []
  );

  console.log('break down selectedItemsArray: ', selectedItemsArray);
  // calculate total price
  const totalPrice = selectedItemsArray.reduce(
    (acc, item) => acc + item.price,
    0
  );

  return (
    <>
      <DashboardTable
        title={
          <span className="text-info">
            Breakdown{' '}
            <span
              className="text-sm text-end text-muted text-link"
              onClick={() => setShowBreakdown(false)}
            >
              (Hide)
            </span>
          </span>
        }
      >
        {selectedItemsArray && selectedItemsArray.length > 0 ? (
          <>
            <tr>
              <th>S/N</th>
              <th>Location</th>
              <th>Selection</th>
              <th>Category</th>
              <th className="text-center">Price</th>
              <th></th>
            </tr>
            {selectedItemsArray.map(
              ({ name, type, image, price, location, slug }, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{location}</td>
                  <td>
                    {' '}
                    <LocalImage
                      src={`${process.env.NEXT_PUBLIC_PAGE_URL}/assets/img/customize/${slug}/${image}.png`}
                      name={'tiles'}
                      alt="tiles"
                      className="rounded img-md2 me-2"
                      serveImageFromCloud={false}
                    />{' '}
                    {name}
                  </td>
                  <td>{type}</td>
                  <td className="text-center fw-bold text-primary">
                    {moneyFormatInNaira(price)}
                  </td>
                  <td>
                    <span
                      className="text-danger text-lg cursor-pointer opacity-50"
                      onClick={() => {
                        const { [slug]: value, ...rest } =
                          selectedItems?.[location] || {};
                        setSelectedItems({
                          ...selectedItems,
                          [location]: rest,
                        });
                      }}
                    >
                      <RiCloseCircleFill />
                    </span>
                  </td>
                </tr>
              )
            )}
            <tr>
              <th></th>
              <th colSpan={3}>Customization Fee:</th>
              <th className="text-center fw-bold text-xl text-primary">
                {moneyFormatInNaira(totalPrice)}
              </th>
              <th></th>
            </tr>
          </>
        ) : (
          <tr>
            <td colSpan={7} className="text-center">
              No item selected
            </td>
          </tr>
        )}
      </DashboardTable>
    </>
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
  isDefault,
  image,
  price,
  slug,
  type,
  parent,
  setSelectedItems,
  selectedItems,
}) => {
  const handleSelect = (item) => {
    setSelectedItems({
      ...selectedItems,
      [parent]: { ...selectedItems[parent], [slug]: item },
    });
  };

  const handleRemove = () => {
    const { [slug]: value, ...rest } = selectedItems?.[parent] || {};
    setSelectedItems({
      ...selectedItems,
      [parent]: rest,
    });
  };

  const itemIsSelected = selectedItems?.[parent]?.[slug]?.name === name;
  return (
    <div className="col-md-6 col-sm-12 mt-4">
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
              {!itemIsSelected && isDefault && (
                <small className="text-xs text-muted float-end">Default</small>
              )}
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
              className="mt-md-3 mt-2 btn-xs px-3 py-2 text-white text-xs fw-medium btn-xs"
              onClick={() =>
                handleSelect({
                  name,
                  image,
                  price,
                  slug,
                  type,
                  location: parent,
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
