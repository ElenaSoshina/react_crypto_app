import { Layout, Typography } from 'antd'
import { useCrypto } from '../../../context/crypto-context.jsx'
import AssetsTable from '../../AssetsTable.jsx'
import PortfolioChart from '../../PortfolioChart.jsx'
import styles from './AppContent.module.css'



const AppContent = () => {
	const {assets, crypto} = useCrypto()
	return (
		<Layout.Content className={styles.content}>
			<Typography.Title style={{textAlign:'left', color: '#fff'}}>
				Portfolio: {assets.map((asset) => {
					const coin = crypto.find(c => c.id ===asset.id)
					return asset.amount * coin.price
			}).reduce((acc, v) => (acc += v), 0).toFixed(3)}
				$
			</Typography.Title>
			<PortfolioChart />
			<AssetsTable />
		</Layout.Content>
	)
}

export default AppContent
