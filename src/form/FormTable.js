import React from 'react'

function FormTable({ ispisPodataka }) {

    return (
    <div className='containerForm'>
        <table className="table">
            <thead>
                <tr>
                    <th>Ime i prezime</th>
                    <th>Region</th>
                    <th>Grad</th>
                    <th>Datum od</th>
                    <th>Datum do</th>
                    <th>Opis</th>
                </tr>
            </thead>
            <tbody>
                {ispisPodataka.length ? ispisPodataka.map((data, index) => {
                    return(
                        <tr key={index}>
                            <td>{data.imePrezime}</td>
                            <td>{data.oblastGrada}</td>
                            <td>{data.grad}</td>
                            <td>{data.datumOd}</td>
                            <td>{data.datumDo}</td>
                            <td>{data.opis}</td>
                        </tr>
                    )
                }) : <tr>Nema rezutata</tr>}
            </tbody>
        </table>
    </div>
  )
}

export default FormTable