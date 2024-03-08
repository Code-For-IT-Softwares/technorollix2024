import React from "react";

import localFont from 'next/font/local';
const headingFont = localFont({ src: '../fonts/rog.ttf' });
const digital = localFont({ src: '../fonts/digital.ttf' });
const dataFont = localFont({ src: '../fonts/rog.ttf' });
function SubEventsDetails({
	registrationCount,
	imageLink = "",
	prize = 10000,
	heading = "",
	paragraph,
	subHeading = "",
	theme = "",
	subEventHeading,
	subEvents,
	reasonHeading,
	reason,
	rulesHeading,
	rules,
	roundsHeading,
	rounds,
	judgeMentalCriteria,
	eventVenueHeading = "EVENT VENUE:",
	eventVenue,
	eventManagers,
	facultyCoordinators,
}) {
	return (
		<><div className="pt-10 w-full mt-10 flex flex-col items-center gap-10">
			<div
				id="event"
				className={`flex w-[80%] flex-wrap  h-auto border-2 border-red-200 p-2 ${"flex-row-reverse"
					}`}
			>
				<div
					id="event-pic"
					className="relative w-full px-4 h-1/3 py-4 md:py-10 flex justify-center items-center "
				>
					<img src={imageLink} className="h-full w-full" />
					<div className={`${dataFont.className} absolute left-4 bottom-6 px-3 py-1 md:py-4 text-1xl md:text-2xl neon-text-blue-light font-bold`}>
						Prize: {prize}
					</div>
				</div>
				<div
					id="event-text"
					className="w-full px-4 h-full py-1 md:py-10 text-white bg-black bg-opacity-35 "
				>
					<div className={`${headingFont.className} neon-text-red-light px-3 py-1 md:py-4 text-2xl md:text-4xl font-bold`}>
						{heading}
					</div>
					<div className={`${dataFont.className}  px-3 py-1 md:py-4 text-1rem md:text-4rem font-medium text-justify`}>
						{paragraph}
					</div>
					<div className={`${headingFont.className} neon-text-red-light px-3 py-1 md:py-4 text-1rem md:text-4rem font-medium text-justify`}>
						{subHeading}
					</div>
					<div
						className={`${headingFont.className} px-3 py-1 md:py-4 text-1rem md:text-4rem font-medium text-justify`}
					>
						{registrationCount}
					</div>
					<div className="mt-1 md:py-0 text-justify">
						<h2 className={`${headingFont.className} neon-text-red-lighter text-1xl font-bold md:text-2xl`}>{subEventHeading}</h2>
						<div className={`text-3rem ml-5 ${dataFont.className}  text-1xs md:text-1xl font-medium max-w-[85%]`}><ul className="list-disc">{subEvents}</ul></div>
					</div>
					<div className="mt-2 md:py-4 text-justify w-full">
						<h2 className={`${headingFont.className} neon-text-red-lighter text-1xl font-bold md:text-2xl`}>Faculty Coordinators:</h2>
						<div className={`text-3rem ml-5  text-1xl md:text-2xs font-medium`}>{facultyCoordinators}</div>
					</div>
					<div className="mt-2 md:py-4 text-justify ">
						<h2 className={`${headingFont.className} neon-text-red-lighter text-1xl font-bold md:text-2xl`}>Event manager and contacts:</h2>
						<div className={`text-3rem ml-5  text-1xl md:text-2xs font-medium`}>{eventManagers}</div>
					</div>
				</div>
			</div>
		</div>
		</>
	);
}

export default SubEventsDetails;
