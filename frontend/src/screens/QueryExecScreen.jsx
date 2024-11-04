import { useState } from 'react';
import { Table, Button, Row, Col, Tab, Tabs, Stack, Container } from 'react-bootstrap';
import QueryCreateModal from '../components/modals/QueryCreateModal';

const QueryExecScreen = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <Container>
        <Row className='mt-2'>
          <Col className='p-5'>
            <Stack direction="horizontal" gap={3} className='pb-3'>
              <div className='pb-2'>
                <h5>Query List</h5>
              </div>
              <div className="ms-auto">
                <Button
                  type='button'
                  variant='primary'
                  size="sm"
                  onClick={handleShow}
                >
                  New Query
                </Button>
              </div>
            </Stack>
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
              <Tab eventKey="home" title="All queries">
                <Table striped bordered>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Type</th>
                      <th>Query</th>
                      <th>Created by</th>
                      <th>###</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>Otto</td>
                      <td>
                        <Button type='button' variant='primary' size="sm">Approve</Button>
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>Otto</td>
                      <td>@fat</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Otto</td>
                      <td>Otto</td>
                      <td>Otto</td>
                      <td>@twitter</td>
                    </tr>
                  </tbody>
                </Table>
              </Tab>
              <Tab eventKey="profile" title="Awaiting approval">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Type</th>
                      <th>Query</th>
                      <th>Created by</th>
                      <th>###</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>Otto</td>
                      <td>
                        <Button type='button' variant='primary' size="sm">Approve</Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Tab>
              <Tab eventKey="contact" title="Approved">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Type</th>
                      <th>Query</th>
                      <th>Created by</th>
                      <th>###</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>2</td>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>Otto</td>
                      <td>@fat</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Otto</td>
                      <td>Otto</td>
                      <td>Otto</td>
                      <td>@twitter</td>
                    </tr>
                  </tbody>
                </Table>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
      
      <QueryCreateModal show={show} handleClose={handleClose} />
    </>
  );
};

export default QueryExecScreen;
