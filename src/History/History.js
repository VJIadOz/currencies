import './History.css'
import getNormDate from '../functions/getNormDate';

export default function History({dataFromValuteItem}){
    return(
        <div className='history'>
            <div className='history-wrapper'>
                <div>
                    <h1>{dataFromValuteItem.valuteName} {dataFromValuteItem.valuteCharCode}</h1>
                </div>
                <div>
                    {dataFromValuteItem.historyValute ?
                        dataFromValuteItem.historyValute.map((value,index)=>
                            <div key={index} className={`history-item ${value[2] ? "history-item-up" : "history-item-down"}`}>
                                <span>{getNormDate(value[0])}</span>
                                <span>{value[1]}</span>
                            </div>
                        )
                    :
                    <div className="loading">
                        <div></div>
                        <p>Загрузка</p>
                    </div>
                    }  
                </div>
                {dataFromValuteItem.historyValute && 
                    <div className='buttons-wrapper'>
                        <button onClick={()=>document.querySelector(".history").style.display = "none"}>×</button>
                        <button onClick={()=>dataFromValuteItem.elem.fetchHistory()}>Загрузить ещё</button>
                    </div>
                }
            </div>
        </div>
    )
}