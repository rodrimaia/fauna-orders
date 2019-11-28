import React, { FunctionComponent } from 'react';

interface StatusTagProps {
  status: string;
}

const StatusTag: FunctionComponent<StatusTagProps> = ({ status }) => {
  const statusColor =
    status === 'approved'
      ? 'success'
      : status === 'processing'
      ? 'warning'
      : 'danger';

  return (
    <span className={`box-line-status is-size-7-mobile tag is-${statusColor}`}>
      {status}
      <style jsx>{`
        .box-line-status {
          text-transform: capitalize;
        }
      `}</style>
    </span>
  );
};

export default StatusTag;
