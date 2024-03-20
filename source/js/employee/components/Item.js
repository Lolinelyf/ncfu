import React, {useEffect} from 'react';
import {Operation} from "../reducer";
import {getItemSelector, getIsLoadingSelector} from "../selectors";
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import Loader from "react-loader-spinner";
import DOMPurify from 'dompurify'

const Item = (props) => {

  const dispatch = useDispatch();
  const item = useSelector(getItemSelector);
  const isLoading = useSelector(getIsLoadingSelector);

  const htmlDecode = (input) => {
    const doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  }

  const sanitizedData = (content) => ({
    __html: htmlDecode(DOMPurify.sanitize(content))
  })

  useEffect(() => {
    dispatch(Operation.loadItem(props.match.params.id));
  }, []);


  const {
    id,
    name,
    photo,
    rank,
    degree,
    position,
    position2,
    position3,
    institute,
    department,
    info1,
    info2,
    contacts,
    address,
    email,
    phone,
    bases,
    disciplines,
    interes,
    add
  } = item;


  if (isLoading) return <Loader
    style={{textAlign: "center", padding: "3rem"}}
    type="TailSpin"
    color="#254986"
    height={100}
    width={100}
  />;

  let pos = [...new Set([position, position2, position3])].filter(el => el !== '').join(', ');
  
  return (
    <div>
      <h2 className="title">{name}</h2>

      <div className="person">
        <div className="person__main">

          <div className="person__photo-container only-mobile">
            <img className="person__photo" src={photo} width="400" height="400" title={name}
                 alt={name}></img>
          </div>

          {rank && <div className="mb-2">
            <p className="person__caption">Звание:</p>
            <p className="person__value">{rank}</p>
          </div>}

          {degree && <div className="mb-2">
            <p className="person__caption">Степень</p>
            <p className="person__value">{degree}</p>
          </div>}

          {pos && <div className="mb-2">
            <p className="person__caption">Должность:</p>
            <p className="person__value">{pos}</p>
          </div>}

          {institute && <div className="mb-2">
            <p className="person__caption">Институт/факультет:</p>
            <p className="person__value">{institute}</p>
          </div>}

          {department && <div className="mb-2">
            <p className="person__caption">Кафедра:</p>
            <p className="person__value">{department}</p>
          </div>}

          {info1 &&
            <div className="mb-2">
            <p className="person__caption">Общая информация:</p>
           <div className="person__text" dangerouslySetInnerHTML={sanitizedData(info1)}></div>
          </div>}

          {(disciplines && disciplines.length > 0) && <div className="mb-2">
            <p className="person__caption">Основные преподаваемые дисциплины</p>
            <div className="person__text">
              <ul>
                {disciplines.map(item => (
                  <li>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          }

          {interes && <div className="mb-2">
            <p className="person__caption">Сфера научных интересов</p>
            <p className="person__value" dangerouslySetInnerHTML={sanitizedData(interes)}></p>
          </div> }

          {info2 && <div className="mb-2">
            <p className="person__caption">Список значимых публикаций</p>
            <div className="person__text" dangerouslySetInnerHTML={sanitizedData(info2)}></div>
          </div> }

          {add && <div className="mb-2">
            <p className="person__caption">Дополнительно:</p>
            <div className="person__text" dangerouslySetInnerHTML={sanitizedData(add)}></div>
          </div> }

        </div>

        <div className="person__info">
          <div className="person__photo-container only-tablet">
            <img className="person__photo" src={photo} width="400" height="400" title={name}
                 alt={name}></img>
          </div>

          <div className="person__info-text">
            {(phone || address || email) && <div className="mb-2">
              <p className="person__caption">Контакты:</p>
              {phone && <p>Телефон: <br/>{phone}</p> }
              {address && <p>Адрес: <br/> {address} </p> }
              {email && <p>Электронная почта:<br/>
                <a href={`mailto:${email}`}>{email}</a>
              </p>}
            </div>}

            {(bases && bases.length > 0) && <div className="mb-2">
              <p className="person__caption">Профили автора в базах:</p>
              <ul>
                {bases.map(profile => (
                  <li><a href={profile.url}>{profile.title}</a></li>
                ))}
              </ul>
            </div> }

          </div>

        </div>
      </div>

      <div className="mb-2">
        <Link className="button button_type_secondary" to={`/`}>Вернуться к списку</Link>
      </div>
    </div>
   )
};

export default Item;
