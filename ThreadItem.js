import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import Paper from 'material-ui/Paper';

class ThreadItem extends Component {
	static propTypes = {
		thread: PropTypes.any
	};

	render() {
		const {thread} = this.props;
		const {finished, text} = thread.data;

		return (
			<Paper zDepth={1}>
				<div style={styles.row}>
					<Checkbox
						style={styles.checkbox}
						onCheck={this.onPressCheck}
						checked={finished} />
					<TextField
						id={thread.id}
						style={styles.input}
						underlineShow={false}
						hintText={text ? undefined : 'What needs to be done?'}
						onChange={this.onTextChange}
						value={text || ''} />
					<FlatButton
						style={styles.icon}
						icon={<DeleteIcon />}
						secondary
						onClick={this.onPressDelete} />
				</div>
				<Divider />
			</Paper>
		);
	}

	onPressDelete = async () => {
		const {thread} = this.props;
		if (this._deleting) return;
		this._deleting = true;
		try {
			await thread.delete();
			this._deleting = false;
		}
		catch (err) {
			this._deleting = false;
		}
	};

	onPressCheck = async () => {
		const {thread} = this.props;
		await thread.update({
			finished: !thread.data.finished
		});
	};

	onTextChange = async (event, newValue) => {
		const {thread} = this.props;
		await thread.update({
			text: newValue
		});
	};
}

const styles = {
	container: {
		display: 'flex',
		flexDirection: 'column'
	},
	row: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	checkbox: {
		marginLeft: 16,
		width: 40
	},
	input: {
		flex: 1
	},
	icon: {
		marginRight: 6
	}
};

export default observer(ThreadItem);
