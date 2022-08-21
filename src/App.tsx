import "./App.css";
import { Container, CssBaseline, styled } from "@mui/material";
import User from "./pages/users/Users";

const StyledContainer = styled(Container)`
    padding-left: 100px;
    padding-right: 100px;
    width: 100%;
`;

function App() {
    return (
        <div className="App">
            <StyledContainer maxWidth="lg">
                <User />
            </StyledContainer>
            <CssBaseline />
        </div>
    );
}

export default App;