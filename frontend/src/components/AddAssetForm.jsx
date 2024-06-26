
import React, { useEffect, useRef, useState } from 'react'
import { useCrypto } from '../context/crypto-context.jsx'
import { Select, Space, Typography, Flex, Divider, Form, Input, Button, InputNumber, DatePicker , Result} from 'antd'
import CoinInfo from './CoinInfo.jsx'

const validateMessages = {
  required: "${label} is required!",
  types:{
		number: "${label} is not valid number!"
  },
	number: {
		range: "${label} must be between ${min} and ${max}"
	}
};
const AddAssetForm = ({ onClose }) => {
	const [coin, setCoin] = useState(null)
	const {crypto, addAsset} = useCrypto()
	const [form] = Form.useForm();
	const [submitted, setSubmitted] = useState(false)
	const assetRef = useRef()
	
	if (submitted) {
		return (
			<Result
    status="success"
    title="New Aseet added!"
    subTitle={`Added ${assetRef.current.amount} of ${coin.symbol} by price ${assetRef.current.price}`}
    extra={[
      <Button type="primary" key="console" onClick={onClose}>
        Close
      </Button>
    ]}
  />
		)
	}
	
	if (!coin) {
		return (
		<Select
			style={{
				width: '100%'
			}}
				onSelect={(v) => setCoin(crypto.find((c)=> c.id === v))}
        placeholder="Select coin"
        options={crypto.map((coin) => ({
	        label: coin.name,
	        value: coin.id,
	        icon: coin.icon
        }))}
        optionRender={(option) => (
          <Space>
            <img style = {{width:20}} src={option.data.icon} alt={option.data.label}/> {option.data.label}
					</Space>
        )}
      />
		)
	}
	
	const onFinish = values => {
		console.log('finish', values)
		const newAsset = {
			id: coin.id,
			amount: values.amount,
			price: values.price,
			date: values.date?.$d ?? new Date()
		}
		
		assetRef.current = newAsset
		setSubmitted(true)
		addAsset(newAsset)
	}
	
	const handleAmountChange = value => {
		const price = form.getFieldValue('price')
		form.setFieldsValue({
			total: +(value * price).toFixed(2)
		})
	}
	
	const handlePriceChange = value => {
		const amount = form.getFieldValue('amount')
		form.setFieldsValue({
			total: +(value * amount).toFixed(2)
		})
	}
	
	return (
		
		<Form
    form={form}
    labelCol={{
      span: 4,
    }}
    wrapperCol={{
      span: 10,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      price: +coin.price.toFixed(2),
    }}
    onFinish={onFinish}
    validateMessages={validateMessages}
    
    >
			<CoinInfo coin={coin} withSymbol/>
			<Divider />
			
    <Form.Item
      label="Amount"
      name="amount"
      rules={[
        {
          required: true,
	        type: 'number',
	        min: 0
        },
      ]}
    >
      <InputNumber style={{ width: '100%'}} placeholder='Enter coin amount' onChange={handleAmountChange}/>
    </Form.Item>

    <Form.Item
      label="Price"
      name="price"
    >
      <InputNumber style={{ width: '100%'}} onChange={handlePriceChange}/>
    </Form.Item>
			
			<Form.Item
      label="Date & Time"
      name="date"
    >
      <DatePicker showTime/>
    </Form.Item>
			
			<Form.Item
      label="Total"
      name="total"
    >
      <InputNumber style={{ width: '100%'}} disabled />
    </Form.Item>
			

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Add asset
      </Button>
    </Form.Item>
  </Form>
	)
}

export default AddAssetForm
