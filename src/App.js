import React from 'react';
import {useState} from 'react';
import './App.css';
import { Header } from './Components/Common'
import entry from './gas_logo.png';
import JSConfetti from 'js-confetti'
import toast, { Toaster } from 'react-hot-toast';
import clearMusic from './Components/amogus.mp3';
import info_icon from './Components/info_icon.png';



const App = () => {
  /*global declarations*/
  const [Passengers, setPassengers] = useState('');
  const [Km, setKm] = useState('');
  const [GasPrice, setGasPrice] = useState('');
  const [CarConsum, setCarConsum] = useState('');
  const [Toll, setToll] = useState('');
  const [top_msg, setMSG1] = useState('');
  const [bottom_msg, setMSG2] = useState('');
  const [LuggageFlag, setLuggageFlag] = useState(false);
  const [RainFlag, setRainFlag] = useState(false);
  const [PeajeFlag, setPeajeFlag] = useState(false);

  /*Toast declarations*/
  const Luggage_Toast = () => toast(
    (t) => (
      <span>
        Car consumption increases by 1.5% per kilometer for each extra 50 kg of luggage.<br/>This is caused by the fact that the heavier the vehicle, the more energy it needs to move. In other words, the more additional weight, the more fuel it consumes.
        <br/> <button onClick={() => toast.dismiss(t.id)} >❌</button>
      </span> 
    ),
    {
      duration: 30000,
      position: 'top-left',
      icon: '🧳',
    }
  );
  const Rain_Toast = () => toast(
    (t) => (
      <span>
        Because of the rain, cars tend to consume up to 10% more on average than usual.<br/>This is due to the frequent use of the vehicle's electronic components and the more significant use of the accelerator to drive at the same speed as we would on dry asphalt.
        <br/> <button onClick={() => toast.dismiss(t.id)} >❌</button>
      </span> 
    ),
    {
      duration: 30000,
      position: 'top-left',
      icon: '☔️',
    }
  );

  /*Confetti declaration*/
  const jsConfetti = new JSConfetti();
  async function confetti_shot(){
    await jsConfetti.addConfetti({
      confettiRadius: 5,
      confettiNumber: 150,
    });
  }

  /*State declarations*/
  const passengersChange = event => {
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
  const CarConsumChange = event => {
    setCarConsum(event.target.value);
    setMSG1('');
    setMSG2('');
  };
  const TollChange = event => {
    setToll(event.target.value);
    setMSG1('');
    setMSG2('');
  };

  /*Button/Checks declarations*/
  const handle_LugCheckbox = (event) => {
    setLuggageFlag(event.target.value);
    setLuggageFlag(!LuggageFlag);
    setMSG1('');
    setMSG2('');
  };
  const handle_RainCheckbox = (event) => {
    setRainFlag(event.target.value);
    setRainFlag(!RainFlag);
    setMSG1('');
    setMSG2(''); 
  };
  const handle_PeajeCheckbox = (event) => {
    setPeajeFlag(event.target.value);
    setPeajeFlag(!PeajeFlag);
    setToll('');
    setMSG1('');
    setMSG2('');
  };
  const handle_Calculate = (event) => {
    setMSG1(display_Top());
    setMSG2(display_Bottom());
  };
  const handle_Clear = (event) => {
    play_clear();
    setPassengers('');
    setKm('');
    setGasPrice('');
    setCarConsum('');
    setToll('');
    setLuggageFlag(false);
    setRainFlag(false);
    setPeajeFlag(false);
    setMSG1('');
    setMSG2('');
    toast.dismiss();
  };

  /*Functions declarations*/
  function cost_calculator(){
    var PreuPeatge = 0;
    if(PeajeFlag === true) PreuPeatge = parseFloat(Toll);
    var carCost = parseFloat(CarConsum)/100;
    if(LuggageFlag === true) carCost = carCost + carCost*0.015;
    if(RainFlag === true) carCost = carCost + carCost*0.1;
    var total_l = parseFloat(Km) * carCost;
    return total_l * parseFloat(GasPrice) + PreuPeatge;
  }

  function liters_calculator(){
    var carCost = parseFloat(CarConsum)/100;
    if(LuggageFlag === true) carCost = carCost + carCost*0.015;
    if(RainFlag === true) carCost = carCost + carCost*0.1;
    return parseFloat(Km) * carCost;

  }

  function display_Bottom(){
    var empty_msg = '';
    if(parseFloat(Passengers) === 0 || parseFloat(Passengers) === 1) return empty_msg;
    var res = cost_calculator();
    if(!isFinite(res / Passengers)) return empty_msg;
    res = res / Passengers;
    res = res.toFixed(2);
    var res_msg = 'Each passenger has to pay '+ res +' € to the driver';
    confetti_shot();
    return res_msg;
  }

  function display_Top(){
    var empty_msg = '';
    var res = parseFloat(cost_calculator().toFixed(2));
    if(isNaN(res)){
      toast.error("Please, fill every possible blank");
      return empty_msg;
    }
    var liters = parseFloat(liters_calculator().toFixed(3));
    if(PeajeFlag === false) return 'A total of '+ liters +' liters have been consumed, equivalent to '+ res +' € of fuel';
    else return "A total of "+ liters +" liters have been consumed, equivalent to "+ res +" € of fuel plus toll's cost";  
  }

  function play_clear(){
    new Audio(clearMusic).play()
  }
  

  return (
    <div className="App">
      <div><Toaster/></div>
      <Header />
      <img alt='gas' className='logo_pic' src={entry}/>
      <p> {/*classname per pintar*/}
      <p>
        <form> 
          <label className='my-label'> Number of people on board:
          <input
            className='type-box' 
            type="int"
            id="Passengers"
            name="Passengers"
            onChange={passengersChange}
            value={Passengers}
            placeholder="Type..."
          />
          </label>
        </form>
      </p>
      
      <p>
        <form>
          <label className='my-label'> Number of kilometers on road:
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
          <label className='my-label'> Fuel price at the moment per L:
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
          <label className='my-label'> Car's fuel consumption in L per 100 Km:
            <input
              className='type-box' 
              type="int"
              id="CarConsum"
              name="CarConsum"
              onChange={CarConsumChange}
              value={CarConsum}
              placeholder="Type..."
            />
          </label>
        </form>  
      </p>

      <p> <input className='my-label' type="checkbox" onClick={handle_PeajeCheckbox} checked={PeajeFlag}/><span className='checkbox-text'>Toll?</span> <span> 
      {PeajeFlag && (
          <label > 
            <input
                className='type-box' 
                type="int"
                id="Toll"
                name="Toll"
                onChange={TollChange}
                value={Toll}
                placeholder="Type toll's cost..."
            />
          </label>
      )} </span> <br/> </p>
      <p> <input className='checkbox-box' type="checkbox" onChange={handle_LugCheckbox} checked={LuggageFlag}/><span className='checkbox-text'>Heavy luggage?</span><img alt='i_icon1' className='info-icon' src={info_icon} onClick={Luggage_Toast} /><br/> </p>
      <p> <input className='checkbox-box' type="checkbox" onChange={handle_RainCheckbox} checked={RainFlag}/><span className='checkbox-text'>Does it rain?</span><img alt='i_icon2' className='info-icon' src={info_icon} onClick={Rain_Toast}/> <br/> </p>


      <p>
        <button 
          onClick={handle_Clear}
          className='clear-button'>Clear
        </button>
        <button
          onClick={handle_Calculate}
          className='my-buttons'>Calculate
        </button>
      </p>
      </p>
      <p className='result-text'>
        <h2>{top_msg}</h2>
        <h2>{bottom_msg}</h2>
      </p>
     

      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      {/* no se com canviar el color del fons total */}
    </div>
    
  );
}

export default App;
