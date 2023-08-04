import React,{useState} from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import './criar.css'
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { Steps , Result,Select } from 'antd';
import {
    PayCircleOutlined,
    ProfileOutlined,
    CameraOutlined,
    RightCircleOutlined,
    LeftCircleOutlined,
    UserOutlined,
    CheckOutlined,
    CloudDownloadOutlined ,
    KeyOutlined,
    MailOutlined,
    PhoneOutlined,
    IdcardOutlined,PhoneTwoTone,
    ArrowLeftOutlined,
    HomeOutlined
    
  } from '@ant-design/icons';

 
function Create() {
    const [form] = Form.useForm();
    const [phase1,setPhase1]=useState('sd');
    const [phase2,setPhase2]=useState(null);
    const [phase3,setPhase3]=useState(null);
    const [phase4,setPhase4]=useState(null);
    const [nome,setNome]=useState(null)
    const history = useHistory();
    const [pass,setPass]=useState(null)
    const [details, setDetails] = useState({ nome: "", nome_empresa: "Marcosjhgd",provincia:"",cidade:"sd" ,nuit:"",endereco:"",vocacao:"",cell:"",mail:"",password:""})
  const [requiredMark, setRequiredMarkType] = useState('optional');
  const onRequiredTypeChange = ({ requiredMarkValue }: { requiredMarkValue: RequiredMark }) => {
    setRequiredMarkType(requiredMarkValue);
  };

const handleClick=()=>{

}
  const Registarempresa=()=>{
   
    axios({
        method:"post",
        url:`http://127.0.0.1:8000/web/Registar_usuario/`,
        headers:{'Authorization':`token ${localStorage.getItem('token')}`,'Content-Type':'application/json' },
        data:details
    }).then(dat=>{ if(dat.status!==200){
        throw Error('Dados de acesso invalidos');  
            }
        return dat
     } ).then( d=>{
       message.success("Registrado com sucesso!  As credencias foram encaminhadas para o seu Email")
       setPhase3(null)
       setPhase4('df')
       setNome(d.data.username)
       setStep(2)
       setPass(d.data.password)
       history.push("/")
     }
   
       ).catch(e=>{
        message.error("Registrado sem sucesso!")
    })

}
const handleChange = (value: string) => {
  setDetails({ ...details, provincia: value });
};
const handleChange2 = (value: string) => {
  setDetails({ ...details, cidade: value });
};


    const onFinish = (values: any) => {
        console.log('Success:', values);
      };
      
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };
      const { Step } = Steps;
      const [step,setStep]=useState(0)

   
  return (
    <div className='homeclass'>
   
     

 { phase1
 &&
 <>
 <div className='dados_s'>
    <div className='a'>
      
      <label>Nome</label>
      <Input onChange={e => setDetails({ ...details, nome: e.target.value })} value={details.nome}  className='inputs_s'  style={{width:'80%'}}  size="large"  prefix={<UserOutlined  />} />
      <label>Endereco</label>
      <Input  onChange={e => setDetails({ ...details,endereco: e.target.value })} value={details.endereco}  className='inputs_s'  style={{width:'80%'}}  size="large"  prefix={<HomeOutlined />} />
   
     
      <label>E-mail</label>
      <Input onChange={e => setDetails({ ...details, mail: e.target.value })} value={details.mail}  className='inputs_s'  style={{width:'80%'}}  size="large"  prefix={<MailOutlined />} />
     
      <label>Senha</label>
      <Input.Password onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password}  className='inputs_s'  style={{width:'80%'}}  size="large"  prefix={<KeyOutlined />} />
     
    </div>
    <div className='ab'>
    <Button size='large' type="link" onClick={()=>{history.push('/')}}>
    <ArrowLeftOutlined/> Voltar para Home
    </Button>
      
    <Button size='large' style={{backgroundColor:'#61A572'}} className='button' onClick={Registarempresa}  >Submeter</Button>
      </div>
      <div className='aba'>
  

        </div>
    
 
    
    </div>
 </>
 }
 



 





 








      
 

    </div>
  )
}

export default Create