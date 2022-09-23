import { useState, useEffect } from 'react';

import CardList from './components/card-list/card-list.component'

import SearchBox from './components/search-box/search-box.component'
import './App.css';

const App = () => {

  // If searchField changes, re-run the function (App)
  const [searchField, setSearchField] = useState(' '); // [value, setValue]
    // If monsters changes, re-run the function (App)
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);


  
  // Fetch monsters on inital render
  useEffect( () => {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((users) => setMonsters(users));
  }, []); // No dependancy - only call this function on mount



  // If monsters or search field changes
  useEffect( () => {
    // Search (filter) monsters
   const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

      setFilteredMonsters(newFilteredMonsters);

  }, [ monsters, searchField]); // Whenever any of these change, run the callback function (useEffect)



  const onSearchChange = (event) => {
      // Change value to lowercase
      const searchFieldString = event.target.value.toLocaleLowerCase();
      // Call set setSearchField
      setSearchField(searchFieldString);
  }

  return (
    <div className="App">
        <h1>Monsters</h1>
         <SearchBox onChangeHandler={onSearchChange} placeholder={'Search Monsters'}/>
          <CardList monsters={filteredMonsters} />
    </div>
  )


}

export default App;
