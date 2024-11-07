import { Container, Card } from "react-bootstrap"
import LoginScreen from "../screens/LoginScreen"

const HomeScreen = () => {
  return (
    <div className="py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          <h3 className="text-center mb-4">Query Exec</h3>
          <LoginScreen />
        </Card>
      </Container>
    </div>
  )
}
export default HomeScreen
