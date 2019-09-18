import styled from "styled-components";

const LoginCardTitleS = styled.div`
  font-size: 20pt;
  padding-top: 4%;
  padding-bottom: 4%;
  color: white;
  font-weight: 500;
`;

const UserFormSD = styled.div`
  width: 20vw;
  background-color: rgba(102, 102, 102, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  padding-top: 6%;
`;

const LoginCardS = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export { UserFormSD, LoginCardTitleS, LoginCardS };
