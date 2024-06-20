import { Layout, Select, Space, Button, Modal, Drawer } from 'antd';
import { useEffect, useState } from 'react'
import { useCrypto } from '../../../context/crypto-context.jsx'
import AddAssetForm from '../../AddAssetForm.jsx'
import CoinInfoModal from '../../CoinInfoModal.jsx'
import styles from './AppHeader.module.css'



const AppHeader = () => {
	const [select, setSelect] = useState(false)
	const [modal, setModal] = useState(false)
	const [coin, setCoin] = useState(null)
	const [drawer, setDrawer] = useState(false)
	
	useEffect(() => {
		const keypress = event => {
			if (event.key === '/') {
				setSelect((prev) => !prev)
			}
		}
	document.addEventListener('keypress', keypress)
		return () => document.removeEventListener('keypress', keypress)
	}, [])
	const {crypto} = useCrypto()

	function handleSelect (value){
		setCoin(crypto.find(c => c.id === value))
		setModal(true)
	}
	
	return (
		<Layout.Header className={styles.header}>
			<Select
				open={select}
				onSelect={handleSelect}
				onClick={() => setSelect((prev) => !prev)}
        style={{
          width: 250,
        }}
        placeholder="select one country"
        defaultValue={['press to open']}
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
			<Button type="primary" onClick={() => setDrawer(true)}>Add asset</Button>
			
			<Modal open={modal}  onCancel={() => setModal(false)} footer={null}>
        <CoinInfoModal coin={coin}/>
      </Modal>
			
			<Drawer width={600} title="Add Asset" onClose={() => setDrawer(false)} open={drawer} destroyOnClose>
        <AddAssetForm onClose={() => setDrawer(false)}/>
      </Drawer>
			
		</Layout.Header>
	)
}

export default AppHeader
