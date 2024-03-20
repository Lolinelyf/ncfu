import React, {useState, useContext} from 'react';
import TabContent from "./TabContent";
import {LangContext} from "./LangContext";


const Tabs = ({ items, onTypeChange, onCampusButtonClick }) => {
  const [ active, setActive ] = useState(0);
  const EN = useContext(LangContext);

  const openTab = (e) => {
    setActive(+e.target.dataset.index);
  };

  return (
    <>
      <div className="tab-city">
        {items.map((item, i) => (
          <button
            className={`tab-city__link ${i === active ? 'tab-city__link--active' : ''}`}
            onClick={openTab}
            data-index={i}
          >{!EN ? item.title : item.enTitle }</button>
        ))}
      </div>
      {items[active] && <TabContent onTypeChange={onTypeChange} onCampusButtonClick={onCampusButtonClick} {...items[active]} />}
    </>
  );
};

export default Tabs;
