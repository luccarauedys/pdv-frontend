import styled from "styled-components";
import { Oval } from "react-loader-spinner";

export function Loading() {
  return (
    <Container>
      <Oval
        height={80}
        width={80}
        color="#2127c6"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#2127c6"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  place-items: center;
  margin-top: 3rem;
`;
