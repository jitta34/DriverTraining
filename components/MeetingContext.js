import React from 'react';

const MeetingContext = React.createContext();

export const MeetingProvider = ({ children }) => {
  const [highlightedDate, setHighlightedDate] = React.useState(null);
  const [highlightedTime, setHighlightedTime] = React.useState(null);

  return (
    <MeetingContext.Provider value={{ highlightedDate, highlightedTime, setHighlightedDate, setHighlightedTime }}>
      {children}
    </MeetingContext.Provider>
  );
};

export const useMeeting = () => React.useContext(MeetingContext);
