import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import OfferingContent from './OfferingContent';
import Summary from '../Summary';

const Offering = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [key, setKey] = useState('all');


  return (
    <div className="ag-theme-alpine-dark" style={{ height: '600px', width: '100%' }}>
      <Summary>Context Based more Attributes or summary level details will be displayed here. Please let me know the details.</Summary>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="all" title="All">
          <OfferingContent state={'all'} />
        </Tab>

        <Tab eventKey="offered" title="Offered">
          <OfferingContent state={3} />
        </Tab>

        <Tab eventKey="pending" title="Pending">
          <OfferingContent state={2} />
        </Tab>

        <Tab eventKey="sold" title="Sold">
          <OfferingContent state={4} />
        </Tab>

      </Tabs>
    </div>
  );
};

export default Offering;