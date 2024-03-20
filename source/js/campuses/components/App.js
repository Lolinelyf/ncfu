import React from 'react';
import useAxios from 'axios-hooks';
import Campuses from "./Campuses";
import Loader from 'react-loader-spinner'
import {LangContext} from "./LangContext";

const list = [
  {
    id: "1",
    title: "Ставрополь",
    enTitle: "Stavropol",
    items: [
      {
        id: "1",
        title: "1",
        fullTitle: "Корпус № 1",
        address: "Улица Гагарина, дом 1",
        enTitle: "",
        enFullTitle: "",
        enAddress: "",
        photo: "https://www.ncfu.ru/.galleries/Servis-Korpusa-i-kampusy/nev1.jpg_106193732.jpg",
        lat: "45.043579",
        lon: "41.961942",
        transport: {
          "bus": "4, 6, 9, 10, 12а, 20, 3, 3а, 11а, 16 (чёрный), 16 (красный), 101ж, 102е, 105д, 111а, 120д, 120е, 123, 123б, 199",
          "trolleybus": "",
          "tram": ""
        },
        type: {
          id: "1",
          title: "Корпус",
          enTitle: "Campus"
        }
      },

      {
        id: "2",
        title: "2",
        fullTitle: "Корпус № 2",
        address: "Улица Гагарина, дом 1",
        enTitle: "",
        enFullTitle: "",
        enAddress: "",
        photo: "https://www.ncfu.ru/.galleries/Servis-Korpusa-i-kampusy/nev1.jpg_106193732.jpg",
        lat: "45.042411",
        lon: "41.962236",
        transport: {
          "bus": "4, 6, 9, 10, 12а, 20, 3, 3а, 11а, 16 (чёрный), 16 (красный), 101ж, 102е, 105д, 111а, 120д, 120е, 123, 123б, 199",
          "trolleybus": "",
          "tram": ""
        },
        type: {
          id: "1",
          title: "Корпус",
          enTitle: "Campus"
        }
      },

      {
        id: "10",
        title: "3",
        fullTitle: "Корпус № 3",
        address: "Улица Гагарина, дом 1",
        enTitle: "",
        enFullTitle: "",
        enAddress: "",
        photo: "https://www.ncfu.ru/.galleries/Servis-Korpusa-i-kampusy/nev1.jpg_106193732.jpg",
        lat: "44.644687",
        lon: "41.941417",
        transport: {
          "bus": "4, 6, 9, 10, 12а, 20, 3, 3а, 11а, 16 (чёрный), 16 (красный), 101ж, 102е, 105д, 111а, 120д, 120е, 123, 123б, 199",
          "trolleybus": "",
          "tram": ""
        },
        type: {
          id: "1",
          title: "Корпус",
          enTitle: "Campus"
        }
      },

      {
        id: "3",
        title: "1",
        fullTitle: "Общежитие 1",
        address: "Улица Гагарина, дом 1",
        enTitle: "",
        enFullTitle: "",
        enAddress: "",
        photo: "https://www.ncfu.ru/.galleries/Servis-Korpusa-i-kampusy/nev1.jpg_106193732.jpg",
        lat: "45.041711",
        lon: "41.962482",
        transport: {
          "bus": "4, 6, 9, 10, 12а, 20, 3, 3а, 11а, 16 (чёрный), 16 (красный), 101ж, 102е, 105д, 111а, 120д, 120е, 123, 123б, 199",
          "trolleybus": "",
          "tram": ""
        },
        type: {
          id: "2",
          title: "Общежитие",
          enTitle: "hostel"
        }
      },

      {
        id: "4",
        title: "3",
        fullTitle: "Общежитие 3",
        address: "Улица Гагарина, дом 1",
        enTitle: "",
        enFullTitle: "",
        enAddress: "",
        photo: "https://www.ncfu.ru/.galleries/Servis-Korpusa-i-kampusy/nev1.jpg_106193732.jpg",
        lat: "45.041537",
        lon: "41.960865",
        transport: {
          "bus": "4, 6, 9, 10, 12а, 20, 3, 3а, 11а, 16 (чёрный), 16 (красный), 101ж, 102е, 105д, 111а, 120д, 120е, 123, 123б, 199",
          "trolleybus": "",
          "tram": ""
        },
        type: {
          id: "2",
          title: "Общежитие",
          enTitle: "hostel"
        }
      },


    ]
  },

  {
    id: "2",
    title: "Пятигорск",
    enTitle: "Pyatigorsk",
    items: [
      {
        id: "5",
        title: "1",
        fullTitle: "Общежитие 2",
        address: "Улица Гагарина, дом 1",
        enTitle: "",
        enFullTitle: "",
        enAddress: "",
        photo: "https://www.ncfu.ru/.galleries/Servis-Korpusa-i-kampusy/nev1.jpg_106193732.jpg",
        lat: "44.644687",
        lon: "41.941417",
        transport: {
          "bus": "4, 6, 9, 10, 12а, 20, 3, 3а, 11а, 16 (чёрный), 16 (красный), 101ж, 102е, 105д, 111а, 120д, 120е, 123, 123б, 199",
          "trolleybus": "",
          "tram": ""
        },
        type: {
          id: "2",
          title: "Общежитие",
          enTitle: "Hostel"
        }
      }
    ]
  }


];

let en = false;
const langEl = document.querySelector('div[data-lang]');
if (langEl) {
  if (langEl.dataset.lang === "EN") en = true;
}

const App = () => {
  const [{ data, loading, error }] = useAxios(
    'https://ncfu.ru/api/campuses/list.php'
  );

  if (loading) return <Loader
    style={{textAlign: "center", padding: "3rem"}}
    type="TailSpin"
    color="#254986"
    height={100}
    width={100}
  />;

  if (error) return <p style={{textAlign: "center", padding: "3rem"}}>Ошибка загрузки данных.</p>;

  return (
    <LangContext.Provider value={en}>
      <Campuses list={data}/>
    </LangContext.Provider>
  )
};

export default App

