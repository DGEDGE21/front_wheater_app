import React, { useEffect, useState } from 'react'
import { Exchange_API_KEY,Exchange_URL} from "../../api";
import axios from 'axios';
import { ArrowDownOutlined,FieldTimeOutlined,MoneyCollectOutlined,UsergroupAddOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic,message, } from 'antd';
import './echange.css'

const Exchange= ({ data }) => {
    const [rates,setRates]=useState(null);
    const [isLocalhost, setIsLocalhost] = useState(false);
    axios({
      method:"post",
      url:`${localStorage.getItem('url')}/web/exchange_rates_population_gpd/`,
      headers:{'Authorization':`token ${localStorage.getItem('token')}`,'Content-Type':'application/json' },
      data:data
  }).then(dat=>{ if(dat.status!==200){
      throw Error('Dados de acesso invalidos');  
          }
      return dat
   } ).then( d=>{
      
      setRates(d.data)
      setIsLocalhost( localStorage.getItem('user') === 'autenticado');

   }
 
     ).catch(e=>{
      message.error("Sem sucesso")
    
  })

  
  return (
     <div>
        {rates &&
         <div className={isLocalhost ? 'blurs' : 'blur'}>
        <h2>Exchange Rates</h2>
          <Row gutter={16}>
    <Col span={12}>
      <Card bordered={false}>
        <Statistic
          title={`base currency: ${rates.base}`}
          value={`${rates.rates}`}
          precision={2}
          valueStyle={{ color: '#3f8600' }}
          prefix={<MoneyCollectOutlined />}
        
        />
      </Card>
    </Col>
    <Col span={12}>
      <Card bordered={false}>
        <Statistic
          title="Date"
          value={`${rates.date}`}
          precision={2}
          valueStyle={{ color: '#cf1322' }}
          prefix={<FieldTimeOutlined />}
         
        />
      </Card>
    </Col>
  </Row>
  <h2>Population and GDP</h2>
  <Row gutter={16}>
    <Col span={12}>
      <Card bordered={false}>
        <Statistic
          title={`Population`}
          value={`${rates.population}`}
          precision={2}
          valueStyle={{ color: '#3f8600' }}
          prefix={<UsergroupAddOutlined />}
        
        />
      </Card>
    </Col>
    <Col span={12}>
      <Card bordered={false}>
        <Statistic
          title="GDP"
          value={`${rates.gpd}`}
          precision={2}
          valueStyle={{ color: '#3f8600' }}
        
         
        />
      </Card>
    </Col>
  </Row>

        </div>}
    
     </div>
      
    );
  };
  
  export default Exchange;
  