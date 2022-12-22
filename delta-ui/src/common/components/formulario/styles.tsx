import TextField from "@mui/material/TextField";
import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;

export const ContentFileInput = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;
export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;
export const InputImage = styled.input`
  display: none;
`;
export const InputSubmit = styled.input`
  padding: 10px;
  border-radius: 6px;
  background: ${(props: { invalid: boolean }) =>
    props.invalid ? "silver" : "green"};
  color: ${(props: { invalid: boolean }) => (props.invalid ? "grey" : "white")};
  cursor: pointer;
`;
export const Image = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;
export const SpanErrors = styled.span`
  color: #da2f2f;
`;
export const MyTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#1976d2",
  },
  "& input": {
    color: "white",
  },
});
