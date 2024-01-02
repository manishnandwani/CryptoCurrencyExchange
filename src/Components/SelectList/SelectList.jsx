import { memo } from "react"

const SelectList = ({list, type, updateExchangeValues}) =>{
    return (
        <select onChange={(e) => updateExchangeValues(e,'currency')}>
            {list.length > 0 && list.map((item) => 
                <option key={item.name} value={item.symbol}>
                    {type === 'currency' ? `${item.sign} - ${item.name} (${item.symbol})`: `${item.symbol} - ${item.name}`} 
                </option>)
            }
      </select>
    )
}

export default memo(SelectList)