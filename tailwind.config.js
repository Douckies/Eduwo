module.exports = {
	purge: [],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				blue: {
					clear: '#1888d5',
					dark: '#0a50aa',
				},
			},
			spacing: {
				'5px': '0.313rem',
				'30px': '1.875rem',
				'60px': '3.75rem',
				'123px': '7.688rem',
			},
		},
	},
	variants: {
		opacity: ({ after }) => after(['disabled']),
		color: ({ after }) => after(['disabled']),
	},
	plugins: [],
};
