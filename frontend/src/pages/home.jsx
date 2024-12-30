import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'

function Home () {
  const navigate = useNavigate()

  return (
    <>
      <h1>Bienvenido</h1>
      <Form>
        <Form.Group controlId='formBasicRol'>
          <Button variant='primary' type='button' onClick={() => navigate('/filters')}>
            Filtros
          </Button>
        </Form.Group>
      </Form>
    </>
  )
}

export default Home
