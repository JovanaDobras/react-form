import React, { useState, useEffect } from 'react'
import FormTable from './FormTable';

function CreateForm() {

    const [regions, setRegions] = useState();
    const [cities, setCities] = useState();
    const [errorMess, setErrorMess] =useState('');
    const [ispisPodataka, setIspisPodataka] = useState([]);
    const [formResult, setFormResult] = useState({
        imePrezime: '',
        oblastGrada: '',
        grad: '',
        datumOd: '',
        datumDo: '',
        opis: ''
    });

    const dodajIspis = (form) => {
        setIspisPodataka  ([...ispisPodataka, form]);
    }

    useEffect(() => {
        fetch("data/regions.json")
          .then((response) => {
            if (!response.ok) {
              throw Error("Nešto nije u redu.");
            } else {
              return response.json();
            }
          })
          .then((data) => {
            setRegions(data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);


      useEffect(() => {
        fetch("data/cities.json")
          .then((response) => {
            if (!response.ok) {
              throw Error("Nešto nije u redu.");
            } else {
              return response.json();
            }
          })
          .then((data) => {
            setCities(data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);

      const handleSubmit =(event) => {
            event.preventDefault();

        if(formResult.imePrezime != "" && formResult.oblastGrada != "" && formResult.grad != "" && formResult.datumOd != "" && formResult.datumDo != "" && formResult.opis != ""){
            dodajIspis(formResult);
            setFormResult({ imePrezime: '', oblastGrada: '', grad: '', datumOd: '', datumDo: '', opis: '' });
            setErrorMess('Uspesno ste popunili formu');
        }else{
          setErrorMess('Morate popuniti sva pola!');
        }
      }

      // useEffect(() => {
      //     const saveLocal = JSON.parse(localStorage.getItem('data-ad'));
      //     saveLocal && setIspisPodataka(saveLocal);
      // }, [])

      useEffect(() => {
          localStorage.setItem('data-ad', JSON.stringify(ispisPodataka));
      }, [ispisPodataka]);
    
  return (
    <div className='containerForm'>
        <div className='form'>
            <div className='paragraph'>
                <p>Unesite potrebne podatke</p>
            </div>
            
            <form onSubmit={handleSubmit}>

              {errorMess.length ? <p>{errorMess}</p> : null}
              
                <div className='form-input'>
                    <label className='lable'>Ime i prezime:</label>
                    <input className='inputs'  value={formResult.imePrezime} name="imePrezime" onChange={(e) => {setFormResult({...formResult, [e.target.name]: e.target.value})}}></input>
                </div>
                
                <div className='form-input'>
                    <label className='lable'>Region:</label>
                    <select name="oblastGrada"  className='inputs' onChange={(e) => {setFormResult({...formResult, [e.target.name]: e.target.value})}}>
                        <option>Selektuj region</option>
                        {regions && regions?.map((data, index) =>{
                            return(
                                <option key={index} value={data.region}>{data.value}</option>
                            )
                        })}
                    </select>
                </div>

                <div className='form-input'> 
                    <label className='lable'>Grad:</label>
                    <select className='inputs'  name='grad' onChange={(e) => {setFormResult({...formResult, [e.target.name]: e.target.value})}}>
                        <option>Selektuj grad</option>
                        {cities && cities.filter((element) => parseInt(formResult?.oblastGrada) === element.region)?.map((city, index) =>
                            <option key={index} value={city.id}>{city.value}</option>
                        )}
                    </select>
                </div>

                <div className='form-input'>
                    <label className='lable'>Datum od:</label>
                    <input className='inputs' type="date"  value={formResult.datumOd} name="datumOd" onChange={(e) => {setFormResult({...formResult, [e.target.name]: e.target.value})}}></input>
                </div>

                <div className='form-input'>
                    <label className='lable'>Datum do:</label>
                    <input className='inputs' type="date"  value={formResult.datumDo} name="datumDo" onChange={(e) => {setFormResult({...formResult, [e.target.name]: e.target.value})}}></input>
                </div>
            
                <div className='form-input'>
                    <label className='lable'>Opis:</label>
                    <textarea className='inputs'  value={formResult.opis} name="opis" onChange={(e) => {setFormResult({...formResult, [e.target.name]: e.target.value})}}></textarea>
                </div>

                <div className='form-input'>
                    <button className='btn' type='submit'>Prijavi se</button>
                </div>
            </form>
        </div>
        <FormTable ispisPodataka={ispisPodataka}/>
    </div>
  )
}

export default CreateForm