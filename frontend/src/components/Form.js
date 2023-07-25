import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
   const ref = useRef();

   useEffect(() => {
      if (onEdit) {
         const user = ref.current;

         user.tar_resp.value = onEdit.tar_resp;
         user.tar_tarefa.value = onEdit.tar_tarefa;
         user.tar_datafinal.value = onEdit.tar_datafinal;
      }
   }, [onEdit]);

   const handleSubmit = async (e) => {
      e.preventDefault();

      const user = ref.current;

      if (
         !user.tar_resp.value ||
         !user.tar_tarefa.value ||
         !user.tar_datafinal.value
      ) {
         return toast.warn("Preencha todos os campos!");
      }

      if (onEdit) {
         await axios
            .put("http://localhost:8800/" + onEdit.tar_id, {
               tar_resp: user.tar_resp.value,
               tar_tarefa: user.tar_tarefa.value,
               tar_datafinal: user.tar_datafinal.value,
            })
            .then(({ data }) => toast.success(data))
            .catch(({ data }) => toast.error(data));
      } else {
         await axios
            .post("http://localhost:8800", {
               tar_resp: user.tar_resp.value,
               tar_tarefa: user.tar_tarefa.value,
               tar_datafinal: user.tar_datafinal.value,
            })
            .then(({ data }) => toast.success(data))
            .catch(({ data }) => toast.error(data));
      }

      user.tar_resp.value = "";
      user.tar_tarefa.value = "";
      user.tar_datafinal.value = "";

      setOnEdit(null);
      getUsers();
   };

   return (
      <FormContainer ref={ref} onSubmit={handleSubmit}>
         <InputArea>
            <Label>Responsavel</Label>
            <Input name="tar_resp" />
         </InputArea>
         <InputArea>
            <Label>Tarefa</Label>
            <Input name="tar_tarefa" />
         </InputArea>
         <InputArea>
            <Label>Data final</Label>
            <Input name="tar_datafinal" type="date" />
         </InputArea>

         <Button type="submit">SALVAR</Button>
      </FormContainer>
   );
};

export default Form;