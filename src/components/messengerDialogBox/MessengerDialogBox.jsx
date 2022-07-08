import React from 'react';
import { useSelector } from 'react-redux';
import MessengerDialog from '../messengerDialog/MessengerDialog';
import './messengerDialogBox.scss';

const MessengerDialogBox = ({ socket }) => {
  const messengerList = useSelector((state) => state.messengerList);
  const { messengers, loading, error } = messengerList;
  return (
    <div className='MessengerDialogBox'>
      {loading ? (
        <h2>loading ...</h2>
      ) : (
        messengers?.map((messenger, i) => (
          <MessengerDialog key={i} messenger={messenger} socket={socket} />
        ))
      )}
    </div>
  );
};

export default MessengerDialogBox;
