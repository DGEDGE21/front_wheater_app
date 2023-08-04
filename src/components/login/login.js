import React,{useState} from 'react'
import { Input, Space,Card,Button, Checkbox, message,Form} from 'antd';
import { useHistory } from "react-router-dom";
import { UserOutlined,KeyOutlined } from '@ant-design/icons';
import './login.css'
function Login() {
    const { Search } = Input;
    const [details, setDetails] = useState({ username: "", password: "" });
    const [error, setError] = useState(null);
    const [messageApi, contextHolder] = message.useMessage();

    const history = useHistory();
    const onSearch = (value: string) => console.log(value);
    const handleClick = () => {
      fetch(`${localStorage.getItem("url")}/web/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(details),
      })
        .then((data) => {
          if (!data.ok) {
            throw Error("Dados de acesso invalidos");
          }
          return data.json();
        })
        .then((data) => {
          localStorage.setItem("token", data.token);
         localStorage.setItem("user","autenticado") 
          message.success(`Bem vindo(a) ${details.username}`)
          
          console.log(data)
        history.push('/')
         }
        )
        .catch((e) => {
          setError(e.message);
          message.error('Credenciais invalidas! verifique o nome ou palavra passe')

        });
    };
  
  return (
    <div className='homeclass'>
        {localStorage.setItem("url", "http://127.0.0.1:8000")}
 

    <div className='Login_class'>

    <div className='dados'>
    <div className='a'>
      
    <label >Nome de usuário ou endereço do email</label>
      <Input  onChange={e => setDetails({ ...details, username: e.target.value })} value={details.username} className='inputs_s' style={{width:'80%'}} size="large"  prefix={<UserOutlined />} />
      <label>Senha</label>
      <Input.Password  onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password}  className='inputs_s'  style={{width:'80%'}}  size="large"  prefix={<KeyOutlined />} />
     

    </div>
    <div className='ab'>
      
    <Button size='large' className='bnw' onClick={()=>{handleClick()}}  >Acessar</Button>
      </div>
      <div className='aba'>
  

        </div>
    
 
    
    </div>
   



    </div>
        
    
 

    </div>
  )
}

export default Login