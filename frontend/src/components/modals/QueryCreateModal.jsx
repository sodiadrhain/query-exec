import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const QueryCreateModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title as={'h5'}>Execute a Query</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Select aria-label="Default select example">
              <option>Choose a query type</option>
              <option value="select">SELECT</option>
              <option value="insert">INSERT</option>
              <option value="update">UPDATE</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="query">
            <Form.Control as="textarea" rows={10} placeholder='Enter your query...'/>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" size="sm" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" size="sm" onClick={handleClose}>
          Create Query
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default QueryCreateModal;
