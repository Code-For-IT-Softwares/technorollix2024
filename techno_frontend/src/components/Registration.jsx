"use client";
import React, { useEffect, useRef, useState } from "react";
import InputBox from "./InputBox";
import { useRouter, useSearchParams } from "next/navigation";

function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(0);
  const [university, setUniversity] = useState("");
  const [gender, setGender] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState(0);
  const [pic, setPic] = useState("");
  const [isUserOPJUStudent, setisUserOPJUStudent] = useState(false);
  const [InputUser, setInputUser] = useState({});
  const searchParams = useSearchParams();
  const urlRef = searchParams.get("urlRef");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState(null);

  // const nameRef = searchParams.get("nameRef");
  useEffect(() => {
    const parts = urlRef.split("/email?=");
    const recPicture = parts[0];
    const secondParts = parts[1];
    const emailAndName = secondParts.split("/name?=");
    const recEmail = emailAndName[0];
    const recName = emailAndName[1];
    // This code will run only once when the component mounts
    // You can call setState here
    if (isValidEmail(recEmail)) {
      setisUserOPJUStudent(true);
    }
    setEmail(recEmail);
    setName(recName);
    setPic(recPicture);
    // console.log(recEmail);
    // console.log(recName);
    console.log(recPicture);
    // console.log(secondParts);
  }, []);

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const isValidEmail = (email) => {
    const domain = "@opju.ac.in";
    return email.endsWith(domain);
  };
  const handleNormalButtonClick = () => {
    if (isValidEmail(email)) {
    }
    setInputUser(
      JSON.stringify({
        userEmail: email,
        userName: name,
        userPic: pic,
        userPhoneNumber: phone,
        userUniversity: university,
        isUserOPJUStudent: isUserOPJUStudent,
        userAddress: {
          district: district,
          state: state,
          pincode: pincode,
        },
        userGender: gender,
      })
    );
    setIsOpen(true);
  };

  const handleClosePopup = (event) => {
    if (event.target.classList.contains("overlay")) {
      setIsOpen(false);
    }
  };
  // const isNumber = (numArr) => {
  //   // let flag = true;
  //   for (let i = 0; i < numArr.length; i++) {
  //     if (
  //       numArr[i] != "0" ||
  //       "1" ||
  //       "2" ||
  //       "3" ||
  //       "4" ||
  //       "5" ||
  //       "6" ||
  //       "7" ||
  //       "8" ||
  //       "9"
  //     ) {
  //       return false;
  //     }
  //   }
  //   return true;
  // };

  const phoneValidation = () => {
    // console.log(typeof phone);
    const data = phone;
    const numArr = data.toString();
    const length = numArr.length;
    // isNumber(numArr);
    // if (isNumber) {
    if (length == 10) {
      alert("sahi hai");
    } else {
      alert("invalid phone number");
      // }
    }
  };

  return (
    <div className="absolute text-white flex flex-col items-center justify-center ">
      <p className="text-4xl mb-2">REGISTRATION</p>
      <div className="border border-gray-3000 px-4 flex-col flex-wrap">
        <div className="flex justify-center items-center rounded-full ">
          <img src={pic} alt="Your Image" className=" rounded-full" />
        </div>
        <div id="input-holders" className="flex flex-wrap">
          <div id="input-holder-a" className="flex-col justify-start">
            {/* <div className="rounded-full h-40 w-40 overflow-hidden flex flex-col  mx-2"></div> */}
            <InputBox
              onChange={(e) => {
                setName(e.target.value);
              }}
              className=""
              label="Name"
              value={name}
            />
            <div className="flex flex-col my-8 mx-2">
              <div className="flex items-start">
                <p className="ml-2 text-sm xl:text-2xl">EMAIL </p>
              </div>
              <input
                type="email"
                className="rounded-sm p-2 m-2 flex items-start w-96 text-black"
                // onChange={onChange}
                // type="email"
                value={email}
                readOnly
              />
            </div>
            <InputBox
              onChange={(e) => {
                // isNumber(e.target.value);
                setPhone(e.target.value);
              }}
              className=""
              label="PHONE"
            />
            <InputBox
              onChange={(e) => {
                setUniversity(e.target.value);
              }}
              className=""
              label="UNIVERSITY"
            />
          </div>
          <div id="input-holder-b" className="flex-col xl:pt-1 ">
            <InputBox
              onChange={(e) => {
                setDistrict(e.target.value);
              }}
              label="DISTRICT"
            />
            <InputBox
              onChange={(e) => {
                setState(e.target.value);
              }}
              label="STATE"
            />
            <InputBox
              onChange={(e) => {
                setPincode(e.target.value);
              }}
              label="PINCODE"
            />
            <div className="flex flex-col  justify-evenly xl:text-2xl pl-4 text-sm md:text-sm  xl:pb-11 xl:pl-4">
              <div>
                <p>GENDER</p>
              </div>
              <div className="flex justify-evenly xl:text-xl xl:pt-2 pb-4 pt-4">
                {" "}
                <label>
                  <input
                    className=""
                    type="radio"
                    value="male"
                    checked={selectedGender === "male"}
                    onChange={handleGenderChange}
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    value="female"
                    checked={selectedGender === "female"}
                    onChange={handleGenderChange}
                  />
                  Female
                </label>{" "}
                <label>
                  <input
                    className=""
                    type="radio"
                    value="others"
                    checked={selectedGender === "others"}
                    onChange={handleGenderChange}
                  />
                  Others
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="btn-cotainer  row-span-2  flex justify-center items-center ">
          {/* <button
						className=" bg-orange-600 m-2 mb-4  rounded-md text-3xl px-6 py-3"
						onClick={() => {
							try {
								fetch("http://localhost:4000/api/create/user", {
									method: "POST",
									body: JSON.stringify({
										userEmail: email,
										userName: name,
										userPic: pic,
										userPhoneNumber: phone,
										userUniversity: university,
										isUserOPJUStudent: isUserOPJUStudent,
										userAddress: {
											district: district,
											state: state,
											pincode: pincode,
										},
										userGender: gender,
									}),
									headers: {
										"Content-type": "application/json",
										user_email: email,
									},
								})
									.then(async (res) => {
										if (!res.ok) {
											throw new Error(
												`HTTP error! Status: ${res.status}`
											);
										}
										// alert("ho gya bhenco");
										// console.log(res);
										window.location.href = `/registration/next?emailRef=${email}`;
										const json = await res.json();

										// Process the response JSON here
									})
									.catch((error) => {
										console.log(
											"Error during fetch:",
											error
										);
										// Handle the error appropriately (e.g., show a message to the user)
									});
								``;
							} catch (error) {
								console.log(error);
							}
						}}
					>
						NEXT
					</button> */}
          <div className="flex flex-col items-center  text-white  justify-center h-[100%] w-full">
            <button
              className="bg-orange-500 text-3xl px-6 py-2 mb-4 rounded-md transition-transform transform hover:scale-105"
              onClick={(handleNormalButtonClick, phoneValidation)}
            >
              Register
            </button>
            {isOpen && (
              <div className="overlay" onClick={handleClosePopup}>
                <div className="bg-white shadow-md rounded-lg p-6">
                  <div className="flex items-center justify-center">
                    <img
                      className="w-24 h-24 rounded-full object-cover"
                      src={pic}
                      alt="User Avatar"
                    />
                  </div>
                  <div className="mt-4">
                    <p className="text-lg font-semibold">Name: {name}</p>
                    <p className="text-gray-500">Email: {email}</p>
                    <p className="text-gray-500">Phone no.: {phone}</p>
                    <p className="text-gray-500">University: {university}</p>
                    <p className="text-gray-500">Gender: {selectedGender}</p>
                    <p className="text-gray-500">
                      Address: {district}, {state}, {pincode}
                    </p>
                  </div>
                  <button
                    className=" bg-orange-400 mt-4  rounded-md text-1xl px-3 py-1 justify-end"
                    onClick={() => {
                      try {
                        fetch("http://localhost:4000/api/create/user", {
                          method: "POST",
                          body: JSON.stringify({
                            userEmail: email,
                            userName: name,
                            userPic: pic,
                            userPhoneNumber: phone,
                            userUniversity: university,
                            isUserOPJUStudent: isUserOPJUStudent,
                            userAddress: {
                              district: district,
                              state: state,
                              pincode: pincode,
                            },
                            userGender: gender,
                          }),
                          headers: {
                            "Content-type": "application/json",
                            user_email: email,
                          },
                        })
                          .then(async (res) => {
                            if (!res.ok) {
                              throw new Error(
                                `HTTP error! Status: ${res.status}`
                              );
                            }
                            // alert("ho gya bhenco");
                            // console.log(res);
                            window.location.href = `/registration/next?emailRef=${email}`;
                            const json = await res.json();

                            // Process the response JSON here
                          })
                          .catch((error) => {
                            console.log("Error during fetch:", error);
                            // Handle the error appropriately (e.g., show a message to the user)
                          });
                        ``;
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                  >
                    Create account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
