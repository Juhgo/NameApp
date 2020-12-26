import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { names } from './names.json';
import './index.css';

// Header component
const Header = () => {
  return (
    <header className="header">
      <h1>List of Names</h1>
    </header>
  )
}

// Footer component
const Footer = () => {
  return (
    <footer className="footer">
      <h5>
        <a href="https://github.com/Juhgo" target="_blank" rel="noreferrer" >©Juho Laaksonen</a>
      </h5>
    </footer>
  )
}

// Table items component
const Table = ({ name, amount }) => {
  return (
    <>
      <td>{name}</td>
      <td>{amount}</td>
    </>
  )
}

// Count all of the items together with loop
const TotalAmountOfNames = () => {
  let counter = 0;
  for (let i = 0; i < names.length; i++) {
    counter += names[i].amount;
  }
  return (
    <div className="totalAmount">
      <p>Total amount of names: {counter}</p>
    </div>
  )
}

// Search bar component
const SearchBar = () => {

  const [searchName, setSearchName] = useState(''); // State for name that should be searched
  const [amountOfNames, setAmountOfNames] = useState(0);
  const searchByTyping = e => {
    setSearchName(e.target.value);
  };

  // useEffect to counter one character delay and search the index
  useEffect(() => {
    try {
      // Get the index of name and search the amount of names with the index
      let indexOfAmount = names.findIndex(names => names.name === searchName);
      setAmountOfNames(names[indexOfAmount].amount);
    } catch (e) {
      setAmountOfNames(0);
    }
  }, [searchName]);

  return (
    <>
      <div className="searchBar">
        <form>
          <input type="text" placeholder="Search with name..." onChange={searchByTyping} />
        </form>
        <p>Amount of {searchName} names: {amountOfNames} </p>
      </div>
    </>
  );
}

const App = () => {

  const [sortedBy, setSortedBy] = useState(true); // State to control what the table is sorted by (underlining)

  const Styles = {
    textDecoration: "underline"
  }

  // Use sort() method to sort by Amount.
  const sortedByNumber = [].concat(names)
    .sort((a, b) => b.amount - a.amount);

  // Use sort() method to sort list into alphabetical order.
  const sortedByName = [].concat(names)
    .sort((a, b) => {
      let nameA = a.name;
      let nameB = b.name;
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

  // State of the list (Default is sortedByNumber)
  const [listState, setListState] = useState(sortedByNumber);

  return (
    <>
      <Header />
      <SearchBar />
      <table>
        <thead>
          <tr>
            <th type="button" style={sortedBy ? console.log("Sorted by Amount") : Styles} onClick={() => { setListState(sortedByName); setSortedBy(false) }}>Name</th>
            <th type="button" style={sortedBy ? Styles : console.log("Sorted by Name")} onClick={() => { setListState(sortedByNumber); setSortedBy(true) }}>Amount</th>
          </tr>
        </thead>
      </table>
      <div className="json-table">
        <table>
          <tbody>
            {listState.map((data, key) => {
              return (
                <tr key={key}>
                  <Table
                    key={key}
                    name={data.name}
                    amount={data.amount}
                  />
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <TotalAmountOfNames />
      <Footer />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))