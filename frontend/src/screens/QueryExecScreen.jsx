import { useState, useEffect } from 'react';
import { Table, Button, Row, Col, Tab, Tabs, Stack, Container, Pagination } from 'react-bootstrap';
import QueryCreateModal from '../components/modals/QueryCreateModal';
import { useGetQueriesMutation, useRunQueryMutation, useApproveQueryMutation } from '../slices/queryApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setQueryData } from '../slices/authenticatedSlice';
import QueryRunModal from '../components/modals/QueryRunModal';
import { toast } from 'react-toastify';

const QueryExecScreen = () => {
  const [show, setShow] = useState(false);
  const [allQueriesAwaitingApproval, setAllQueriesAwaitingApproval] = useState([]);
  const [activeTab, setActiveTab] = useState('all-queries');
  const { queryData, userInfo } = useSelector((state) => state.auth);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [fetchAllQueries, { isLoading: isLoadingAllQueries }] = useGetQueriesMutation();
  const dispatch = useDispatch();

  const loadAllQueries = async (page = 1) => {
    try {
      const queries = await fetchAllQueries({ page }).unwrap();
      dispatch(setQueryData({ ...queries }));
    } catch (error) {
      console.error('Failed to load queries:', error);
    }
  };

  const handleTabSelect = (key) => {
    setActiveTab(key);
    if (key === 'awaiting-approval') {
      fetchAllQueriesAwaitingApproval();
    } else {
      loadAllQueries();
    }
  };

  const fetchAllQueriesAwaitingApproval = async () => {
    try {
      const queries = await fetchAllQueries({ isApproved: false }).unwrap();
      setAllQueriesAwaitingApproval(queries.data.data);
    } catch (error) {
      console.error('Failed to load queries:', error);
    }
  };

  const [runAQuery,  { isLoading: isRunningQuery }] = useRunQueryMutation();
  const [runQueryResult, setRunQueryResult] = useState(null);
  const [showRunModal, setRunModal] = useState(false);
  const handleShowRunModal = () => setRunModal(true);
  const handleCloseRunModal = () => setRunModal(false);

  const runQuery = async (query) => {
    try {
      const result = await runAQuery(query).unwrap();
      setRunQueryResult(result.data.result);
      handleShowRunModal();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to run query");
    }
  };

  const [approveAQuery,  { isLoading: isApprovingQuery }] = useApproveQueryMutation();
  const approveQuery = async (query) => {
    try {
      await approveAQuery(query).unwrap();
      fetchAllQueriesAwaitingApproval();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to approve query");
    }
  };

  // Generate pagination items based on total pages
  const items = [];
  for (let number = 1; number <= queryData.meta.pages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === queryData.meta.current}
        onClick={() => loadAllQueries(number)}
        disabled={queryData.meta.pages === 1}
      >
        {number}
      </Pagination.Item>
    );
  };

  useEffect(() => {
    loadAllQueries();
  }, [fetchAllQueries]);

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
            <Tabs activeKey={activeTab} onSelect={handleTabSelect} className="mb-3">
              {/* All Queries Tab */}
              <Tab eventKey="all-queries" title="All Queries">
                <Table striped bordered>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Type</th>
                      <th>Query</th>
                      <th>Created At</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoadingAllQueries ? (
                      <tr>
                        <td colSpan="4" className="text-center">Loading...</td>
                      </tr>
                    ) : (
                      queryData.data.map((query, index) => (
                        <tr key={query._id}>
                          <td>{index + 1}</td>
                          <td>{query.type}</td>
                          <td>{query.query}</td>
                          <td>{new Date(query.createdAt).toLocaleString()}</td>
                          <td>
                            {query.isApproved && (
                              <Button
                                type='button'
                                variant='primary'
                                size="sm"
                                onClick={() => runQuery(query)}
                                disabled={isRunningQuery}
                              >
                                Run
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
                {queryData.data.length > 0 && (
                  <Stack direction="horizontal" gap={3} className='pb-3'>
                    <div className='pb-2'>
                      <h6>Pages:</h6>
                    </div>
                    <div className="ms-auto">
                      <Pagination>{items}</Pagination>
                    </div>
                  </Stack>
                )}
              </Tab>

              {/* Awaiting Approval Tab */}
              <Tab eventKey="awaiting-approval" title="Awaiting Approval">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Type</th>
                      <th>Query</th>
                      <th>Created At</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoadingAllQueries ? (
                      <tr>
                        <td colSpan="4" className="text-center">Loading...</td>
                      </tr>
                    ) : (
                      allQueriesAwaitingApproval.map((query, index) => (
                        <tr key={query._id}>
                          <td>{index + 1}</td>
                          <td>{query.type}</td>
                          <td>{query.query}</td>
                          <td>{new Date(query.createdAt).toLocaleString()}</td>
                          <td>
                            {userInfo.permissions.includes(`APPROVE_${query.type.toUpperCase()}`) && (
                              <Button
                                type='button'
                                variant='primary'
                                size="sm"
                                onClick={() => approveQuery(query)}
                                disabled={isApprovingQuery}
                              >
                                Approve
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
      
      <QueryCreateModal show={show} handleClose={handleClose} />
      <QueryRunModal show={showRunModal} handleClose={handleCloseRunModal} queryResult={runQueryResult} />
    </>
  );
};

export default QueryExecScreen;
