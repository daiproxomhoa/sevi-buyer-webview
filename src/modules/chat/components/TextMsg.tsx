import React from 'react';
import { Message } from '../lib/types';

interface Props {
  data: Message;
  isOwn?: boolean;
}

const TextMsg = (props: Props) => {
  const { data } = props;

  return (
    <>
      <div className="pn-msg__bubble">{data.message.text}</div>
    </>
  );
};

export default TextMsg;
