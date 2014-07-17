
var args = require('yargs').argv;

var gulp = require('gulp');
var gulpIf = require('gulp-if');
var concat = require('gulp-concat');
var replace = require('gulp-replace');
var uglify = require('gulp-uglify');

// -----
// Sources
// -----

var sourceFiles = [
    '_templates/namespace.js',
    'src/models/BaseModel.js',
    'src/collections/BaseCollection.js'
];

var amdAdapter_head = '_templates/amdAdapter_head.js';
var amdAdapter_footer = '_templates/amdAdapter_footer.js';
var cjsAdapter = '_templates/cjsAdapter.js';

// -----
// Build options
// -----
var minify = args.minify;
// build types
var isAmd = args.type && args.type.toLowerCase() === 'amd';
var isNode = args.type && args.type.toLowerCase() === 'cjs';
// namespace used, mostly useful for vanilla builds
var vanillaNamespace = args.namespace || 'DataCore';

gulp.task('build', function() {
    var sources = sourceFiles.slice(0);

    var outFile = 'data-core';

    if (isAmd) {
        sources.unshift(amdAdapter_head);
        sources.push(amdAdapter_footer);

        outFile = outFile + '.amd';
    } else if (isNode) {
        sources.push(cjsAdapter);
    } else {
        outFile = outFile + '.vanilla';
    }


    if (minify) {
        outFile = outFile + '.min';
    }

    outFile = outFile + '.js';

    gulp.src(sources)
        .pipe(concat(outFile))
        .pipe(gulpIf(minify, uglify()))
        .pipe(replace('NAMESPACE', vanillaNamespace))
        .pipe(gulp.dest('./dist/'));
});
