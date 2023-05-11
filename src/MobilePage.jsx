import React from 'react';

const MobilePage = () => {
  const handleLinkCopy = () => {
    navigator.clipboard.writeText(document.location.href);
    alert('The link has been copied.');
  };

  return (
    <div>
      <span>Please access the PC version.</span>
      <button onClick={handleLinkCopy}>Copying a Link</button>
    </div>
  );
};

export default MobilePage;
