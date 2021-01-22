import React from 'react';
// import HolidayHomesList from '../containers/HolidayHomesList';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/App.css';

export default function App() {
  return (
    <div className="content">
      <Navbar />
      {/* <div>
        <HolidayHomesList />
      </div> */}
    </div>
  );
}
