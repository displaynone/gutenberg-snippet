const el = wp.element.createElement;

const icon = el( 'svg', { width: 24, height: 24, viewBox: '0 0 24 24' },
	[
		el( 'rect', {
			key: 'snippet-bloc-logo-block-1',
			y: '2',
			x: '2',
			height: '3',
			width: '20',
			style: { fill: '#555d66' },
		} ),
		el( 'rect', {
			key: 'snippet-bloc-logo-block-2',
			y: '6',
			x: '2',
			height: '3',
			width: '14',
			style: { fill: '#555d66' },
		} ),
		el( 'rect', {
			key: 'snippet-bloc-logo-block-3',
			y: '10',
			x: '2',
			height: '3',
			width: '16',
			style: { fill: '#555d66' },
		} ),
		el( 'rect', {
			key: 'snippet-bloc-logo-block-4',
			y: '14',
			x: '6',
			height: '3',
			width: '12',
			style: { fill: '#555d66' },
		} ),
		el( 'rect', {
			key: 'snippet-bloc-logo-block-5',
			y: '18',
			x: '2',
			height: '3',
			width: '10',
			style: { fill: '#555d66' },
		} ),
	]
);

export default icon;
