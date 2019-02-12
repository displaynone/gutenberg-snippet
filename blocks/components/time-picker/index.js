/**
 * TimePicker
 * 
 * I needed a TimePicker, but not the whole Date element that comes with
 * https://github.com/WordPress/gutenberg/edit/master/packages/components/src/date-time/time.js
 * so, I took that component and stripped out all but the time controls.
 */

/**
 * External dependencies
 */
import classnames from 'classnames';
import { isInteger, times, get } from 'lodash';
import moment from 'moment';

/**
 * Internal dependencies
 */
const { Button }    = wp.components;
const { Component } = wp.element;
const { __ }        = wp.i18n; // Localization

/**
 * Module Constants
 */
const TIMEZONELESS_FORMAT = 'YYYY-MM-DDTHH:mm:ss';

class TimePicker extends Component {
	constructor() {
		super( ...arguments );
		this.state = {
			hours: '',
			minutes: '',
			am: true,
			date: null,
		};
		this.updateHours = this.updateHours.bind( this );
		this.updateMinutes = this.updateMinutes.bind( this );
		this.onChangeHours = this.onChangeHours.bind( this );
		this.onChangeMinutes = this.onChangeMinutes.bind( this );
	}

	componentDidMount() {
		this.syncState( this.props );
	}

	componentDidUpdate( prevProps ) {
		const { currentTime, is12Hour } = this.props;
		if (
			currentTime !== prevProps.currentTime ||
			is12Hour !== prevProps.is12Hour
		) {
			this.syncState( this.props );
		}
	}

	getMaxHours() {
		return this.props.is12Hour ? 12 : 23;
	}

	getMinHours() {
		return this.props.is12Hour ? 1 : 0;
	}

	syncState( { currentTime, is12Hour } ) {
		const selected = currentTime ? moment( currentTime ) : moment();
		const minutes = selected.format( 'mm' );
		const am = selected.format( 'A' );
		const hours = selected.format( is12Hour ? 'hh' : 'HH' );
		const date = currentTime ? moment( currentTime ) : moment();
		this.setState( { minutes, hours, am, date } );
	}

	updateHours() {
		const { is12Hour, onChange } = this.props;
		const { am, hours, date } = this.state;
		const value = parseInt( hours, 10 );
		if (
			! isInteger( value ) ||
			( is12Hour && ( value < 1 || value > 12 ) ) ||
			( ! is12Hour && ( value < 0 || value > 23 ) )
		) {
			this.syncState( this.props );
			return;
		}

		const newDate = is12Hour ?
			date.clone().hours( am === 'AM' ? value % 12 : ( ( ( value % 12 ) + 12 ) % 24 ) ) :
			date.clone().hours( value );
		this.setState( { date: newDate } );
		onChange( newDate.format( TIMEZONELESS_FORMAT ) );
	}

	updateMinutes() {
		const { onChange } = this.props;
		const { minutes, date } = this.state;
		const value = parseInt( minutes, 10 );
		if ( ! isInteger( value ) || value < 0 || value > 59 ) {
			this.syncState( this.props );
			return;
		}
		const newDate = date.clone().minutes( value );
		this.setState( { date: newDate } );
		onChange( newDate.format( TIMEZONELESS_FORMAT ) );
	}

	updateAmPm( value ) {
		return () => {
			const { onChange } = this.props;
			const { am, date, hours } = this.state;
			if ( am === value ) {
				return;
			}
			let newDate;
			if ( value === 'PM' ) {
				newDate = date.clone().hours( ( ( parseInt( hours, 10 ) % 12 ) + 12 ) % 24 );
			} else {
				newDate = date.clone().hours( parseInt( hours, 10 ) % 12 );
			}
			this.setState( { date: newDate } );
			onChange( newDate.format( TIMEZONELESS_FORMAT ) );
		};
	}

	onChangeHours( event ) {
		this.setState( { hours: event.target.value } );
	}

	onChangeMinutes( event ) {
		this.setState( { minutes: event.target.value } );
	}

	render() {
		const { is12Hour } = this.props;
		const { minutes, hours, am } = this.state;
		return (
			<div className={ classnames( 'components-datetime__time' ) }>
				<fieldset>
					<legend className="components-datetime__time-legend invisible">{ __( 'Time' ) }</legend>
					<div className="components-datetime__time-wrapper">
						<div className="components-datetime__time-field components-datetime__time-field-time">
							<input
								aria-label={ __( 'Hours' ) }
								className="components-datetime__time-field-hours-input"
								type="number"
								step={ 1 }
								min={ this.getMinHours() }
								max={ this.getMaxHours() }
								value={ hours }
								onChange={ this.onChangeHours }
								onBlur={ this.updateHours }
							/>
							<span
								className="components-datetime__time-separator"
								aria-hidden="true">:</span>
							<input
								aria-label={ __( 'Minutes' ) }
								className="components-datetime__time-field-minutes-input"
								type="number"
								min={ 0 }
								max={ 59 }
								value={ minutes }
								onChange={ this.onChangeMinutes }
								onBlur={ this.updateMinutes }
							/>
						</div>
						{ is12Hour && (
							<div className="components-datetime__time-field components-datetime__time-field-am-pm">
								<Button
									aria-pressed={ am === 'AM' }
									isDefault
									className="components-datetime__time-am-button"
									isToggled={ am === 'AM' }
									onClick={ this.updateAmPm( 'AM' ) }
								>
									{ __( 'AM' ) }
								</Button>
								<Button
									aria-pressed={ am === 'PM' }
									isDefault
									className="components-datetime__time-pm-button"
									isToggled={ am === 'PM' }
									onClick={ this.updateAmPm( 'PM' ) }
								>
									{ __( 'PM' ) }
								</Button>
							</div>
						) }
					</div>
				</fieldset>
			</div>
		);
	}
}

export default TimePicker;
