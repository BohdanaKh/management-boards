import { FC } from 'react';
import { TfiFaceSad } from 'react-icons/tfi';

const NotFoundPage: FC = () => {
  return (
    <div>
      <h4>Nothing was found on your request</h4>
      <TfiFaceSad />
    </div>
  );
};

export { NotFoundPage };
