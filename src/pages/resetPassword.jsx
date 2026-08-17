import { useState } from 'react';

function ResetPassword({ onVolver, onGuardar }) {
  const [codigo, setCodigo] = useState('');
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrorMsg('');

    if (nuevaContrasena !== confirmarContrasena) {
      setErrorMsg('Las contraseñas no coinciden.');
      return;
    }

    console.log({
      codigo,
      nuevaContrasena,
    });

    if (onGuardar) {
      onGuardar({
   