import { useEffect, useState, useRef} from 'react';
import './App.css';
import './reset.css';
import ValuteItem from './ValuteItem/ValuteItem'
import getNormDate from './functions/getNormDate.js'
import History from './History/History';

function App() {
    const initialHistory = useRef({})

    const [visible, setVisible] = useState(false)
    const [activeValute, setActiveValute] = useState({fullname:'', code: ''})
    const [isLoading, setIsLoading] = useState(false)

	const [nowCurrencies, setNowCurrencies] = useState({})  
    const [date, setDate] = useState('')
    const [history, setHistory] = useState({})
    const isData = Object.entries(nowCurrencies).length ? true : false

    useEffect(()=>{
        fetch("https://www.cbr-xml-daily.ru/daily_json.js")
        .then(data=>data.json())
        .then((data)=>{
            setNowCurrencies(data)
            Object.keys(data.Valute).forEach(element => {
                initialHistory.current[element]={prevUrl: '', history: []}
            });
            setHistory(initialHistory.current)
        })
    },[])
  
    useEffect(()=>{
        if(!date) return
        let newDate = date.replaceAll('-','//')
        fetch(`https://www.cbr-xml-daily.ru//archive//${newDate}//daily_json.js`)
        .then(respond=>respond.json())
        .then((data)=>{
            setNowCurrencies(data)
        })
        .catch(()=>{
            setNowCurrencies({})
        })
        setHistory(initialHistory.current)
        setActiveValute({fullname:'', code: ''})
    },[date])

    function getHistory(e, moreHistory){
        let url, hist, nameValute
        if(moreHistory){
            url = history[activeValute.code].prevUrl
            setIsLoading(true)
            hist = JSON.parse(JSON.stringify(history))
            nameValute = Object.assign({}, activeValute)
        }else{
            nameValute = {
                fullname: e.currentTarget.firstChild.firstChild.innerHTML,
                code: e.currentTarget.firstChild.lastChild.innerHTML
            }
            setVisible(true)
            setActiveValute(nameValute)
            if(history[nameValute.code].history.length) return
    
            url = nowCurrencies.PreviousURL
            setIsLoading(true)
            hist = JSON.parse(JSON.stringify(history))
        }

        let copyHistoryValute = []
        let i = 0
        let interval = setInterval(()=>{
            if(i===5){
                clearInterval(interval)
                hist[nameValute.code].prevUrl = url
                hist[nameValute.code].history.push(...copyHistoryValute)
                setHistory(hist)
                setIsLoading(false)
                console.log(hist)
            }
            fetch(url)
            .then(respond=>respond.json())
            .then((data)=>{
                copyHistoryValute.push({
                    date: data.Date,
                    value: data.Valute[nameValute.code]
                })
                url = data.PreviousURL
                i++
            })
        },300)   
          
    }

	return (
		<div className="App">
            <header>
                <a href="https://www.cbr-xml-daily.ru/">Курсы валют, API</a>
                <h1>Курс рубля на
                <input
                    type='date'
                    id="date" 
                    value={isData ? getNormDate(nowCurrencies.Date) : date}
                    onChange={(e)=>setDate(e.target.value)}
                />
                </h1>
            </header>
            <main>
                {
                    isData
                    ?
                    Object.values(nowCurrencies.Valute).map((value, index) =>
                        <ValuteItem               
                            key={index}
                            infoValute={value}
                            setVisible={setVisible}
                            setHistory={setHistory}
                            getHistory={getHistory}
                        />
                    )
                    :
                    <div className="no-data">
                        <div></div>
                        <p>Данные отсутствуют</p>
                    </div>
                }
            </main>
            <aside>
                {visible &&
                <History 
                    History={history}
                    setVisible={setVisible}
                    activeValute={activeValute}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    getHistory={getHistory}
                />}
            </aside>
        </div>
	);
}

export default App;
