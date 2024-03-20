import React, {useState, useEffect, useContext} from 'react';
import {LangContext} from "./LangContext";


const TabContent = ({onCampusButtonClick, onTypeChange, items}) => {

  const [active, setActive] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  const EN = useContext(LangContext);

  // получаем уникальные типы строений
  const uniqueIds = [];
  const buildingTypes = items.map(item => item.type).filter(element => {
    const isDuplicate = uniqueIds.includes(element.id);

    if (!isDuplicate) {
      uniqueIds.push(element.id);
      return true;
    }
    return false;
  });
  buildingTypes.push({id: "all", title: "Все объекты", enTitle: "All objects"});

  // фильтрация по переданному id типа строения
  const filterItems = (buildingTypeId) => {
    let _filteredItems;
    if (buildingTypeId === "all") {
      _filteredItems = items.map(item => item);
    } else {
      _filteredItems = items.filter(item => item.type.id === buildingTypeId);
    }

    setFilteredItems(_filteredItems);
    onTypeChange(_filteredItems); // передаём родителю список фильтровнных элементов для отрисовки карты
  };

  // показывем здания первого типа
  useEffect(() => {
    // при первоначальном рендере показываем строения из первого типа
    filterItems(buildingTypes[0].id);

    // отрисовываем класс для выделения выбранного типа строения
    const _filteredItems = items.filter(item => item.type.id === buildingTypes[0].id);
    setActive(_filteredItems[0].type.id);
  }, [items]);

  // при клике по типу здания
  const openTab = (e) => {
    setActive(e.target.dataset.tab);
    filterItems(e.target.dataset.tab);
  };

  return (
    <div className="tab-city__content">
      <div className="mb-1">
        {buildingTypes.map(typeItem => (
          <button
            className={`button button_type_outline mr-05 ${typeItem.id === active ? 'active' : ''}`}
            onClick={openTab}
            data-tab={typeItem.id}
          >{typeItem.title}</button>
        ))}
      </div>

      <div>
        {(active === 'all') && <div>
          {buildingTypes.map(typeItem => {
            if (typeItem.id === 'all') return;

            let curTypeId = typeItem.id;
            let _filteredItems = items.filter(item => item.type.id === curTypeId);

            return (
              <>
                <p className="mb-0">{typeItem.title}</p>
                {_filteredItems.map(item => (
                <button className="button button_type_primary mr-05 mb-05" onClick={() => onCampusButtonClick(item.id)}>{!EN ? item.title : item.enTitle}</button>
                ))}
              </>
            );
          })}
        </div>}

        {(active !== 'all') && filteredItems.map(item => (
          <button className="button button_type_primary mb-05 mr-05" onClick={() => onCampusButtonClick(item.id)}>{!EN ? item.title : item.enTitle}</button>
        ))}

      </div>
    </div>
  )
};

export default TabContent;
