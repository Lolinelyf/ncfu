import React, {useState, useEffect} from 'react';
import {getIsLoadingSelector, getListSelector} from "../selectors";
import {Link} from "react-router-dom";
import { useSelector } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Loader from "react-loader-spinner";


const List = () => {
  const isLoading = useSelector(getIsLoadingSelector);
  const alphabet = ["А", "Б", "В", "Г", "Д", "Е", "Ж", "З", "И", "Й", "К", "Л", "М", "Н", "О", "П", "Р", "С", "Т", "У", "Ф", "Х", "Ц", "Ч", "Ш", "Щ", "Ы", "Э", "Ю", "Я"];

  const list = useSelector(getListSelector);
  const [selectedLetter, setSelectedLetter] = useState("А");
  const [filteredList, setFilteredList] = useState([]);
  const [fio, setFio] = useState('');
  const [showLetter, setShowLetter] = useState(true);


  const onFioChange = (event) => {
    const printedValue = event.target.value;

    setFio(printedValue);
    if (printedValue.length > 0) {
      setShowLetter(false);
      setFilteredList(list.filter((item) => {
        return item.name.toLowerCase().startsWith(printedValue.toLowerCase());
      }));
    } else {
      setShowLetter(true);
      onLetterClick(selectedLetter);
    }

  };

  const onLetterClick = (letter) => {
    setSelectedLetter(letter);
    setFio('');
    setFilteredList(list.filter((item) => {
      return item.name[0].toLowerCase() === letter.toLowerCase();
    }));
  };

  useEffect(() => {
    onLetterClick('А');
  }, [list]);

  if (isLoading) return <Loader
    style={{textAlign: "center", padding: "3rem"}}
    type="TailSpin"
    color="#254986"
    height={100}
    width={100}
  />;

  return (
    <div style={{minHeight: "700px"}}>

      <h1 className="title title_centered">Персональные страницы сотрудников</h1>

      <div className="centered">
        <ul className="pagination">
        {alphabet.map(letter => (
          <li className="pagination__item" key={letter}>
            <a href="#" className="pagination__link" onClick={() => onLetterClick(letter)}><span className="pagination__caption">{letter}</span></a>
          </li>
        ))}
      </ul>
      </div>

      <div className="form">
        <div className="form__item">
          <input type="text" className="form__input" value={fio} onChange={onFioChange} placeholder="Поиск сотрудника"/>
        </div>

      </div>

      <div className="sotr">
        <p className={`sotr__letter ${!showLetter ? ' hidden' : ''}`}>{selectedLetter}</p>

        <ul className="sotr__list">
          {filteredList.map(item => (
              <li className="sotr__item" key={item.id}>
                <Link className="sotr__link" to={`/info/${item.id}`}>{item.name}</Link>

              </li>
          ))}
        </ul>

      </div>

    </div>
  )
};

export default List;
