import React from 'react';
import Image from 'next/image';
import { formatRelative } from 'date-fns';

// Uppercase the first letter
const capitalize = ([first, ...rest]) =>
  [first.toUpperCase(), ...rest].join('');

const formatDate = (date) => {
  let formattedDate = '';
  if (date) {
    // Convert the date in words relative to the current date
    formattedDate = formatRelative(date, new Date());
  }
  return capitalize(formattedDate);
};

function Message({
  createdAt = null,
  text = '',
  displayName = '',
  photoURL = '',
}) {
  if (!text) return null;

  return (
    <div>
      {photoURL ? (
        <Image
          src={photoURL}
          alt='Avatar'
          className='rounded-full mr-4'
          width={45}
          height={45}
        />
      ) : null}
      {displayName ? <p>{displayName}</p> : null}
      {createdAt?.seconds ? (
        <span>{formatDate(new Date(createdAt.seconds * 1000))}</span>
      ) : null}
      <p>{text}</p>
    </div>
  );
}

export default Message;
