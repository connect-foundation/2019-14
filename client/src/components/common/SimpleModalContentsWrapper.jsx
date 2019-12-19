import styled from "styled-components";

const SimpleModalContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  input:focus {
    outline: none;
  }
  * {
    color: black;
    margin: 0.3rem;
    font-size: 1rem;
  }
  input[type="button"] {
    border: 1px solid rgba(0, 0, 0, 0.3);
    &:hover {
      background: rgba(0, 0, 0, 0.4);
    }
  }
  text-align: center;
  color: black;
`;

export default SimpleModalContentsWrapper;
