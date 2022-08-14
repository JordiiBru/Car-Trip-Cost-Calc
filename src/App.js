import React from 'react';
import {useState} from 'react';
import './App.css';
import { Header } from './Components/Common'


const App = () => {
  const [Passengers, setPassengers] = useState('');
  const [Km, setKm] = useState('');
  const [GasPrice, setGasPrice] = useState('');
  const [CarUsage, setCarUsage] = useState('');
  const [Toll, setToll] = useState('');
  const [LuggageFlag, setLuggageFlag] = useState(false);
  const [RainFlag, setRainFlag] = useState(false);
  const [PeajeFlag, setPeajeFlag] = useState(false);

  const passengerChange = event => {
    setPassengers(event.target.value);
  };
  const KmChange = event => {
    setKm(event.target.value);
  };
  const GasPriceChange = event => {
    setGasPrice(event.target.value);
  };
  const CarUsageChange = event => {
    setCarUsage(event.target.value);
  };
  const TollChange = event => {
    setToll(event.target.value);
  };
  const handleLugCheckbox = (event) => {
    setLuggageFlag(event.target.value);
    setLuggageFlag(!LuggageFlag); 
  };
  const handleRainCheckbox = (event) => {
    setRainFlag(event.target.value);
    setRainFlag(!RainFlag); 
  };
  const handlePeajeCheckbox = (event) => {
    setPeajeFlag(event.target.value);
    setPeajeFlag(!PeajeFlag);
    setToll('');
  };

  function calculate(){
    var PreuPeatge = 0;
    if(PeajeFlag === true) PreuPeatge = parseFloat(Toll);
    var carCost = parseFloat(CarUsage)/100;
    if(LuggageFlag === true) carCost = carCost + 0.015;
    if(RainFlag === true) carCost = carCost + 0.05;
    var total_l = parseFloat(Km) * carCost;
    return total_l * parseFloat(GasPrice) + PreuPeatge;
  }

  function displayAmount(){
    var empty_msg = '';
    var res = calculate();
    res = res.toFixed(2);
    var res_msg = 'Total amount to pay: '+ res +' €';
    if(isNaN(res)) return empty_msg;
    else return res_msg;
  }

  function displayResult(){
    var empty_msg = '[Fill every possible blank to proceed]';
    var res = calculate();
    res = res / Passengers;
    res = res.toFixed(2);
    var res_msg = 'Each passenger has to pay '+ res +' € to the driver';
    if(isNaN(res)) return empty_msg;
    else return res_msg;
  }

  var final_amount_msg = displayAmount();
  var final_msg = displayResult();

  return (
    <div className="App">
      <Header />
      
      <p>
        <form> 
          <label> Number of Passengers on board:
          <input 
            type="int"
            id="Passengers"
            name="Passengers"
            onChange={passengerChange}
            value={Passengers}
          />
          </label>
        </form>
      </p>
      
      <p>
        <form>
          <label> Number of kilometers on road:
            <input
                type="int"
                id="Km"
                name="Km"
                onChange={KmChange}
                value={Km}
            />
          </label>
        </form>
      </p> 
        
      <p>
        <form>
          <label> Gas price at the moment per Km:
            <input
              type="int"
              id="GasPrice"
              name="GasPrice"
              onChange={GasPriceChange}
              value={GasPrice}
            />
          </label>
        </form>
      </p>
        
      <p>
        <form>
          <label> Car's gas consumption in L per 100 Km:
            <input
              type="int"
              id="CarUsage"
              name="CarUsage"
              onChange={CarUsageChange}
              value={CarUsage}
            />
          </label>
        </form>  
      </p>

      <p> <input type="checkbox" onChange={handleLugCheckbox} /><span>Heavy luggage?</span> <br/> </p>
      <p> <input type="checkbox" onChange={handleRainCheckbox} /><span>Does it rain?</span> <br/> </p>
      <p> <input type="checkbox" onClick={handlePeajeCheckbox} /><span>Toll?</span> <br/> </p>
      {PeajeFlag && (
        <p>
        <form>
          <label > 
            <input
                type="int"
                id="Toll"
                name="Toll"
                onChange={TollChange}
                value={Toll}
                placeholder="Type toll's cost..."
            />
          </label>
        </form>
      </p> 
      )}
      <h3>{final_amount_msg}</h3>
      <h2>{final_msg}</h2>

    </div>
  );
}

export default App;
