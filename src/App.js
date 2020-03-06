import React, { Component } from 'react';
import './App.css';
import Radium from 'radium';
import Person from './Person/Person';


class App extends Component {

  // state object will be an array

  state = {
    persons: [
      { id: "adar", name: "Max", age: 28 },
      { id: "rerf", name: "Manu", age: 29 },
      { id: "rsdf", name: "Stephanie", age: 26 }
    ],
    otherState: "some other value",
    showPersons: false,
  }

  deletePersonHandler = (personIndex) => {
    // use personIndex which is the index of each person from the array
    // Arrays and objects are reference types, did not assign a new value to the constant, it is only holding a pointer, I only changed the element it was pointing to. 

    // fetch all persons; slice() copies the array and saves a new one to const persons. Now we can safely splice it. 
    // const persons = this.state.persons.slice();

    // we can also use the spread operator which is the most modern approach.
    const persons = [...this.state.persons];

    // create new version of that persons array
    // will start splicing at personIndex and splice 1 element. Removes 1 element from the array. 
    persons.splice(personIndex, 1);

    // call this.setState and set persons to persons. To my persons constant which was updated by splicing 1 element. The persons array still has the rest of the elements. 
    this.setState({
      persons: persons,
    })
  }

  nameChangedHandler = (event, id) => {
    // get index / id of person input name change
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    // Create a new JavaScript object and use the spread operator in front of the object I am fetching and it will distribute all the properties of the object we fetch here : this.state.persons[personIndex], into the new object we are creating here. 

    const person = {
      ...this.state.persons[personIndex]
    }

    // alternative approach insted of using spread operator; const person = Object.assign({}, this.state.persons[personIndex]);



    // update person.name and set it to event.target.value
    person.name = event.target.value;

    // make a copy of persons the whole array
    const persons = [...this.state.persons];

    // update it at one position; persons[personIndex] should now be my updated person. 
    persons[personIndex] = person;

    // Set state to the updated persons array, which is a copy of the old array where we updated one element with the updated person where we adjusted the name. Without mutating the state. 

    this.setState({
      persons: persons
    })
  }

  togglePersonsHandler = () => {
    // toggle some property that in the ends decides if we want to display this div to show person or not.

    // this is either true or false it is the current state
    const doesShow = this.state.showPersons;

    // call this.setState to adjust the state
    this.setState({
      showPersons: !doesShow,
    })

  }

  render() {

    // css style properties have JavaScript representations; use camel case not to confuse with css properties. Use strings as values since it is in JavaScript. 
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    let persons = null;

    // this.state.showPersons is a boolean and not need to === true. We can omit that part.
    if (this.state.showPersons) {

      // if true set persons variable to some JSX code.
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            // return JSX for Person component pass key:"", name and age. 
            return <Person
              click={() => this.deletePersonHandler(index)}
              name={person.name}
              age={person.age}
              key={person.id}
              changed={(event) => this.nameChangedHandler(event, person.id)} />
          })}
        </div>
      );
      style.backgroundColor = 'red';
    }

    // referring to App.css styling the paragraph below depending on the number of persons. String "red bold" valid css class. Will edit array dynamically.
    // let classes = ['red', 'bold'].join(' ');

    // add css styling dynamically
    const classes = [];
    if (this.state.persons.length <= 2) {
      classes.push('red'); // classes = ['red']
    }

    if (this.state.persons.length <= 1) {
      classes.push('bold'); // classes = ['red bold']
    }


    return (
      <div className="App">
        <h1> Hi, I'm a React App</h1>
        <p className={classes.join(' ')}> This is really working!</p >
        <button
          style={style}
          onClick={this.togglePersonsHandler}>Toggle Persons</button>
        {persons}

      </div >
    );
  }
}

// call Radium as function and wrap the App. Higher order component wrapping your component, adding extra functionality. Extra syntax to parse styles. Can be used on class and functional components. 
export default Radium(App);