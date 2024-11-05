import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { useCreateQueryMutation } from '../../slices/queryApiSlice';

const QueryCreateModal = ({ show, handleClose }) => {
    const [type, setType] = useState('');
    const [query, setQuery] = useState('');
    const [queryResult, setQueryResult] = useState(null);

    const [createQuery, { isLoading }] = useCreateQueryMutation();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
          const res = await createQuery({ type, query }).unwrap();
          toast.success(res?.message);
          if (res.data.result && res.data.result.length > 0) {
            setQueryResult(res.data.result)
          } else {
            onClose();
          }
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      };

      const onClose = () => {
        setType("")
        setQuery("")
        setQueryResult(null)
        handleClose();
      }

      const prettyPrint = () => {
        const obj = JSON.parse(queryResult);
        const pretty = JSON.stringify(obj, undefined, 4);
        return pretty;
    }

  return (
    <Modal show={show} onHide={onClose} backdrop="static">
    <Form onSubmit={submitHandler}>
      <Modal.Header closeButton>
        <Modal.Title as={'h5'}>Execute Query</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <Form.Group className="mb-3" controlId="type">
            <Form.Select required onChange={(e) => setType(e.target.value)} value={type}>
              <option value="">Choose query type</option>
              <option value="select">SELECT</option>
              <option value="insert">INSERT</option>
              <option value="update">UPDATE</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="query">
            <Form.Control as="textarea" rows={5} placeholder='Enter your query...' required value={query} onChange={(e) => setQuery(e.target.value)}/>
          </Form.Group>

          { queryResult && 
          <>
          <Form.Label>Result:</Form.Label>
            <Form.Group className="mb-3" controlId="queryResult" id="myTextArea">
            <Form.Control as="textarea" rows={10} cols={50} disabled value={JSON.stringify(queryResult, undefined, 4)} />
            </Form.Group>
            </>
          }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" size="sm" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" size="sm" type='submit' disabled={isLoading || queryResult}>
          Create Query
        </Button>
      </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default QueryCreateModal;
