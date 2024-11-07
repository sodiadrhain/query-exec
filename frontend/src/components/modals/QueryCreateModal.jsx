import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { useCreateQueryMutation, useGetQueriesMutation } from '../../slices/queryApiSlice';
import { setQueryData } from '../../slices/authenticatedSlice';
import { useDispatch } from 'react-redux';

const QueryCreateModal = ({ show, handleClose }) => {
    const [type, setType] = useState('');
    const [query, setQuery] = useState('');
    const [queryResult, setQueryResult] = useState(null);

    const [createQuery, { isLoading }] = useCreateQueryMutation();
    const [fetchAllQueries] = useGetQueriesMutation();
    const dispatch = useDispatch();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
          const res = await createQuery({ type, query }).unwrap();
          fetchQueries();
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

      const fetchQueries = async () => {
        try {
            const res = await fetchAllQueries().unwrap();
            dispatch(setQueryData({ ...res }));
          } catch (err) {
            console.log("Failed to fetch query data")
          }
      }

      const onClose = () => {
        setType("")
        setQuery("")
        setQueryResult(null)
        handleClose();
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
