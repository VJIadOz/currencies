import react from 'react';
import './ValuteItem.css'
import React from 'react';


export default class ValuteItem extends React.Component{
    constructor(props){
        super(props)
        this.state={
            history:[],
            url: this.props.PreviousURL,
        }
    }

    setHistory(){
        this.props.setHistory({
            valuteName: this.props.infoValute.Name,
            valuteCharCode: this.props.infoValute.CharCode,
            historyValute: this.state.history,
            elem: this
        })
    }
    
    fetchHistory(){
        let i = 0
        this.props.setHistory("","","")
        let interval = setInterval(async ()=>{
            
            if(i==5){
                clearInterval(interval)
                this.setHistory()
                return
            } 
            // console.log(this.state.url)
            let promise = await fetch(this.state.url)
            let prevData = await promise.json()
            this.setState({
                history:[
                    ...this.state.history,
                    [
                        prevData.Date,
                        prevData.Valute[this.props.infoValute.CharCode].Value.toFixed(2),
                        prevData.Valute[this.props.infoValute.CharCode].Value > prevData.Valute[this.props.infoValute.CharCode].Previous ? true : false
                    ]
                ],
                url:prevData.PreviousURL
            })
            i++
        }, 300)
    }

    getHistory(){
        document.querySelector(".history").style.display = "block"
        if(this.state.history.length){
            this.setHistory()
        }else{
            this.fetchHistory()
        }
    }


    render(){ 
        return(
            <div className='currency' onClick={()=>this.getHistory()}>
                <div className='currency-code_wrapper'>
                    <span>{this.props.infoValute.Name}</span>
                    <span>{this.props.infoValute.CharCode}</span>
                </div>
                <div className='currency-value_wrapper'>
                    <span>Прошлый курс: {this.props.infoValute.Previous.toFixed(2)}</span>
                    <div>
                        {this.props.infoValute.Value > this.props.infoValute.Previous 
                        ? 
                        <span style={{color:"red"}}>▲</span>
                    :
                        <span style={{color:"green"}}>▼</span>
                        }
                        <span>{this.props.infoValute.Value.toFixed(2)}</span>
                    </div>
                    <span>Номинал: {this.props.infoValute.Nominal}</span>
                </div>
            </div>
        )
    }
}