import React, { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [walls, setWalls] = useState([{}, {}, {}, {}])
  const [calculated, setCalculated] = useState(false)
  const [result, setResult] = useState({ totalAreaToPaint: 0, requiredPaintCans: {}})

  useEffect(() => {
    const newWalls = walls.map(wall => {
      return {
        height: 0,
        width: 0,
        doors: 0,
        windows: 0
      }
    })

    setWalls(newWalls)
    
  }, [])

  const handleInput = (evt, index) => {
    const name = evt.target.name
    const value = evt.target.value

    const newWalls = walls.map((wall, i) => {
      if(i === index){
        wall[name] = parseFloat(value)
      }

      return wall
    })

    setWalls(newWalls)
  }

  const changeInput = (evt, index) => {
    const name = evt.target.name
    const value = evt.target.value

    const newWalls = walls.map((wall, i) => {
      if(i === index){
        wall[name] = value
      }

      return wall
    })

    setWalls(newWalls)
  }

  const handleForm = (evt) => {
    evt.preventDefault()
    

    try{
      axios.post('http://localhost:3001/calc', {walls})
      .then(data => {
        setResult(data.data)
        setCalculated(!calculated)
      })
      .catch(data => {
        alert('Não foi possível calcular com os dados fornecidos')
      })
    }catch(err){
      alert('Não foi possível calcular com os dados fornecidos')
    }
  }


  return (
    <div className='container-xl'>
      <div className='row'>
        <div className='col text-center'>
          <h1>Calculadora de tinta</h1>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <form onSubmit={handleForm}>
            {
              !calculated && walls.map((wall, index) => (
                <div key={index} className='border rounded p-2 mb-3'>
                  <h4 className='mt-4'>Dados da parede { index + 1 }</h4>
                  <div className='row'>
                    <div className='col'>
                      <div className='form-group'>
                        <label>Altura</label>
                        <input type='text' className='form-control' required name='height' onChange={(evt) => changeInput(evt, index)} onBlur={(evt) => handleInput(evt, index)} value={wall.height || 0} />
                      </div>
                    </div>
                    <div className='col'>
                      <div className='form-group'>
                        <label>Largura</label>
                        <input type='text' className='form-control' required name='width' onChange={(evt) => changeInput(evt, index)} onBlur={(evt) => handleInput(evt, index)} value={wall.width || 0} />
                      </div>
                    </div>
                    <div className='col'>
                      <div className='form-group'>
                        <label>Janelas</label>
                        <input type='text' className='form-control' required name='windows' onChange={(evt) => changeInput(evt, index)} onBlur={(evt) => handleInput(evt, index)} value={wall.windows || 0} />
                      </div>
                    </div>
                    <div className='col'>
                      <div className='form-group'>
                        <label>Portas</label>
                        <input type='text' className='form-control' required name='doors' onChange={(evt) => changeInput(evt, index)} onBlur={(evt) => handleInput(evt, index)} value={wall.doors || 0} />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
            {
              !calculated && (<div className="row">
                                <div className="col text-center">
                                  <button type="submit" className="btn btn-success">Calcular</button>
                                </div>
                              </div>)
            }
            {
              calculated && result && (
                <div className="row">
                  <div className="col">
                    <p>Para pintar {result.totalAreaToPaint} metros quadrados você precisa de:</p>
                    {
                      Object.keys(result.requiredPaintCans).map(key => {
                        return (
                          <li key={key}>Lata de { key } = { result.requiredPaintCans[key] } unidade(s)</li>
                        )
                      })
                    }
                  </div>
                </div>
              )
            }
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
