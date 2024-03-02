'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

function EventsRegistrationPage() {
  const [events, setEvents] = useState([]);
  const [registeredEvents, setregisteredEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [additionalDetails, setAdditionalDetails] = useState([]);
  const [leaderEmail, setLeaderEmail] = useState('');
  const [teammateEmails, setTeammateEmails] = useState([]);
  const [entryFee, setEntryFee] = useState([]);
  const [IsOpjuStudent, setIsOpjuStudent] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const searchParams = useSearchParams();
  const emailRef = searchParams.get('emailRef');

  useEffect(() => {
    setLeaderEmail(emailRef);
  }, []);

  useEffect(() => {
    fetch('http://10.60.41.209:4000/api/allMainEvents')
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error('Error fetching events:', error));

    fetch(`http://10.60.41.209:4000/api/participant/eventId/${emailRef}`)
      .then((response) => response.json())
      .then((data) => setregisteredEvents(data))
      .catch((error) =>
        console.error('Error fetching registeredEvents:', error)
      );
    fetch(
      `http://10.60.41.209:4000/api/user/universityVerification/${emailRef}`
    )
      .then((response) => response.json())
      .then((data) => setIsOpjuStudent(data))
      .catch((error) =>
        console.error('Error fetching registeredEvents:', error)
      );
  }, []);

  const handleClosePopup = (event) => {
    if (event.target.classList.contains('overlay')) {
      setIsOpen(false);
    }
  };

  const handleEventCardClick = (eventId) => {
    const selectedIndex = selectedEvents.indexOf(eventId);
    const isEventSelected = selectedIndex !== -1;
    // console.log('Clicked ', eventId);

    if (isEventSelected) {
      const updatedSelectedEvents = [...selectedEvents];
      updatedSelectedEvents.splice(selectedIndex, 1);
      setSelectedEvents(updatedSelectedEvents);

      const updatedAdditionalDetails = [...additionalDetails];
      updatedAdditionalDetails.splice(selectedIndex, 1);
      setAdditionalDetails(updatedAdditionalDetails);
    } else {
      setSelectedEvents([...selectedEvents, eventId]);
      setAdditionalDetails([...additionalDetails, '']);
    }
  };
  const openTab = () => {
    if (IsOpjuStudent) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleAdditionalDetailsChange = (index, value) => {
    const updatedAdditionalDetails = [...additionalDetails];
    updatedAdditionalDetails[index] = value;
    setAdditionalDetails(updatedAdditionalDetails);
  };

  return (
    <div className="w-full flex flex-col items-center my-4 gap-5">
      <p className="text-4xl text-white font-bold">EventsCheckbox</p>
      <div className="flex flex-wrap items-center  justify-evenly  w-[96%] h-full py-10 rounded-xl bg-[#ffffff33]">
        {events.map((event, index) => (
          <div
            key={event.eventId}
            className="transform    transition  hover:scale-110"
          >
            <div
              className={` p-4 rounded-lg mx-4 my-2   ${
                registeredEvents.includes(event.eventId)
                  ? 'border-red-600 bg-black border-4 '
                  : ''
              }${
                selectedEvents.includes(event.eventId)
                  ? 'bg-[#ff0000aa] min-h-40 max-w-80 '
                  : 'bg-[#000000] min-h-40 max-w-80'
              } `}
              onClick={
                registeredEvents.includes(event.eventId)
                  ? null
                  : () => handleEventCardClick(event.eventId)
              }
            >
              <div className="flex flex-wrap">
                <div className="mx-3 w-full my-2">
                  <img src="/mainbg.jpg" alt="" className="object-cover " />
                </div>
                <div className="min-w-40 w-full my-2 flex flex-col gap-3">
                  <h2
                    className={`text-red-600
								${registeredEvents.includes(event.eventId) ? '' : 'hidden'} 
							`}
                  >
                    Already Registered
                  </h2>
                  <h2 className="text-lg font-bold text-white">
                    {event.eventName}
                  </h2>
                  <p className="text-12px font-bold text-white">
                    {event.eventDescription}
                  </p>
                  <div className="flex justify-between text-lg font-bold text-white w-full">
                    {/* djdsufhsu */}
                    <p className="">
                      {event.teamSize > 0
                        ? 'TeamSize: ' + event.teamSize
                        : 'Have Sub-Events'}
                    </p>
                    <p className="">Prize: {event.priceMoney}</p>
                  </div>
                  {/* <p className="text-lg font-bold text-white">
								Entry Fee: {event.entryFee}
							</p> */}
                </div>
              </div>
              {selectedEvents.includes(event.eventId) && (
                <div className="border-2 rounded-md border-blue-400">
                  <input
                    type="text"
                    placeholder="Additional Details (optional)"
                    style={{
                      border: 'none',
                      outline: 'none',
                      boxShadow: 'none',
                    }}
                    className="bg-black w-full px-5 py-1 rounded-md text-white "
                    value={
                      additionalDetails[
                        selectedEvents.indexOf(event.eventId)
                      ] || ''
                    }
                    onChange={(e) =>
                      handleAdditionalDetailsChange(
                        selectedEvents.indexOf(event.eventId),
                        e.target.value
                      )
                    }
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
        <div>
          {/* <h2 className="text-white">
            Total price:
            {selectedEvents.length === 0
              ? '0'
              : CalculateFee(selectedEvents, registeredEvents)}
          </h2> */}
          <p></p>
        </div>
      </div>
      <button
        className="bg-orange-600  rounded-md text-3xl px-6 py-3 items-center justify-center my-10"
        onClick={
          IsOpjuStudent
            ? () => {
                try {
                  fetch(
                    'http://10.60.41.209:4000/api/team-registration/event',
                    {
                      method: 'POST',
                      body: JSON.stringify({
                        eventId: selectedEvents,
                        leader: leaderEmail,
                        additionalDetails: additionalDetails,
                        teammates: teammateEmails.filter(
                          (email) => email.trim() !== ''
                        ),
                      }),
                      headers: {
                        'Content-type': 'application/json',
                      },
                    }
                  )
                    .then(async (res) => {
                      if (!res.ok) {
                        throw new Error(`HTTP error! Status: ${res.status}`);
                      }
                      window.location.href = `/registration/next/subevents?emailRef=${emailRef}`;
                      const json = await res.json();
                    })
                    .catch((error) => {
                      console.log('Error during fetch:', error);
                    });
                } catch (error) {
                  console.log(error);
                }
              }
            : () => {
                if (IsOpjuStudent) {
                  setIsOpen(false);
                } else {
                  setIsOpen(true);
                }
              }
        }
      >
        Submit
      </button>
      {isOpen && !IsOpjuStudent && (
        <div className="overlay">
          <div className="bg-[#000000] neon-text-red-lighter shadow-md rounded-lg p-6">
            {/* <div className="flex items-center justify-center">
                      <img
                        className="w-24 h-24 rounded-full object-cover"
                        src={pic}
                        alt="User Avatar"
                      />
                    </div> */}
            <div className="mt-4">
              <p className="text-lg font-semibold">
                Registration for non-OPJU students will open on 5<sup>th</sup>
                March
              </p>
            </div>
            <button
              className=" bg-orange-400 mt-4  rounded-md text-1xl px-3 py-1 justify-end"
              onClick={() => {
                window.location.href = '/';
              }}
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default EventsRegistrationPage;

const CalculateFee = (selectedEvents, registeredEvents) => {
  let fee = registeredEvents.length;
  // console.log(registeredEvents.length);
  // console.log(selectedEvents);
  if (selectedEvents.length <= 3) {
    fee = 200;
  } else if (selectedEvents.length <= 5) {
    fee = 300;
  } else if (selectedEvents.length <= 7) {
    fee = 500;
  } else {
    fee = 1000;
  }
  return fee;
};

// "/api/user/universityVarification/:email"
