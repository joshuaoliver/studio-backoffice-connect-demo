import React, { Component } from 'react';
import {observer} from 'mobx-react';
import {threads} from './store';
import FlipMove from 'react-flip-move';
import CircularProgress from 'material-ui/CircularProgress';
import Checkbox from 'material-ui/Checkbox';
import TodoItem from './TodoItem';

const Threads = observer(class Threads extends Component {
	constructor(props) {
		super(props);
		this.state = {
			disabled: false
		};
	}

	render() {
		const {disabled} = this.state;
		if (disabled) {
			return (
				<div>
					<div style={styles.header}>
						<div />
						<Checkbox
							label='Disable observe'
							checked={disabled}
							onCheck={this.onCheckDisable} />
					</div>
				</div>
			);
		}
		const {docs, query} = threads;
		const children = docs.map((thread) => <TodoItem key={thread.id} thread={thread} />);
		const {isLoading} = threads;
		return (
			<div style={styles.container}>
				<div style={styles.header}>
					<Checkbox
						label='Hide finished'
						checked={query ? true : false}
						onCheck={this.onCheckShowOnlyUnfinished} />
				</div>
				<div style={styles.content} className='mobile-margins'>
					<FlipMove enterAnimation='fade' leaveAnimation='fade'>
						{children}
					</FlipMove>
				</div>
				{isLoading ? <div style={styles.loader}><CircularProgress /></div> : undefined}
			</div>
		);
	}

	onCheckShowOnlyUnfinished = () => {
		if (threads.query) {
			threads.query = undefined;
		}
		else {
			threads.query = threads.ref.where('finished', '==', false).limit(10);
		}
	};

	onCheckDisable = () => {
		this.setState({
			disabled: !this.state.disabled
		});
	}
});

const styles = {
	container: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		position: 'relative'
	},
	loader: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	header: {
		padding: 16,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderBottom: '1px solid #DDD'
	},
	content: {
		flex: 1,
		overflowY: 'scroll'
	}
};

export default Threads;
