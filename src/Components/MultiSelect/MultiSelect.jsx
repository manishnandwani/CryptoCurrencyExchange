import { useEffect, useRef, useState } from "react";
import styles from "./MultiSelect.module.css";
import ListMenu from "../ListMenu/ListMenu";
// import SelectedList from "../SelectedList/SelectedList";
// import { getSelectedItems } from "../../utils/selectFunctions";

const MultiSelect = ({ list, updateExchangeValues, type}) => {
  const [openDropDown, setOpenDropDown] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [options, setOptions] = useState([]);
  const [searching, setSearching]= useState(false)
  const inputRef = useRef();
  
  const handleClick = (e) => {
    setOpenDropDown(false);
  };

  useEffect(()=>{
    setOptions(list)
    setSelectedItem(list[0])
  },[list])

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const handleSelectInput = (e) => {
    e.stopPropagation();
    setSearching(true)
    inputRef.current.focus()
    setOpenDropDown(true);
  };

  const handleSelectItem = (value) => {
    console.log("value",inputRef.current)
    setSelectedItem(value)
    inputRef.current.value = ''
    setSearching(false)
    updateExchangeValues(value?.symbol,type)
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    if (searchValue === "") {
      setOptions(list);
    } else {
      const _options = list.filter((data) => {
        if (data.name.toLowerCase().includes(searchValue)) {
          return data;
        }
      });
      setOptions(_options);
    }
  };

  return (
    <div className={styles.contianer}>
      <input
        type="text"
        ref={inputRef}
        className={styles.selectInput}
        onClick={handleSelectInput}
        onChange={handleSearch}
      />
      {!searching && <p className={styles["selectedItem"]} onClick={handleSelectInput}>{selectedItem?.symbol} - {selectedItem?.name}</p>}
      {openDropDown && options.length > 0 && (
        <ListMenu options={options} type={type} handleSelectItem={handleSelectItem} />
      )}
    </div>
  );
};

export default MultiSelect;
