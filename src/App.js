import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Toast from 'react-bootstrap/Toast'

import { FaCloudRain } from 'react-icons/fa'
import Button from 'react-bootstrap/Button'



function App() {
  const [cidade, setCidade] = useState('')
  const [clima, setClima] = useState(null)
  const [erroClima, setErroClima] = useState(null)

  async function obterClima(ciadde) {
    const apiWeather = process.env.REACT_APP_APIWEATHER
    let urlClima = `http://api.openweathermap.org/data/2.5/weather?q=${cidade}&lang=pt&units=metric&appid=${apiWeather}`
    await fetch(urlClima)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        data.cod === '404' ? setErroClima('Cidade não encontrada!') : setClima(data) //Operador ternário
        
      })
      .catch(function (error) {
        console.error(`Erro ao obter o clima da cidade: ${error.message}`)
      })
  }

  return (
    <> {/* React Fragment */}

      <Navbar bg="success" variant="dark">
        <Navbar.Brand href="#inicio">FateClima</Navbar.Brand>
        <Nav className="mr-auto">{/* mr deixa a esquerda ml deixa a direira */}
          <Nav.Link href="#inicio">Início</Nav.Link>
          <Nav.Link href="#contato">Contato</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text"
            onChange={event => setCidade(event.target.value)}
            placeholder="Digite a cidade..." />&nbsp; {/* &copy = copyright/ &nbsp = um espaço */}
          <Button variant="danger" onClick={() => obterClima(cidade)}><FaCloudRain />Obter clima</Button>
        </Form>
      </Navbar>

      {erroClima &&
        <Toast onClose={() => setErroClima(null)} delay={4000} autohide className="bg-danger">
          <Toast.Header>
            <strong classname="mr-auto">{erroClima}</strong>
            <small>😞</small>
          </Toast.Header>
          <Toast.Body className="bg-white text-danger">
            Por favor, faça uma nova busca.
          </Toast.Body>
        </Toast>
      }
      <Jumbotron>
        <h1><FaCloudRain />FateClima </h1>
        <p>Consulte o clima de qualquer cidade do mundo. <br></br>
          App desenvolvido em ReactJS e integrado com as API's Opencagedata e OpenWeatherMap
        </p>
      </Jumbotron>
      {clima &&
      <p>cidade: {clima.name} - Temperatura: {clima.main.temp} </p>
      }
    </>
  )

}

export default App