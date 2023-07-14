import { useEffect, useState, useRef } from 'react';
import './App.css';
import './reset.css';
import ValuteItem from './ValuteItem/ValuteItem.js'
import getNormDate from './functions/getNormDate.js'
import History from './History/History';


function App() {
  const [exchangeRates, setExchangeRates] = useState({})  
  const [isDate, setIsDate] = useState(false)
  const [history, setHistory] = useState({})
  const inputDate = useRef(null)

  useEffect(()=>{
    fetch("https://www.cbr-xml-daily.ru/daily_json.js")
    .then(data=>data.json())
    .then((data)=>{
      setExchangeRates(data)
      setIsDate(true)
  })
  },[])

  function getNewExchangeRates(e){
    let date = e.target.value.replaceAll('-','//')
    fetch(`https://www.cbr-xml-daily.ru//archive//${date}//daily_json.js`)
    .then(respond=>respond.json())
    .then((data)=>{setExchangeRates(data);setIsDate(true)})
    .catch(reject=>setIsDate(false))
  }

  return (
    <div className="App">
      <header>
        <a href="https://www.cbr-xml-daily.ru/">Курсы валют, API</a>
        <h1>Курс рубля на
          <input
            type='date'
            id="date" 
            defaultValue={
              (isDate)
              ?
              getNormDate(exchangeRates.Date)
              :
              inputDate.current
            }
            onChange={getNewExchangeRates}
          />
        </h1>
      </header>
      <main>
        {isDate
          ?
          Object.values(exchangeRates.Valute).map((value, index) =>
            <ValuteItem               
              key={index}
              PreviousURL={exchangeRates.PreviousURL}
              infoValute={value}
              setHistory={setHistory}
            />
          )
          :
          <div className="no-data">
            <div></div>
              <p>Данные отсутствуют</p>
          </div>
        }
        <History 
          dataFromValuteItem={history} 
        />
      </main>
    </div>
  );
}

export default App;
