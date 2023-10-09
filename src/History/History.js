import './History.css'
import getNormDate from '../functions/getNormDate'

export default function History({
    History, 
    setVisible, 
    activeValute, 
    isLoading,
    getHistory
}){
    const HistoryOfValute = activeValute.code && History[activeValute.code].history
    return(
        <div className='history'>
            <div className='history-wrapper'>
                {!isLoading ?
                    <> 
                        <div className='nameValute'>
                            <h1>{activeValute.fullname+" "+activeValute.code}</h1>
                        </div>
                        <div className='list'>
                            {HistoryOfValute.map((item)=>
                                <div className={item.value.Previous < item.value.Value ? "history-item-up" : "history-item-down"}>
                                    <span>{getNormDate(item.date)}</span>
                                    <div>
                                        {item.value.Previous < item.value.Value ?
                                        <span style={{color: "red"}}>▲</span>
                                        :
                                        <span style={{color:"green"}}>▼</span>}
                                        <span>{item.value.Value.toFixed(3)}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className='buttons-wrapper'>
                            <div className='closeBtn' onClick={()=>{setVisible(false)}}>
                                <span>X</span>
                            </div>
                            <button onClick={(e)=>getHistory(e, true)}>Загрузить ещё</button>
                        </div>
                    </>
                    
                    :
                    <div className="loading">
                        <div></div>
                    </div>
                }
            </div>
        </div>
    )
}

