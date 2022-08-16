import React from 'react';
import {useState} from 'react';
import './App.css';
import { Header } from './Components/Common'
import entry from './gas_logo.png';
import JSConfetti from 'js-confetti'
import toast, { Toaster } from 'react-hot-toast';

const App = () => {
  const [Passengers, setPassengers] = useState('');
  const [Km, setKm] = useState('');
  const [GasPrice, setGasPrice] = useState('');
  const [CarUsage, setCarUsage] = useState('');
  const [Toll, setToll] = useState('');
  const [LuggageFlag, setLuggageFlag] = useState(false);
  const [RainFlag, setRainFlag] = useState(false);
  const [PeajeFlag, setPeajeFlag] = useState(false);
  const [top_msg, setMSG1] = useState('');
  const [bottom_msg, setMSG2] = useState('');


  
  const handleButton = (event) => {
    setMSG1(display_All());
    setMSG2(displayResult());
  };

  const jsConfetti = new JSConfetti();

  async function confetti_shot(){
    await jsConfetti.addConfetti({
      confettiRadius: 5,
      confettiNumber: 300,
    });
  }

  const passengerChange = event => {
    setPassengers(event.target.value);
    setMSG1('');
    setMSG2('');
  };
  const KmChange = event => {
    setKm(event.target.value);
    setMSG1('');
    setMSG2('');
  };
  const GasPriceChange = event => {
    setGasPrice(event.target.value);
    setMSG1('');
    setMSG2('');
  };
  const CarUsageChange = event => {
    setCarUsage(event.target.value);
    setMSG1('');
    setMSG2('');
  };
  const TollChange = event => {
    setToll(event.target.value);
    setMSG1('');
    setMSG2('');
  };
  const handleLugCheckbox = (event) => {
    setLuggageFlag(event.target.value);
    setLuggageFlag(!LuggageFlag);
    setMSG1('');
    setMSG2('');
  };
  const handleRainCheckbox = (event) => {
    setRainFlag(event.target.value);
    setRainFlag(!RainFlag);
    setMSG1('');
    setMSG2(''); 
  };
  const handlePeajeCheckbox = (event) => {
    setPeajeFlag(event.target.value);
    setPeajeFlag(!PeajeFlag);
    setToll('');
    setMSG1('');
    setMSG2('');
  };

  function calculate(){
    var PreuPeatge = 0;
    if(PeajeFlag === true) PreuPeatge = parseFloat(Toll);
    var carCost = parseFloat(CarUsage)/100;
    if(LuggageFlag === true) carCost = carCost + carCost*0.015;
    if(RainFlag === true) carCost = carCost + carCost*0.1;
    var total_l = parseFloat(Km) * carCost;
    return total_l * parseFloat(GasPrice) + PreuPeatge;
  }

  function calc_litres(){
    var carCost = parseFloat(CarUsage)/100;
    if(LuggageFlag === true) carCost = carCost + carCost*0.015;
    if(RainFlag === true) carCost = carCost + carCost*0.1;
    return parseFloat(Km) * carCost;

  }

  function displayResult(){
    var empty_msg = '';
    if(parseFloat(Passengers) === 0 || parseFloat(Passengers) === 1) return empty_msg;
    var res = calculate();
    if(!isFinite(res / Passengers)) return empty_msg;
    res = res / Passengers;
    res = res.toFixed(2);
    var res_msg = 'Each passenger has to pay '+ res +' € to the driver';
    confetti_shot();
    return res_msg;
  }

  function display_All(){
    var empty_msg = '';
    var res = calculate();
    res = parseFloat(res.toFixed(2));
    if(isNaN(res)){
      toast.error("Please, fill very possible blank")
      return empty_msg;
    } 
    var liters = calc_litres();
    liters = parseFloat(liters.toFixed(3));
    var total_res = '';
    if(PeajeFlag === false){
      total_res = 'A total of '+ liters +' liters have been consumed, equivalent to '+ res +' € of fuel';
    } else {
      total_res = "A total of "+ liters +" liters have been consumed, equivalent to "+ res +" € of fuel plus toll's cost";
    }
    return total_res;
  }





  return (
    <div className="App">
      <div><Toaster/></div>
      <Header />
      <img alt='gas' className='logo_pic' src={entry}/>
      
      {/*<h3 className='intro-text'>Do you have a long car trip with friends in mind and need to know how much you're going to spend on gas? </h3>
      <h3 className='intro-text'>You're in luck! With this calculator you will be able to know the amount of fuel your car will consume during the whole trip and specially how much money each passenger will have to pay.</h3>
      <h3 className='intro-text'>All you have to do is enter the necessary values in the available boxes and check the corresponding options.</h3>*/}
      <p>
        <form> 
          <label> Number of people on board:
          <input
            className='type-box' 
            type="int"
            id="Passengers"
            name="Passengers"
            onChange={passengerChange}
            value={Passengers}
            placeholder="Type..."
          />
          </label>
        </form>
      </p>
      
      <p>
        <form>
          <label> Number of kilometers on road:
            <input
                className='type-box' 
                type="int"
                id="Km"
                name="Km"
                onChange={KmChange}
                value={Km}
                placeholder="Type..."
            />
          </label>
        </form>
      </p> 
        
      <p>
        <form>
          <label> Fuel price at the moment per L:
            <input
              className='type-box' 
              type="int"
              id="GasPrice"
              name="GasPrice"
              onChange={GasPriceChange}
              value={GasPrice}
              placeholder="Type..."
            />
          </label>
        </form>
      </p>
        
      <p>
        <form>
          <label> Car's fuel consumption in L per 100 Km:
            <input
              className='type-box' 
              type="int"
              id="CarUsage"
              name="CarUsage"
              onChange={CarUsageChange}
              value={CarUsage}
              placeholder="Type..."
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
      <p>
      <button onClick={handleButton}>
        Show results
      </button>
      </p>
      <h2>{top_msg}</h2>
      <h2>{bottom_msg}</h2>
      
   
      
      
      
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      {/* no se com canviar el color del fons total */}
    </div>
  );
}

export default App;
