module.exports = {
	clean: {
		ts: ["src/app/**/*.js", "!src/app/**/*.spec.js", "src/app/**/*.js.map", "!src/app/**/*.spec.js.map", "dist/app/**/*.js", "dist/app/**/*.js.map" ],
		styles: ["src/assets/styles/**/*.css", "dist/assets/**/*.css"],
		html: ["dist/**/*.html"],
		images: ["dist/assets/images/"],
		fonts: ["dist/assets/styles/fonts"],
		tests: ["src/app/**/*.spec.js", "src/app/**/*.spec.js.map"],
		locales: ["dist/assets/locales/"],
		all: [
			"src/app/**/*.js",
			"src/app/**/*.map",
			"src/assets/styles/**/*.css",
			"dist",
			"index.html",
			"coverage",
			"temp"
		]
	},
	coverage: {
		report: 'coverage/report.json',
		base: 'coverage/'
	},
	compile: {
		styles: {
			srcBase: 'src/assets/styles/',
			destBase: 'dist/assets/styles/'
		},
		scripts: {
			srcBase: 'src/app/',
		}
	},
	dist: {
		dependencies: [
			'./node_modules/es6-shim/es6-shim.min.js',
			'./node_modules/zone.js/dist/zone.js',
			'./node_modules/reflect-metadata/Reflect.js',
		],
		dev: [
			'./dist/lib/dependencies.js',
			'./dist/lib/system.src.js',
			'./dist/lib/config.js',
			'./dist/lib/system.init.js'
		],
		prod: ['./dist/app/dependencies*.js', './dist/app/bundle*.js'],
		styles: ['./dist/assets/styles/**/*.css']
	}
};