export default async function(url, mas, updateHistory){
    for(let i = 0; i < 4; i++){
        let data = await fetch(url, {method: "GET"})
        data = await data.json()
        url = data.PreviousURL
        data = {
          date: data.Date,
          valutes: Object.entries(data.Valute)
        }
        for(let val of data.valutes){
            if(!updateHistory && !mas[val[0]]) mas[val[0]] = {}
            let date = data.date.substr(0,10).split('-').reverse().join('.')
            mas[val[0]][date] = {current: Math.round((val[1].Value/val[1].Nominal)*1000)/1000, previous: Math.round((val[1].Previous/val[1].Nominal)*1000)/1000}
        }
    }
    return [url, mas]
}