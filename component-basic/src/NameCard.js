import React from 'react';

const NameCard = ({myName, myAge}) => {
  // const {myAge, myName} = props;
  return (
    <>
      <p>Name: {myName}</p>
      <p>Age: {myAge}</p>
    </>
  );
};

export default NameCard;
