/* eslint-disable react/prop-types */
import Form from "react-bootstrap/Form"
import Modal from "react-bootstrap/Modal"

const QueryRunModal = ({ show, handleClose, queryResult }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title as={"h5"}>Query Result</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="queryResult" id="queryResult">
          <Form.Control
            as="textarea"
            rows={30}
            cols={50}
            disabled
            value={JSON.stringify(queryResult, undefined, 4)}
          />
        </Form.Group>
      </Modal.Body>
    </Modal>
  )
}

export default QueryRunModal
