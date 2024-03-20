document.addEventListener('DOMContentLoaded', function () {
  // let loaderEl = document.querySelector('.js-loader');
  // loaderEl.classList.remove('hero__loader-wrapper--hidden');

  const addDateToEvents = function (events) {
    return events.map((eventItem) => {
      // добавили поле date с датой без нулей в дне и месяце и добавили '20' к году
      const day = eventItem.date.split('.')[0];
      const month = eventItem.date.split('.')[1];
      const year = eventItem.date.split('.')[2];

      return {
        ...eventItem,
        date3: (
          parseInt(day, 10) +
          '.' +
          parseInt(month, 10) +
          '.' +
          year
        ).split(' ')[0],
      };
    });
  };

  const makeEventsForCalendar = function (loadedEvents) {
    const events = addDateToEvents(loadedEvents);

    const years = [
      ...new Set(events.map((eventItem) => eventItem.date3.split('.')[2])),
    ];

    let res = {};
    years.forEach(function (year) {
      // отбор событий в текущем году
      let eventsInCurYear = events.filter(
        (eventItem) => eventItem.date3.split('.')[2] === year,
      );

      // отбор месяцев
      let allMonth = [
        ...new Set(
          eventsInCurYear.map((eventItem) => eventItem.date3.split('.')[1]),
        ),
      ];

      let monthInCurYear = {};
      allMonth.forEach(function (month) {
        eventsInCurMonth = events.filter(
          (eventItem) => eventItem.date3.split('.')[1] === month,
        );
        let allDays = [
          ...new Set(
            eventsInCurMonth.map((eventItem) => eventItem.date3.split('.')[0]),
          ),
        ];
        monthInCurYear[month] = allDays;
      });

      res[year] = monthInCurYear;
    });

    return res;
  };

  fetch('https://ncfu.ru/api/events/index.php')
    .then((response) => {
      return response.json();
    })
    .then((events) => {
      const eventsForCalendar = makeEventsForCalendar(events);
      const eventsWithDate = addDateToEvents(events);
      makeCalendar(eventsForCalendar, eventsWithDate);
    });

  function makeCalendar(events, fullEvents) {
    // обработка кликов по дате с событием
    const addDateClickHandler = function (fullEvents) {
      let eventLinkEls = document.querySelectorAll('.js-event-link');
      for (let i = 0; i < eventLinkEls.length; i++) {
        eventLinkEls[i].addEventListener('click', function () {
          openModalHandler(this.dataset.date, fullEvents);
        });
      }

      const htmlEl = document.querySelector('html');
      const modalEl = document.querySelector('.js-modal');
      const overlayEl = document.querySelector('.js-overlay');
      const closeModalBtnEl = document.querySelector('.js-modal-close-btn');

      const eventItemTemplate = document
        .querySelector('.js-event-item-template')
        .content.querySelector('.js-event-item');
      const currentItemContainerEl = document.querySelector(
        '.js-current-items-container',
      );

      const selectedDateEl = document.querySelector('.js-selected-date');
      const anotherEventsBlockEl = document.querySelector(
        '.js-another-events-block',
      );
      const anotherEventsContainerEl = document.querySelector(
        '.js-another-events-container',
      );

      const openModalHandler = function (selectedDate, fullEvents) {
        const htmlDecode = function (input) {
          const doc = new DOMParser().parseFromString(input, 'text/html');
          return doc.documentElement.textContent;
        };

        const eventsInSelectedDate = fullEvents.filter(
          (eventItem) => eventItem.date3 === selectedDate,
        );

        const addEventItem = function (eventItem) {
          const newEventItemEl = eventItemTemplate.cloneNode(true);
          const eventTitleEl = newEventItemEl.querySelector('.js-event-title');
          const eventTextEl = newEventItemEl.querySelector('.js-event-text');
          const eventImageEl = newEventItemEl.querySelector('.js-event-image');
          const eventDateEl = newEventItemEl.querySelector('.js-event-date');

          newEventItemEl.href = eventItem.url;
          eventTitleEl.innerText = htmlDecode(eventItem.title);
          eventTextEl.innerText = htmlDecode(eventItem.short_description);
          eventImageEl.src = eventItem.img;
          eventDateEl.innerText = 'Начало: ' + eventItem.date.split(' ')[0];

          return newEventItemEl;
        };

        eventsInSelectedDate.forEach(function (eventItem) {
          const newEventItemEl = addEventItem(eventItem);
          currentItemContainerEl.appendChild(newEventItemEl);
        });

        if (fullEvents.length > 0) {
          anotherEventsBlockEl.style.display = 'block';
          const anotherEvents = fullEvents
            .filter((eventItem) => eventItem.date3 !== selectedDate)
            .sort(
              (a, b) =>
                new Date(
                  b.date3.split('.')[2],
                  b.date3.split('.')[1],
                  b.date3.split('.')[0],
                ) -
                new Date(
                  a.date3.split('.')[2],
                  a.date3.split('.')[1],
                  a.date3.split('.')[0],
                ),
            )
            .slice(0, 15);

          console.log(anotherEvents);
          anotherEvents.forEach(function (eventItem) {
            const newEventItemEl = addEventItem(eventItem);
            anotherEventsContainerEl.appendChild(newEventItemEl);
          });
        }

        htmlEl.classList.add('modal-is-opened');
        overlayEl.classList.add('overlay_active');
        modalEl.classList.add('modal_active');
        selectedDateEl.innerText = eventsInSelectedDate[0].date.split(' ')[0];
      };

      const closeModalHandler = function () {
        htmlEl.classList.remove('modal-is-opened');
        overlayEl.classList.remove('overlay_active');
        modalEl.classList.remove('modal_active');
        currentItemContainerEl.innerHTML = '';
        anotherEventsContainerEl.innerHTML = '';
        anotherEventsBlockEl.style.display = 'none';
        selectedDateEl.innerText = '';
      };

      overlayEl.addEventListener('click', closeModalHandler);
      closeModalBtnEl.addEventListener('click', closeModalHandler);
    };

    function generate_year_range(start, end) {
      let years = '';
      for (let year = start; year <= end; year++) {
        years += "<option value='" + year + "'>" + year + '</option>';
      }
      return years;
    }

    let today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    let selectYear = document.getElementById('year');
    let selectMonth = document.getElementById('month');

    let createYear = generate_year_range(2022, 2025);
    /** or
     * createYear = generate_year_range( 1970, currentYear );
     */

    document.getElementById('year').innerHTML = createYear;

    let months = [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ];
    let days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

    let dayHeader = '<tr>';
    for (let day in days) {
      dayHeader += "<th data-days='" + days[day] + "'>" + days[day] + '</th>';
    }
    dayHeader += '</tr>';

    document.getElementById('thead-month').innerHTML = dayHeader;

    let monthAndYear = document.getElementById('monthAndYear');
    showCalendar(currentMonth, currentYear);

    function next() {
      currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
      currentMonth = (currentMonth + 1) % 12;
      showCalendar(currentMonth, currentYear);
    }

    function previous() {
      currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      showCalendar(currentMonth, currentYear);
    }

    function jump() {
      currentYear = parseInt(selectYear.value);
      currentMonth = parseInt(selectMonth.value);
      showCalendar(currentMonth, currentYear);
    }

    let btnNext = document.getElementById('next');
    btnNext.onclick = function () {
      next();
    };

    let btnPrev = document.getElementById('previous');
    btnPrev.onclick = function () {
      previous();
    };

    let btnYear = document.getElementById('year');
    btnYear.onchange = function () {
      jump();
    };

    let btnMonth = document.getElementById('month');
    btnMonth.onchange = function () {
      jump();
    };

    function showCalendar(month, year) {
      let firstDay = new Date(year, month).getDay() - 1;

      if (firstDay === -1) {
        firstDay = 6;
      }

      let tbl = document.getElementById('calendar-body');

      tbl.innerHTML = '';
      monthAndYear.innerHTML = months[month] + ' ' + year;
      selectYear.value = year;
      selectMonth.value = month;

      // создание ячеек
      let date = 1;
      for (let i = 0; i < 6; i++) {
        let row = document.createElement('tr');

        for (let j = 0; j < 7; j++) {
          let cellTemplate = "<span class='calendar__date'>" + date + '</span>';
          let linkTemplate =
            "<button class='calendar__link js-event-link' " +
            ' data-date=' +
            date +
            '.' +
            (month + 1) +
            '.' +
            year +
            '>' +
            date +
            '</button>';

          if (i === 0 && j < firstDay) {
            let cell = document.createElement('td');
            let cellText = document.createTextNode('');
            cell.appendChild(cellText);
            row.appendChild(cell);
          } else if (date > daysInMonth(month, year)) {
            break;
          } else {
            let cell = document.createElement('td');

            if (events[year] !== undefined) {
              if (events[year][month + 1] !== undefined) {
                if (events[year][month + 1].includes(date.toString())) {
                  cell.innerHTML = linkTemplate;
                } else {
                  // cardContainer.innerHTML = '';
                  cell.innerHTML = cellTemplate;
                }
              } else {
                //noEventsEl.classList.remove('hero__calendar-no-events--hidden');
                //cardContainer.innerHTML = '';
                cell.innerHTML = cellTemplate;
              }
            } else {
              cell.innerHTML = cellTemplate;
            }
            // подсветка сегодняшней даты
            // if ( date === today.getDate() && year === today.getFullYear() && month === today.getMonth() ) {
            //   cell.className = "selected";
            // }
            row.appendChild(cell);
            date++;
          }
        }

        tbl.appendChild(row);
      }

      addDateClickHandler(fullEvents);
    }

    function daysInMonth(iMonth, iYear) {
      return 32 - new Date(iYear, iMonth, 32).getDate();
    }
  }
});
