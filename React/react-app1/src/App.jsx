import React from 'react';
import StudentRegistrationForm from './StudentRegistration';
import LoginForm from './StudentLonginForm'
import FlipCardContainer from './FlipCard'
import FirstComp from './FirstComp'
import Counter from './counter'
import Project from './Project';

const App = () => {
  const handleFormSubmit = (data) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <div>
      {/* <h1 style={{ color: 'blue', textAlign: 'center' }}>Student Registration Form</h1>
      <StudentRegistrationForm onSubmit={handleFormSubmit} /> */}
      <h1 style={{ backgroundColor:"gray", color: 'blue', textAlign: 'center' }}>Login Form</h1>
      <LoginForm/>
      {/* <FlipCardContainer/> */}
        {/* <FirstComp/> */}
        {/* <Counter count="100"/> */}
        {/* <Project/> */}


    </div>
  );
};

export default App;
