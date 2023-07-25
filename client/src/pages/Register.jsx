import React, {useState} from 'react'
import { Box, Typography, TextField, Button } from "@mui/material"
import {useNavigate} from 'react-router-dom'
import axios from "axios"

const Register = () => {

  const navigate = useNavigate();

 //state
 const [inputs, setInputs] = useState({
  name: "",
  email: "",
  password: "",
});

//handle input change
const handleChange = (e) => {
  setInputs((prevState) => ({
    ...prevState,
    [e.target.name]: e.target.value,
  }));
};

//form handle
const handleSubmit = async(e)=>{
   e.preventDefault();
  try {
    const {data} =await axios.post('/api/v1/user/register', {
      username:inputs.name,
      email:inputs.email,
      password:inputs.password,
    });
    if(data.success){
      alert("User Register Successfully");
      navigate("/login");
    }

  } catch (error) {
    console.log(error);
  }
}

  return (
    <>
    <form onSubmit={handleSubmit}>
      <Box maxWidth={400}
        display="flex"
        flexDirection={"column"}
        alignItems="center"
        justifyContent={"center"}
        margin="auto"
        marginTop={5}
        boxShadow="10px 10px 20px #ccc"
        borderRadius={5}>

        <Typography variant='h4' sx={{ textTransform: 'uppercase' }} padding={3} textAlign="center">Register</Typography>

        <TextField value={inputs.name} onChange={handleChange} placeholder='name' name='name' margin='normal' type={"text"} required />
        <TextField value={inputs.email} onChange={handleChange} placeholder='email' name='email' margin='normal' type={"email"} required />
        <TextField value={inputs.password} onChange={handleChange} placeholder='password' name='password' margin='normal' type={"password"} required />

        <Button 
        type='submit'
        sx={{marginTop:2 , borderRadius:2}}
         variant='contained' 
         color='primary'>
          Submit</Button>
        <Button
        onClick={()=>navigate('/login')}
         type='submit'
         sx={{marginTop:2 , borderRadius:2}}
          color='primary'>Already Registerd ? Please Login</Button>
      </Box>
      </form>
    </>
  )
}

export default Register