import { useEffect, useState } from 'react';
import './App.css';
import InfoCurrentValute from './components/InfoCurrentValute/InfoCurrentValute.js'
import History from './components/History/History.js'
import getCurrencies from './functions/fetch.js'

function App() {
  const [currencies, setCurrencies] = useState([])
  const [history, setHistory] = useState({})
  const [prevURL, setPrevURL] = useState()
  const [desiredValute, setDesiredValute] = useState("")

  useEffect(()=>{
    fetch("https://www.cbr-xml-daily.ru/daily_json.js", {method: "GET"})
    .then((data)=>data.json())
    .then((data)=>{
        setCurrencies(Object.entries(data.Valute))
        setPrevURL(data.PreviousURL)
    })
  }, [])

  function loadMore(){
    let mas = Object.assign({}, history)
    let url = prevURL
    let promise = getCurrencies(url, mas, true)
    promise.then((data)=>{
      setHistory(data[1])
      setPrevURL(data[0])
    })
  }

  return (
    <div className="App">
      <h1>Курсы валют на сегодняшний день</h1>

      <div className='content'>
        {currencies.map((value, index)=>
          <InfoCurrentValute
            key={index}
            setHistory={setHistory}
            history={history}
            setDesiredValute={setDesiredValute}
            setPrevURL={setPrevURL}
            info={
            {
              code: value[0],
              value: value[1].Value,
              name: value[1].Name,
              previous: value[1].Previous,
              nominal: value[1].Nominal,
              prevURL: prevURL,
            }
          }/>
        )}
      </div>

      <History
        history={history}
        loadMore={loadMore}
        desiredValute={desiredValute}
        setDesiredValute={setDesiredValute}
      />
    
    </div>
  );
}

export default App;